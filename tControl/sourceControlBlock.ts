/** @returns control block or null for a given external reference */
export function sourceControlBlock(extRef: Element): Element | null {
  const [iedName, srcLDInst, srcPrefix, srcLNClass, srcLNInst, srcCBName] = [
    "iedName",
    "srcLDInst",
    "srcPrefix",
    "srcLNClass",
    "srcLNInst",
    "srcCBName",
  ].map((attr) => extRef.getAttribute(attr) ?? "");

  return (
    Array.from(
      extRef.ownerDocument.querySelectorAll(
        `IED[name="${iedName}"] ReportControl, 
          IED[name="${iedName}"] GSEControl, 
          IED[name="${iedName}"] SampledValueControl`
      )
    ).find(
      (cBlock) =>
        cBlock.closest("LDevice")!.getAttribute("inst") === srcLDInst &&
        (cBlock.closest("LN, LN0")!.getAttribute("prefix") ?? "") ===
          srcPrefix &&
        cBlock.closest("LN, LN0")!.getAttribute("lnClass") === srcLNClass &&
        cBlock.closest("LN, LN0")!.getAttribute("inst") === srcLNInst &&
        cBlock.getAttribute("name") === srcCBName
    ) ?? null
  );
}
