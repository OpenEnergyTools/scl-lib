/** @returns object reference acc. IEC 61850-7-3 for control block elements */
export function controlBlockObjRef(ctrlBlock: Element): string | null {
  const iedName = ctrlBlock.closest("IED")?.getAttribute("name");
  const ldInst = ctrlBlock.closest("LDevice")?.getAttribute("inst");

  const parentLn = ctrlBlock.closest("LN,LN0");

  const prefix = parentLn?.getAttribute("prefix") ?? "";
  const lnClass = parentLn?.getAttribute("lnClass");
  const lnInst = parentLn?.getAttribute("inst") ?? "";

  const cbName = ctrlBlock.getAttribute("name");
  if (!iedName || !ldInst || !lnClass || !cbName) return null;

  return `${iedName}${ldInst}/${prefix}${lnClass}${lnInst}.${cbName}`;
}
