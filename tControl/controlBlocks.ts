/** @returns control blocks for a given data attribute or data set */
export function controlBlocks(fcdaOrDataSet: Element): Element[] {
  const datSet = fcdaOrDataSet.closest("DataSet")?.getAttribute("name");
  const parentLn = fcdaOrDataSet.closest("LN0, LN");

  return Array.from(
    parentLn?.querySelectorAll(
      `:scope > ReportControl[datSet="${datSet}"],
      :scope > GSEControl[datSet="${datSet}"],
      :scope > SampledValueControl[datSet="${datSet}"]`,
    ) ?? [],
  );
}
