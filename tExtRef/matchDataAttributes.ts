/** @returns Whether a ExtRef to FCDA reference match */
export function matchDataAttributes(extRef: Element, fcda: Element): boolean {
  return (
    extRef.getAttribute("ldInst") === fcda.getAttribute("ldInst") &&
    (extRef.getAttribute("prefix") ?? "") ===
      (fcda.getAttribute("prefix") ?? "") &&
    extRef.getAttribute("lnClass") === fcda.getAttribute("lnClass") &&
    (extRef.getAttribute("lnInst") ?? "") ===
      (fcda.getAttribute("lnInst") ?? "") &&
    extRef.getAttribute("doName") === fcda.getAttribute("doName") &&
    (extRef.getAttribute("daName") ?? "") ===
      (fcda.getAttribute("daName") ?? "")
  );
}
