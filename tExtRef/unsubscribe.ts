import { Remove, Update } from "../foundation/utils.js";

import { removeInputs } from "../tInputs/removeInputs.js";
import { removeSubscriptionSupervision } from "../tLN/removeSubscriptionSupervision.js";

/** Optional setting to configure un-subscription */
export type UnsubscribeOptions = {
  /** Whether to ignore removing subscription supervision (LGOS / LSVS).
   * CAUTION: This might be resulting in a invalid SCL file.
   */
  ignoreSupervision: boolean;
};

/**
 * Remove link between sending IED data to receiving IED external
 * references - unsubscribing.
 * ```md
 * 1. Unsubscribes external references itself:
 * -Update `ExtRef` in case later binding is used (existing `intAddr` attribute)
 * -Remove `ExtRef` in case `intAddr` is missing
 *
 * 2. Removes leaf `Input` elements as well
 * 3. Removes subscription supervision (can be disabled through options.ignoreSupervision)
 * - when all external references of one control block are unsubscribed
 * - when `valKind` RO|Conf and `valImport` true
 * ```
 * In case the external reference
 * @param extRefs - Array of external references
 * @returns An array of update and/or remove edit representing changes required
 * to unsubscribe.
 */
export function unsubscribe(
  extRefs: Element[],
  options: UnsubscribeOptions = { ignoreSupervision: false },
): (Update | Remove)[] {
  const updateEdits: Update[] = [];
  const removeEdits: Remove[] = [];

  extRefs.map((extRef) => {
    if (extRef.getAttribute("intAddr"))
      updateEdits.push({
        element: extRef,
        attributes: {
          iedName: null,
          ldInst: null,
          prefix: null,
          lnClass: null,
          lnInst: null,
          doName: null,
          daName: null,
          srcLDInst: null,
          srcPrefix: null,
          srcLNClass: null,
          srcLNInst: null,
          srcCBName: null,
          ...(extRef.getAttribute("pServT") && { serviceType: null }),
        },
      });
    else removeEdits.push({ node: extRef });
  });

  return [
    ...removeInputs(removeEdits),
    ...updateEdits,
    ...(options.ignoreSupervision
      ? []
      : removeSubscriptionSupervision(extRefs)),
  ];
}
