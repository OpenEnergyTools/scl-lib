import {
  GroupedExtRefs,
  groupPerControlBlock,
  removableSupervisionElement,
} from "./removeSubscriptionSupervision";

/** @returns Whether `DA` with name `setSrcRef` can edited by SCL editor */
function isSrcRefEditable(ctrlBlock: Element, subscriberIed: Element): boolean {
  const supervisionElement = removableSupervisionElement(
    ctrlBlock,
    subscriberIed
  );

  const ln = supervisionElement?.closest("LN") ?? null;
  if (!ln) return false;

  const lnClass = ln.getAttribute("lnClass");
  const cbRefType = lnClass === "LGOS" ? "GoCBRef" : "SvCBRef";

  if (
    ln.querySelector(
      `:scope > DOI[name="${cbRefType}"] > DAI[name="setSrcRef"][valImport="true"][valKind="RO"],` +
        ` :scope > DOI[name="${cbRefType}"] > DAI[name="setSrcRef"][valImport="true"][valKind="Conf"]`
    )
  )
    return true;

  const rootNode = ln.ownerDocument;

  const lnType = ln.getAttribute("lnType");

  const goOrSvCBRef = rootNode.querySelector(
    `DataTypeTemplates > 
          LNodeType[id="${lnType}"][lnClass="${lnClass}"] > DO[name="${cbRefType}"]`
  );

  const cbRefId = goOrSvCBRef?.getAttribute("type");
  const setSrcRef = rootNode.querySelector(
    `DataTypeTemplates > DOType[id="${cbRefId}"] > DA[name="setSrcRef"]`
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
      otherExtRef.getAttribute("serviceType") === serviceType
  );
}

export function cannotRemoveSupervision(extRefGroup: GroupedExtRefs): boolean {
  return (
    isControlBlockSubscribed(extRefGroup.extRefs) ||
    !isSrcRefEditable(extRefGroup.ctrlBlock, extRefGroup.subscriberIed)
  );
}

/**
 * Checks if a group of ExtRefs can have their supervision references removed
 * @param extRefOrExtRefs - An SCL ExtRef element or array of them.
 * @returns true if all supervision references can be removed.
 */
export function canRemoveSubscriptionSupervision(
  extRefOrExtRefs: Element | Element[]
): boolean {
  if (!extRefOrExtRefs) return false;

  const extRefs = Array.isArray(extRefOrExtRefs)
    ? extRefOrExtRefs
    : [extRefOrExtRefs];

  const groupedExtRefs = groupPerControlBlock(extRefs);

  return Object.values(groupedExtRefs).some(
    (extRefGroup) => !cannotRemoveSupervision(extRefGroup)
  );
}
