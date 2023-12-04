/** Retrieve the maximum allowed `ReportControl` elements acc. to the
 * `Services` section of the `AccessPoint` or `IED`. -1 indicates no definition
 * of maximum `ReportControl` in the `IED`.
 * @param parent - SCL element within the `IED` or `AccessPoint`
 * @returns `{max, maxBuf}  attributes of `ConfReportControl`  */
export function maxReportControl(parent: Element): {
  max: number;
  maxBuf: number;
} {
  const selector = `:scope > Services > ConfReportControl`;

  const [bothMax, bothMaxBuf] = ["max", "maxBuf"].map((attr) => {
    return ["IED", "AccessPoint"].map((root) =>
      parseInt(
        parent.closest(root)?.querySelector(selector)?.getAttribute(attr) ??
          "-1",
        10,
      ),
    );
  });

  return { max: Math.max(...bothMax), maxBuf: Math.max(...bothMaxBuf) };
}
