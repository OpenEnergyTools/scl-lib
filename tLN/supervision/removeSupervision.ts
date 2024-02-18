import { Remove } from "../../foundation/utils.js";
import { isSrcRefEditable } from "./foundation.js";

export type removeSupervisionOptions = {
  removeSupervisionLn: boolean;
  checkSubscription: boolean;
};

/** @returns Whether other subscribed ExtRef of the same control block exist */
function isControlBlockSubscribed(supervisionLn: Element): boolean {
  const controlObjRef = supervisionLn.querySelector(
    `:scope > DOI[name="GoCBRef"] > DAI[name="setSrcRef"] > Val, 
    :scope > DOI[name="SvCBRef"] > DAI[name="setSrcRef"] > Val`,
  )?.textContent;

  const extRefs = Array.from(
    supervisionLn.closest("IED")!.querySelectorAll(
      `:scope > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef, 
      :scope > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef`,
    ),
  );

  return extRefs.some((extRef) => {
    const [srcCBName, srcLDInst, iedName] = [
      "srcCBName",
      "srcLDInst",
      "iedName",
    ].map((attr) => extRef.getAttribute(attr));

    return controlObjRef === `${iedName}${srcLDInst}/LLN0.${srcCBName}`;
  });
}

export function canRemoveSupervision(
  supervisionLn: Element,
  options: removeSupervisionOptions,
): boolean {
  if (!isSrcRefEditable(supervisionLn)) return false;

  if (options.checkSubscription && isControlBlockSubscribed(supervisionLn))
    return false;

  return true;
}

export function removeSupervision(
  supervisionLn: Element,
  options: removeSupervisionOptions = {
    removeSupervisionLn: false,
    checkSubscription: true,
  },
): Remove | null {
  if (!canRemoveSupervision(supervisionLn, options)) return null;

  if (options.removeSupervisionLn) return { node: supervisionLn };

  const val = supervisionLn.querySelector(
    `:scope > DOI[name="GoCBRef"] > DAI[name="setSrcRef"] > Val, 
    :scope > DOI[name="SvCBRef"] > DAI[name="setSrcRef"] > Val`,
  );
  if (!val) return null;

  const node = Array.from(val.childNodes).find(
    (childNode) => childNode.nodeType === Node.TEXT_NODE,
  )!;

  return { node };
}
