import { Remove, Update } from "../foundation/utils.js";

import { removeDataSet } from "../tDataSet/removeDataSet.js";
import { unsubscribe } from "../tExtRef/unsubscribe.js";
import { controlBlockGseOrSmv } from "./controlBlockGseOrSmv.js";

import { controlBlocks } from "./controlBlocks.js";
import { findControlBlockSubscription } from "./findControlSubscription.js";

/**
 * Utility function to remove a `ReportControl`, `GSEControl`, `SampledValueControl`
 * element aka control blocks.
 * ```md
 * - removes the control block element itself
 * - removes DataSet element if only used by the control block exclusively
 * - unsubscribe data, if necessary
 * - remove subscription supervision, if necessary
 * ```
 * @param remove - Remove edit for the control block element
 * @returns Action array removing control block and its referenced data
 * */
export function removeControlBlock(remove: Remove): (Remove | Update)[] {
  if (
    !["ReportControl", "GSEControl", "SampledValueControl"].includes(
      (remove.node as Element).tagName,
    )
  )
    return [];

  const controlBlock = remove.node as Element;

  const ctrlBlockRemoveAction: (Remove | Update)[] = [{ node: controlBlock }];

  const dataSet = controlBlock.parentElement?.querySelector(
    `DataSet[name="${controlBlock.getAttribute("datSet")}"]`,
  );
  const dataSetRemove: (Remove | Update)[] = [];
  if (dataSet && controlBlocks(dataSet).length > 1) {
    dataSetRemove.push(
      ...unsubscribe(findControlBlockSubscription(controlBlock)),
    );
  } else if (dataSet) {
    dataSetRemove.push(...removeDataSet({ node: dataSet }));
  }

  const gse = controlBlockGseOrSmv(controlBlock);
  const gseRemove = gse ? [{ node: gse }] : [];

  return ctrlBlockRemoveAction.concat(dataSetRemove, gseRemove);
}
