import { Insert, Update, isInsert, isUpdate } from "../../foundation/utils";

import {
  ExtRefSource,
  findControlBlockBySrcAttributes,
} from "./findControlBlockOnSrcAttributes.js";

import { controlBlockObjRef } from "../../tControl/controlBlockObjRef.js";

import { Supervision, globalLnInstGenerator } from "./foundation.js";

import { canInstantiateSubscriptionSupervision } from "./canInstantiateSubscriptionSupervision.js";
import { createSupervisionEdit } from "./createSupervisionEdit.js";

function uniqueSupervisions(
  edits: (Insert | Update)[],
): Record<string, Supervision> {
  const uniqueSupervisions: Record<string, Supervision> = {};
  edits.forEach((edit) => {
    let sink: Element | null = null;
    let source: ExtRefSource;
    if (isUpdate(edit)) {
      source = {
        iedName: edit.attributes["iedName"] ?? "",
        ldInst: edit.attributes["srcLDInst"] ?? "",
        prefix: edit.attributes["srcPrefix"] ?? "",
        lnClass: edit.attributes["srcLNClass"] ?? "",
        lnInst: edit.attributes["srcLNInst"] ?? "",
        cbName: edit.attributes["srcCBName"] ?? "",
      };
      sink = edit.element;
    } else if (isInsert(edit) && (edit.node as Element).tagName === "ExtRef") {
      const extRef = edit.node as Element;
      source = {
        iedName: extRef.getAttribute("iedName") ?? "",
        ldInst: extRef.getAttribute("srcLDInst") ?? "",
        prefix: extRef.getAttribute("srcPrefix") ?? "",
        lnClass: extRef.getAttribute("srcLNClass") ?? "",
        lnInst: extRef.getAttribute("srcLNInst") ?? "",
        cbName: extRef.getAttribute("srcCBName") ?? "",
      };
      sink = edit.parent as Element;
    }

    const controlBlock = findControlBlockBySrcAttributes(
      sink!.ownerDocument,
      source!,
    );
    if (!controlBlock) return;

    const controlBlockReference = controlBlockObjRef(controlBlock)!;
    const iedName = sink!.closest("IED")!.getAttribute("name");
    const id = `${controlBlockReference}-${iedName}`;
    if (!uniqueSupervisions[id])
      uniqueSupervisions[id] = {
        sourceControlBlock: controlBlock,
        subscriberIedOrLn: sink!.closest("IED")!,
      };
  });

  return uniqueSupervisions;
}

/**
 * Insert supervisions triggered by subscription.
 * !!This function can be used only in combination with subscribe edits.
 * @param edits - Subscribe edit array
 * @returns Edit array adding supervision on top of the subscription
 */
export function insertSubscriptionSupervisions(
  edits: (Update | Insert)[],
): Insert[] {
  /** Global as multiple subscription could be defined for different subscriber IEDs */
  const instGenerator = globalLnInstGenerator();

  const usedSupervisions: Set<Element> = new Set();

  return Object.values(uniqueSupervisions(edits))
    .map((supervision) => {
      if (!canInstantiateSubscriptionSupervision(supervision)) return null;

      return createSupervisionEdit(supervision, {
        usedSupervisions,
        instGenerator,
      });
    })
    .filter((action) => action) as Insert[];
}
