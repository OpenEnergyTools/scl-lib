import { Insert, createElement } from "../foundation/utils.js";

import { getReference } from "../general/getReference.js";

export type InsertIedOptions = {
  addCommunicationSection: boolean;
};

function addCommunicationElements(newIed: Element, scl: Element): Insert[] {
  const actions: Insert[] = [];

  const existingCommunication = scl.querySelector(":root > Communication");

  const communication = existingCommunication
    ? existingCommunication
    : createElement(scl.ownerDocument, "Communication", {});

  if (!existingCommunication)
    actions.push({
      parent: scl,
      node: communication,
      reference: getReference(scl, "Communication"),
    });

  const newSubNetworks = Array.from(
    newIed.ownerDocument.querySelectorAll(`:root > Communication > SubNetwork`)
  );

  newSubNetworks.forEach((newSubNetwork) => {
    const subNetworkName = newSubNetwork.getAttribute("name");
    // check if subnetwork already exists
    const existingSubNetwork = communication.querySelector(
      `:root > Communication > SubNetwork[name="${subNetworkName}"]`
    );

    if (!existingSubNetwork) {
      // subnetwork is new and can be copied as is
      const subNetwork = <Element>newSubNetwork.cloneNode(true);
      actions.push({
        parent: communication,
        node: subNetwork,
        reference: getReference(communication, "SubNetwork"),
      });
    } else {
      // subnetwork exists and individual ConnectedAP are copied
      const newConnectedAPs = newIed.ownerDocument.querySelectorAll(
        `:root > Communication > SubNetwork[name="${subNetworkName}"] 
        > ConnectedAP[iedName="${newIed.getAttribute("name")}"]`
      );

      newConnectedAPs.forEach((newConnectedAP) => {
        const connectedAP = <Element>newConnectedAP.cloneNode(true);
        actions.push({
          parent: existingSubNetwork,
          node: connectedAP,
          reference: getReference(existingSubNetwork, "ConnectedAP"),
        });
      });
    }
  });

  return actions;
}

function isDataTypeConnectionToIed(
  dataType: Element,
  newIed: Element
): boolean {
  const dataTypeTemplates: Element = dataType.parentElement!;
  const id = dataType.getAttribute("id");

  if (!dataTypeTemplates || !id) return false;

  if (dataType.tagName === "EnumType")
    return Array.from(
      dataTypeTemplates.querySelectorAll(
        `DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`
      )
    ).some((typeChild) =>
      isDataTypeConnectionToIed(typeChild.parentElement!, newIed)
    );

  if (dataType.tagName === "DAType")
    return Array.from(
      dataTypeTemplates.querySelectorAll(
        `DOType > DA[type="${id}"],DAType > BDA[type="${id}"]`
      )
    ).some((typeChild) =>
      isDataTypeConnectionToIed(typeChild.parentElement!, newIed)
    );

  if (dataType.tagName === "DOType")
    return Array.from(
      dataTypeTemplates.querySelectorAll(
        `LNodeType > DO[type="${id}"], DOType > SDO[type="${id}"]`
      )
    ).some((typeChild) =>
      isDataTypeConnectionToIed(typeChild.parentElement!, newIed)
    );

  return Array.from(newIed.getElementsByTagName("LN0"))
    .concat(Array.from(newIed.getElementsByTagName("LN")))
    .some((anyLn) => anyLn.getAttribute("lnType") === id);
}

function addEnumType(
  newIed: Element,
  newEnumType: Element,
  oldDataTypeTemplates: Element
): Insert | undefined {
  if (!isDataTypeConnectionToIed(newEnumType, newIed)) return;

  const existEnumType = oldDataTypeTemplates.querySelector(
    `EnumType[id="${newEnumType.getAttribute("id")}"]`
  );
  if (existEnumType && newEnumType.isEqualNode(existEnumType)) return;

  if (existEnumType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
    const data: Element = newEnumType.parentElement!;
    const idOld = newEnumType.getAttribute("id");
    const idNew = newIed.getAttribute("name")! + idOld;
    newEnumType.setAttribute("id", idNew);

    data
      .querySelectorAll(
        `DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`
      )
      .forEach((type) => type.setAttribute("type", idNew));
  }

  return {
    parent: oldDataTypeTemplates,
    node: newEnumType,
    reference: getReference(oldDataTypeTemplates, "LNodeType"),
  };
}

function addDAType(
  newIed: Element,
  newDAType: Element,
  oldDataTypeTemplates: Element
): Insert | undefined {
  if (!isDataTypeConnectionToIed(newDAType, newIed)) return;

  const existDAType = oldDataTypeTemplates.querySelector(
    `DAType[id="${newDAType.getAttribute("id")}"]`
  );
  if (existDAType && newDAType.isEqualNode(existDAType)) return;

  if (existDAType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
    const data: Element | null = newDAType.parentElement!;
    const idOld = newDAType.getAttribute("id");
    const idNew = newIed.getAttribute("name")! + idOld;
    newDAType.setAttribute("id", idNew);

    data
      .querySelectorAll(
        `DOType > DA[type="${idOld}"],DAType > BDA[type="${idOld}"]`
      )
      .forEach((type) => type.setAttribute("type", idNew));
  }

  return {
    parent: oldDataTypeTemplates,
    node: newDAType,
    reference: getReference(oldDataTypeTemplates, "DAType"),
  };
}

