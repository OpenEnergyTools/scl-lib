import { Remove, Update } from "../foundation/utils.js";

import { controlBlocks } from "../tControl/controlBlocks.js";
import { matchDataAttributes } from "../tExtRef/matchDataAttributes.js";
import { matchSrcAttributes } from "../tExtRef/matchSrcAttributes.js";
import { unsubscribe } from "../tExtRef/unsubscribe.js";

export function fCDAsSubscription(fcda: Element): Element[] {
  const doc = fcda.ownerDocument;
  const iedName = fcda.closest("IED")?.getAttribute("name");
  if (!iedName) return [];

  const isEd1 = !fcda.ownerDocument
    .querySelector("SCL")
    ?.getAttribute("version");

  if (isEd1)
    return Array.from(
      doc.querySelectorAll(
        `:root>IED>AccessPoint>Server>LDevice>LN0>Inputs>ExtRef[iedName="${iedName}"],
        :root>IED>AccessPoint>Server>LDevice>LN>Inputs>ExtRef[iedName="${iedName}"]`
      )
    ).filter((extRef) => matchDataAttributes(extRef, fcda));

  return controlBlocks(fcda).flatMap((controlBlock) =>
    Array.from(
      doc.querySelectorAll(
        `:root>IED>AccessPoint>Server>LDevice>LN0>Inputs>ExtRef[iedName="${iedName}"],
        :root>IED>AccessPoint>Server>LDevice>LN>Inputs>ExtRef[iedName="${iedName}"]`
      )
    ).filter(
      (extRef) =>
        matchDataAttributes(extRef, fcda) &&
        matchSrcAttributes(extRef, controlBlock)
    )
  );
}

/** Utility function to remove `FCDA` element that checks for possible
 * subscription that need to be updated or removed as well.
 * @param remove - remove edit (remove.node must be FCDA)
 * @returns Edit array removing FCDA and its subscriber information */
export function removeFCDA(remove: Remove): (Update | Remove)[] {
  if ((remove.node as Element).tagName !== "FCDA") return [];

  const fcda = remove.node as Element;

  const removeActionFcda: (Remove | Update)[] = [remove];

  const extRefActions: (Remove | Update)[] = [];
  extRefActions.push(...unsubscribe(fCDAsSubscription(fcda)));

  return removeActionFcda.concat(extRefActions);
}
