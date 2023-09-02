import { Update } from "../foundation/utils.js";

function updateConnectivityNodes(
  element: Element,
  names: {
    substation: string;
    oldVoltageLevel: string;
    newVoltageLevel: string;
  }
): Update[] {
  const cNodes = Array.from(element.getElementsByTagName("ConnectivityNode"));

  const updates = cNodes.map((cNode) => {
    const cNodeName = cNode.getAttribute("name");
    const bayName = cNode.parentElement?.getAttribute("name");
    if (!cNodeName || !bayName) return;

    const newPath = `${names.substation}/${names.newVoltageLevel}/${bayName}/${cNodeName}`;
    return { element: cNode, attributes: { pathName: newPath } };
  });

  return updates.filter((update) => update) as Update[];
}

function updateTerminals(
  element: Element,
  names: {
    substation: string;
    oldVoltageLevel: string;
    newVoltageLevel: string;
  }
): Update[] {
  const terminals = Array.from(
    element
      .closest("Substation")!
      .querySelectorAll(
        `Terminal[substationName="${names.substation}"][voltageLevelName="${names.oldVoltageLevel}"]`
      )
  );

  const updates = terminals.map((terminal) => {
    const connectivityNode = terminal.getAttribute("connectivityNode");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [substationName, _, bayName, cNodeName] = (
      connectivityNode ?? ""
    ).split("/");
    if (!substationName || !bayName || !cNodeName) return;

    const newConnectivityNode = `${substationName}/${names.newVoltageLevel}/${bayName}/${cNodeName}`;
    return {
      element: terminal,
      attributes: {
        connectivityNode: newConnectivityNode,
        voltageLevelName: names.newVoltageLevel,
      },
    };
  });

  return updates.filter((update) => update) as Update[];
}

/** Updates `VoltageLevel` attributes and cross-referenced elements
 * @param update - update action on `VoltageLevel` attributes
 * @returns Completed update action array */
export function updateVoltageLevel(update: Update): Update[] {
  if (update.element.tagName !== "VoltageLevel") return [update];

  const voltageLevel = update.element;
  const attributes = update.attributes;

  if (!attributes.name) return [update];

  const oldName = voltageLevel.getAttribute("name");
  const substationName = voltageLevel
    .closest("Substation")
    ?.getAttribute("name");

  const newName = attributes.name;
  if (!substationName || !oldName || oldName === newName) return [update];

  return [update].concat(
    ...updateConnectivityNodes(voltageLevel, {
      substation: substationName,
      oldVoltageLevel: oldName,
      newVoltageLevel: newName,
    }),
    ...updateTerminals(voltageLevel, {
      substation: substationName,
      oldVoltageLevel: oldName,
      newVoltageLevel: newName,
    })
  );
}
