import { Update } from "../foundation/utils.js";
import { updatedConfRev } from "../tControl/updateConfRev.js";
import { controlBlocks } from "../tControl/controlBlocks.js";

/** Utility function to update `DataSet` element and the `datSet` attribute of
 * all referenced control blocks
 * @param update - Update edit for the `DataSet` element
 * @returns Update actions for `DataSet`s attributes and its `datSet` references
 * */
export function updateDataSet(update: Update): Update[] {
  if (update.element.tagName !== "DataSet") return [];

  const dataSet = update.element;

  const parent = dataSet.parentElement as Element;
  if (!parent) return [];

  const dataSetUpdate = {
    element: dataSet,
    attributes: update.attributes,
  } as Update;

  const newName = update.attributes.name;
  if (!newName) return [dataSetUpdate];

  const controlBlockUpdates = controlBlocks(dataSet).map((element) => ({
    element,
    attributes: { datSet: newName, confRev: updatedConfRev(element) },
  })) as Update[];

  return [dataSetUpdate].concat(controlBlockUpdates);
}
