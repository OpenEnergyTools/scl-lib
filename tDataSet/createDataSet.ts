import { Insert, createElement } from "../foundation/utils.js";
import { getReference } from "../tBaseElement/getReference.js";
import { uniqueElementName } from "../foundation/uniqueElementName.js";

import { canAddDataSet } from "./canAddDataSet.js";

export type CreateDataSetOptions = {
  attributes: { name?: string; desc?: string };
  skipCheck?: boolean;
};

function invalid(anyLn: Element, name: string | null | undefined): boolean {
  const uniqueName = name
    ? !anyLn.querySelector(`:scope > DataSet[name="${name}"]`)
    : true;

  return !(uniqueName && canAddDataSet(anyLn));
}

export function createDataSet(
  parent: Element,
  options: CreateDataSetOptions = { attributes: {} },
): Insert | null {
  const anyLn =
    parent.tagName === "LN0" || parent.tagName === "LN"
      ? parent
      : parent.querySelector("LN0, LN");
  if (!anyLn) return null;

  if (!options.skipCheck && invalid(anyLn, options.attributes.name))
    return null;

  const dataSetAttributes: Record<string, string | null> = {
    ...options.attributes,
  };

  if (!options.attributes.name)
    dataSetAttributes.name = uniqueElementName(anyLn, "DataSet");

  const dataSet = createElement(anyLn.ownerDocument, "DataSet", {
    ...dataSetAttributes,
  });

  return {
    parent: anyLn,
    node: dataSet,
    reference: getReference(anyLn, "DataSet"),
  };
}
