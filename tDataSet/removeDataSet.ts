import { Remove, Update } from "../foundation/utils.js";

import { controlBlocks } from "../tControl/controlBlocks.js";
import { fCDAsSubscription } from "../tFCDA/removeFCDA.js";
import { unsubscribe } from "../tExtRef/unsubscribe.js";

export function removeDataSet(dataSet: Element): (Remove | Update)[] {
  const dataSetRemove: (Remove | Update)[] = [{ node: dataSet }];

  const fCDAs = Array.from(dataSet.querySelectorAll(":scope > FCDA"));
  const extRefs = fCDAs.flatMap((fcda) => fCDAsSubscription(fcda));

  const extRefEdits: (Remove | Update)[] = [];
  extRefEdits.push(...unsubscribe(extRefs));

  const ctrlBlockUpdates: (Remove | Update)[] = controlBlocks(dataSet).map(
    (ctrlBlock) => ({
      element: ctrlBlock,
      attributes: { datSet: null, confRev: "0" },
    })
  );

  return dataSetRemove.concat(extRefEdits, ctrlBlockUpdates);
}
