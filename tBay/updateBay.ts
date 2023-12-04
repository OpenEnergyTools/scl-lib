import { Update } from "../foundation/utils.js";

function updateConnectivityNodes(
  element: Element,
  {
    substation,
    voltageLevel,
    bayName,
  }: {
    substation: string;
    voltageLevel: string;
    bayName: string;
  },
): Update[] {
  const cNodes = Array.from(element.getElementsByTagName("ConnectivityNode"));

  const updates: Update[] = [];

  cNodes.forEach((cNode) => {
    const cNodeName = cNode.getAttribute("name");
    if (!cNodeName) return;

    const connectivityNode = `${substation}/${voltageLevel}/${bayName}/${cNodeName}`;
    updates.push({
      element: cNode,
      attributes: { pathName: connectivityNode },
    });

    const oldConnectivityNode = cNode.getAttribute("pathName");
    if (!oldConnectivityNode) return;

    updates.push(
      ...updateTerminals(element, {
        oldConnectivityNode,
        connectivityNode,
        bayName,
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
    bayName,
  }: {
    oldConnectivityNode: string;
    connectivityNode: string;
    bayName: string;
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
      bayName,
    },
  }));

  return updates;
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
      bayName: newName,
    }),
  );
}
