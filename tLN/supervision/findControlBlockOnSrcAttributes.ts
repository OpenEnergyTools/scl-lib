export type ExtRefSource = {
  iedName: string;
  ldInst: string;
  prefix: string;
  lnClass: string;
  lnInst: string;
  cbName: string;
};

/** @returns control block or null for a set of ExtRef attributes */
export function findControlBlockBySrcAttributes(
  doc: XMLDocument,
  extRefSrc: ExtRefSource,
): Element | null {
  return (
    Array.from(
      doc.querySelectorAll(
        `:root > IED[name="${extRefSrc.iedName}"] ReportControl, 
            :root > IED[name="${extRefSrc.iedName}"] GSEControl, 
            :root > IED[name="${extRefSrc.iedName}"] SampledValueControl`,
      ),
    ).find(
      (cBlock) =>
        cBlock.closest("LDevice")!.getAttribute("inst") === extRefSrc.ldInst &&
        (cBlock.closest("LN, LN0")!.getAttribute("prefix") ?? "") ===
          extRefSrc.prefix &&
        cBlock.closest("LN, LN0")!.getAttribute("lnClass") ===
          extRefSrc.lnClass &&
        cBlock.closest("LN, LN0")!.getAttribute("inst") === extRefSrc.lnInst &&
        cBlock.getAttribute("name") === extRefSrc.cbName,
    ) ?? null
  );
}
