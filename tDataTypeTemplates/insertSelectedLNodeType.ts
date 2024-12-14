/**
 * Basis is a copy from www.github.com/openenergytools/oscd-template-generator
 * originally written by ca-d, thx Chris. Code has been modified!
 */
import { nsdToJson } from "./nsdToJson.js";

import { createElement, Insert, TreeSelection } from "../foundation/utils.js";

import { getReference } from "../tBaseElement/getReference.js";

type Templates = {
  EnumType: Element[];
  DAType: Element[];
  DOType: Element[];
  LNodeType: Element[];
};

function describeEnumType(element: Element): { vals: Record<string, string> } {
  const vals: Record<string, string> = {};

  const sortedEnumVals = Array.from(element.children)
    .filter((child) => child.tagName === "EnumVal")
    .sort(
      (v1, v2) =>
        parseInt(v1.getAttribute("ord")!, 10) -
        parseInt(v2.getAttribute("ord")!, 10),
    );
  for (const val of sortedEnumVals)
    vals[val.getAttribute("ord")!] = val.textContent ?? "";

  return { vals };
}

function describeDAType(element: Element): {
  bdas: Record<string, Record<string, string | null>>;
} {
  const bdas: Record<string, Record<string, string | null>> = {};
  for (const bda of Array.from(element.children)
    .filter((child) => child.tagName === "BDA")
    .sort((c1, c2) => c1.outerHTML.localeCompare(c2.outerHTML))) {
    const [bType, type, dchg, dupd, qchg] = [
      "bType",
      "type",
      "dchg",
      "dupd",
      "qchg",
    ].map((attr) => bda.getAttribute(attr));
    bdas[bda.getAttribute("name")!] = { bType, type, dchg, dupd, qchg };
  }
  return { bdas };
}

function describeDOType(element: Element) {
  const sdos: Record<string, Record<string, string | null>> = {};
  for (const sdo of Array.from(element.children)
    .filter((child) => child.tagName === "SDO")
    .sort((c1, c2) => c1.outerHTML.localeCompare(c2.outerHTML))) {
    const [name, type, transient] = ["name", "type", "transient"].map((attr) =>
      sdo.getAttribute(attr),
    );
    sdos[name!] = { type, transient };
  }
  const das: Record<string, Record<string, string | null>> = {};
  for (const da of Array.from(element.children)
    .filter((child) => child.tagName === "DA")
    .sort((c1, c2) => c1.outerHTML.localeCompare(c2.outerHTML))) {
    const [name, fc, bType, type, dchg, dupd, qchg] = [
      "name",
      "fc",
      "bType",
      "type",
      "dchg",
      "dupd",
      "qchg",
    ].map((attr) => da.getAttribute(attr));
    das[name!] = {
      fc,
      bType,
      type,
      dchg,
      dupd,
      qchg,
    };
  }
  return {
    sdos,
    das,
    cdc: element.getAttribute("cdc"),
  };
}

function describeLNodeType(element: Element) {
  const dos: Record<string, Record<string, string | null>> = {};
  for (const doElement of Array.from(element.children)
    .filter((child) => child.tagName === "DO")
    .sort((c1, c2) => c1.outerHTML.localeCompare(c2.outerHTML))) {
    const [name, type, transient] = ["name", "type", "transient"].map((attr) =>
      doElement.getAttribute(attr),
    );
    dos[name!] = { type, transient };
  }
  return {
    dos,
    lnClass: element.getAttribute("lnClass"),
  };
}

const typeDescriptions = {
  EnumType: describeEnumType,
  DAType: describeDAType,
  DOType: describeDOType,
  LNodeType: describeLNodeType,
} as Partial<Record<string, (e: Element) => object>>;

function describeElement(element: Element): object {
  const describe = typeDescriptions[element.tagName]!;

  return describe(element);
}

