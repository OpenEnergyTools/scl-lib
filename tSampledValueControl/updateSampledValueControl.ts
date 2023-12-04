import { Insert, Remove, Update } from "../foundation/utils.js";

import { controlBlockGseOrSmv } from "../tControl/controlBlockGseOrSmv.js";
import { controlBlockObjRef } from "../tControl/controlBlockObjRef.js";
import { findControlBlockSubscription } from "../tControl/findControlSubscription.js";
import { updatedConfRev } from "../tControl/updateConfRev.js";
import { updateDatSet } from "../tControl/updateDatSet.js";

/**
 * Utility function to update SampledValueControl element attributes.
 * ```md
 * These attributes trigger addition edits
 * - name: also updates SMV.cbName and supervision references
 * - datSet: update reference DataSet.name - when DataSet is single use
 *
 * >NOTE: confRev attribute is updated +10000 every time this function is called
 * ```
 * @param update - diff holding the `SampledValueControl` as element
 * @returns action array to update all `SampledValueControl` attributes
 */
export function updateSampledValueControl(
  update: Update,
): (Update | Remove | Insert)[] {
  if (update.element.tagName !== "SampledValueControl") return [];

  const updates: (Update | Remove | Insert)[] = [];
  if (update.attributes.name) {
    const extRefUpdates: Update[] = findControlBlockSubscription(
      update.element,
    ).map((extRef) => ({
      element: extRef,
      attributes: { srcCBName: update.attributes.name },
    }));

    const supervisionUpdates: (Remove | Insert)[] = Array.from(
      update.element.ownerDocument.querySelectorAll(
        ':root > IED > AccessPoint > Server > LDevice > LN[lnClass="LSVS"] > DOI[name="SvCBRef"] > DAI[name="setSrcRef"] > Val',
      ),
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

    const smvUpdate: Update[] = [];
    const sMV = controlBlockGseOrSmv(update.element);
    if (sMV) {
      smvUpdate.push({
        element: sMV,
        attributes: { cbName: update.attributes.name },
      });
    }

    updates.push(...extRefUpdates, ...supervisionUpdates, ...smvUpdate);
  }

  if (update.attributes.datSet) {
    const updateDataSet = updateDatSet(update);

    if (updateDataSet) updates.push(updateDataSet);
    else delete update.attributes.datSet; // remove datSet from the update to avoid schema invalidity
  }

  update.attributes.confRev = updatedConfRev(update.element); // +10000 for update

  return [update, ...updates];
}
