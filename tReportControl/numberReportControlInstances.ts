function maxRptEnabled(reportControl: Element): number {
  return parseInt(
    reportControl.querySelector(":scope > RptEnabled")?.getAttribute("max") ??
      "1",
    10
  );
}

function sumReportControlInstances(
  root: XMLDocument | Element,
  buffered = true
): number {
  const selector = buffered
    ? `ReportControl[buffered="true"]`
    : `ReportControl:not([buffered]), ReportControl[buffered="false"]`;
  return Array.from(root.querySelectorAll(selector))
    .map((reportControl) => maxRptEnabled(reportControl))
    .reduce((a, b) => a + b, 0);
}

/** @return Number of `ReportControl` elements within [[`root`]] */
export function numberReportControlInstances(root: XMLDocument | Element): {
  bufInstances: number;
  unBufInstances: number;
} {
  const bufInstances = sumReportControlInstances(root, true);
  const unBufInstances = sumReportControlInstances(root, false);

  return { bufInstances, unBufInstances };
}
