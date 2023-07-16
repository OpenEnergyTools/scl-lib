import { Insert, Remove } from "../foundation/utils.js";

import { controlBlockObjRef } from "../tControl/controlBlockObjRef.js";
import { sourceControlBlock } from "../tControl/sourceControlBlock.js";

import { cannotRemoveSupervision } from "./canRemoveSubscriptionSupervision.js";

export type GroupedExtRefs = {
  extRefs: Element[];
  ctrlBlock: Element;
  subscriberIed: Element;
};

/** @returns Element to remove the subscription supervision */
export function removableSupervisionElement(
  ctrlBlock: Element,
  subscriberIed: Element,
  removeLN?: boolean
): Element | null {
  const supervisionType = ctrlBlock.tagName === "GSEControl" ? "LGOS" : "LSVS";
  const doiRef = ctrlBlock.tagName === "GSEControl" ? "GoCBRef" : "SvCBRef";

  const supervisionInstances = Array.from(
    subscriberIed.querySelectorAll(
      `LN[lnClass="${supervisionType}"] > DOI[name="${doiRef}"] > DAI[name="setSrcRef"] > Val`
    )
  );
  const valElement = supervisionInstances.find(
    (val) => val.textContent === controlBlockObjRef(ctrlBlock)
  );
  if (!valElement) return null;

  const ln = valElement.closest("LN")!;
  const firstSupLn = supervisionInstances[0]?.closest("LN");

  return removeLN && ln !== firstSupLn ? ln : valElement;
}

export function groupPerControlBlock(
  extRefs: Element[]
): Record<string, GroupedExtRefs> {
  const groupedExtRefs: Record<string, GroupedExtRefs> = {};
  extRefs.forEach((extRef) => {
    const ctrlBlock = sourceControlBlock(extRef);
    if (ctrlBlock) {
      const ctrlBlockRef = controlBlockObjRef(ctrlBlock)!;
      if (groupedExtRefs[ctrlBlockRef])
        groupedExtRefs[ctrlBlockRef].extRefs.push(extRef);
      else
        groupedExtRefs[ctrlBlockRef] = {
          extRefs: [extRef],
          ctrlBlock,
          subscriberIed: extRef.closest("IED")!,
        };
    }
  });

  return groupedExtRefs;
}

/** Removes subscription supervision - `LGOS` or `LSVS` - when no other data
 * of a given `GSEControl` or `SampledValueControl`
 * @param extRefs - An array of external reference elements
 * @returns Actions to remove subscription supervision `LGOS` or `LSVS`
 */
export function removeSubscriptionSupervision(
  extRefOrExtRefs: Element | Element[],
  options?: { removeLN: boolean }
): (Remove | Insert)[] {
  if (
    !extRefOrExtRefs ||
    (Array.isArray(extRefOrExtRefs) && extRefOrExtRefs.length === 0)
  )
    return [];

  const extRefs = Array.isArray(extRefOrExtRefs)
    ? extRefOrExtRefs
    : [extRefOrExtRefs];

  const groupedExtRefs = groupPerControlBlock(extRefs);

  return (
    Object.values(groupedExtRefs)
      .map((extRefGroup) => {
        if (cannotRemoveSupervision(extRefGroup)) return null;
        return removableSupervisionElement(
          extRefGroup.ctrlBlock,
          extRefGroup.subscriberIed,
          options?.removeLN ?? false
        )!;
      })
      .filter((element) => element) as Element[]
  ).flatMap((node) => {
    if (node.tagName === "Val") {
      // copy existing node and set textContent to empty
      const newValElement = <Element>node.cloneNode(true);
      newValElement.textContent = "";
      return [
        { node },
        {
          parent: node.parentElement!,
          reference: null,
          node: newValElement,
        },
      ];
    } else {
      return { node };
    }
  });
}
