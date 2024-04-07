import { isPublic } from "../tBaseElement/isPublic.js";
import { unsubscribe } from "../tExtRef/unsubscribe.js";
import { removeSubscriptionSupervision } from "../tLN/removeSubscriptionSupervision.js";

import type { Remove, Update } from "../foundation/utils.js";

const elementsToRemove = ["Association", "ClientLN", "ConnectedAP", "KDC"];

const elementsToReplaceWithNone = ["LNode"];

function removeIEDNameTextContent(ied: Element, iedName: string): Remove[] {
  return Array.from(ied.ownerDocument.getElementsByTagName("IEDName"))
    .filter(isPublic)
    .filter((iedNameElement) => iedNameElement.textContent === iedName)
    .map((iedNameElement) => {
      return { node: iedNameElement };
    });
}

function removeWithIedName(ied: Element, iedName: string): Remove[] {
  const selector = elementsToRemove
    .map((iedNameElement) => `${iedNameElement}[iedName="${iedName}"]`)
    .join(",");

  return Array.from(ied.ownerDocument.querySelectorAll(selector))
    .filter(isPublic)
    .map((element) => {
      return { node: element };
    });
}

function removeIedSubscriptionsAndSupervisions(
  ied: Element,
  iedName: string,
): (Update | Remove)[] {
  const extRefs = Array.from(ied.ownerDocument.querySelectorAll(":root > IED"))
    .filter((ied) => ied.getAttribute("name") !== iedName)
    .flatMap((ied) =>
      Array.from(
        ied.querySelectorAll(
          `:scope > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="${iedName}"], 
            :scope > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="${iedName}"]`,
        ),
      ),
    );

  const supervisionRemovals = removeSubscriptionSupervision(extRefs);
  const extRefRemovals = unsubscribe(extRefs, { ignoreSupervision: true });

  return [...extRefRemovals, ...supervisionRemovals];
}

function updateIedNameToNone(ied: Element, iedName: string): Update[] {
  const selector = elementsToReplaceWithNone
    .map((iedNameElement) => `${iedNameElement}[iedName="${iedName}"]`)
    .join(",");

  return Array.from(ied.ownerDocument.querySelectorAll(selector))
    .filter(isPublic)
    .map((element) => {
      return { element, attributes: { iedName: "None" } };
    });
}

/**
 * Function to remove an IED.
 * ```md
 * The function makes sure to also:
 * 1. Remove all elements which should no longer exist including ClientLN,
 *    KDC, Association, ConnectedAP and IEDName
 * 2. Remove subscriptions and supervisions
 * 2. Update LNodes to an iedName of None
 * ```
 * @param remove - IED element as a Remove edit
 * @returns - Set of additional edits to relevant SCL elements
 */
export function removeIED(remove: Remove): (Update | Remove)[] {
  if (
    remove.node.nodeType !== Node.ELEMENT_NODE ||
    remove.node.nodeName !== "IED" ||
    !(remove.node as Element).hasAttribute("name")
  )
    return [];

  const ied = remove.node as Element;
  const name = ied.getAttribute("name")!;

  return [
    remove,
    ...removeIEDNameTextContent(ied, name),
    ...removeWithIedName(ied, name),
    ...removeIedSubscriptionsAndSupervisions(ied, name),
    ...updateIedNameToNone(ied, name),
  ];
}
