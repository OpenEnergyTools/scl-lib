import { Insert, Remove, Update } from "../foundation/utils.js";

import { controlBlockGseOrSmv } from "../tControl/controlBlockGseOrSmv.js";
import { controlBlockObjRef } from "../tControl/controlBlockObjRef.js";
import { findControlBlockSubscription } from "../tControl/findControlSubscription.js";
import { updatedConfRev } from "../tControl/updateConfRev.js";
import { updateDatSet } from "../tControl/updateDatSet.js";

/**
 * Utility function to update GSEControl element attributes.
 * ```md
 * These attributes trigger addition edits
 * - name: also updates GSE.cbName and supervision references
 * - datSet: update reference DataSet.name - when DataSet is single use
 *
 * >NOTE: confRev attribute is updated +10000 every time this function is called
 * ```
 * @param gseControl - GSEControl element
 * @param attributes -
 * @returns action array to update all `GSEControl` attributes
 */
export function updateGSEControl(update: Update): (Update | Remove | Insert)[] {
  if (update.element.tagName !== "GSEControl") return [];

  const updates: (Update | Remove | Insert)[] = [];
  if (update.attributes.name) {
    const extRefUpdates: Update[] = findControlBlockSubscription(
      update.element,
    ).map((extRef) => ({
      element: extRef,
      attributes: { srcCBName: update.attributes.name },
    }));

    const supervisionUpdates: (Remove | Insert)[] = Array.from(
      update.element.ownerDocument.querySelectorAll("Val"),
    )
      .filter((val) => val.textContent === controlBlockObjRef(update.element))
      .flatMap((val) => {
        const [path] = controlBlockObjRef(update.element)!.split(".");
        const oldValContent = Array.from(val.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE,
        )!;
        const newValContent = update.element.ownerDocument.createTextNode(
          `${path}.${update.attributes.name}`,
        ) as Text;

        return [
          { node: oldValContent },
          { parent: val, node: newValContent, reference: null },
        ];
      });

    const gseUpdate: Update[] = [];
    const gSE = controlBlockGseOrSmv(update.element);
    if (gSE) {
      gseUpdate.push({
        element: gSE,
        attributes: { cbName: update.attributes.name },
      });
    }

    updates.push(...extRefUpdates, ...supervisionUpdates, ...gseUpdate);
  }

  if (update.attributes.datSet) {
    const updateDataSet = updateDatSet(update);

    if (updateDataSet) updates.push(updateDataSet);
    else delete update.attributes.datSet; // remove datSet from the update to avoid schema invalidity
  }

  update.attributes.confRev = updatedConfRev(update.element); // +10000 for update

  return [update, ...updates];
}
