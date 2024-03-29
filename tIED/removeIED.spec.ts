import { expect } from "chai";

import { handleEdit, isRemove, isUpdate } from "@openscd/open-scd-core";

import { Edit } from "../foundation/utils.js";

import { scl } from "./removeIED.testfile.js";

import { removeIED } from "./removeIED.js";

function numberRemoves(edits: Edit[], tag: string): number {
  return edits.filter((edit) => isRemove(edit) && edit.node.nodeName === tag)
    .length;
}

function numberUpdates(edits: Edit[], tag: string): number {
  return edits.filter((edit) => isUpdate(edit) && edit.element.nodeName === tag)
    .length;
}

const publisher = new DOMParser()
  .parseFromString(scl, "application/xml")
  .querySelector('IED[name="Publisher"]')!;

const subscriber1 = new DOMParser()
  .parseFromString(scl, "application/xml")
  .querySelector('IED[name="GOOSE_Subscriber1"]')!;

const client = new DOMParser()
  .parseFromString(scl, "application/xml")
  .querySelector('IED[name="Client"]')!;

const substation = new DOMParser()
  .parseFromString(scl, "application/xml")
  .querySelector("Substation")!;

describe("Function to an remove the IED and its referenced elements", () => {
  it("returns empty array with non-IED update", () =>
    expect(removeIED({ node: substation }).length).to.equal(0));

  it("returns just the IED element with missing IED name", () => {
    const sclDom = new DOMParser().parseFromString(scl, "application/xml");
    const publi = sclDom.querySelector('IED[name="Publisher"]')!;
    publi.removeAttribute("name");

    expect(removeIED({ node: publi }).length).to.equal(0);
  });

  it("updates LNode iedName attributes to None as well", () => {
    const edits = removeIED({ node: subscriber1 });

    expect(numberUpdates(edits, "LNode")).to.equal(1);
  });

  it("removes ConnectedAPs as well", () => {
    const edits = removeIED({ node: publisher });

    expect(numberRemoves(edits, "ConnectedAP")).to.equal(1);
  });

  it("removes non-later-binding ExtRefs as well", () => {
    const edits = removeIED({ node: publisher });

    expect(numberRemoves(edits, "ExtRef")).to.equal(4);
  });

  it("updates ExtRef iedName attributes as well", () => {
    const edits = removeIED({ node: publisher });

    expect(numberUpdates(edits, "ExtRef")).to.equal(7);
  });

  it("removes empty Inputs elements as well", () => {
    const edits = removeIED({ node: publisher });

    expect(numberRemoves(edits, "Inputs")).to.equal(1);
  });

  it("removes the KDC iedName attributes as well", () => {
    const edits = removeIED({ node: publisher });

    expect(numberRemoves(edits, "KDC")).to.equal(1);
  });

  it("removes Associations as well", () => {
    const edits = removeIED({ node: publisher });

    expect(numberRemoves(edits, "Association")).to.equal(1);
  });

  it("removes ClientLNs as well", () => {
    const edits = removeIED({
      node: client,
    });

    expect(numberRemoves(edits, "ClientLN")).to.equal(2);
  });

  it("removes IEDName elements as well", () => {
    const edits = removeIED({
      node: subscriber1,
    });

    expect(numberRemoves(edits, "IEDName")).to.equal(1);
  });

  it("removes LGOS/LSVS object reference", () => {
    const sclDom = new DOMParser().parseFromString(scl, "application/xml");
    const publisher = sclDom.querySelector('IED[name="Publisher"]')!;

    const before = Array.from(
      sclDom.querySelectorAll('LN[lnClass="LGOS"] Val, LN[lnClass="LSVS"] Val'),
    ).filter((iedName) => iedName.textContent?.startsWith("Publisher"));
    expect(before.length).to.equal(3);

    const edits = removeIED({
      node: publisher,
    });

    handleEdit(edits);

    const after = Array.from(
      sclDom.querySelectorAll('LN[lnClass="LGOS"] Val, LN[lnClass="LSVS"] Val'),
    ).filter((iedName) => iedName.textContent?.startsWith("Publisher"));
    // 1 supervised control block is not subscribed so is not removed
    expect(after.length).to.equal(1);
  });
});
