import { expect } from "chai";

import { handleEdit } from "@openscd/open-scd-core";

import { Insert } from "../foundation/utils";
import { insertIed } from "./insertIED.js";

function findAction(
  actions: Insert[],
  type: "parent" | "node",
  node: Node
): Insert | undefined {
  return actions.find(
    (action) =>
      (type === "parent" && action.parent === node) ||
      (type === "node" && action.node === node)
  );
}

function numberInserts(
  actions: Insert[],
  type: "parent" | "node",
  tag: string
): number {
  return actions.filter(
    (action) =>
      (type === "parent" && (action.parent as Element).tagName === tag) ||
      (type === "node" && (action.node as Element).tagName === tag)
  ).length;
}

function findElements(scl: Element, tag: string): Element[] {
  return Array.from(scl.querySelectorAll(tag));
}

const emptyScl = (
  await fetch("tIED/importIED/emptyproject.scd")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector("SCL")!;

const multipleIEDs = (
  await fetch("tIED/importIED/multipleieds.scd")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector("SCL")!;

const validIed = (
  await fetch("tIED/importIED/valid.iid")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector(':root > IED[name="TestImportIED"]')!;

const validWithMultipleConnAp = (
  await fetch("tIED/importIED/validWithMultiSubnets.iid")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector(':root > IED[name="TestImportIED"]')!;

const duplicateIED = (
  await fetch("tIED/importIED/duplicate.iid")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector(':root > IED[name="IED3"]')!;

const incompleteIED = (
  await fetch("tIED/importIED/incomplete.iid")
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "application/xml"))
).querySelector(':root > IED[name="incompleteIED"]')!;

describe("Function to an importIED and its referenced elements", () => {
  it("return empty string with invalid inputs", () => {
    expect(insertIed(validIed, validIed).length).to.equal(0);
    expect(insertIed(emptyScl, emptyScl).length).to.equal(0);
  });

  it("returns empty string with duplicate IED.name", () =>
    expect(insertIed(multipleIEDs, duplicateIED).length).to.equal(0));

  it("allows to insert incomplete IEDs", () =>
    expect(insertIed(multipleIEDs, incompleteIED).length).to.equal(1));

  it("passes on the IED element to the project", async () => {
    const imports = insertIed(emptyScl, validIed);
    expect(findAction(imports, "node", validIed)).to.not.be.undefined;
  });

  it("adds data type templates elements", async () => {
    const emptyScl = (
      await fetch("tIED/importIED/emptyproject.scd")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"))
    ).querySelector("SCL")!;

    const imports = insertIed(emptyScl, validIed);
    handleEdit(imports);

    expect(findElements(emptyScl, "DataTypeTemplates").length).to.equal(1);
    expect(findElements(emptyScl, "LNodeType").length).to.equal(5); // only referenced lnType
    expect(findElements(emptyScl, "DOType").length).to.equal(12); // only referenced do
    expect(findElements(emptyScl, "DAType").length).to.equal(5); // only referenced da
    expect(findElements(emptyScl, "EnumType").length).to.equal(4); // only referenced enumType
  });

  it("add all missing ConnectedAP and SubNetwork", async () => {
    const emptyScl = (
      await fetch("tIED/importIED/emptyproject.scd")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"))
    ).querySelector("SCL")!;

    const imports = insertIed(emptyScl, validWithMultipleConnAp);
    handleEdit(imports);

    expect(findElements(emptyScl, "Communication").length).to.equal(1);
    expect(findElements(emptyScl, "SubNetwork").length).to.equal(2);
    expect(findElements(emptyScl, "ConnectedAP").length).to.equal(4);
  });

  it("with addCommunicationSection set to false does not add communication elements", async () => {
    const imports = insertIed(emptyScl, validIed, {
      addCommunicationSection: false,
    });
    expect(numberInserts(imports, "node", "Communication")).to.equal(0);
    expect(numberInserts(imports, "node", "SubNetwork")).to.equal(0);
    expect(numberInserts(imports, "node", "ConnectedAP")).to.equal(0);
  });

  it("skips importing isEqualNode data type template objects", async () => {
    const imports = insertIed(multipleIEDs, validIed);

    expect(numberInserts(imports, "node", "DataTypeTemplates")).to.equal(0);
    expect(numberInserts(imports, "node", "LNodeType")).to.equal(1); // only !isEqualNode
    expect(numberInserts(imports, "node", "DOType")).to.equal(2); // only !isEqualNode
    expect(numberInserts(imports, "node", "DAType")).to.equal(1); // only !isEqualNode
    expect(numberInserts(imports, "node", "EnumType")).to.equal(3); // only !isEqualNode
  });

  it("skips existing SubNetwork element", async () => {
    const multipleIEDs = (
      await fetch("tIED/importIED/multipleieds.scd")
        .then((response) => response.text())
        .then((str) => new DOMParser().parseFromString(str, "application/xml"))
    ).querySelector("SCL")!;

    const imports = insertIed(multipleIEDs, validWithMultipleConnAp);
    handleEdit(imports);

    expect(findElements(multipleIEDs, "Communication").length).to.equal(1);
    expect(findElements(multipleIEDs, "SubNetwork").length).to.equal(4);
    expect(findElements(multipleIEDs, "ConnectedAP").length).to.equal(7);
  });
});
