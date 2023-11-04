import { controlBlocks } from "../tControl/controlBlocks.js";
import { matchDataAttributes } from "./matchDataAttributes.js";
import { matchSrcAttributes } from "./matchSrcAttributes.js";

function someControlMatch(extRef: Element, controls: Element[]): boolean {
  return controls.some((control) => matchSrcAttributes(extRef, control));
}

/** Whether a data attribute in a DataSet is subscribed to scope element.
 * @param fcda - DataSet's data attribute
 * @param scope - Scope within a subscriber IED or the IED itself.
 *                E.g. IED, AccessPoint, Server, LN and other
 * @returns - Whether a FCDA element is subscribed to a ExtRef within scope
 */
export function isSubscribed(fcda: Element, scope: Element): boolean {
  const controls = controlBlocks(fcda);
  if (!controls.length) return false;

  return Array.from(scope.querySelectorAll("ExtRef")).some((extRef) => {
    if (extRef.hasAttribute("serviceType"))
      return (
        matchDataAttributes(extRef, fcda) && someControlMatch(extRef, controls)
      );

    return matchDataAttributes(extRef, fcda);
  });
}
