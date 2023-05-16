const serviceType: Partial<Record<string, string>> = {
  GSEControl: "GOOSE",
  SampledValueControl: "SMV",
  ReportControl: "Report",
};

/** @returns Whether src... type ExtRef attributes match Control element*/
export function matchSrcAttributes(extRef: Element, control: Element): boolean {
  const cbName = control.getAttribute("name");
  const srcLDInst = control.closest("LDevice")?.getAttribute("inst");
  const srcPrefix = control.closest("LN0, LN")?.getAttribute("prefix") ?? "";
  const srcLNClass = control.closest("LN0, LN")?.getAttribute("lnClass");
  const srcLNInst = control.closest("LN0, LN")?.getAttribute("inst");

  return (
    extRef.getAttribute("srcCBName") === cbName &&
    extRef.getAttribute("srcLDInst") === srcLDInst &&
    (extRef.getAttribute("srcPrefix") ?? "") === srcPrefix &&
    (extRef.getAttribute("srcLNInst") ?? "") === srcLNInst &&
    extRef.getAttribute("srcLNClass") === srcLNClass &&
    extRef.getAttribute("serviceType") === serviceType[control.tagName]
  );
}
