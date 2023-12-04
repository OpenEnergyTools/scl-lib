import { fcdaBaseTypes } from "../tFCDA/fcdaBaseTypes.js";
import { extRefTypeRestrictions } from "./extRefTypeRestrictions.js";

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
  controlBlockType?: "GOOSE" | "Report" | "SMV" | "Poll",
): boolean {
  // Vendor does not provide data for the check so any FCDA meets restriction
  if (!extRef.hasAttribute("pDO")) return true;

  const fcdaTypes = fcdaBaseTypes(fcda);
  const extRefSpec = extRefTypeRestrictions(extRef);

  // Check cannot be performed assume restriction check to fail
  if (!extRefSpec || !fcdaTypes) return false;

  if (
    extRef.getAttribute("pServT") &&
    controlBlockType !== extRef.getAttribute("pServT")
  )
    return false;

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
