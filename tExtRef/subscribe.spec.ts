import { expect } from "chai";

import { Insert, Update, isInsert, isUpdate } from "../foundation/utils.js";

import { subscriptionEd2, subscriptionEd1 } from "./subscribe.testfiles.js";
import { subscribe } from "./subscribe.js";
import { findElement } from "../foundation/helpers.test.js";

const docEd2 = findElement(subscriptionEd2) as XMLDocument;
const docEd1 = findElement(subscriptionEd1) as XMLDocument;

describe("Function to connect source data to sink elements (subscribe)", () => {
  describe("with invalid inputs", () => {
    it("invalid sink element LDevice", () => {
      const controlBlock = docEd1.querySelector(`GSEControl[desc="goose1"]`)!;
      const fcda = docEd1.querySelector(`FCDA[desc="goose1q"]`)!;
      const sink = docEd1.querySelector(`LDevice[inst="Earth_Switch"]`)!;

      const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
      expect(actions.length).to.equal(0);
    });

    it("invalid sink element missing ExtRef intAddr", () => {
      const controlBlock = docEd2.querySelector(`GSEControl[desc="goose1"]`)!;
      const fcda = docEd2.querySelector(`FCDA[desc="goose1q"]`)!;
      const sink = docEd2.querySelector(`ExtRef[desc="missingIntAddr"]`)!;

      const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
      expect(actions.length).to.equal(0);
    });

    it("invalid sink element subscriber later binding ExtRef", () => {
      const controlBlock = docEd2.querySelector(`GSEControl[desc="goose1"]`)!;
      const fcda = docEd2.querySelector(`FCDA[desc="goose1q"]`)!;
      const sink = docEd2.querySelector(`ExtRef[desc="subscribedExtRef"]`)!;

      const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
      expect(actions.length).to.equal(0);
    });

    it("invalid source.fcda element", () => {
      const fcda = docEd1.querySelector(`FCDA[desc="missingDoName"]`)!;
      const sink = docEd1.querySelector(`Inputs`)!;

      const actions = subscribe([{ sink, source: { fcda } }]);
      expect(actions.length).to.equal(0);
    });

    it("invalid with orphan FCDA", () => {
      const source = docEd1.querySelector(`FCDA[desc="goose1q"]`)!;
      const orphanFcda = source.cloneNode(true) as Element;
      const sink = docEd2.querySelector(`Inputs`)!;

      expect(
        subscribe([{ sink, source: { fcda: orphanFcda } }]).length
      ).to.equal(0);
    });
  });

  describe("with edition 1 projects", () => {
    it("return update action for later binding type ExtRef ", () => {
      const controlBlock = docEd1.querySelector(`GSEControl[desc="goose1"]`)!;
      const fcda = docEd1.querySelector(`FCDA[desc="goose1q"]`)!;
      const sink = docEd1.querySelector(`ExtRef[intAddr="Pos;CSWI1/Pos/q"]`)!;

      const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfies(isUpdate);
      expect((actions[0] as Update).element).to.equal(sink);
      expect((actions[0] as Update).attributes).to.deep.equal({
        iedName: "GOOSE_Publisher",
        ldInst: "QB1_Disconnector",
        prefix: "",
        lnClass: "CSWI",
        lnInst: "1",
        doName: "Pos",
        daName: "q",
        fc: "ST",
      });
    });

    it("returns insert action for non later binding type subscription", () => {
      const controlBlock = docEd1.querySelector(`GSEControl[desc="goose1"]`)!;
      const fcda = docEd1.querySelector(`FCDA[desc="goose1q"]`)!;
      const sink = docEd1.querySelector(`Inputs`)!;

      const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
      expect(actions.length).to.equal(1);
      expect(actions[0]).to.satisfies(isInsert);
      expect(((actions[0] as Insert).parent as Element).tagName).to.equal(
        "Inputs"
      );
      expect(((actions[0] as Insert).node as Element).tagName).to.equal(
        "ExtRef"
      );
      expect(((actions[0] as Insert).reference as Element).tagName).to.equal(
        "ExtRef"
      );

      const extRef = (actions[0] as Insert).node as Element;
      expect(extRef.getAttribute("iedName")).to.equal("GOOSE_Publisher");
      expect(extRef.getAttribute("ldInst")).to.equal("QB1_Disconnector");
      expect(extRef.getAttribute("prefix")).to.equal("");
      expect(extRef.getAttribute("lnClass")).to.equal("CSWI");
      expect(extRef.getAttribute("lnInst")).to.equal("1");
      expect(extRef.getAttribute("doName")).to.equal("Pos");
      expect(extRef.getAttribute("daName")).to.equal("q");
      expect(extRef.getAttribute("fc")).to.equal("ST");
      expect(extRef.hasAttribute("serviceType")).to.be.false;
      expect(extRef.hasAttribute("srcLDInst")).to.be.false;
      expect(extRef.hasAttribute("srcPrefix")).to.be.false;
      expect(extRef.hasAttribute("srcLNClass")).to.be.false;
      expect(extRef.hasAttribute("srcLNInst")).to.be.false;
      expect(extRef.hasAttribute("srcCBName")).to.be.false;
    });
  });

  describe("with edition 2 and upward projects", () => {
    describe("for later binding type subscription", () => {
      it("checks for invalid pLN to lnClass", () => {
        const controlBlock = docEd2.querySelector("ReportControl")!;
        const fcda = docEd2.querySelector(`DataSet[name="Meas"] > FCDA`)!;
        const source = { fcda, controlBlock };

        const sink = docEd2.querySelector(`ExtRef[intAddr="invalAnalogue1"]`)!;
        expect(subscribe([{ sink, source }]).length).to.equal(0);
      });

      it("checks for invalid pDO to doName", () => {
        const controlBlock = docEd2.querySelector("ReportControl")!;
        const fcda = docEd2.querySelector(`DataSet[name="Meas"] > FCDA`)!;
        const source = { fcda, controlBlock };

        const sink = docEd2.querySelector(`ExtRef[intAddr="invalAnalogue1"]`)!;
        expect(subscribe([{ sink, source }]).length).to.equal(0);
      });

      it("checks for invalid pDA to daName", () => {
        const controlBlock = docEd2.querySelector("ReportControl")!;
        const fcda = docEd2.querySelector(`DataSet[name="Meas"] > FCDA`)!;
        const source = { fcda, controlBlock };

        const sink = docEd2.querySelector(`ExtRef[intAddr="invalAnalogue1"]`)!;
        expect(subscribe([{ sink, source }]).length).to.equal(0);
      });

      it("checks for invalid pServT to controlBlock.tagName", () => {
        const controlBlock = docEd2.querySelector("GSEControl")!;
        const fcda = docEd2.querySelector(`DataSet[name="Meas"] > FCDA`)!;
        const source = { fcda, controlBlock };

        const sink = docEd2.querySelector(`ExtRef[intAddr="validAnalogue"]`)!;
        expect(subscribe([{ sink, source }]).length).to.equal(0);
      });

      it("is strict with incorrect FCDA definition", () => {
        const fcda = docEd2.querySelector(`FCDA[ldInst="NonExistingLDinst"]`)!;
        const sink = docEd2.querySelector(`ExtRef[intAddr="validAnalogue"]`)!;

        expect(subscribe([{ sink, source: { fcda } }]).length).to.equal(0);
      });

      it("returns no update action with failing SPS/BOOLEAN check", () => {
        const controlBlock = docEd2.querySelector(`GSEControl[name="GOOSE1"]`)!;
        const fcda = docEd2.querySelector(`FCDA[desc="goose1q"]`)!;
        const sink = docEd2.querySelector(`ExtRef[intAddr="restrictExtRef"]`)!;

        const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
        expect(actions.length).to.equal(0);
      });

      it("returns no update action with failing CMV/FLOAT32 check ", () => {
        const controlBlock = docEd2.querySelector(`ReportControl`)!;
        const fcda = docEd2.querySelector(` DataSet[name="Meas"] > FCDA`)!;
        const sink = docEd2.querySelector(`ExtRef[intAddr="wrongAnalogue"]`)!;

        const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
        expect(actions.length).to.equal(0);
      });

      it("returns update action with passing SPC/BOOLEAN check", () => {
        const controlBlock = docEd2.querySelector(`GSEControl[name="GOOSE1"]`)!;
        const fcda = docEd2.querySelector(`FCDA[desc="goose1stVal"]`)!;
        const sink = docEd2.querySelector(`ExtRef[intAddr="restrictExtRef"]`)!;

        const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
        expect(actions.length).to.equal(1);
      });

      it("returns update action with passing CMV/FLOAT32 check", () => {
        const controlBlock = docEd2.querySelector(` ReportControl`)!;
        const fcda = docEd2.querySelector(` DataSet[name="Meas"] > FCDA`)!;
        const sink = docEd2.querySelector(`ExtRef[intAddr="validAnalogue"]`)!;

        const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
        expect(actions.length).to.equal(1);
      });

      it("return update action with srcxxx attributes with controlBlock set", () => {
        const controlBlock = docEd2.querySelector(`GSEControl[name="GOOSE1"]`)!;
        const fcda = docEd2.querySelector(`FCDA[desc="goose1stVal"]`)!;
        const sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] ExtRef[intAddr="Pos;CSWI1/Pos/stVal"]`
        )!;

        const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
        expect(actions.length).to.equal(1);
        expect(actions[0]).to.satisfies(isUpdate);
        expect((actions[0] as Update).element).to.equal(sink);
        expect((actions[0] as Update).attributes).to.deep.equal({
          iedName: "GOOSE_Publisher",
          ldInst: "QB1_Disconnector",
          prefix: "",
          lnClass: "CSWI",
          lnInst: "1",
          doName: "Pos",
          daName: "stVal",
          fc: "ST",
          srcLDInst: "QB2_Disconnector",
          srcPrefix: "",
          srcLNClass: "LLN0",
          srcLNInst: null,
          srcCBName: "GOOSE1",
          serviceType: "GOOSE",
        });
      });

      it("return update action without srcXXX attributes with controlBlock set", () => {
        const controlBlock = undefined;
        const fcda = docEd2.querySelector(`FCDA[desc="goose1stVal"]`)!;
        const sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] ExtRef[intAddr="Pos;CSWI1/Pos/stVal"]`
        )!;

        const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
        expect(actions.length).to.equal(1);
        expect(actions[0]).to.satisfies(isUpdate);
        expect((actions[0] as Update).element).to.equal(sink);
        expect((actions[0] as Update).attributes).to.deep.equal({
          iedName: "GOOSE_Publisher",
          ldInst: "QB1_Disconnector",
          prefix: "",
          lnClass: "CSWI",
          lnInst: "1",
          doName: "Pos",
          daName: "stVal",
          fc: "ST",
          srcLDInst: null,
          srcPrefix: null,
          srcLNClass: null,
          srcLNInst: null,
          srcCBName: null,
          serviceType: null,
        });
      });
    });

    describe("for non later binding type subscription", () => {
      it("return insert action to add ExtRef", () => {
        const controlBlock = docEd2.querySelector(`GSEControl[name="GOOSE1"]`)!;
        const fcda = docEd2.querySelector(`FCDA[desc="goose1q"]`)!;
        const sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] LN[lnClass="XSWI"]`
        )!;

        const actions = subscribe([{ sink, source: { fcda, controlBlock } }]);
        expect(actions.length).to.equal(2);
        expect(actions[0]).to.satisfies(isInsert);
        expect(((actions[0] as Insert).parent as Element).tagName).to.equal(
          "LN"
        );
        expect(((actions[0] as Insert).node as Element).tagName).to.equal(
          "Inputs"
        );
        expect((actions[0] as Insert).reference).to.equal(null);

        const extRef = (actions[1] as Insert).node as Element;
        expect(extRef.getAttribute("iedName")).to.equal("GOOSE_Publisher");
        expect(extRef.getAttribute("ldInst")).to.equal("QB1_Disconnector");
        expect(extRef.getAttribute("prefix")).to.equal("");
        expect(extRef.getAttribute("lnClass")).to.equal("CSWI");
        expect(extRef.getAttribute("lnInst")).to.equal("1");
        expect(extRef.getAttribute("doName")).to.equal("Pos");
        expect(extRef.getAttribute("daName")).to.equal("q");
        expect(extRef.getAttribute("fc")).to.equal("ST");
        expect(extRef.getAttribute("srcLDInst")).to.equal("QB2_Disconnector");
        expect(extRef.getAttribute("srcPrefix")).to.be.equal("");
        expect(extRef.getAttribute("srcLNClass")).to.equal("LLN0");
        expect(extRef.getAttribute("srcLNInst")).to.be.null;
        expect(extRef.getAttribute("srcCBName")).to.equal("GOOSE1");
        expect(extRef.getAttribute("serviceType")).to.equal("GOOSE");
      });

      it("makes sure to create as many inputs as needed", () => {
        const controlBlock = undefined;
        let fcda = docEd2.querySelector(
          `IED[name="GOOSE_Publisher"] DataSet[name="GOOSE2sDataSet"] > FCDA[daName="stVal"]`
        )!;
        let sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] LN[lnClass="XSWI"]`
        )!;
        const extRef3 = { sink, source: { fcda, controlBlock } };

        fcda = docEd2.querySelector(
          `IED[name="GOOSE_Publisher"] DataSet[name="GOOSE2sDataSet"] > FCDA[daName="q"]`
        )!;
        sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] LN[lnClass="XSWI"]`
        )!;
        const extRef4 = { sink, source: { fcda, controlBlock } };

        const actions = subscribe([extRef3, extRef4]);
        expect(actions.length).to.equal(3);
        expect(actions[0]).to.satisfies(isInsert);
        expect(actions[1]).to.satisfies(isInsert);
        expect(actions[2]).to.satisfies(isInsert);
      });
    });

    describe("for a combination of both subscription types", () => {
      it("allows multiple subscriptions at once", () => {
        let controlBlock: Element | undefined =
          docEd2.querySelector(`SampledValueControl`)!;
        let fcda = docEd2.querySelector(
          `IED[name="GOOSE_Publisher"] DataSet[name="SamplVal"] > FCDA[daName="instMag.i"]`
        )!;
        let sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] ExtRef[intAddr="someTCTRinstMag"]`
        )!;
        const extRef1 = {
          sink,
          source: { fcda, controlBlock },
        };

        fcda = docEd2.querySelector(
          `IED[name="GOOSE_Publisher"] DataSet[name="SamplVal"] > FCDA[daName="q"]`
        )!;
        sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] ExtRef[intAddr="someTCTRq"]`
        )!;
        const extRef2 = { sink, source: { fcda, controlBlock } };

        controlBlock = undefined;
        fcda = docEd2.querySelector(
          `IED[name="GOOSE_Publisher"] DataSet[name="GOOSE2sDataSet"] > FCDA[daName="stVal"]`
        )!;
        sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] LN[lnClass="XSWI"]`
        )!;
        const extRef3 = { sink, source: { fcda, controlBlock } };

        fcda = docEd2.querySelector(
          `IED[name="GOOSE_Publisher"] DataSet[name="GOOSE2sDataSet"] > FCDA[daName="q"]`
        )!;
        sink = docEd2.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] LN[lnClass="XSWI"]`
        )!;
        const extRef4 = { sink, source: { fcda, controlBlock } };

        const actions = subscribe([extRef1, extRef2, extRef3, extRef4]);
        expect(actions.length).to.equal(5);
        expect(actions[0]).to.satisfies(isInsert);
        expect(actions[1]).to.satisfies(isUpdate);
        expect((actions[1] as Update).attributes).to.deep.equal({
          iedName: "GOOSE_Publisher",
          ldInst: "SampledValue",
          prefix: "L1",
          lnClass: "TCTR",
          lnInst: "1",
          doName: "AmpSv",
          daName: "instMag.i",
          fc: "MX",
          srcLDInst: "SampledValue",
          srcPrefix: "",
          srcLNClass: "LLN0",
          srcLNInst: null,
          srcCBName: "someSmv",
          serviceType: "SMV",
        });
        expect(actions[2]).to.satisfies(isUpdate);
        expect(actions[3]).to.satisfies(isInsert);
        expect(actions[4]).to.satisfies(isInsert);
      });
    });
  });
});
