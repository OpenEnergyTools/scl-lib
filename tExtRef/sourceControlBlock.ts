import { crossProduct } from "../foundation/utils";

/**
 * Locates control block from an ExtRef element.
 * NOTE: Only supports > Edition 2 using the srcXXX attributes.
 * @param extRef - SCL ExtRef element.
 * @returns Either ReportControl/GSEControl/SampledValueControl or null
 * if not found.
 */
export function sourceControlBlock(extRef: Element): Element | null {
  const [iedName, srcPrefix, srcLNInst, srcCBName] = [
    "iedName",
    "srcPrefix",
    "srcLNInst",
    "srcCBName",
  ].map((attr) => extRef.getAttribute(attr));

  const doc = extRef.ownerDocument;
  const srcLDInst =
    extRef.getAttribute("srcLDInst") ?? extRef.getAttribute("ldInst");
  const srcLNClass = extRef.getAttribute("srcLNClass") ?? "LLN0";
  const serviceType =
    extRef.getAttribute("serviceType") ?? extRef.getAttribute("pServT");

  if (!iedName || !srcLDInst || !srcCBName || serviceType === "Poll")
    return null;

  const lDevice = `:root > IED[name="${iedName}"] > AccessPoint > Server > LDevice[inst="${srcLDInst}"]`;

  const maybeReport = !serviceType || serviceType === "Report";
  const maybeGSE = !serviceType || serviceType === "GOOSE";
  const maybeSMV = !serviceType || serviceType === "SMV";

  const anyLN = srcLNClass === "LLN0" ? "LN0" : "LN";

  const lnClass = `[lnClass="${srcLNClass}"]`;

  let lnPrefixQualifiers;

  if (anyLN === "LN") {
    lnPrefixQualifiers =
      srcPrefix && srcPrefix !== ""
        ? [`[prefix="${srcPrefix}"]`]
        : [":not([prefix])", '[prefix=""]'];
  } else {
    lnPrefixQualifiers = [":not([prefix])"];
  }

  // On LN0 srcLNInst missing on the ExtRef means an inst=""
  // On LN inst must be a non-empty string and so srcLNInst
  // must also be a non-empty string and be present
  const lnInst =
    anyLN !== "LN0" && srcLNInst ? `[inst="${srcLNInst}"]` : '[inst=""]';

  const cbName = `[name="${srcCBName}"]`;

  const cbTypes = [
    maybeReport ? `ReportControl${cbName}` : null,
    maybeGSE ? `GSEControl${cbName}` : null,
    maybeSMV ? `SampledValueControl${cbName}` : null,
  ].filter((s): s is string => !!s);

  return doc.querySelector(
    crossProduct(
      [`${lDevice}>${anyLN}${lnClass}${lnInst}`],
      lnPrefixQualifiers,
      [">"],
      cbTypes,
    )
      .map((strings) => strings.join(""))
      .join(","),
  );
}
