function maxSampledValueControl(parent: Element): {
  max: number;
  scope: string;
} {
  {
    const selector = `:scope > Services > SMVsc`;
    const apSMV = parent.closest("AccessPoint")?.querySelector(selector);
    if (apSMV)
      return {
        max: parseInt(apSMV.getAttribute("max") ?? "0", 10),
        scope: "AccessPoint",
      };

    const iedSMV = parent.closest("IED")?.querySelector(selector);
    return {
      max: parseInt(iedSMV?.getAttribute("max") ?? "0", 10),
      scope: "IED",
    };
  }
}

/** Checks Services>SMVsc AccessPoint or on IED if the first is not present
 * @param parent - parent `LN0`
 * @returns Whether new `SampledValueControl` is exceeding SMVsc.max attribute */
export function canAddSampledValueControl(ln0: Element): boolean {
  const { max, scope } = maxSampledValueControl(ln0);

  const existingSampledValueControls = Array.from(
    ln0
      .closest(scope)
      ?.querySelectorAll(
        ":scope Server > LDevice > LN0 > SampledValueControl",
      ) ?? [],
  ).length;

  return max > existingSampledValueControls;
}
