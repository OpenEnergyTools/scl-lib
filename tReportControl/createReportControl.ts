import { Insert, createElement } from "../foundation/utils.js";
import { canAddReportControl } from "./canAddReportControl.js";
import { uniqueElementName } from "../foundation/uniqueElementName.js";
import { getReference } from "../tBaseElement/getReference.js";

function invalid(
  anyLn: Element,
  name: string | null | undefined,
  datSet: string | null | undefined,
): boolean {
  const uniqueName = name
    ? !anyLn.querySelector(`:scope > ReportControl[name="${name}"]`)
    : true;

  const validDataSet = datSet
    ? !!anyLn.querySelector(`:scope > DataSet[name="${datSet}"]`)
    : true;

  return !(uniqueName && validDataSet && canAddReportControl(anyLn));
}

export type CreateReportControlOptions = {
  rpt?: {
    /** `ReportControl` name. Must be unique.
     * When missing a unique name starting with `newReportControl_xx` is set */
    name?: string | null;
    desc?: string | null;
    /** Whether the report is buffered or unbuffered */
    buffered?: "true" | "false" | null;
    /** Default "" */
    rptID?: string | null;
    /** Whether the report shall have multiple instances in the IED.
     * When 'false' the attribute 'instances' is reset to '1'*/
    indexed?: "true" | "false" | null;
    /** Minimum time between two reports in (ms) */
    bufTime?: string | null;
    /** Time between two periodical reports in (ms). Is set to '0' when `trgops.period` is `false`*/
    intgPd?: string | null;
    /** Reference to an existing `DataSet` */
    datSet?: string | null;
  };
  trgOps?: {
    /** enable data change trigger */
    dchg?: "true" | "false" | null;
    /** enable quality change trigger */
    qchg?: "true" | "flase" | null;
    /** enable data update trigger */
    dupd?: "true" | "false" | null;
    /** enable periodic report */
    period?: "true" | "false" | null;
    /** allow report trigger on general interrogation */
    gi?: "true" | "false" | null;
  };
  optFields?: {
    /** pack sequence number into the report */
    seqNum?: "true" | "false" | null;
    /** pack time stamp into the report */
    timeStamp?: "true" | "false" | null;
    /** pack reason code into the report */
    reasonCode?: "true" | "false" | null;
    /** pack data references into the report */
    dataRef?: "true" | "false" | null;
    /** pack entry ID into the report */
    entryID?: "true" | "false" | null;
    /** pack configuration revision into the report */
    configRef?: "true" | "false" | null;
    /** pack buffer overflow indicator into the report */
    bufOvfl?: "true" | "false" | null;
  };
  /**User-defined configuration revision (confRev) overwrites
   *logic to to set confRev acc. to IEC 61850.*/
  confRev?: string;
  /** How many instances the new `ReportControl` element shall have
   * in the IED. Defaults to 1 */
  instances?: string;
  /** If true, skips check for unique report control name,
   * whether `datSet` is pointing to valid `DataSet`
   * and whether additional new report instances are allowed in IED/AccessPoint. */
  skipCheck?: boolean;
};

/** Function processing `ReportControl` creation. Returns `null`, if new `ReportControl` cannot
 * be added to [[`parent`]].
 * @param parent - Direct parent `LN`, `LN0` or indirect parents
 *                `LDevice`, `AccessPoint` or `IED`. In the later case first `LN0` is picked.
 * @param options - Configuration options.
 * @returns edit inserting `ReportControl` to [[`parent`]] element or `null`
 * */
export function createReportControl(
  parent: Element,
  options: CreateReportControlOptions = { rpt: {}, trgOps: {}, optFields: {} },
): Insert | null {
  const anyLn =
    parent.tagName === "LN0" || parent.tagName === "LN"
      ? parent
      : parent.querySelector("LN0, LN");
  if (!anyLn) return null;

  if (
    !options.skipCheck &&
    invalid(anyLn, options.rpt?.name, options.rpt?.datSet)
  )
    return null;

  const rptAttrs: Record<string, string | null> = { ...options.rpt };
  const trgOpsAttrs: Record<string, string | null> = { ...options.trgOps };
  const optFieldsAttrs: Record<string, string | null> = {
    ...options.optFields,
  };

  if (!options.rpt?.name)
    rptAttrs.name = uniqueElementName(anyLn, "ReportControl");
  if (!options.rpt?.buffered) rptAttrs.buffered = "true";
  if (!options.rpt?.rptID) rptAttrs.rptID = "";
  if (!options.rpt?.bufTime) rptAttrs.bufTime = "100";
  if (options.trgOps?.period === "true" && !options.rpt?.intgPd)
    rptAttrs.intgPd = "1000";
  const confRev = options.confRev
    ? options.confRev
    : rptAttrs.datSet
      ? "1"
      : "0";

  if (
    options.rpt?.intgPd &&
    options.rpt?.intgPd !== "0" &&
    (!options.trgOps?.period || options.trgOps.period === "false")
  )
    trgOpsAttrs.period = "true";

  const reportControl = createElement(anyLn.ownerDocument, "ReportControl", {
    ...rptAttrs,
    confRev,
  });

  if (Object.keys(trgOpsAttrs).length) {
    const trgOps = createElement(anyLn.ownerDocument, "TrgOps", trgOpsAttrs);

    reportControl.insertBefore(trgOps, null);
  }

  if (Object.keys(optFieldsAttrs).length) {
    const optFields = createElement(
      anyLn.ownerDocument,
      "OptFields",
      optFieldsAttrs,
    );

    reportControl.insertBefore(optFields, null);
  }

  if (options.instances) {
    const rptEnabled = createElement(anyLn.ownerDocument, "RptEnabled", {
      max: options.instances,
    });
    reportControl.insertBefore(rptEnabled, null);
  }

  return {
    parent: anyLn,
    node: reportControl,
    reference: getReference(anyLn, "ReportControl"),
  };
}
