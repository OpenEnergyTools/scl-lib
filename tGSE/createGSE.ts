import { Insert, createElement } from "../foundation/utils.js";
import { macAddressGenerator } from "../generator/macAddressGenerator.js";
import { appIdGenerator } from "../generator/appIdGenerator.js";
import { getReference } from "../general/getReference.js";

export type CreateGSEOptions = {
  /** MAC-Address within `P` element in the `GSE` element */
  mac?: string;
  /** APPID within `P` element in the `GSE` element */
  appId?: string;
  /** VLAN-ID within `P` element in the `GSE` element */
  vlanId?: string;
  /** VLAN-PRIORITY within `P` element in the `GSE` element */
  vlanPriority?: string;
  /** MaxTime element within `GSE` element */
  MaxTime?: string;
  /** MinTime element within `GSE` element */
  MinTime?: string;
};

/** @returns Edit inserting new `GSE` to [[`parent`]] ConnectedAP element */
export function createGSE(
  parent: Element,
  attributes: { ldInst: string; cbName: string },
  options: CreateGSEOptions = {}
): Insert | null {
  if (parent.tagName !== "ConnectedAP") return null;

  const doc = parent.ownerDocument;

  const gSE = createElement(doc, "GSE", attributes);

  const address = createElement(doc, "Address", {});
  gSE.appendChild(address);

  const pTypes: Record<string, string | undefined> = {};
  pTypes["MAC-Address"] = options.mac ?? macAddressGenerator(doc, "GSE")()!;
  pTypes.APPID = options.appId ?? appIdGenerator(doc, "GSE")()!;
  pTypes["VLAN-ID"] = options.vlanId ?? "000";
  pTypes["VLAN-PRIORITY"] = options.vlanPriority ?? "4";
  Object.entries(pTypes)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== undefined)
    .forEach(([type, value]) => {
      const child = createElement(doc, "P", { type });
      child.textContent = value!;

      address.appendChild(child);
    });

  const newMinTime = createElement(doc, "MinTime", {
    unit: "s",
    multiplier: "m",
  });
  newMinTime.textContent = options.MinTime ?? "10";
  gSE.appendChild(newMinTime);

  const newMaxTime = createElement(doc, "MaxTime", {
    unit: "s",
    multiplier: "m",
  });
  newMaxTime.textContent = options.MaxTime ?? "10000";
  gSE.appendChild(newMaxTime);

  return {
    parent,
    node: gSE,
    reference: getReference(parent, "GSE"),
  };
}
