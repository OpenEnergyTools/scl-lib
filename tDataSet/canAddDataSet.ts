function maxDataSet(parent: Element): { max: number; scope: string } {
  {
    const validInp = !!parent.closest("AccessPoint") || !!parent.closest("IED");
    if (!validInp) return { max: -1, scope: "IED" };

    const selector = `:scope > Services > ConfDataSet`;
    const apMaxAllowed = parent
      .closest("AccessPoint")
      ?.querySelector(selector)
      ?.getAttribute("max");
    if (apMaxAllowed)
      return {
        max: parseInt(apMaxAllowed, 10),
        scope: "AccessPoint",
      };

    const iedMaxAllowed = parent
      .closest("IED")
      ?.querySelector(selector)
      ?.getAttribute("max");
    if (iedMaxAllowed)
      return {
        max: parseInt(iedMaxAllowed, 10),
        scope: "IED",
      };

    const existing = parent
      .closest("IED")!
      .querySelectorAll(
        ":scope > AccessPoint > Server > LDevice DataSet"
      ).length;

    return {
      max: existing,
      scope: "IED",
    };
  }
}

/** Checks Services>ConfDataSet AccessPoint or on IED if the first is not present
 * @param parent - parent `LN0`
 * @returns Whether new `DataSet` is exceeding ConfDataSet.max attribute */
export function canAddDataSet(ln0: Element): boolean {
  const { max, scope } = maxDataSet(ln0);

  const existingDataSets = Array.from(
    ln0
      .closest(scope)
      ?.querySelectorAll(
        ":scope Server > LDevice > LN0 > DataSet, :scope Server > LDevice > LN > DataSet"
      ) ?? []
  ).length;

  return max > existingDataSets;
}
