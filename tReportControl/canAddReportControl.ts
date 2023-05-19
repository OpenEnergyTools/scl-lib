import { maxReportControl } from "../tServices/tConfReportControl/maxReportControl.js";
import { numberReportControlInstances } from "./numberReportControlInstances.js";

/** Checks against `ConfReportControl` attributes `max` and `maxBuf`, whether
 *  new `ReportControl` instances can be added to parent.
 * @param parent - Normally direct parent `LN`, `LN0` or indirect parents
 *                `LDevice`, `AccessPoint` or `IED`
 * @param options.newInstances - How many of the new `ReportControl` instances shall be added
 * @param options.buffered - Whether the `ReportControl` instances are buffered
 * @returns Whether new `ReportControl` instances can be added to parent */
export function canAddReportControl(
  parent: Element,
  options: { buffered: boolean; newInstances?: number } = {
    buffered: true,
    newInstances: 1,
  }
): boolean {
  const { max, maxBuf } = maxReportControl(parent);
  const { bufInstances, unBufInstances } = numberReportControlInstances(parent);

  if (bufInstances + unBufInstances + (options.newInstances ?? 1) > max)
    return false;

  if (options.buffered)
    return (
      (maxBuf === -1 ? max : maxBuf) >=
      bufInstances + (options.newInstances ?? 1)
    );

  const maxUnBuf = maxBuf === -1 ? max : max - maxBuf;

  return maxUnBuf >= unBufInstances + (options.newInstances ?? 1);
}
