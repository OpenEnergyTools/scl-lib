import { expect } from "chai";

import {
  Arbitrary,
  array,
  assert,
  constant,
  constantFrom,
  dictionary,
  object as objectArbitrary,
  oneof,
  property,
  record,
  string as stringArbitrary,
  tuple,
  webUrl,
} from "fast-check";

import {
  EditV2,
  handleEdit,
  Insert,
  Remove,
  SetAttributes,
  SetTextContent,
} from "./handleEdit.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace util {
  export const xmlAttributeName =
    /^(?!xml|Xml|xMl|xmL|XMl|xML|XmL|XML)[A-Za-z_][A-Za-z0-9-_.]*(:[A-Za-z_][A-Za-z0-9-_.]*)?$/;

  export function descendants(parent: Element | XMLDocument): Node[] {
    return (Array.from(parent.childNodes) as Node[]).concat(
      ...Array.from(parent.children).map((child) => descendants(child))
    );
  }

  export const sclDocString = `<?xml version="1.0" encoding="UTF-8"?>
  <SCL version="2007" revision="B" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:ens1="http://example.org/somePreexistingExtensionNamespace">
  <Substation name="A1" desc="test substation"></Substation>
</SCL>`;
  const testDocStrings = [
    sclDocString,
    `<?xml version="1.0" encoding="UTF-8"?>
  <testDoc1>
<element1 property1="value1" property2="value2">SomeText</element1>
<element2 property2="value2" property3="value3"><!--AComment--></element2>
<element3 property3="value3" property1="value1">
  <subelement1 property1="value1" property2="value2">SomeMoreText</subelement1>
  <subelement2 property2="value2" property3="value3"><!----></subelement2>
  <subelement3 property3="value3" property1="value1"></subelement3>
</element3>
</testDoc1>`,
    `<?xml version="1.0" encoding="UTF-8"?>
  <testDoc2>
<element1 property1="value1" property2="value2">SomeText</element1>
<element2 property2="value2" property3="value3"><!--AComment--></element2>
<element3 property3="value3" property1="value1">
  <subelement1 property1="value1" property2="value2">SomeMoreText</subelement1>
  <subelement2 property2="value2" property3="value3"><!----></subelement2>
  <subelement3 property3="value3" property1="value1"></subelement3>
</element3>
</testDoc2>`,
  ];

  export type TestDoc = { doc: XMLDocument; nodes: Node[] };
  export const testDocs = tuple(
    constantFrom(...testDocStrings),
    constantFrom(...testDocStrings)
  )
    .map((strs) =>
      strs.map((str) => new DOMParser().parseFromString(str, "application/xml"))
    )
    .map((docs) =>
      docs.map((doc) => ({ doc, nodes: descendants(doc).concat([doc]) }))
    ) as Arbitrary<[TestDoc, TestDoc]>;

  export function remove(nodes: Node[]): Arbitrary<Remove> {
    const node = oneof(
      { arbitrary: constantFrom(...nodes), weight: nodes.length },
      testDocs.chain((docs) => constantFrom(...docs.map((d) => d.doc)))
    );
    return record({ node });
  }

  export function insert(nodes: Node[]): Arbitrary<Insert> {
    const references = (nodes as (Node | null)[]).concat([null]);
    const parent = constantFrom(...nodes);
    const node = constantFrom(...nodes);
    const reference = constantFrom(...references);
    return record({ parent, node, reference });
  }

  export function setTextContent(nodes: Node[]): Arbitrary<SetTextContent> {
    const element = <Arbitrary<Element>>(
      constantFrom(...nodes.filter((nd) => nd.nodeType === Node.ELEMENT_NODE))
    );
    const textContent = stringArbitrary();

    return record({ element, textContent });
  }

  export function setAttribute(nodes: Node[]): Arbitrary<SetAttributes> {
    const element = <Arbitrary<Element>>(
      constantFrom(...nodes.filter((nd) => nd.nodeType === Node.ELEMENT_NODE))
    );
    const attributes = dictionary(
      stringArbitrary(),
      oneof(stringArbitrary(), constant(null))
    );
    // object() instead of nested dictionary() necessary for performance reasons
    const attributesNS = objectArbitrary({
      key: webUrl(),
      values: [stringArbitrary(), constant(null)],
      maxDepth: 1,
    }).map(
      (aNS) =>
        Object.fromEntries(
          Object.entries(aNS).filter(
            ([_, attrs]) => attrs && !(typeof attrs === "string")
          )
        ) as Partial<Record<string, Partial<Record<string, string | null>>>>
    );
    return record({ element, attributes, attributesNS });
  }

  export function complexEdit(nodes: Node[]): Arbitrary<EditV2[]> {
    return array(simpleEdit(nodes));
  }

  export function simpleEdit(
    nodes: Node[]
  ): Arbitrary<Insert | SetAttributes | Remove | SetTextContent> {
    return oneof(
      remove(nodes),
      insert(nodes),
      setAttribute(nodes),
      setTextContent(nodes)
    );
  }

  export function edit(nodes: Node[]): Arbitrary<EditV2> {
    return oneof(
      { arbitrary: simpleEdit(nodes), weight: 2 },
      complexEdit(nodes)
    );
  }

  /** A series of arbitrary edits that allow us to test undo and redo */
  export type UndoRedoTestCase = {
    doc1: XMLDocument;
    doc2: XMLDocument;
    edits: EditV2[];
  };

  export function undoRedoTestCases(
    testDoc1: TestDoc,
    testDoc2: TestDoc
  ): Arbitrary<UndoRedoTestCase> {
    const nodes = testDoc1.nodes.concat(testDoc2.nodes);
    return record({
      doc1: constant(testDoc1.doc),
      doc2: constant(testDoc2.doc),
      edits: array(edit(nodes)),
    });
  }

  export function isParentNode(node: Node): node is ParentNode {
    return (
      node instanceof Element ||
      node instanceof Document ||
      node instanceof DocumentFragment
    );
  }

  export function isParentOf(parent: Node, node: Node | null) {
    return (
      isParentNode(parent) &&
      (node === null ||
        Array.from(parent.childNodes).includes(node as ChildNode))
    );
  }

  export function isValidInsert({ parent, node, reference }: Insert) {
    return (
      node !== reference &&
      isParentOf(parent, reference) &&
      !node.contains(parent) &&
      ![Node.DOCUMENT_NODE, Node.DOCUMENT_TYPE_NODE].some(
        (nodeType) => node.nodeType === nodeType
      ) &&
      !(
        parent instanceof Document &&
        (parent.documentElement || !(node instanceof Element))
      )
    );
  }
}

