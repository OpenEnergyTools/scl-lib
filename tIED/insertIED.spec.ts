import { expect } from "chai";

import { Insert } from "../foundation/utils";
import { insertIed } from "./insertIED.js";

function findAction(
  actions: Insert[],
  type: "parent" | "node",
  node: Node
): Insert | undefined {
  return actions.find(
    (action) =>
      (type === "parent" && action.parent === node) ||
      (type === "node" && action.node === node)
  );
}

function numberInserts(
  actions: Insert[],
  type: "parent" | "node",
  tag: string
): number {
  return actions.filter(
    (action) =>
      (type === "parent" && (action.parent as Element).tagName === tag) ||
      (type === "node" && (action.node as Element).tagName === tag)
  ).length;
}

const emptyScl = (
  await fetch("tIED/importIED/emptyproject.scd")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector("SCL")!;

const multipleIEDs = (
  await fetch("tIED/importIED/multipleieds.scd")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector("SCL")!;

const validIed = (
  await fetch("tIED/importIED/valid.iid")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector(':root > IED[name="TestImportIED"]')!;

const duplicateIED = (
  await fetch("tIED/importIED/duplicate.iid")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector(':root > IED[name="IED3"]')!;

const incompleteIED = (
  await fetch("tIED/importIED/incomplete.iid")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector(':root > IED[name="incompleteIED"]')!;

describe("Function to an importIED and its referenced elements", () => {
  it("return empty string with invalid inputs", () => {
    expect(insertIed(validIed, validIed).length).to.equal(0);
    expect(insertIed(emptyScl, emptyScl).length).to.equal(0);
  });

  it("returns empty string with duplicate IED.name", () =>
    expect(insertIed(multipleIEDs, duplicateIED).length).to.equal(0));

  it("allows to insert incomplete IEDs", () =>
    expect(insertIed(multipleIEDs, incompleteIED).length).to.equal(1));

  it("passes on the IED element to the project", async () => {
    const imports = insertIed(emptyScl, validIed);
    expect(findAction(imports, "node", validIed)).to.not.be.undefined;
  });

  it("adds data type templates elements", async () => {
    const imports = insertIed(emptyScl, validIed);
    expect(numberInserts(imports, "node", "DataTypeTemplates")).to.equal(1);
    expect(numberInserts(imports, "node", "LNodeType")).to.equal(5); // only referenced lnType
    expect(numberInserts(imports, "node", "DOType")).to.equal(12); // only referenced do
    expect(numberInserts(imports, "node", "DAType")).to.equal(5); // only referenced da
    expect(numberInserts(imports, "node", "EnumType")).to.equal(4); // only referenced da
  });

  it("per default add communication elements", async () => {
    const imports = insertIed(emptyScl, validIed);
    expect(numberInserts(imports, "node", "Communication")).to.equal(1);
    expect(numberInserts(imports, "node", "SubNetwork")).to.equal(1);
    expect(numberInserts(imports, "node", "ConnectedAP")).to.equal(1);
  });

  it("with addCommunicationSection set to false does not add communication elements", async () => {
    const imports = insertIed(emptyScl, validIed, {
      addCommunicationSection: false,
    });
    expect(numberInserts(imports, "node", "Communication")).to.equal(0);
    expect(numberInserts(imports, "node", "SubNetwork")).to.equal(0);
    expect(numberInserts(imports, "node", "ConnectedAP")).to.equal(0);
  });

  it("skips importing isEqualNode data type template objects", async () => {
    const imports = insertIed(multipleIEDs, validIed);
    expect(numberInserts(imports, "node", "DataTypeTemplates")).to.equal(0);
    expect(numberInserts(imports, "node", "LNodeType")).to.equal(1); // only !isEqualNode
    expect(numberInserts(imports, "node", "DOType")).to.equal(2); // only !isEqualNode
    expect(numberInserts(imports, "node", "DAType")).to.equal(1); // only !isEqualNode
    expect(numberInserts(imports, "node", "EnumType")).to.equal(3); // only !isEqualNode
  });

  it("skips existing SubNetwork element", async () => {
    const imports = insertIed(multipleIEDs, validIed);
    expect(numberInserts(imports, "node", "SubNetwork")).to.equal(0);
  });

  describe("imports valid ied elements to empty projects", () => {
    /** 

    it("renames TEMPLATE IED element if manufacturer/type has illegal characters", async () => {
      importDoc = await fetch("/test/testfiles/importieds/template.icd")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));

      const ied = importDoc.querySelector("IED")!;
      ied.setAttribute("manufacturer", "Fancy-Vendy");
      ied.setAttribute("type", "Z#Mega$Y");

      await element.updateComplete;

      element.prepareImport(importDoc, "template.icd");
      await parent.updateComplete;

      console.log(
        element.doc?.querySelector(":root > IED")?.getAttribute("name")
      );

      expect(
        element.doc?.querySelector(':root > IED[name="FancyVendy_ZMegaY_001"]')
      ).to.exist;
    });

    it("allows multiple import of TEMPLATE IEDs", async () => {
      const templateIED1 = await fetch(
        "/test/testfiles/importieds/template.icd"
      )
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      element.prepareImport(templateIED1, "template.icd");

      const templateIED2 = await fetch(
        "/test/testfiles/importieds/template.icd"
      )
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));

      await element.updateComplete;

      element.prepareImport(templateIED2, "template.icd");
      await parent.updateComplete;

      expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_001"]')).to
        .exist;
      expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_002"]')).to
        .exist;
    });

    it("imports the ConnectedAPs for a TEMPLATE IED", async () => {
      const templateIED1 = await fetch(
        "/test/testfiles/importieds/template.icd"
      )
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      element.prepareImport(templateIED1, "template.icd");
      await parent.updateComplete;

      expect(
        element.doc?.querySelectorAll(
          ':root > Communication >  SubNetwork > ConnectedAP[iedName="FancyVendy_ZMegaY_001"]'
        )
      ).to.exist;
    });

    it("loads unique lnodetypes to the project", async () => {
      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  LNodeType")
          .length
      ).to.equal(0);

      element.prepareImport(importDoc, "template.icd");
      await parent.updateComplete;

      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  LNodeType")
          .length
      ).to.equal(5);
    });
  });

  describe("imports valid ied elements", () => {
    let doc: XMLDocument;
    let importDoc: XMLDocument;

    let parent: MockImportIed;
    let element: ImportingIedPlugin;

    beforeEach(async () => {
      parent = await fixture(html`<mock-import-ied></mock-import-ied>`);

      element = parent.shadowRoot!.querySelector("import-ied-plugin")!;

      doc = await fetch("/test/testfiles/valid2007B4.scd")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      parent.doc = doc;
      await parent.updateComplete;

      importDoc = await fetch("/test/testfiles/importieds/valid.iid")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));

      await element.updateComplete;
    });

    it("loads ied element to the project", async () => {
      expect(element.doc?.querySelector(':root > IED[name="TestImportIED"]')).to
        .not.exist;

      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(element.doc?.querySelector(':root > IED[name="TestImportIED"]')).to
        .exist;
    });

    it("loads unique lnodetypes to the project", async () => {
      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  LNodeType")
          .length
      ).to.equal(11);

      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  LNodeType")
          .length
      ).to.equal(16);
    });

    it("loads unique dotypes to the project", async () => {
      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  DOType")
          .length
      ).to.equal(16);

      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  DOType")
          .length
      ).to.equal(26);
    });

    it("loads unique datypes to the project", async () => {
      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  DAType")
          .length
      ).to.equal(7);

      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  DAType")
          .length
      ).to.equal(11);
    });

    it("loads unique enumtypes to the project", async () => {
      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  EnumType")
          .length
      ).to.equal(4);

      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(
        element.doc?.querySelectorAll(":root > DataTypeTemplates >  EnumType")
          .length
      ).to.equal(10);
    });

    it("adds the connectedap of the imported ied", async () => {
      expect(element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]'))
        .to.not.exist;

      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]'))
        .to.exist;
      expect(
        element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]')
          ?.parentElement
      ).to.equal(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]'));
    });

    it("creates new subnetwork if not present in the doc", async () => {
      expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
        .not.exist;

      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
        .exist;
    });

    it("correctly transfers document element namespaces", async () => {
      element.prepareImport(importDoc, "valid.iid");
      await parent.updateComplete;

      expect(
        element.doc.querySelector("SCL")!.getAttribute("xmlns:eTest1")
      ).to.equal("http://www.eTest1.com/2022/Better61850");
      expect(
        element.doc.querySelector("SCL")!.getAttribute("xmlns:eTest2")
      ).to.equal("http://www.eTest2.com/2032/Better61850ForReal");

      // looking at serialisation of node to confirm correct namespace registration
      const output = new XMLSerializer().serializeToString(element.doc);
      expect(output).to.contain(
        'xmlns:eTest1="http://www.eTest1.com/2022/Better61850"'
      );
      expect(output).to.contain(
        'xmlns:eTest2="http://www.eTest2.com/2032/Better61850ForReal"'
      );

      // check that namespaces are encoded correctly within a specific element
      const lineFeedAndSpacesReplace = /[\s\n\r]+/g;
      expect(output.replace(lineFeedAndSpacesReplace, "")).to.include(
        `<IED name="TestImportIED" type="TestType" manufacturer="TestMan" originalSclVersion="2007" originalSclRevision="B" originalRelease="4" eTest2:New="fancy new attribute">
<eTest1:NewThing>
    <P type="solution"/>
</eTest1:NewThing>`.replace(lineFeedAndSpacesReplace, "")
      );
    });

    it("allows multiple import of TEMPLATE IEDs", async () => {
      expect(element.doc.querySelectorAll("IED").length).to.equal(3);

      const templateIED1 = await fetch(
        "/test/testfiles/importieds/template.icd"
      )
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      element.prepareImport(templateIED1, "template.icd");

      const templateIED2 = await fetch(
        "/test/testfiles/importieds/template.icd"
      )
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      element.prepareImport(templateIED2, "template.icd");
      await parent.updateComplete;

      expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_001"]')).to
        .exist;
      expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_002"]')).to
        .exist;
    });

    it("renders wizard for files containing more than one IED", async () => {
      const multipleIedDoc = await fetch(
        "/test/testfiles/importieds/multipleied.scd"
      )
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));

      element.prepareImport(multipleIedDoc, "multipleied.scd");
      await element.updateComplete;

      expect(element.dialog).to.exist;
      expect(element.dialog.open).to.be.true;
      expect(
        element.dialog?.querySelectorAll("mwc-check-list-item").length
      ).to.equal(3);
    });

    it("imports selected IEDs from Import IED wizard", async () => {
      const multipleIedDoc = await fetch(
        "/test/testfiles/importieds/multipleied.scd"
      )
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));

      element.prepareImport(multipleIedDoc, "multipleied.scd");
      await element.updateComplete;

      (<CheckListItem>(
        element.dialog.querySelectorAll("mwc-check-list-item")[1]
      )).setAttribute("selected", "true");
      (<CheckListItem>(
        element.dialog.querySelectorAll("mwc-check-list-item")[2]
      )).setAttribute("selected", "true");
      await element.dialog.updateComplete;

      (<HTMLElement>(
        element.dialog?.querySelector('mwc-button[slot="primaryAction"]')
      )).click();
      await parent.updateComplete;
      await element.requestUpdate();

      await new Promise((resolve) => setTimeout(resolve, 100)); // await complex action

      expect(element.doc.querySelectorAll('IED[name="IED3"]').length).to.equal(
        1
      );
      expect(element.doc.querySelector('IED[name="IED4"]')).to.exist;
      expect(element.doc.querySelector('IED[name="IED5"]')).to.exist;
    });
  });

  describe("importing invalid ieds", () => {
    let doc: XMLDocument;
    let importDoc: XMLDocument;

    let parent: MockEditorLogger;
    let element: ImportingIedPlugin;

    beforeEach(async () => {
      parent = (await fixture(
        html`<mock-editor-logger
          ><import-ied-plugin></import-ied-plugin
        ></mock-editor-logger>`
      )) as MockEditorLogger;

      element = parent.querySelector("import-ied-plugin")!;

      doc = await fetch("/test/testfiles/valid2007B4.scd")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      element.doc = doc;
      await element.updateComplete;
    });

    it("throws missing ied elements error", async () => {
      importDoc = await fetch("/test/testfiles/importieds/invalid.iid")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      element.prepareImport(importDoc, "invalid.iid");

      expect(parent.history[0].kind).to.equal("error");
      expect(parent.history[0].title).to.equal("[import.log.missingied]");
    });

    it("throws duplicate ied name error", async () => {
      importDoc = await fetch("/test/testfiles/importieds/duplicate.iid")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      element.prepareImport(importDoc, "duplicate.iid");

      expect(parent.history[0].kind).to.equal("error");
      expect(parent.history[0].title).to.equal("[import.log.nouniqueied]");
    });

    it("throws parser error", async () => {
      importDoc = await fetch("/test/testfiles/importieds/parsererror.iid")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"));
      await element.updateComplete;

      element.prepareImport(importDoc, "parsererror.iid");

      expect(parent.history[0].kind).to.equal("error");
      expect(parent.history[0].title).to.equal("[import.log.parsererror]");
    }); */
  });
});
