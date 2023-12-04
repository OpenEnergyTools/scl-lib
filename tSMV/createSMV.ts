import { Insert, createElement } from "../foundation/utils.js";
import { macAddressGenerator } from "../generator/macAddressGenerator.js";
import { appIdGenerator } from "../generator/appIdGenerator.js";
import { getReference } from "../tBaseElement/getReference.js";

export type CreateSMVOptions = {
  /** MAC-Address within `P` element in the `SMV` element */
  mac?: string;
  /** APPID within `P` element in the `SMV` element */
  appId?: string;
  /** VLAN-ID within `P` element in the `SMV` element */
  vlanId?: string;
  /** VLAN-PRIORITY within `P` element in the `SMV` element */
  vlanPriority?: string;
};

/** @returns Edit inserting new `SMV` to [[`parent`]] ConnectedAP element */
export function createSMV(
  parent: Element,
  attributes: { ldInst: string; cbName: string },
  options: CreateSMVOptions = {},
): Insert | null {
  if (parent.tagName !== "ConnectedAP") return null;

  const doc = parent.ownerDocument;

  const gSE = createElement(doc, "SMV", attributes);

  const address = createElement(doc, "Address", {});
  gSE.appendChild(address);

  const pTypes: Record<string, string | undefined> = {};
  pTypes["MAC-Address"] = options.mac ?? macAddressGenerator(doc, "SMV")()!;
  pTypes.APPID = options.appId ?? appIdGenerator(doc, "SMV")()!;
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

  return {
    parent,
    node: gSE,
    reference: getReference(parent, "SMV"),
  };
}
