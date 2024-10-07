/** A object to store a tree structure in */
export type TreeSelection = {
  [name: string]: TreeSelection;
};

function enumeration(daOrBda: Element): TreeSelection {
  const selection: TreeSelection = {};

  const enumType = daOrBda.ownerDocument.querySelector(
    `EnumType[id="${daOrBda.getAttribute("type")}"]`
  );
  if (!enumType) return selection;

  Array.from(enumType.querySelectorAll(":scope > EnumVal")).forEach(
    (enumVal) => {
      const val = enumVal.textContent?.trim();
      if (val) selection[val] = {};
    }
  );

  return selection;
}

function dataAttribute(daOrBda: Element): TreeSelection {
  const selection: TreeSelection = {};

  const doType = daOrBda.ownerDocument.querySelector(
    `DAType[id="${daOrBda.getAttribute("type")}"]`
  );
  if (!doType) return selection;

  Array.from(doType.querySelectorAll("BDA")).forEach((bda) => {
    const name = bda.getAttribute("name");
    if (!name) return;

    if (bda.getAttribute("bType") === "Struct")
      selection[name] = dataAttribute(bda);
    else if (bda.getAttribute("bType") === "Enum")
      selection[name] = enumeration(bda);
    else selection[name] = {};
  });

  return selection;
}

function dataObject(dOorSdo: Element): TreeSelection {
  const selection: TreeSelection = {};

  const doType = dOorSdo.ownerDocument.querySelector(
    `:scope > DataTypeTemplates > DOType[id="${dOorSdo.getAttribute("type")}"]`
  );
  if (!doType) return selection;

  Array.from(doType.querySelectorAll(":scope > SDO,:scope > DA")).forEach(
    (sDOorDA) => {
      const name = sDOorDA.getAttribute("name");
      if (!name) return;

      if (sDOorDA.tagName === "SDO") selection[name] = dataObject(sDOorDA);
      else if (sDOorDA.tagName === "DA") {
        if (sDOorDA.getAttribute("bType") === "Struct")
          selection[name] = dataAttribute(sDOorDA);
        else if (sDOorDA.getAttribute("bType") === "Enum")
          selection[name] = enumeration(sDOorDA);
        else selection[name] = {};
      }
    }
  );

  return selection;
}

/** Utility function extracting the relation of an `LNodeType` element
 * into a tree selection object that can be used to display in
 * `oscd-tree-grid` component.
 * @param lNodeType The `LNodeType` element to extract the selection from
 * @returns The tree selection object
 * */
export function lNodeTypeToSelection(lNodeType: Element): TreeSelection {
  const selection: TreeSelection = {};

  Array.from(lNodeType.querySelectorAll(":scope > DO")).forEach((dO) => {
    const name = dO.getAttribute("name");
    if (name) selection[name] = dataObject(dO);
  });

  return selection;
}
