import { expect } from "chai";

import {
  gooseSubscriptionEd2,
  svSubscriptionEd2,
} from "./removeSubscription.testfiles.js";
import { findElement } from "../foundation/helpers.test.js";

import { removeSubscriptionSupervision } from "./removeSubscriptionSupervision.js";
import { Insert, isInsert, isRemove } from "../foundation/utils.js";

const docEd2Goose = findElement(gooseSubscriptionEd2) as XMLDocument;

const docEd2Sv = findElement(svSubscriptionEd2) as XMLDocument;

describe("Function to remove supervisions (removeSubscription)", () => {
  describe("For GOOSE", () => {
    describe("Only allows supervision removal if declared with valKind/valImport on DTTs/instances", () => {
      it("does not return any action if neither declared", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber4"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });

      it("allows removals if declared on DTTs with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber4"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.not.equal(0);
      });

      it("allows removals if declared on DTTs with valKind=RO/valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber4"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"][srcCBName="GOOSE1"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.not.equal(0);
      });

      it("allows removals if declared on first instantiated element with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber5"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.not.equal(0);
      });

      it("does not allow removals with only valKind=RO/Conf", () => {
        const extRef1 = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber6"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][daName="stVal"]`
        )!;
        const edits1 = removeSubscriptionSupervision(extRef1);
        expect(edits1.length).to.equal(0);

        const extRef2 = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber6"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"][srcCBName="GOOSE1"]`
        )!;
        const edits2 = removeSubscriptionSupervision(extRef2);
        expect(edits2.length).to.equal(0);
      });

      it("does not allow removals with only valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber7"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });
    });

    describe("Does not error on remove supervision with invalid entries if", () => {
      it("ExtRef has no srcXXX attributes", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber2"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][intAddr="NoSrcAttrs"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });

      it("the referenced GSEControl does not exist", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber2"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][intAddr="IncorrectGSEControl"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });

      it("there is no supervision instance to remove them for", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });
    });

    describe("Allows removal of control block references", () => {
      it("for an ExtRef pointing to a supervision LN", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber1"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;

        const edits = removeSubscriptionSupervision(extRef);

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "GOOSE_PublisherQB2_Disconnector/LLN0.GOOSE2"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });

      it("for multiple GOOSE ExtRefs with the same supervision instance", () => {
        const extRef = Array.from(
          docEd2Goose.querySelectorAll(
            `IED[name="GOOSE_Subscriber3"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][doName="Pos"]`
          )
        )!;

        const edits = removeSubscriptionSupervision(extRef);

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "GOOSE_PublisherQB2_Disconnector/LLN0.GOOSE2"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });

      it("for multiple GOOSE ExtRefs with different supervision instances", () => {
        const extRef1 = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber3"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][doName="Pos"][srcCBName="GOOSE1"]`
        )!;
        const extRef2 = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber3"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][doName="Pos"][srcCBName="GOOSE2"]`
        )!;

        const edits = removeSubscriptionSupervision([extRef1, extRef2]);

        expect(edits.length).to.equal(4);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "GOOSE_Publisher2QB2_Disconnector/LLN0.GOOSE1"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;

        expect(isRemove(edits[2])).to.be.true;
        expect(edits[2].node.nodeName).to.be.equal("Val");
        expect(edits[2].node.textContent).to.be.equal(
          "GOOSE_Publisher2QB2_Disconnector/LLN0.GOOSE2"
        );

        expect(isInsert(edits[3])).to.be.true;
        expect(edits[3].node.nodeName).to.be.equal("Val");
        expect(edits[3].node.textContent).to.be.equal("");
        expect((<Insert>edits[3]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[3]).reference).to.be.null;
      });

      it("even if it is the first supervision instance", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber1"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "GOOSE_PublisherQB2_Disconnector/LLN0.GOOSE2"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });
    });

    describe("Allows removal of supervision LNs with the removeLN option", () => {
      it("For a supervision LN", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber4"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef, { removeLN: true });

        expect(edits.length).to.equal(1);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("LN");
        expect((<Element>edits[0].node).getAttribute("inst")).to.be.equal("2");
      });

      it("except if it is not the first supervision LN (returns Val)", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber5"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef, { removeLN: true });

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "GOOSE_PublisherQB2_Disconnector/LLN0.GOOSE2"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });
    });
  });

  describe("For SV", () => {
    describe("Only allows supervision removal if declared with valKind/valImport on DTTs/instances", () => {
      it("does not return any action if neither declared", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber4"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });

      it("allows removals if declared on DTTs with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber4"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.not.equal(0);
      });

      it("allows removals if declared on DTTs with valKind=RO/valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber4"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.not.equal(0);
      });

      it("allows removals if declared on first instantiated element with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber5"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.not.equal(0);
      });

      it("does not allow removals with only valKind=RO/Conf", () => {
        const extRef1 = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber6"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef1);
        expect(edits.length).to.equal(0);

        const extRef2 = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber6"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        const edits2 = removeSubscriptionSupervision(extRef2);
        expect(edits2.length).to.equal(0);
      });

      it("does not allow removals with only valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber7"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;

        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });
    });

    describe("Does not error on remove supervision with invalid entries if", () => {
      it("ExtRef has no srcXXX attributes", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber2"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="AmpSv;TCTR1/AmpSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });

      it("the referenced SampledValueControl does not exist", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber2"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });

      it("there is no supervision instance to remove them for", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher2"][intAddr="AmpSv;TCTR1/AmpSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef);
        expect(edits.length).to.equal(0);
      });
    });

    describe("Allows removal of control block references", () => {
      it("for an ExtRef pointing to a supervision LN", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;

        const edits = removeSubscriptionSupervision(extRef);

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "SMV_PublisherCurrentTransformer/LLN0.currentOnly"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });

      it("for multiple ExtRefs with the same supervision instance", () => {
        const extRefs = Array.from(
          docEd2Sv.querySelectorAll(
            `IED[name="SMV_Subscriber3"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher"][srcCBName="currentOnly"]`
          )
        )!;

        const edits = removeSubscriptionSupervision(extRefs);

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "SMV_PublisherCurrentTransformer/LLN0.currentOnly"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });

      it("for multiple ExtRefs with different supervision instances", () => {
        const extRef1 = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber3"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher"][srcCBName="fullSmv"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        const extRef2 = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber3"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][srcCBName="currentOnly"][intAddr="AmpSv;TCTR2/AmpSv/instMag.i"]`
        )!;

        const edits = removeSubscriptionSupervision([extRef1, extRef2]);

        expect(edits.length).to.equal(4);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "SMV_PublisherCurrentTransformer/LLN0.fullSmv"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;

        expect(isRemove(edits[2])).to.be.true;
        expect(edits[2].node.nodeName).to.be.equal("Val");
        expect(edits[2].node.textContent).to.be.equal(
          "SMV_Publisher2CurrentTransformer/LLN0.currentOnly"
        );

        expect(isInsert(edits[3])).to.be.true;
        expect(edits[3].node.nodeName).to.be.equal("Val");
        expect(edits[3].node.textContent).to.be.equal("");
        expect((<Insert>edits[3]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[3]).reference).to.be.null;
      });

      it("even if it is the first supervision instance", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber3"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][srcCBName="currentOnly"][intAddr="AmpSv;TCTR2/AmpSv/instMag.i"]`
        )!;

        const edits = removeSubscriptionSupervision(extRef);

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "SMV_Publisher2CurrentTransformer/LLN0.currentOnly"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });
    });

    describe("Allows removal of supervision LNs with the removeLN option", () => {
      it("For a supervision LN", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber4"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][srcCBName="currentOnly"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        const edits = removeSubscriptionSupervision(extRef, { removeLN: true });

        expect(edits.length).to.equal(1);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("LN");
        expect((<Element>edits[0].node).getAttribute("inst")).to.be.equal("2");
      });

      it("except if it is not the first supervision LN (returns Val)", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber5"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;

        const edits = removeSubscriptionSupervision(extRef, { removeLN: true });

        expect(edits.length).to.equal(2);

        expect(isRemove(edits[0])).to.be.true;
        expect(edits[0].node.nodeName).to.be.equal("Val");
        expect(edits[0].node.textContent).to.be.equal(
          "SMV_PublisherCurrentTransformer/LLN0.voltageOnly"
        );

        expect(isInsert(edits[1])).to.be.true;
        expect(edits[1].node.nodeName).to.be.equal("Val");
        expect(edits[1].node.textContent).to.be.equal("");
        expect((<Insert>edits[1]).parent.nodeName).to.be.equal("DAI");
        expect((<Insert>edits[1]).reference).to.be.null;
      });
    });
  });
});
