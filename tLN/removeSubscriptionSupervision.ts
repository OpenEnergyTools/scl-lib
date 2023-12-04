import { Remove } from "../foundation/utils.js";

import { controlBlockObjRef } from "../tControl/controlBlockObjRef.js";
import { sourceControlBlock } from "../tExtRef/sourceControlBlock.js";

type GroupedExtRefs = {
  extRefs: Element[];
  ctrlBlock: Element;
  subscriberIed: Element;
};

/** @returns Element to remove the subscription supervision */
function removableSupervisionElement(
  ctrlBlock: Element,
  subscriberIed: Element,
): Element | null {
  const supervisionType = ctrlBlock.tagName === "GSEControl" ? "LGOS" : "LSVS";

  const valElement = Array.from(
    subscriberIed.querySelectorAll(
      `LN[lnClass="${supervisionType}"] > DOI > DAI > Val`,
    ),
  ).find((val) => val.textContent === controlBlockObjRef(ctrlBlock));
  if (!valElement) return null;

  const ln = valElement.closest("LN")!;
  const doi = valElement.closest("DOI")!;

  // do not remove logical nodes `LGOS`, `LSVS` unless privately tagged
  const canRemoveLn = ln.querySelector(
    ':scope > Private[type="OpenSCD.create"]',
  );

  return canRemoveLn ? ln : doi;
}

/** @returns Whether `DA` with name `setSrcRef`  can edited by SCL editor */
function isSrcRefEditable(ctrlBlock: Element, subscriberIed: Element): boolean {
  const supervisionElement = removableSupervisionElement(
    ctrlBlock,
    subscriberIed,
  );
  const ln = supervisionElement?.closest("LN") ?? null;
  if (!ln) return false;

  if (
    supervisionElement?.querySelector(
      ':scope DAI[name="setSrcRef"][valImport="true"][valKind="RO"],' +
        ' :scope DAI[name="setSrcRef"][valImport="true"][valKind="Conf"]',
    )
  )
    return true;

  const rootNode = ln.ownerDocument;

  const lnClass = ln.getAttribute("lnClass");
  const cbRefType = lnClass === "LGOS" ? "GoCBRef" : "SvCBRef";
  const lnType = ln.getAttribute("lnType");

  const goOrSvCBRef = rootNode.querySelector(
    `DataTypeTemplates > 
        LNodeType[id="${lnType}"][lnClass="${lnClass}"] > DO[name="${cbRefType}"]`,
  );

  const cbRefId = goOrSvCBRef?.getAttribute("type");
  const setSrcRef = rootNode.querySelector(
    `DataTypeTemplates > DOType[id="${cbRefId}"] > DA[name="setSrcRef"]`,
  );

  return (
    (setSrcRef?.getAttribute("valKind") === "Conf" ||
      setSrcRef?.getAttribute("valKind") === "RO") &&
    setSrcRef.getAttribute("valImport") === "true"
  );
}

/** @returns Whether other subscribed ExtRef of the same control block exist */
function isControlBlockSubscribed(extRefs: Element[]): boolean {
  const [
    srcCBName,
    srcLDInst,
    srcLNClass,
    iedName,
    srcPrefix,
    srcLNInst,
    serviceType,
  ] = [
    "srcCBName",
    "srcLDInst",
    "srcLNClass",
    "iedName",
    "srcPrefix",
    "srcLNInst",
    "serviceType",
  ].map((attr) => extRefs[0].getAttribute(attr));

  const parentIed = extRefs[0].closest("IED");
  return Array.from(parentIed!.getElementsByTagName("ExtRef")).some(
    (otherExtRef) =>
      !extRefs.includes(otherExtRef) &&
      (otherExtRef.getAttribute("srcPrefix") ?? "") === (srcPrefix ?? "") &&
      (otherExtRef.getAttribute("srcLNInst") ?? "") === (srcLNInst ?? "") &&
      otherExtRef.getAttribute("srcCBName") === srcCBName &&
      otherExtRef.getAttribute("srcLDInst") === srcLDInst &&
      otherExtRef.getAttribute("srcLNClass") === srcLNClass &&
      otherExtRef.getAttribute("iedName") === iedName &&
      otherExtRef.getAttribute("serviceType") === serviceType,
  );
}

function cannotRemoveSupervision(extRefGroup: GroupedExtRefs): boolean {
  return (
    isControlBlockSubscribed(extRefGroup.extRefs) ||
    !isSrcRefEditable(extRefGroup.ctrlBlock, extRefGroup.subscriberIed)
  );
}

function groupPerControlBlock(
  extRefs: Element[],
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
 * @returns edits to remove subscription supervision `LGOS` or `LSVS`
 */
export function removeSubscriptionSupervision(extRefs: Element[]): Remove[] {
  if (extRefs.length === 0) return [];

  const groupedExtRefs = groupPerControlBlock(extRefs);

  return (
    Object.values(groupedExtRefs)
      .map((extRefGroup) => {
        if (cannotRemoveSupervision(extRefGroup)) return null;

        return removableSupervisionElement(
          extRefGroup.ctrlBlock,
          extRefGroup.subscriberIed,
        )!;
      })
      .filter((element) => element) as Element[]
  ).map((node) => ({ node }));
}
