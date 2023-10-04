import { crossProduct } from "../foundation/utils";

/**
 * Looks up Communication section GSE or SMV addresses based on the control block
 * within the IED section (GSEControl or SampledValueControl).
 * @param ctrlBlock - SCL control block element (GSEControl or SampledValueControl)
 * @returns SCL GSE or SMV address element or null if not found.
 */
export function controlBlockGseOrSmv(ctrlBlock: Element): Element | null {
  const doc = ctrlBlock.ownerDocument;

  const ctrlLdInst = ctrlBlock.closest("LDevice")?.getAttribute("inst");
  const ied = ctrlBlock.closest("IED");
  const addressTag = ctrlBlock.tagName === "GSEControl" ? "GSE" : "SMV";

  const apName = ctrlBlock.closest("AccessPoint")?.getAttribute("name");

  if (!ctrlLdInst || !ied || !apName) return null;

  const serverAts = Array.from(
    ied.querySelectorAll(`AccessPoint > ServerAt[apName="${apName}"`)
  ).map((ap) => ap.closest("AccessPoint")!.getAttribute("name"));

  const iedName = ied.getAttribute("name");
  const connectedAps = `:root > Communication > SubNetwork > ConnectedAP[iedName="${iedName}"]`;
  const connectedApNames = [apName, ...serverAts].map(
    (ap) => `[apName="${ap}"]`
  );
  const cbName = ctrlBlock.getAttribute("name");
  const addressElement = `${addressTag}[ldInst="${ctrlLdInst}"][cbName="${cbName}"]`;

  return doc.querySelector(
    crossProduct([connectedAps], connectedApNames, [">"], [addressElement])
      .map((strings) => strings.join(""))
      .join(",")
  );
}
