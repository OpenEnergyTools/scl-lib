import { fcdaBaseTypes } from "../tFCDA/fcdaBaseTypes.js";
import { extRefTypeRestrictions } from "./extRefTypeRestrictions.js";

export type DoesFcdaMeetExtRefRestrictionsOptions = {
  /** The control block type to check against `pServT` */
  controlBlockType?: "GOOSE" | "Report" | "SMV" | "Poll";
  /** Whether to only check against basic type. Skips check against pDO and pLN */
  checkOnlyBType?: boolean;
};

/**
 * This function checks if restrictions of an `ExtRef` element given by
 * `pDO` and optionally by `pDA`, `pLN` and `pServT` are met by the FCDA/FCD
 * @param extRef - The `ExtRef` element to be checked against
 * @param data - The `FCDA` element to be checked
 * @param controlBlockType - The control block type to check back with `pServT`
 * @returns Whether the FCDA basic types meet the restrictions of the
 * ExtRef element
 */
export function doesFcdaMeetExtRefRestrictions(
  extRef: Element,
  fcda: Element,
  options: DoesFcdaMeetExtRefRestrictionsOptions = { checkOnlyBType: false }
): boolean {
  // Vendor does not provide data for the check so any FCDA meets restriction
  if (!extRef.hasAttribute("pDO")) return true;

  const fcdaTypes = fcdaBaseTypes(fcda);
  const extRefSpec = extRefTypeRestrictions(extRef);

  // Check cannot be performed assume restriction check to fail
  if (!extRefSpec || !fcdaTypes) return false;

  if (
    extRef.getAttribute("pServT") &&
    options.controlBlockType &&
    options.controlBlockType !== extRef.getAttribute("pServT")
  )
    return false;

  // Some vendors allow subscribing of e.g. ACT to SPS, both bType BOOLEAN
  if (options.checkOnlyBType) return fcdaTypes.bType === extRefSpec.bType;

  if (
    extRef.getAttribute("pLN") &&
    extRef.getAttribute("pLN") !== fcda.getAttribute("lnClass")
  )
    return false;

  if (fcdaTypes.cdc !== extRefSpec.cdc) return false;

  if (extRef.getAttribute("pDA") && fcdaTypes.bType !== extRefSpec.bType)
    return false;

  return true;
}
