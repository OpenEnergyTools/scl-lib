import { matchSrcAttributes } from "../tExtRef/matchSrcAttributes.js";

/** @returns all ExtRef element subscribed to a control block element */
export function findControlBlockSubscription(control: Element): Element[] {
  const doc = control.ownerDocument;
  const iedName = control.closest("IED")?.getAttribute("name");

  return Array.from(
    doc.querySelectorAll(`ExtRef[iedName="${iedName}"]`),
  ).filter((extRef) => matchSrcAttributes(extRef, control));
}
