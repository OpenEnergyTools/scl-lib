import { Insert } from "../../foundation/utils";

import {
  Supervision,
  SupervisionOptions,
  globalLnInstGenerator,
} from "./foundation.js";

import { canInstantiateSubscriptionSupervision } from "./canInstantiateSubscriptionSupervision.js";
import { createSupervisionEdit } from "./createSupervisionEdit.js";

/**
 * Instantiate supervision logical node (LGOS/LSVS) for [[`sourceControlBlock`]]
 * within a [[`subscriberIedOrLn`]].
 * @param supervision
 * @param options
 * @return Insert edit or null, if supervision is not possible
 */
export function instantiateSubscriptionSupervision(
  supervision: Supervision,
  options: SupervisionOptions = {
    newSupervisionLn: false,
    fixedLnInst: -1,
    checkEditableSrcRef: true,
    checkDuplicateSupervisions: true,
    checkMaxSupervisionLimits: true,
    allowReplacement: false,
  },
): Insert | null {
  if (!canInstantiateSubscriptionSupervision(supervision, options)) return null;

  if (options.fixedLnInst >= 0)
    return createSupervisionEdit(supervision, {
      newSupervisionLn: options.newSupervisionLn,
      fixedInst: `${options.fixedLnInst}`,
    });

  if (supervision.subscriberIedOrLn.tagName === "LN")
    return createSupervisionEdit(supervision, { fixedInst: "-1" });

  /** Global as multiple subscription could be defined for different subscriber IEDs */
  const instGenerator = globalLnInstGenerator();

  if (options.newSupervisionLn && options.fixedLnInst === -1)
    return createSupervisionEdit(supervision, {
      newSupervisionLn: true,
      instGenerator,
    });

  return createSupervisionEdit(supervision, { instGenerator });
}
