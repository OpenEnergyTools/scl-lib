/** @returns ConnectedAP element for LN0 within AccessPoint */
export function connectedAp(
  ln0: Element,
  apName: string | undefined,
): Element | null {
  const accessPointName =
    apName ?? ln0.closest("AccessPoint")?.getAttribute("name");
  const iedName = ln0.closest("IED")?.getAttribute("name");

  return ln0.ownerDocument.querySelector(
    `:root > Communication > SubNetwork > ConnectedAP[iedName="${iedName}"][apName="${accessPointName}"]`,
  );
}
