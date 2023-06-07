import dataObjects from "../foundation/nsd.json";

/**
 * This function returns the common data class `CDC` of the
 * specified data object `pDO` and the basic type of the specified
 * data attribute `pDA`.
 * ```md
 * The `CDC` of a given `pDO` is determined based on NSD files.
 * This function therefore assumes the `pDO` to be a data object defined
 * in the namespace of the IEC 61850-7-4 and IEC 61850-7-3
 * ```
 * @param extRef - The later binding type external reference
 * @returns An object that contains the `cdc` and with existing `pDA`
 * the `bType` or undefined if no valid specification can be returned
 */
export function extRefTypeRestrictions(
  extRef: Element
): { cdc: string; bType?: string } | undefined {
  const [pDO, pDA] = ["pDO", "pDA"].map((attr) => extRef.getAttribute(attr));
  if (!pDO) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataObject = (dataObjects as any)[pDO];

  const cdc = dataObject?.cdc ?? null;
  if (!cdc) return;
  if (!pDA && cdc) return { cdc };

  const dataAttribute = dataObject.children[pDA!];
  const bType = dataAttribute?.bType ?? null;
  if (!bType) return;

  return { cdc, bType };
}
