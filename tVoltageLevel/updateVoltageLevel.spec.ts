import { expect } from "chai";
import { findElement } from "../foundation/helpers.test.js";

import { Update } from "../foundation/utils.js";
import { substation } from "../tSubstation/substation.testfiles.js";
import { updateVoltageLevel } from "./updateVoltageLevel.js";

const aa1 = findElement(substation, 'Substation[name="AA1"]') as Element;
const aa1e1 = findElement(
  substation,
  'Substation[name="AA1"]>VoltageLevel[name="E1"]',
) as Element;

const aa2d1 = findElement(
  substation,
  'Substation[name="AA2"]>VoltageLevel[name="D1"]',
) as Element;

const orphanVoltageLevel = new DOMParser()
  .parseFromString('<VoltageLevel name="E2" />', "application/xml")
  .querySelector("VoltageLevel")!;

describe("update VoltageLevel element", () => {
  it("does not seek additional updates when input element is not VoltageLevel", () => {
    const edits = updateVoltageLevel({
      element: aa1,
      attributes: { name: "E03" },
    });

    expect(edits.length).to.equal(1);
  });

  it("does not seek additional updates with orphan VoltageLevel element", () => {
    const edits = updateVoltageLevel({
      element: orphanVoltageLevel,
      attributes: { name: "E04" },
    });

    expect(edits.length).to.equal(1);
  });

  describe("when no name attribute is changed", () => {
    it("updates only VoltageLevel attributes", () => {
      const edits = updateVoltageLevel({
        element: aa1e1,
        attributes: { desc: "newDesc", numPhases: "4", nomFreq: "60" },
      });

      expect(edits.length).to.equal(1);
      expect(edits[0].element).to.equal(aa1e1);
      expect(edits[0].attributes).to.deep.equal({
        desc: "newDesc",
        numPhases: "4",
        nomFreq: "60",
      });
    });
  });

  describe("when name attribute is changed", () => {
    it("does not add reference updates when attribute name has not changed", () => {
      const edits = updateVoltageLevel({
        element: aa1e1,
        attributes: { name: "E1" },
      });

      expect(edits.length).to.equal(1);
    });

    it("overwrites invalid ConnectivityNode path attribute", () => {
      const edits = updateVoltageLevel({
        element: aa2d1,
        attributes: { name: "D2" },
      });

      expect(edits.length).to.equal(2);
      expect(edits[1].attributes).to.deep.equal({
        pathName: "AA2/D2/Q01/L1",
      });
    });

    it("also updates related ConnectivityNode path", () => {
      const edits = updateVoltageLevel({
        element: aa1e1,
        attributes: { name: "E2" },
      });

      expect(edits.length).to.equal(15);
      expect((edits[0] as Update).element).to.equal(aa1e1);

      expect((edits[1] as Update).attributes).to.deep.equal({
        pathName: "AA1/E2/BB1/L1",
      });

      expect((edits[2] as Update).attributes).to.deep.equal({
        pathName: "AA1/E2/Q01/L1",
      });

      expect((edits[3] as Update).attributes).to.deep.equal({
        pathName: "AA1/E2/Q01/L2",
      });

      expect((edits[4] as Update).attributes).to.deep.equal({
        pathName: "AA1/E2/Q02/L1",
      });

      expect((edits[5] as Update).attributes).to.deep.equal({
        pathName: "AA1/E2/Q02/L2",
      });
    });

    it("also updates related Terminal connectivityNode and voltageLevelName", () => {
      const edits = updateVoltageLevel({
        element: aa1e1,
        attributes: { name: "E2" },
      });

      expect(edits.length).to.equal(15);
      expect((edits[0] as Update).element).to.equal(aa1e1);

      expect((edits[7] as Update).attributes).to.deep.equal({
        connectivityNode: "AA1/E2/BB1/L1",
        voltageLevelName: "E2",
      });

      expect((edits[8] as Update).attributes).to.deep.equal({
        connectivityNode: "AA1/E2/Q01/L1",
        voltageLevelName: "E2",
      });

      expect((edits[12] as Update).attributes).to.deep.equal({
        connectivityNode: "AA1/E2/Q02/L1",
        voltageLevelName: "E2",
      });
    });
  });
});
