import { expect } from "chai";
import { findElement } from "../foundation/helpers.test.js";

import { Update, isUpdate } from "../foundation/utils.js";
import { substation } from "../tSubstation/substation.testfiles.js";
import { updateBay } from "./updateBay.js";

const aa1 = findElement(substation, 'Substation[name="AA1"]') as Element;
const aa1e1q01 = findElement(
  substation,
  'Substation[name="AA1"]>VoltageLevel[name="E1"]>Bay[name="Q01"]'
) as Element;
const aa1e1bb1 = findElement(
  substation,
  'Substation[name="AA1"]>VoltageLevel[name="E1"]>Bay[name="BB1"]'
) as Element;
const aa2d1q01 = findElement(
  substation,
  'Substation[name="AA2"]>VoltageLevel[name="D1"]>Bay[name="Q01"]'
) as Element;

const orphanBay = new DOMParser()
  .parseFromString('<Bay name="Q01" />', "application/xml")
  .querySelector("Bay")!;

describe("update Bay element", () => {
  it("does not seek addition updates when input element is not Bay", () => {
    const actions = updateBay({ element: aa1, attributes: { name: "Q04" } });

    expect(actions.length).to.equal(1);
  });

  it("does not seek addition updates with orphan Bay element", () => {
    const actions = updateBay({
      element: orphanBay,
      attributes: { name: "Q04" },
    });

    expect(actions.length).to.equal(1);
  });

  describe("when no name attribute is changed", () => {
    it("updates ReportControl attributes", () => {
      const actions = updateBay({
        element: aa1e1q01,
        attributes: { desc: "newDesc" },
      });

      expect(actions.length).to.equal(1);
      expect(actions[0].element).to.equal(aa1e1q01);
      expect(actions[0].attributes).to.deep.equal({
        desc: "newDesc",
      });
    });
  });

  describe("when name attribute is changed", () => {
    it("does not update when name has not changed", () => {
      const actions = updateBay({
        element: aa1e1q01,
        attributes: { name: "Q01" },
      });

      expect(actions.length).to.equal(1);
    });

    it("overwrites invalid ConnectivityNode path attribute", () => {
      const actions = updateBay({
        element: aa2d1q01,
        attributes: { name: "Q02" },
      });

      expect(actions.length).to.equal(2);
      expect(actions[1].attributes).to.deep.equal({
        path: "AA2/D1/Q02/L1",
      });
    });

    it("also updates ConnectivityNode path", () => {
      const actions = updateBay({
        element: aa1e1q01,
        attributes: { name: "Q03" },
      });

      expect(actions.length).to.equal(6);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(aa1e1q01);

      expect(actions[1]).to.satisfy(isUpdate);
      expect((actions[1] as Update).attributes).to.deep.equal({
        path: "AA1/E1/Q03/L1",
      });

      expect(actions[2]).to.satisfy(isUpdate);
      expect((actions[2] as Update).attributes).to.deep.equal({
        path: "AA1/E1/Q03/L2",
      });
    });

    it("also updates Terminal connectivityNode and bayName", () => {
      const actions = updateBay({
        element: aa1e1q01,
        attributes: { name: "Q03" },
      });

      expect(actions.length).to.equal(6);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(aa1e1q01);

      expect(actions[3]).to.satisfy(isUpdate);
      expect((actions[3] as Update).attributes).to.deep.equal({
        connectivityNode: "AA1/E1/Q03/L1",
        bayName: "Q03",
      });

      expect(actions[4]).to.satisfy(isUpdate);
      expect((actions[4] as Update).attributes).to.deep.equal({
        connectivityNode: "AA1/E1/Q03/L1",
        bayName: "Q03",
      });

      expect(actions[5]).to.satisfy(isUpdate);
      expect((actions[5] as Update).attributes).to.deep.equal({
        connectivityNode: "AA1/E1/Q03/L2",
        bayName: "Q03",
      });
    });

    it("also updates Terminal connectivityNode and bayName outside the bay element", () => {
      const actions = updateBay({
        element: aa1e1bb1,
        attributes: { name: "BB2" },
      });

      expect(actions.length).to.equal(5);
    });
  });
});