function hashElement(element: Element): string {
  /** A direct copy from www.github.com/openscd/open-scd-core/foundation/cyrb64.ts */

  /**
   * Hashes `str` using the cyrb64 variant of
   * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
   * @returns digest - a rather insecure hash, very quickly
   */
  function cyrb64(str: string): string {
    /* eslint-disable no-bitwise */
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    /* eslint-disable-next-line no-plusplus */
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
      Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
      Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
      Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
      Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (
      (h2 >>> 0).toString(16).padStart(8, "0") +
      (h1 >>> 0).toString(16).padStart(8, "0")
    );
    /* eslint-enable no-bitwise */
  }

  return cyrb64(JSON.stringify(describeElement(element)));
}

function data(lnData: any, path: string[]): any {
  let d = lnData;
  for (const slug of path.slice(0, -1)) d = d[slug].children;

  return d[path[path.length - 1]];
}

/**
 * Creates a new data type `LNodeType` based on a user selection.
 * @param doc - the XML document to add the `LNodeType` to
 * @param selection - The user selection as a tree object
 * @param lnClass - the logical node class of the `LNodeType`
 * @returns an array of inserts for the `LNodeType` and the missing subs data
 */
export function insertSelectedLNodeType(
  doc: XMLDocument,
  selection: TreeSelection,
  lnClass: string,
): Insert[] {
  const types = new Set<string>();
  const elements: Templates = {
    LNodeType: [],
    DOType: [],
    DAType: [],
    EnumType: [],
  };

  const lnData = nsdToJson(lnClass);
  if (!lnData) return [];

  function isUnknownId(id: string): boolean {
    const alreadyCreate = types.has(id);
    const alreadyExist = !!doc.querySelector(
      `:root > DataTypeTemplates > *[id="${id}"]`,
    );

    return !alreadyCreate && !alreadyExist;
  }

  function identify(element: Element, name: string): string {
    const hash = hashElement(element);
    const id = `${name}$oscd$_${hash}`;

    element.setAttribute("id", id);
    if (isUnknownId(id)) {
      types.add(id);
      elements[
        element.tagName as "LNodeType" | "DOType" | "DAType" | "EnumType"
      ]?.push(element);
    }

    return id;
  }

  const lnType = createElement(doc, "LNodeType", { lnClass });

  function createEnumType(path: string[], sel: TreeSelection): string {
    const enumData = data(lnData, path).children;

    const vals: Element[] = [];

    for (const content of Object.keys(sel)) {
      const ord = enumData[content].literalVal;
      const val = createElement(doc, "EnumVal", { ord });
      val.textContent = content;
      vals.push(val);
    }

    vals.sort(
      (v1, v2) =>
        parseInt(v1.getAttribute("ord")!, 10) -
        parseInt(v2.getAttribute("ord")!, 10),
    );

    const enumType = createElement(doc, "EnumType", {});
    vals.forEach((val) => enumType.append(val));

    const dataName = path[path.length - 1];
    return identify(enumType, dataName);
  }

  function createDAType(
    path: string[],
    selection: TreeSelection,
    underlyingValSel: TreeSelection = {}, // For Oper.ctlVal, SBOw.ctlVal and Cancel.ctlVal
  ): string {
    const { children, underlyingTypeKind, underlyingType } = data(lnData, path);

    const daType = createElement(doc, "DAType", {});

    for (const [name, dep] of Object.entries(children) as [
      string,
      {
        tagName: string;
        transient?: string;
        fc: string;
        dchg?: string;
        dupd?: string;
        qchg?: string;
        typeKind?: "BASIC" | "ENUMERATED" | "CONSTRUCTED" | "undefined";
        type?: string;
      },
    ][]) {
      if (!selection[name]) continue;

      const bda = createElement(doc, "BDA", { name });

      if (dep.typeKind === "BASIC" || !dep.typeKind) {
        bda.setAttribute("bType", dep.type!);
      }

      if (dep.typeKind === "ENUMERATED") {
        const enumId = createEnumType(path.concat([name]), selection[name]);
        bda.setAttribute("bType", "Enum");
        bda.setAttribute("type", enumId);
      }

      if (dep.typeKind === "CONSTRUCTED") {
        const daId = createDAType(
          path.concat([name]),
          selection[name],
          underlyingValSel,
        );
        bda.setAttribute("bType", "Struct");
        bda.setAttribute("type", daId);
      }

      // For Oper, SBOw and Cancel only
      if (dep.typeKind === "undefined") {
        if (underlyingTypeKind === "BASIC")
          // For all but APC and ENC
          bda.setAttribute("bType", underlyingType);
        else if (underlyingTypeKind === "ENUMERATED") {
          // For ENC type ->  enumeration is equal to parent stVal
          const enumId = createEnumType(
            path.slice(0, -1).concat(["stVal"]),
            underlyingValSel,
          );
          bda.setAttribute("bType", "Enum");
          bda.setAttribute("type", enumId);
        } else if (underlyingTypeKind === "CONSTRUCTED") {
          // For APC type -> AnalogueValue is equal to parent mxVal
          const daId = createDAType(
            path.slice(0, -1).concat(["mxVal"]),
            underlyingValSel,
          );
          bda.setAttribute("bType", "Struct");
          bda.setAttribute("type", daId);
        }
      }

      daType.append(bda);
    }

    return identify(daType, path[path.length - 1]);
  }

  function createDOType(path: string[], selection: TreeSelection): string {
    const dO = data(lnData, path);

    const doType = createElement(doc, "DOType", { cdc: dO.type });

    const deps: [
      string,
      {
        tagName: string;
        transient?: string;
        fc: string;
        dchg?: string;
        dupd?: string;
        qchg?: string;
        typeKind?: "BASIC" | "ENUMERATED" | "CONSTRUCTED" | "undefined";
        type?: string;
      },
    ][] = Object.entries(dO.children);

    for (const [name, dep] of deps) {
      if (!selection[name]) continue;

      if (dep.tagName === "SubDataObject") {
        const { transient } = dep;
        const type = createDOType(path.concat([name]), selection[name]);
        const sdo = createElement(doc, "SDO", { name, transient, type });
        doType.prepend(sdo);
      } else {
        const { fc, dchg, dupd, qchg } = dep;

        const da = createElement(doc, "DA", { name, fc, dchg, dupd, qchg });

        if (dep.typeKind === "BASIC" || !dep.typeKind) {
          da.setAttribute("bType", dep.type!);
        }

        if (dep.typeKind === "ENUMERATED") {
          const enumId = createEnumType(path.concat([name]), selection[name]);
          da.setAttribute("bType", "Enum");
          da.setAttribute("type", enumId);
        }

        if (dep.typeKind === "CONSTRUCTED") {
          const underlyingVal = selection.stVal || selection.mxVal;
          const daId = createDAType(
            path.concat([name]),
            selection[name],
            underlyingVal,
          );
          da.setAttribute("bType", "Struct");
          da.setAttribute("type", daId);
        }

        doType.append(da);
      }
    }

    return identify(doType, path[path.length - 1]);
  }

  Object.keys(selection).forEach((name) => {
    const type = createDOType([name], selection[name]);

    const { transient } = lnData[name];

    const doElement = createElement(doc, "DO", { name, type, transient });

    lnType.append(doElement);
  });

  identify(lnType, lnClass);

  const dataTypeTemplates: Element =
    (doc.querySelector(":root > DataTypeTemplates") as Element) ||
    createElement(doc, "DataTypeTemplates", {});

  const inserts: Insert[] = [];
  if (!dataTypeTemplates.parentElement) {
    inserts.push({
      parent: doc.documentElement,
      node: dataTypeTemplates,
      reference: getReference(doc.documentElement, "DataTypeTemplates"),
    });
  }

  [
    ...elements.LNodeType,
    ...elements.DOType,
    ...elements.DAType,
    ...elements.EnumType,
  ].forEach((dataType) => {
    if (!doc.querySelector(`${dataType.tagName}[id="${dataType.id}"]`)) {
      const reference = getReference(dataTypeTemplates, dataType.tagName);
      inserts.push({ parent: dataTypeTemplates, node: dataType, reference });
    }
  });

  return inserts;
}
