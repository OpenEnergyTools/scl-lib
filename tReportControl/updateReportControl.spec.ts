import { expect } from "chai";
import { findElement } from "../foundation/helpers.test.js";

import { Update, isUpdate } from "../foundation/utils.js";
import { updateReportControl } from "./updateReportControl.js";
import { subscribedReport } from "./tReportControl.testfiles.js";

describe("update ReportControl element", () => {
  const attributes = {
    desc: "someDesc",
    buffered: "true",
    rptID: "someRptID",
    indexed: "true",
    bufTime: "100",
    intPd: "40",
  };

  it("returns empty array when input element is not ReportControl", () => {
    const ln = findElement(subscribedReport, "LN0")!;
    const actions = updateReportControl({
      element: ln,
      attributes: {},
    });

    expect(actions).to.be.empty;
  });

  describe("when no name attribute is changed", () => {
    it("updates ReportControl attributes and confRev", () => {
      const reportControl = findElement(subscribedReport, "ReportControl")!;
      const actions = updateReportControl({
        element: reportControl,
        attributes,
      });

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(reportControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        ...attributes,
        confRev: "20001",
      });
    });

    it("updates confRev of DataSet change ReportControl", () => {
      const reportControl = findElement(subscribedReport, "ReportControl")!;
      const actions = updateReportControl({
        element: reportControl,
        attributes: { datSet: "someDataSet" },
      });

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(reportControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        ...{ datSet: "someDataSet" },
        confRev: "20001",
      });
    });
  });

  describe("when name attribute is changed", () => {
    it("also updates subscribed ExtRefs", () => {
      const reportControl = findElement(subscribedReport, "ReportControl")!;
      const actions = updateReportControl({
        element: reportControl,
        attributes: {
          name: "someNewName",
          ...attributes,
        },
      });

      expect(actions.length).to.equal(3);
      expect(actions[0]).to.satisfy(isUpdate);
      expect((actions[0] as Update).element).to.equal(reportControl);
      expect((actions[0] as Update).attributes).to.deep.equal({
        name: "someNewName",
        ...attributes,
        confRev: "20001",
      });

      expect(actions[1]).to.satisfy(isUpdate);
      expect((actions[1] as Update).element.tagName).to.equal("ExtRef");
      expect((actions[1] as Update).attributes).to.deep.equal({
        srcCBName: "someNewName",
      });

      expect(actions[2]).to.satisfy(isUpdate);
      expect((actions[2] as Update).element.tagName).to.equal("ExtRef");
      expect((actions[2] as Update).attributes).to.deep.equal({
        srcCBName: "someNewName",
      });
    });
  });
});
