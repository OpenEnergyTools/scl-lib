import { Insert, createElement } from "../foundation/utils.js";
import { getReference } from "../general/getReference.js";

import { uniqueElementName } from "../foundation/uniqueElementName.js";
import { canAddGSEControl } from "./canAddGSEControl.js";
import { createGSE } from "../tGSE/createGSE.js";

/** @returns ConnectedAP element for any given element within an AccessPoint */
function connectedAp(ln0: Element, apName: string | undefined): Element | null {
  const accessPointName =
    apName ?? ln0.closest("AccessPoint")?.getAttribute("name");
  const iedName = ln0.closest("IED")?.getAttribute("name");

  return ln0.ownerDocument.querySelector(
    `:root > Communication > SubNetwork > ConnectedAP[iedName="${iedName}"][apName="${accessPointName}"]`
  );
}

function appId(ln0: Element, cbName: string): string {
  const iedName = ln0.closest("IED")?.getAttribute("name");
  const ldInst = ln0.closest("LDevice")?.getAttribute("inst");
  const prefix = ln0.getAttribute("prefix") ?? "";
  const lnClass = ln0.getAttribute("lnClass");
  const inst = ln0.getAttribute("inst");

  return `${iedName}/${ldInst}/${prefix}${lnClass}${inst}/${cbName}`;
}

function invalidGSEControl(
  ln0: Element,
  name: string | null | undefined,
  datSet: string | null | undefined
): boolean {
  const uniqueName = name
    ? !ln0.querySelector(`:scope > GSEControl[name="${name}"]`)
    : true;

  const validDataSet = datSet
    ? !!ln0.querySelector(`:scope > DataSet[name="${datSet}"]`)
    : true;

  return !(uniqueName && validDataSet && canAddGSEControl(ln0));
}

export type CreateGSEControlOptions = {
  gseControl?: {
    /** `GSEControl` name. Must be unique.
     * When missing a unique name starting with `newGSEControl_xx` is set */
    name?: string;
    desc?: string | null;
    /** Id for the new GSEControl. Default is IED.name/LDevice.inst/LLN0/GSEControl.name */
    appID?: string;
    /** Whether the GSEControl is of type 'GOOSE' or 'GSSE'. Default 'GOOSE' */
    type?: "GOOSE" | "GSSE";
    /** Whether GOOSE is coded with fixed offsets. Default is false */
    fixedOffs?: "true" | "false";
    /** Security option for the GSEControl acc IEC 62132. Defaults to null */
    securityEnable?: "SignatureAndEncryption" | "Signature" | "None" | null;
    /** Reference to an existing `DataSet` */
    datSet?: string | null;
    /**User-defined configuration revision (confRev). Overwrites
     *logic to to set confRev acc. to IEC 61850.*/
    confRev?: string | null;
  };
  gse?: {
    /** The AccessPoint that shall publish the GOOSE. Default the AccessPoint holding the Server element */
    apName?: string;
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
  /** If true, skips check for unique GSEControl name,
   * whether `datSet` is pointing to valid `DataSet`
   * and whether additional GSEControl is allowed in IED/AccessPoint. */
  skipCheck?: boolean;
};

/** Utility function to create schema valid `GSEControl` and `GSE` elements
 * @parent Parent element such as `LN0`, `LDevice`, `AccessPoint` and `IED`
 * @options Configuration for GSEControl/GSE element
 * @returns Edit inserting new `GSEControl` to [[`parent`]] element and when possible
 *          `GSE` to connected `ConnectedAP`
 * */
export function createGSEControl(
  parent: Element,
  options: CreateGSEControlOptions = { gseControl: {}, gse: {} }
): Insert[] {
  const ln0 = parent.tagName === "LN0" ? parent : parent.querySelector("LN0");
  if (!ln0) return [];

  const name = options.gseControl?.name;
  const datSet = options.gseControl?.datSet;

  if (!options.skipCheck && invalidGSEControl(ln0, name, datSet)) return [];

  const attributes: Record<string, string | null> = { ...options.gseControl };

  const cbName = name ? name : uniqueElementName(ln0, "GSEControl");
  if (!options.gseControl?.name) attributes.name = cbName;
  if (!options.gseControl?.confRev) attributes.confRev = "1";
  if (!options.gseControl?.type) attributes.type = "GOOSE";
  if (!options.gseControl?.appID) attributes.appID = appId(ln0, cbName);
  const generatedConfRev = options.gseControl?.datSet ? "1" : "0";
  const userConfRev = options.gseControl?.confRev;
  attributes.confRev = userConfRev ? userConfRev : generatedConfRev;

  const gseControl = createElement(ln0.ownerDocument, "GSEControl", attributes);

  const edits: Insert[] = [];
  edits.push({
    parent: ln0,
    node: gseControl,
    reference: getReference(ln0, "GSEControl"),
  });

  const connAp = connectedAp(ln0, options.gse?.apName);
  if (!connAp) return edits;

  const ldInst = ln0.closest("LDevice")!.getAttribute("inst");
  if (!ldInst || !cbName) return edits;

  const gseCreateOptions = options.gse ?? {};
  delete gseCreateOptions.apName;

  const gseAttrs = { ldInst, cbName };
  const gseEdit = createGSE(connAp, gseAttrs, gseCreateOptions);
  if (gseEdit) edits.push(gseEdit);

  return edits;
}