describe("Utility function to handle EditV2 edits", () => {
  let sclDoc: XMLDocument;

  beforeEach(async () => {
    sclDoc = new DOMParser().parseFromString(
      util.sclDocString,
      "application/xml"
    );
  });

  it("does not do anything on invalid input", () => {
    const sclDocStringBefore = new XMLSerializer().serializeToString(sclDoc);

    const parent = sclDoc.documentElement;
    const node = sclDoc.createElement("test");
    const reference = sclDoc.querySelector("Substation");
    const invalidedit = {
      parent,
      someinvalidkey: node,
      reference,
    } as unknown as Insert;

    const undoEdit = handleEdit(invalidedit);

    const sclDocStringAfter = new XMLSerializer().serializeToString(sclDoc);

    expect(undoEdit).to.be.an("array").that.is.empty;
    expect(sclDocStringBefore).to.equal(sclDocStringAfter);
  });

  it("inserts an element on Insert", () => {
    const parent = sclDoc.documentElement;
    const node = sclDoc.createElement("test");
    const reference = sclDoc.querySelector("Substation");
    handleEdit({ parent, node, reference });
    expect(sclDoc.documentElement.querySelector("test")).to.have.property(
      "nextSibling",
      reference
    );
  });

  it("removes an element on Remove", () => {
    const node = sclDoc.querySelector("Substation")!;
    handleEdit({ node });
    expect(sclDoc.querySelector("Substation")).to.not.exist;
  });

  it("updates an element's attributes on SetAttributes", () => {
    const element = sclDoc.querySelector("Substation")!;
    handleEdit({
      element,
      attributes: {
        name: "A2",
        desc: null,
        ["__proto__"]: "a string", // covers a rare edge case branch
      },
      attributesNS: {
        "http://example.org/myns": {
          "myns:attr": "value1",
          "myns:attr2": "value1",
        },
        "http://example.org/myns2": {
          attr: "value2",
          attr2: "value2",
        },
        "http://example.org/myns3": {
          attr: "value3",
          attr2: "value3",
        },
      },
    });

    expect(element.getAttribute("name")).to.equal("A2");
    expect(element.getAttribute("desc")).to.be.null;
    expect(element.getAttribute("__proto__")).to.equal("a string");
    expect(element.getAttribute("myns:attr")).to.equal("value1");
    expect(element.getAttribute("myns:attr2")).to.equal("value1");
    expect(element.getAttribute("ens2:attr")).to.equal("value2");
    expect(element.getAttribute("ens2:attr2")).to.equal("value2");
    expect(element.getAttribute("ens3:attr")).to.equal("value3");
    expect(element.getAttribute("ens3:attr2")).to.equal("value3");
  });

  it("sets an element's textContent on SetTextContent", () => {
    const element = sclDoc.querySelector("SCL")!;

    const newTextContent = "someNewTextContent";
    handleEdit({
      element,
      textContent: newTextContent,
    });

    expect(element.textContent).to.equal(newTextContent);
  });

  it("processes complex edits in the given order", () => {
    const parent = sclDoc.documentElement;
    const reference = sclDoc.querySelector("Substation");
    const node1 = sclDoc.createElement("test1");
    const node2 = sclDoc.createElement("test2");
    handleEdit([
      { parent, node: node1, reference },
      { parent, node: node2, reference },
    ]);
    expect(sclDoc.documentElement.querySelector("test1")).to.have.property(
      "nextSibling",
      node2
    );
    expect(sclDoc.documentElement.querySelector("test2")).to.have.property(
      "nextSibling",
      reference
    );
  });

  it("undoes a committed edit on undo() call", () => {
    const node = sclDoc.querySelector("Substation")!;
    const undoEdit = handleEdit({ node }); // do edit
    handleEdit(undoEdit); // undo edit
    expect(sclDoc.querySelector("Substation")).to.exist;
  });

  it("redoes an undone edit on redo() call", () => {
    const node = sclDoc.querySelector("Substation")!;
    const undoEdit = handleEdit({ node });
    const redoEdit = handleEdit(undoEdit);
    handleEdit(redoEdit);
    expect(sclDoc.querySelector("Substation")).to.not.exist;
  });

  describe("generally", () => {
    it("inserts elements on Insert edit events", () =>
      assert(
        property(
          util.testDocs.chain(([doc1, doc2]) => {
            const nodes = doc1.nodes.concat(doc2.nodes);
            return util.insert(nodes);
          }),
          (edit) => {
            handleEdit(edit);
            if (util.isValidInsert(edit))
              return (
                edit.node.parentElement === edit.parent &&
                edit.node.nextSibling === edit.reference
              );
            return true;
          }
        )
      ));

    it("set's an element's textContent on SetTextContent edit events", () =>
      assert(
        property(
          util.testDocs.chain(([doc1, doc2]) => {
            const nodes = doc1.nodes.concat(doc2.nodes);
            return util.setTextContent(nodes);
          }),
          (edit) => {
            handleEdit(edit);

            return edit.element.textContent === edit.textContent;
          }
        )
      ));

    it("updates default- and foreign-namespace attributes on UpdateNS events", () =>
      assert(
        property(
          util.testDocs.chain(([{ nodes }]) => util.setAttribute(nodes)),
          (edit) => {
            handleEdit(edit);
            return (
              Object.entries(edit.attributes)
                .filter(([name]) => util.xmlAttributeName.test(name))
                .map((entry) => entry as [string, string | null])
                .every(
                  ([name, value]) => edit.element.getAttribute(name) === value
                ) &&
              Object.entries(edit.attributesNS)
                .map(
                  (entry) => entry as [string, Record<string, string | null>]
                )
                .every(([ns, attributes]) =>
                  Object.entries(attributes)
                    .filter(([name]) => util.xmlAttributeName.test(name))
                    .map((entry) => entry as [string, string | null])
                    .every(
                      ([name, value]) =>
                        edit.element.getAttributeNS(
                          ns,
                          name.includes(":")
                            ? <string>name.split(":", 2)[1]
                            : name
                        ) === value
                    )
                )
            );
          }
        )
      )).timeout(20000);

    it("removes elements on Remove edit events", () =>
      assert(
        property(
          util.testDocs.chain(([{ nodes }]) => util.remove(nodes)),
          ({ node }) => {
            handleEdit({ node });
            return !node.parentNode;
          }
        )
      ));

    it("undoes up to n edits on undo(n) call", () =>
      assert(
        property(
          util.testDocs.chain((docs) => util.undoRedoTestCases(...docs)),
          ({ doc1, doc2, edits }: util.UndoRedoTestCase) => {
            const [oldDoc1, oldDoc2] = [doc1, doc2].map((doc) =>
              doc.cloneNode(true)
            );
            const undoEdits: EditV2[] = [];
            edits.forEach((a: EditV2) => {
              const ed = handleEdit(a);
              undoEdits.unshift(ed);
            });
            if (edits.length) handleEdit(undoEdits);
            expect(doc1).to.satisfy((doc: XMLDocument) =>
              doc.isEqualNode(oldDoc1)
            );
            expect(doc2).to.satisfy((doc: XMLDocument) =>
              doc.isEqualNode(oldDoc2)
            );
            return true;
          }
        )
      )).timeout(20000);

    it("redoes up to n edits on redo(n) call", () =>
      assert(
        property(
          util.testDocs.chain((docs) => util.undoRedoTestCases(...docs)),
          ({ doc1, doc2, edits }: util.UndoRedoTestCase) => {
            const undoEdits: EditV2[] = [];
            edits.forEach((a: EditV2) => {
              undoEdits.unshift(handleEdit(a));
            });
            const [oldDoc1, oldDoc2] = [doc1, doc2].map((doc) =>
              new XMLSerializer().serializeToString(doc)
            );
            const redoEdits: EditV2[] = [];

            if (edits.length) {
              redoEdits.unshift(handleEdit(undoEdits));
              handleEdit(redoEdits);
            }
            const [newDoc1, newDoc2] = [doc1, doc2].map((doc) =>
              new XMLSerializer().serializeToString(doc)
            );
            return oldDoc1 === newDoc1 && oldDoc2 === newDoc2;
          }
        )
      )).timeout(20000);
  });
});