function addDOType(
  newIed: Element,
  newDOType: Element,
  oldDataTypeTemplates: Element
): Insert | undefined {
  if (!isDataTypeConnectionToIed(newDOType, newIed)) return;

  const existDOType = oldDataTypeTemplates.querySelector(
    `DOType[id="${newDOType.getAttribute("id")}"]`
  );
  if (existDOType && newDOType.isEqualNode(existDOType)) return;

  if (existDOType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
    const data: Element = newDOType.parentElement!;
    const idOld = newDOType.getAttribute("id");
    const idNew = newIed.getAttribute("name")! + idOld;
    newDOType.setAttribute("id", idNew);

    data
      .querySelectorAll(
        `LNodeType > DO[type="${idOld}"], DOType > SDO[type="${idOld}"]`
      )
      .forEach((type) => type.setAttribute("type", idNew));
  }

  return {
    parent: oldDataTypeTemplates,
    node: newDOType,
    reference: getReference(oldDataTypeTemplates, "DOType"),
  };
}

function addLNodeType(
  newIed: Element,
  newLNodeType: Element,
  oldDataTypeTemplates: Element
): Insert | undefined {
  if (!isDataTypeConnectionToIed(newLNodeType, newIed)) return;

  const existLNodeType = oldDataTypeTemplates.querySelector(
    `LNodeType[id="${newLNodeType.getAttribute("id")}"]`
  );
  if (existLNodeType && newLNodeType.isEqualNode(existLNodeType)) return;

  if (existLNodeType) {
    // There is an `id` conflict in the project that must be resolved by
    // concatenating the IED name with the id
    const idOld = newLNodeType.getAttribute("id")!;
    const idNew = newIed.getAttribute("name")!.concat(idOld);
    newLNodeType.setAttribute("id", idNew);

    Array.from(
      newIed.querySelectorAll(`LN0[lnType="${idOld}"],LN[lnType="${idOld}"]`)
    )
      .filter((anyLn) => anyLn.closest("Private"))
      .forEach((ln) => ln.setAttribute("lnType", idNew));
  }

  return {
    parent: oldDataTypeTemplates,
    node: newLNodeType,
    reference: getReference(oldDataTypeTemplates, "LNodeType"),
  };
}

function addDataTypeTemplates(newIed: Element, scl: Element): Insert[] {
  const actions: (Insert | undefined)[] = [];

  const dataTypeTemplates = scl.querySelector(":root > DataTypeTemplates")
    ? scl.querySelector(":root > DataTypeTemplates")!
    : createElement(scl.ownerDocument, "DataTypeTemplates", {});

  if (!dataTypeTemplates.parentElement) {
    actions.push({
      parent: scl,
      node: dataTypeTemplates,
      reference: getReference(scl, "DataTypeTemplates"),
    });
  }

  newIed.ownerDocument
    .querySelectorAll(":root > DataTypeTemplates > LNodeType")
    .forEach((lNodeType) =>
      actions.push(addLNodeType(newIed, lNodeType, dataTypeTemplates!))
    );

  newIed.ownerDocument
    .querySelectorAll(":root > DataTypeTemplates > DOType")
    .forEach((doType) =>
      actions.push(addDOType(newIed, doType, dataTypeTemplates!))
    );

  newIed.ownerDocument
    .querySelectorAll(":root > DataTypeTemplates > DAType")
    .forEach((daType) =>
      actions.push(addDAType(newIed, daType, dataTypeTemplates!))
    );

  newIed.ownerDocument
    .querySelectorAll(":root > DataTypeTemplates > EnumType")
    .forEach((enumType) =>
      actions.push(addEnumType(newIed, enumType, dataTypeTemplates!))
    );

  return actions.filter((item) => item !== undefined) as Insert[];
}

function isNameUnique(scl: Element, ied: Element): boolean {
  return !!scl.querySelector(`IED[name="${ied.getAttribute("name")}"]`);
}

function isIED(node: Node): node is Element {
  return (node as Element).tagName === "IED";
}

function isSCL(node: Node): node is Element {
  return (node as Element).tagName === "SCL";
}

/** Function to import !single IEDs with its `DataTypeTemplates` and
 * optionally linked `Communication`section elements.
 * >NOTE: Element are MOVED from ied document to the project not copied
 * @param scl - the parent SCL element to insert the IED to
 * @param ied - the new IED to be added to the project (SCL)
 * @param options
 * @returns An array containing diff objects representing an import IED action
 * section */
export function insertIed(
  scl: Element,
  ied: Element,
  options: InsertIedOptions = { addCommunicationSection: true }
): Insert[] {
  if (!isSCL(scl) || !isIED(ied) || isNameUnique(scl, ied)) return [];
  const insertCommunication: Insert[] = [];
  if (options.addCommunicationSection)
    insertCommunication.push(...addCommunicationElements(ied, scl));

  const insertDataTypes: Insert[] = [];
  insertDataTypes.push(...addDataTypeTemplates(ied, scl));

  const insertIed: Insert = {
    parent: scl,
    node: ied,
    reference: getReference(scl, "IED"),
  };
  return [...insertCommunication, insertIed, ...insertDataTypes];
}
