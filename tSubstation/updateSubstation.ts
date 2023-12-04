import { Update } from "../foundation/utils.js";

function updateConnectivityNodes(
  substation: Element,
  substationName: string,
): Update[] {
  const cNodes = Array.from(
    substation.getElementsByTagName("ConnectivityNode"),
  );

  const updates = [] as Update[];

  cNodes.forEach((cNode) => {
    const cNodeName = cNode.getAttribute("name");
    const bayName = cNode.parentElement?.getAttribute("name");
    const voltageLevelName =
      cNode.parentElement?.parentElement?.getAttribute("name");
    if (!cNodeName || !bayName || !voltageLevelName) return;

    const connectivityNode = `${substationName}/${voltageLevelName}/${bayName}/${cNodeName}`;
    updates.push({
      element: cNode,
      attributes: { pathName: connectivityNode },
    });

    const oldConnectivityNode = cNode.getAttribute("pathName");
    if (!oldConnectivityNode) return;

    updates.push(
      ...updateTerminals(substation, {
        oldConnectivityNode,
        connectivityNode,
        substationName,
      }),
    );
  });

  return updates.filter((update) => update) as Update[];
}

function updateTerminals(
  element: Element,
  {
    oldConnectivityNode,
    connectivityNode,
    substationName,
  }: {
    oldConnectivityNode: string;
    connectivityNode: string;
    substationName: string;
  },
): Update[] {
  const terminals = Array.from(
    element.closest("Substation")!.querySelectorAll(
      `Terminal[connectivityNode="${oldConnectivityNode}"],
       NeutralPoint[connectivityNode="${oldConnectivityNode}"]`,
    ),
  );

  const updates = terminals.map((terminal) => ({
    element: terminal,
    attributes: {
      connectivityNode,
      substationName,
    },
  }));

  return updates;
}

/** Updates `Substation` attributes and cross-referenced elements
 * @param update - update edit on `Substation` attributes
 * @returns Completed update edit array */
export function updateSubstation(update: Update): Update[] {
  if (update.element.tagName !== "Substation") return [update];

  const substation = update.element;
  const attributes = update.attributes;

  if (!attributes.name) return [update];

  const oldName = substation.getAttribute("name");
  const newName = attributes.name;
  if (!oldName || oldName === newName) return [update];

  return [update].concat(...updateConnectivityNodes(substation, newName));
}
