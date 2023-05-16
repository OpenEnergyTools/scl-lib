import { Update } from "../foundation/utils.js";

import { findControlBlockSubscription } from "../tControl/findControlSubscription.js";
import { updatedConfRev } from "../tControl/updateConfRev.js";

/** Updates `ReportControl` attributes and cross-referenced elements
 * @param update - update action on `ReportControl` attributes
 * @returns Completed update action array */
export function updateReportControl(update: Update): Update[] {
  if (update.element.tagName !== "ReportControl") return [];

  const reportControl = update.element;
  const attributes = update.attributes;

  const confRev = updatedConfRev(reportControl); // +10000 for update
  const attrs = { ...attributes, confRev };

  const ctrlBlockUpdates: Update[] = [
    { element: reportControl, attributes: attrs },
  ];
  if (!attributes.name) return ctrlBlockUpdates;

  const extRefUpdates: Update[] = findControlBlockSubscription(
    reportControl
  ).map((extRef) => ({
    element: extRef,
    attributes: { srcCBName: attributes.name },
  }));

  return ctrlBlockUpdates.concat(extRefUpdates);
}
