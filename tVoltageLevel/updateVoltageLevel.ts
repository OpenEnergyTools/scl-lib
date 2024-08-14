import { Update } from "../foundation/utils.js";

function updateSourceRef(
  element: Element,
  {
    oldSubstation,
    oldVoltageLevel,
    newVoltageLevel,
  }: {
    oldSubstation: string;
    oldVoltageLevel: string;
    newVoltageLevel: string;
  },
): Update[] {
  const sourceRefs = Array.from(
    element.ownerDocument.querySelectorAll(
      'Private[type="eIEC61850-6-100"]>LNodeInputs>SourceRef',
    ),
  );

  const updates: Update[] = [];

  sourceRefs.forEach((srcRef) => {
    const source = srcRef.getAttribute("source");
    if (!source) return;

    const oldPath = `${oldSubstation}/${oldVoltageLevel}`;

    if (!source.startsWith(oldPath)) return;

    const newPath = `${oldSubstation}/${newVoltageLevel}`;
    updates.push({
      element: srcRef,
      attributes: { source: source.replace(oldPath, newPath) },
    });
  });

  return updates.filter((update) => update) as Update[];
}

function updateConnectivityNodes(
  element: Element,
  {
    substation,
    voltageLevelName,
  }: {
    substation: string;
    voltageLevelName: string;
  },
): Update[] {
  const cNodes = Array.from(element.getElementsByTagName("ConnectivityNode"));

  const updates: Update[] = [];

  cNodes.forEach((cNode) => {
    const cNodeName = cNode.getAttribute("name");
    const bayName = cNode.parentElement?.getAttribute("name");
    if (!cNodeName || !bayName) return;

    const connectivityNode = `${substation}/${voltageLevelName}/${bayName}/${cNodeName}`;
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
        voltageLevelName,
      }),
    );
  });

  return updates;
}

function updateTerminals(
  element: Element,
  {
    oldConnectivityNode,
    connectivityNode,
    voltageLevelName,
  }: {
    oldConnectivityNode: string;
    connectivityNode: string;
    voltageLevelName: string;
  },
): Update[] {
  const terminals = Array.from(
    element.closest("Substation")!.querySelectorAll(
      `Terminal[connectivityNode="${oldConnectivityNode}"],
       NeutralPoint[connectivityNode="${oldConnectivityNode}"]`,
    ),
  );

  const updates = terminals.map((terminal) => {
    return {
      element: terminal,
      attributes: {
        connectivityNode,
        voltageLevelName,
      },
    };
  });

  return updates;
}

/** Updates `VoltageLevel` attributes and cross-referenced elements
 * @param update - update edit on `VoltageLevel` attributes
 * @returns Completed update edit array */
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
      voltageLevelName: newName,
    }),
    ...updateSourceRef(voltageLevel, {
      oldSubstation: substationName,
      oldVoltageLevel: oldName,
      newVoltageLevel: newName,
    }),
  );
}
