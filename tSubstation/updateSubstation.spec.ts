import { expect } from "chai";
import { findElement } from "../foundation/helpers.test.js";

import { Update } from "../foundation/utils.js";
import { substation } from "./substation.testfiles.js";
import { updateSubstation } from "./updateSubstation.js";

const aa1 = findElement(substation, 'Substation[name="AA1"]') as Element;
const aa2 = findElement(substation, 'Substation[name="AA2"]') as Element;

const e1 = new DOMParser()
  .parseFromString('<VoltageLevel name="e1" />', "application/xml")
  .querySelector("VoltageLevel")!;

const orphanAa1 = new DOMParser()
  .parseFromString('<Substation name="AA2" />', "application/xml")
  .querySelector("Substation")!;

describe("update Substation element", () => {
  it("does not seek additional updates when input element is not Substation", () => {
    const edits = updateSubstation({
      element: e1,
      attributes: { name: "E03" },
    });

    expect(edits.length).to.equal(1);
  });

  it("does not seek additional updates with orphan Substation element", () => {
    const edits = updateSubstation({
      element: orphanAa1,
      attributes: { name: "AA3" },
    });

    expect(edits.length).to.equal(1);
  });

  describe("when no name attribute is changed", () => {
    it("updates only Substation attributes", () => {
      const edits = updateSubstation({
        element: aa1,
        attributes: { desc: "newDesc" },
      });

      expect(edits.length).to.equal(1);
      expect(edits[0].element).to.equal(aa1);
      expect(edits[0].attributes).to.deep.equal({
        desc: "newDesc",
      });
    });
  });

  describe("when name attribute is changed", () => {
    it("does not add reference updates when attribute name has not changed", () => {
      const edits = updateSubstation({
        element: aa1,
        attributes: { name: "AA1" },
      });

      expect(edits.length).to.equal(1);
    });

    it("overwrites invalid ConnectivityNode pathName attribute", () => {
      const edits = updateSubstation({
        element: aa2,
        attributes: { name: "AA4" },
      });

      expect(edits.length).to.equal(2);
      expect(edits[1].attributes).to.deep.equal({
        pathName: "AA4/D1/Q01/L1",
      });
    });

    it("also updates related ConnectivityNode path", () => {
      const edits = updateSubstation({
        element: aa1,
        attributes: { name: "AA2" },
      });

      expect(edits.length).to.equal(23);
      expect((edits[0] as Update).element).to.equal(aa1);

      expect((edits[1] as Update).attributes).to.deep.equal({
        pathName: "AA2/J1/BB1/L1",
      });

      expect((edits[2] as Update).attributes).to.deep.equal({
        pathName: "AA2/J1/Q01/L1",
      });

      expect((edits[3] as Update).attributes).to.deep.equal({
        pathName: "AA2/J1/Q01/L2",
      });

      expect((edits[4] as Update).attributes).to.deep.equal({
        pathName: "AA2/E1/BB1/L1",
      });

      expect((edits[5] as Update).attributes).to.deep.equal({
        pathName: "AA2/E1/Q01/L1",
      });
    });

    it("also updates related Terminal connectivityNode and substationName", () => {
      const edits = updateSubstation({
        element: aa1,
        attributes: { name: "AA2" },
      });

      expect(edits.length).to.equal(23);
      expect((edits[0] as Update).element).to.equal(aa1);

      expect((edits[9] as Update).attributes).to.deep.equal({
        connectivityNode: "AA2/E1/BB1/L1",
        substationName: "AA2",
      });

      expect((edits[14] as Update).attributes).to.deep.equal({
        connectivityNode: "AA2/J1/Q01/L2",
        substationName: "AA2",
      });

      expect((edits[17] as Update).attributes).to.deep.equal({
        connectivityNode: "AA2/E1/Q01/L1",
        substationName: "AA2",
      });
    });
  });
});
