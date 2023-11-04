import { Insert, createElement } from "../foundation/utils.js";
import { getReference } from "../tBaseElement/getReference.js";

import { uniqueElementName } from "../foundation/uniqueElementName.js";

import { connectedAp } from "../tControlWithIEDName/connctedAp.js";
import { createSMV } from "../tSMV/createSMV.js";
import { pathId } from "../tControl/pathId.js";

import { canAddSampledValueControl } from "../tSampledValueControl/canAddSampledValueControl.js";

function invalidSampledValueControl(
  ln0: Element,
  name: string | null | undefined,
  datSet: string | null | undefined
): boolean {
  const uniqueName = name
    ? !ln0.querySelector(`:scope > SampledValueControl[name="${name}"]`)
    : true;

  const validDataSet = datSet
    ? !!ln0.querySelector(`:scope > DataSet[name="${datSet}"]`)
    : true;

  return !(uniqueName && validDataSet && canAddSampledValueControl(ln0));
}

export type CreateSampledValueControlOptions = {
  smvControl?: {
    /** `SampledValueControl` name. Must be unique.
     * When missing a unique name starting with `newSampledValueControl_xx` is set */
    name?: string;
    desc?: string;
    /** Id for the new SampledValueControl. Default is IED.name/LDevice.inst/LLN0/SampledValueControl.name */
    smvID?: string;
    /** Whether the SampledValueControl is multicast. Set to true if missing */
    multicast?: "true" | "false";
    /** The sample rate of the sampled value stream. Set to '80' is missing */
    smpRate?: string;
    /** How many samples are packed into one ethernet packet. Set to '1' if missing */
    nofASDU?: string;
    /** The sample mode of the sample value stream */
    smpMod?: "SmpPerPeriod" | "SmpPerSec" | "SecPerSmp";
    /** The security setting of the sample value stream */
    securityEnable?: "None" | "Signature" | "SignatureAndEncryption";
    /** Reference to an existing `DataSet` */
    datSet?: string | null;
    /**User-defined configuration revision (confRev). Overwrites
     *logic to to set confRev acc. to IEC 61850.*/
    confRev?: string | null;
  };
  smvOpts?: {
    /** Whether refresh time is part if the SV stream. Defaults to false. */
    refreshTime?: "true" | "false";
    /** Whether synchronized setting is part if the SV stream. Defaults to true. */
    sampleSynchronized?: "true" | "false";
    /** Whether sampled rate is part if the SV stream. Defaults to false. */
    sampleRate?: "true" | "false";
    /** Whether dataSet reference is part if the SV stream. Defaults to false. */
    dataSet?: "true" | "false";
    /** Whether security setting is part if the SV stream. Defaults to false. */
    security?: "true" | "false";
    /** Whether refresh time is part if the SV stream. Defaults to false. */
    timestamp?: "true" | "false";
    /** Whether sync source ID is part if the SV stream. Defaults to false. */
    synchSourceId?: "true" | "false";
  };
  smv?: {
    /** The AccessPoint that shall publish the sampled value stream.
     *  Default the AccessPoint holding the Server element */
    apName?: string;
    /** MAC-Address within `P` element in the `SMV` element */
    mac?: string;
    /** APPID within `P` element in the `SMV` element */
    appId?: string;
    /** VLAN-ID within `P` element in the `SMV` element */
    vlanId?: string;
    /** VLAN-PRIORITY within `P` element in the `SMV` element */
    vlanPriority?: string;
  };
  /** If true, skips check for unique SampledValueControl name,
   * whether `datSet` is pointing to valid `DataSet`
   * and whether additional SampledValueControl is allowed in IED/AccessPoint. */
  skipCheck?: boolean;
};

/** Utility function to create schema valid `SampledValueControl` and `SMV` elements
 * @parent Parent element such as `LN0`, `LDevice`, `AccessPoint` and `IED`
 * @options Configuration for SampledValueControl/SMV element
 * @returns Edit inserting new `SampledValueControl` to [[`parent`]] element and when possible
 *          `SMV` to connected `ConnectedAP`
 * */
export function createSampledValueControl(
  parent: Element,
  options: CreateSampledValueControlOptions = {
    smvControl: {},
    smv: {},
  }
): Insert[] {
  const ln0 = parent.tagName === "LN0" ? parent : parent.querySelector("LN0");
  if (!ln0) return [];

  const name = options.smvControl?.name;
  const datSet = options.smvControl?.datSet;

  if (!options.skipCheck && invalidSampledValueControl(ln0, name, datSet))
    return [];

  const attributes: Record<string, string | null> = { ...options.smvControl };

  const cbName = name ? name : uniqueElementName(ln0, "SampledValueControl");
  if (!options.smvControl?.name) attributes.name = cbName;
  if (!options.smvControl?.multicast) attributes.multicast = "true";
  if (!options.smvControl?.smpRate) attributes.smpRate = "80";
  if (!options.smvControl?.nofASDU) attributes.nofASDU = "1";
  if (!options.smvControl?.smpMod) attributes.smpMod = "SmpPerPeriod";
  if (!options.smvControl?.smvID) attributes.smvID = pathId(ln0, cbName);
  const generatedConfRev = options.smvControl?.datSet ? "1" : "0";
  const userConfRev = options.smvControl?.confRev;
  attributes.confRev = userConfRev ? userConfRev : generatedConfRev;

  const smvControl = createElement(
    ln0.ownerDocument,
    "SampledValueControl",
    attributes
  );

  const smvOpts = createElement(
    ln0.ownerDocument,
    "SmvOpts",
    options.smvOpts ?? {}
  );
  smvControl.appendChild(smvOpts);

  const edits: Insert[] = [];
  edits.push({
    parent: ln0,
    node: smvControl,
    reference: getReference(ln0, "SampledValueControl"),
  });

  const connAp = connectedAp(ln0, options.smv?.apName);
  if (!connAp) return edits;

  const ldInst = ln0.closest("LDevice")!.getAttribute("inst");
  if (!ldInst || !cbName) return edits;

  const smvCreateOptions = options.smv ?? {};
  delete smvCreateOptions.apName;

  const smvAttrs = { ldInst, cbName };
  const smvEdit = createSMV(connAp, smvAttrs, smvCreateOptions);
  if (smvEdit) edits.push(smvEdit);

  return edits;
}
