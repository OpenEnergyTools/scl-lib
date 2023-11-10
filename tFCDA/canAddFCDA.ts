/** @returns ConfDataSet.maxAttributes number as `max` and the scope. */
export function maxAttributes(fcda: Element): { max: number; scope: string } {
  {
    const validRoot = !!fcda.closest("AccessPoint") || !!fcda.closest("IED");
    if (!validRoot) return { max: -1, scope: "IED" };

    const selector = `:scope > Services > ConfDataSet`;
    const apMaxAllowed = fcda
      .closest("AccessPoint")
      ?.querySelector(selector)
      ?.getAttribute("maxAttributes");

    if (apMaxAllowed)
      return {
        max: parseInt(apMaxAllowed, 10),
        scope: "AccessPoint",
      };

    const iedMaxAllowed = fcda
      .closest("IED")
      ?.querySelector(selector)
      ?.getAttribute("maxAttributes");

    if (iedMaxAllowed)
      return {
        max: parseInt(iedMaxAllowed, 10),
        scope: "IED",
      };

    const existing = fcda.querySelectorAll(":scope > FCDA").length;

    return {
      max: existing,
      scope: "DataSet",
    };
  }
}

/** Checks Services>ConfDataSet.maxAttributes on AccessPoint or
 * on IED if the first is not present.
 * @param dataSet - parent [[`DataSet`]] element
 * @returns Whether new `FCDA` is exceeding ConfDataSet.maxAttributes attribute */
export function canAddFCDA(dataSet: Element): boolean {
  const { max } = maxAttributes(dataSet);

  const existingDataSets = dataSet.querySelectorAll(":scope > FCDA").length;

  return max > existingDataSets;
}
