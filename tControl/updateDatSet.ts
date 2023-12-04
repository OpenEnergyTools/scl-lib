import { Update } from "../foundation/utils.js";

const controlBlockTags = ["ReportControl", "GSEControl", "SampledValueControl"];

export function updateDatSet(update: Update): Update | null {
  const newDatSet = update.attributes.datSet;
  const controlBlock = update.element;
  const oldDatSet = controlBlock.getAttribute("datSet");

  if (!newDatSet || !controlBlockTags.includes(controlBlock.tagName))
    return null;

  const isDataSetUsedByThisElementOnly =
    Array.from(
      controlBlock.parentElement?.querySelectorAll(
        `:scope > ReportControl[datSet="${oldDatSet}"], 
         :scope > GSEControl[datSet="${oldDatSet}"], 
         :scope > SampledValueControl[datSet="${oldDatSet}"]`,
      ) ?? [],
    ).length === 1;
  if (!isDataSetUsedByThisElementOnly) return null;

  const dataSet = update.element.parentElement?.querySelector(
    `DataSet[name="${oldDatSet}"]`,
  );
  if (!dataSet) return null;

  return { element: dataSet, attributes: { name: newDatSet } };
}
