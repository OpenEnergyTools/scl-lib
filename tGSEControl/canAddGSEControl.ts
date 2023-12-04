function maxGSEControl(parent: Element): { max: number; scope: string } {
  {
    const selector = `:scope > Services > GOOSE`;
    const apGOOSE = parent.closest("AccessPoint")?.querySelector(selector);
    if (apGOOSE)
      return {
        max: parseInt(apGOOSE.getAttribute("max") ?? "0", 10),
        scope: "AccessPoint",
      };

    const iedGOOSE = parent.closest("IED")?.querySelector(selector);
    return {
      max: parseInt(iedGOOSE?.getAttribute("max") ?? "0", 10),
      scope: "IED",
    };
  }
}

/** Checks Services>GOOSE AccessPoint or on IED if the first is not present
 * @param parent - parent `LN0`
 * @returns Whether new `GSEControl` is exceeding GOOSE.max attribute */
export function canAddGSEControl(ln0: Element): boolean {
  const { max, scope } = maxGSEControl(ln0);

  const existingGseControls = Array.from(
    ln0
      .closest(scope)
      ?.querySelectorAll(":scope Server > LDevice > LN0 > GSEControl") ?? [],
  ).length;

  return max > existingGseControls;
}
