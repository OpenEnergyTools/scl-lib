import { Update } from "../foundation/utils.js";

function updateConnectivityNodes(
  element: Element,
  names: {
    substation: string;
    voltageLevel: string;
    oldBay: string;
    newBay: string;
  }
): Update[] {
  const cNodes = Array.from(element.getElementsByTagName("ConnectivityNode"));

  const updates = cNodes.map((cNode) => {
    const cNodeName = cNode.getAttribute("name");
    if (!cNodeName) return;

    const newPath = `${names.substation}/${names.voltageLevel}/${names.newBay}/${cNodeName}`;
    return { element: cNode, attributes: { pathName: newPath } };
  });

  return updates.filter((update) => update) as Update[];
}

function updateTerminals(
  element: Element,
  names: {
    substation: string;
    voltageLevel: string;
    oldBay: string;
    newBay: string;
  }
): Update[] {
  const terminals = Array.from(
    element
      .closest("Substation")!
      .querySelectorAll(
        `Terminal[substationName="${names.substation}"][voltageLevelName="${names.voltageLevel}"][bayName="${names.oldBay}"]`
      )
  );

  const updates = terminals.map((terminal) => {
    const connectivityNode = terminal.getAttribute("connectivityNode");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [substationName, voltageLevelName, _, cNodeName] = (
      connectivityNode ?? ""
    ).split("/");
    if (!substationName || !voltageLevelName || !cNodeName) return;

    const oldConnectivityNode = `${substationName}/${voltageLevelName}/${names.newBay}/${cNodeName}`;
    return {
      element: terminal,
      attributes: {
        connectivityNode: oldConnectivityNode,
        bayName: names.newBay,
      },
    };
  });

  return updates.filter((update) => update) as Update[];
}

/** Updates `Bay` attributes and cross-referenced elements
 * @param update - update edit on `Bay` attributes
 * @returns Completed update edit array */
export function updateBay(update: Update): Update[] {
  if (update.element.tagName !== "Bay") return [update];

  const bay = update.element;
  const attributes = update.attributes;

  if (!attributes.name) return [update];

  const oldName = bay.getAttribute("name");
  const substationName = bay.closest("Substation")?.getAttribute("name");
  const voltageLevelName = bay.closest("VoltageLevel")?.getAttribute("name");

  const newName = attributes.name;
  if (!substationName || !voltageLevelName || !oldName || oldName === newName)
    return [update];

  return [update].concat(
    ...updateConnectivityNodes(bay, {
      substation: substationName,
      voltageLevel: voltageLevelName,
      oldBay: oldName,
      newBay: newName,
    }),
    ...updateTerminals(bay, {
      substation: substationName,
      voltageLevel: voltageLevelName,
      oldBay: oldName,
      newBay: newName,
    })
  );
}
