import { Insert, Update, isInsert, isUpdate } from "../../foundation/utils";

import {
  ExtRefSource,
  findControlBlockBySrcAttributes,
} from "./findControlBlockOnSrcAttributes.js";

import { controlBlockObjRef } from "../../tControl/controlBlockObjRef.js";

import { Supervision, globalLnInstGenerator } from "./foundation.js";

import { canInstantiateSubscriptionSupervision } from "./canInstantiateSubscriptionSupervision.js";
import { createSupervisionEdit } from "./createSupervisionEdit.js";

/** In case a new ExtRef is added to inputs-less LN/LN0
 * ExtRef does not have parent IED yet.
 * @returns A sink IED for a given ExtRef insert or `null`*/
function findIED(
  edit: Insert,
  previousEdits: (Insert | Update)[]
): Element | null {
  // case 1: Input is already in the SCL and ExtRef is added to it
  const inputs = edit.parent as Element;
  const inputsParent = inputs.parentElement as Element;
  if (inputsParent) return inputs.closest("IED");

  // case 2: Input element is added as part of the subscription as well.
  const inputsInsertEdit = previousEdits.find(
    (otherEdit) => isInsert(otherEdit) && otherEdit.node === edit.parent
  ) as Insert | undefined;
  if (inputsInsertEdit)
    return (inputsInsertEdit.parent as Element).closest("IED");

  // fallback for invalid files
  return null;
}

function uniqueSupervisions(
  edits: (Insert | Update)[]
): Record<string, Supervision> {
  const uniqueSupervisions: Record<string, Supervision> = {};
  edits.forEach((edit) => {
    let sink: Element | null = null;
    let source: ExtRefSource;
    let sinkIED: Element | null = null;

    const isExtRefUpdate = isUpdate(edit) && edit.element.tagName === "ExtRef";
    const newExtRefInsert =
      isInsert(edit) && (edit.node as Element).tagName === "ExtRef";

    if (isExtRefUpdate) {
      source = {
        iedName: edit.attributes["iedName"] ?? "",
        ldInst: edit.attributes["srcLDInst"] ?? "",
        prefix: edit.attributes["srcPrefix"] ?? "",
        lnClass: edit.attributes["srcLNClass"] ?? "",
        lnInst: edit.attributes["srcLNInst"] ?? "",
        cbName: edit.attributes["srcCBName"] ?? "",
      };
      sink = edit.element;
      sinkIED = sink.closest("IED");
    } else if (newExtRefInsert) {
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
      sinkIED = findIED(edit, edits);
    } else return;

    const controlBlock = findControlBlockBySrcAttributes(
      sink!.ownerDocument,
      source!
    );
    if (!controlBlock) return;
    const controlBlockReference = controlBlockObjRef(controlBlock)!;

    if (!sinkIED) return;
    const iedName = sinkIED.getAttribute("name");

    const id = `${controlBlockReference}-${iedName}`;
    if (!uniqueSupervisions[id])
      uniqueSupervisions[id] = {
        sourceControlBlock: controlBlock,
        subscriberIedOrLn: sinkIED,
      };
  });

  return uniqueSupervisions;
}

/**
 * Insert supervisions triggered by an array of subscribe edits. Subscribe edits
 * are:
 * 1. Update edit with element key being `ExtRef` element
 * 2. Insert edit with node key being `ExtRef` element
 * All other edits are not taking into consideration
 * @param edits - Subscribe edit array
 * @returns Edit array adding supervision on top of the subscription
 */
export function insertSubscriptionSupervisions(
  edits: (Update | Insert)[]
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
