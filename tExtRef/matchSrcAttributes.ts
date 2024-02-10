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

  const extRefSrcLNClass = extRef.getAttribute("srcLNClass");
  const srcLnClassCheck =
    !extRefSrcLNClass || extRefSrcLNClass === ""
      ? "LLN0" === srcLNClass
      : extRefSrcLNClass === srcLNClass;

  const extRefSrcLDInst = extRef.getAttribute("srcLDInst");
  const srcLdInstCheck =
    !extRefSrcLDInst || extRefSrcLDInst === ""
      ? extRef.getAttribute("ldInst") === srcLDInst
      : extRefSrcLDInst === srcLDInst;

  return (
    extRef.getAttribute("srcCBName") === cbName &&
    srcLdInstCheck &&
    (extRef.getAttribute("srcPrefix") ?? "") === srcPrefix &&
    (extRef.getAttribute("srcLNInst") ?? "") === srcLNInst &&
    srcLnClassCheck &&
    extRef.getAttribute("serviceType") === serviceType[control.tagName]
  );
}
