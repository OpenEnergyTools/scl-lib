import { expect } from "chai";

import {
  Insert,
  Remove,
  Update,
  isInsert,
  isRemove,
  isUpdate,
} from "../foundation/utils.js";

import { gseControlDoc } from "./gsecontrol.testfiles.js";

import { updateGSEControl } from "./updateGSEControl.js";

function findElement(str: string, selector: string): Element | null {
  return new DOMParser()
    .parseFromString(str, "application/xml")
    .querySelector(selector);
}

function buildAttr(
  type: "name" | "datSet" | "none" = "none",
): Record<string, string | null> {
  if (type === "name")
    return {
      name: "someNewGseName",
      desc: "someDesc",
      type: "GSSE",
      appID: "someNewAppID",
      fixedOffs: "true",
      securityEnabled: "someSecEna",
    };

  if (type === "datSet")
    return {
      datSet: "someNewDatSet",
      desc: "someDesc",
      type: "GSSE",
      appID: "someNewAppID",
      fixedOffs: "true",
      securityEnabled: "someSecEna",
    };

  return {
    desc: "someDesc",
    type: "GSSE",
    appID: "someNewAppID",
    fixedOffs: "true",
    securityEnabled: "someSecEna",
  };
}

describe("Utility function to update GSEControl attributes", () => {
  it("returns empty array when update.element is not GSEControl update", () => {
    const ied = findElement(gseControlDoc, ":root > IED")!;
    const actions = updateGSEControl({
      element: ied,
      attributes: buildAttr(),
    });

    expect(actions.length).to.equal(0);
  });

  it("always updates confRev attribute +10000", () => {
    const gseControl = findElement(
      gseControlDoc,
      'GSEControl[name="someGse"]',
    )!;
    const actions = updateGSEControl({
      element: gseControl,
      attributes: buildAttr(),
    });

    expect(actions.length).to.equal(1);
    expect(actions[0]).to.satisfy(isUpdate);
    expect((actions[0] as Update).element).to.equal(gseControl);
    expect((actions[0] as Update).attributes).to.deep.equal({
      desc: "someDesc",
      type: "GSSE",
      appID: "someNewAppID",
      fixedOffs: "true",
      securityEnabled: "someSecEna",
      confRev: "20001",
    });
  });

  describe("with intention to change name attributes", () => {
    it("also updates subscribed ExtRefs", () => {
      const gseControl = findElement(
        gseControlDoc,
        'GSEControl[name="someGse3"]',
      )!;
      const actions = updateGSEControl({
        element: gseControl,
        attributes: buildAttr("name"),
      });

      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(gseControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        name: "someNewGseName",
        desc: "someDesc",
        type: "GSSE",
        appID: "someNewAppID",
        fixedOffs: "true",
        securityEnabled: "someSecEna",
        confRev: "30001",
      });

      expect(actions[1]).to.satisfy(isUpdate);
      expect((actions[1] as Update).element.tagName).to.equal("ExtRef");
      expect((actions[1] as Update).attributes).to.deep.equal({
        srcCBName: "someNewGseName",
      });
    });

    it("also updates subscriber supervision Val element", () => {
      const gseControl = findElement(
        gseControlDoc,
        'GSEControl[name="someGse"]',
      )!;
      const actions = updateGSEControl({
        element: gseControl,
        attributes: buildAttr("name"),
      });

      expect(actions.length).to.equal(5);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(gseControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        name: "someNewGseName",
        desc: "someDesc",
        type: "GSSE",
        appID: "someNewAppID",
        fixedOffs: "true",
        securityEnabled: "someSecEna",
        confRev: "20001",
      });

      expect(actions[1]).to.satisfy(isUpdate);
      expect((actions[1] as Update).element.tagName).to.equal("ExtRef");
      expect((actions[1] as Update).attributes).to.deep.equal({
        srcCBName: "someNewGseName",
      });
      expect(actions[2]).to.satisfy(isUpdate);
      expect((actions[2] as Update).element.tagName).to.equal("ExtRef");
      expect((actions[2] as Update).attributes).to.deep.equal({
        srcCBName: "someNewGseName",
      });

      const oldText = Array.from(
        gseControl.ownerDocument.querySelector(
          'LN[lnClass="LGOS"][inst="1"] Val',
        )?.childNodes ?? [],
      ).find((node) => node.nodeType === Node.TEXT_NODE)!;
      expect(actions[3]).to.satisfy(isRemove);
      expect((actions[3] as Remove).node).to.equal(oldText);

      expect(actions[4]).to.satisfy(isInsert);
      expect((actions[4] as Insert).parent).to.equal(oldText.parentElement);
      expect((actions[4] as Insert).node.textContent).to.equal(
        "srcIEDsomeLDInst/LLN0.someNewGseName",
      );
    });

    it("also updates subscriber supervision Val element", () => {
      const gseControl = findElement(
        gseControlDoc,
        'GSEControl[name="someGse2"]',
      )!;
      const actions = updateGSEControl({
        element: gseControl,
        attributes: buildAttr("name"),
      });

      expect(actions.length).to.equal(5);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(gseControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        name: "someNewGseName",
        desc: "someDesc",
        type: "GSSE",
        appID: "someNewAppID",
        fixedOffs: "true",
        securityEnabled: "someSecEna",
        confRev: "10001",
      });

      expect(actions[1]).to.satisfy(isUpdate);
      expect((actions[1] as Update).element.tagName).to.equal("ExtRef");
      expect((actions[1] as Update).attributes).to.deep.equal({
        srcCBName: "someNewGseName",
      });

      const oldText = Array.from(
        gseControl.ownerDocument.querySelector(
          'LN[lnClass="LGOS"][inst="2"] Val',
        )?.childNodes ?? [],
      ).find((node) => node.nodeType === Node.TEXT_NODE)!;
      expect(actions[2]).to.satisfy(isRemove);
      expect((actions[2] as Remove).node).to.equal(oldText);

      expect(actions[3]).to.satisfy(isInsert);
      expect((actions[3] as Insert).parent).to.equal(oldText.parentElement);
      expect((actions[3] as Insert).node.textContent).to.equal(
        "srcIEDsomeLDInst/LLN0.someNewGseName",
      );

      expect(actions[4]).to.satisfy(isUpdate);
      expect((actions[4] as Update).element.tagName).to.equal("GSE");
      expect((actions[4] as Update).attributes).to.deep.equal({
        cbName: "someNewGseName",
      });
    });
  });

  describe("with intention to change datSet attributes", () => {
    it("also updates DataSet.name with DataSet being single used", () => {
      const gseControl = findElement(
        gseControlDoc,
        'GSEControl[name="someGse3"]',
      )!;
      const actions = updateGSEControl({
        element: gseControl,
        attributes: buildAttr("datSet"),
      });

      expect(actions.length).to.equal(2);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(gseControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        datSet: "someNewDatSet",
        desc: "someDesc",
        type: "GSSE",
        appID: "someNewAppID",
        fixedOffs: "true",
        securityEnabled: "someSecEna",
        confRev: "30001",
      });

      expect(actions[1]).to.satisfy(isUpdate);
      expect((actions[1] as Update).element.tagName).to.equal("DataSet");
      expect((actions[1] as Update).attributes).to.deep.equal({
        name: "someNewDatSet",
      });
    });

    it("also updates DataSet.name with DataSet being single used", () => {
      const gseControl = findElement(
        gseControlDoc,
        'GSEControl[name="someGse2"]',
      )!;
      const actions = updateGSEControl({
        element: gseControl,
        attributes: buildAttr("datSet"),
      });

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(gseControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        desc: "someDesc",
        type: "GSSE",
        appID: "someNewAppID",
        fixedOffs: "true",
        securityEnabled: "someSecEna",
        confRev: "10001",
      });
    });
  });
});
