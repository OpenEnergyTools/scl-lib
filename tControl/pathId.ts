export function pathId(ln0: Element, cbName: string): string {
  const iedName = ln0.closest("IED")?.getAttribute("name");
  const ldInst = ln0.closest("LDevice")?.getAttribute("inst");
  const prefix = ln0.getAttribute("prefix") ?? "";
  const lnClass = ln0.getAttribute("lnClass");
  const inst = ln0.getAttribute("inst");

  return `${iedName}/${ldInst}/${prefix}${lnClass}${inst}/${cbName}`;
}
