import { Update } from "../foundation/utils.js";

function updateConnectivityNodes(
  substation: Element,
  newName: string
): Update[] {
  const cNodes = Array.from(
    substation.getElementsByTagName("ConnectivityNode")
  );

  const updates = cNodes.map((cNode) => {
    const cNodeName = cNode.getAttribute("name");
    const bayName = cNode.parentElement?.getAttribute("name");
    const voltageLevelName =
      cNode.parentElement?.parentElement?.getAttribute("name");
    if (!cNodeName || !bayName || !voltageLevelName) return;

    const newPath = `${newName}/${voltageLevelName}/${bayName}/${cNodeName}`;
    return { element: cNode, attributes: { pathName: newPath } };
  });

  return updates.filter((update) => update) as Update[];
}

function updateTerminals(
  substation: Element,
  names: {
    oldSubstation: string;
    newSubstation: string;
  }
): Update[] {
  const terminals = Array.from(
    substation.querySelectorAll(
      `Terminal[substationName="${names.oldSubstation}"]`
    )
  );

  const updates = terminals.map((terminal) => {
    const connectivityNode = terminal.getAttribute("connectivityNode");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, voltageLevelName, bayName, cNodeName] = (
      connectivityNode ?? ""
    ).split("/");
    if (!voltageLevelName || !bayName || !cNodeName) return;

    const newConnectivityNode = `${names.newSubstation}/${voltageLevelName}/${bayName}/${cNodeName}`;
    return {
      element: terminal,
      attributes: {
        connectivityNode: newConnectivityNode,
        substationName: names.newSubstation,
      },
    };
  });

  return updates.filter((update) => update) as Update[];
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

  return [update].concat(
    ...updateConnectivityNodes(substation, newName),
    ...updateTerminals(substation, {
      oldSubstation: oldName,
      newSubstation: newName,
    })
  );
}
