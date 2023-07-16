import { expect } from "chai";

import {
  gooseSubscriptionEd2,
  svSubscriptionEd2,
} from "./removeSubscription.testfiles.js";
import { findElement } from "../foundation/helpers.test.js";

import { canRemoveSubscriptionSupervision } from "./canRemoveSubscriptionSupervision.js";

const docEd2Goose = findElement(gooseSubscriptionEd2) as XMLDocument;
const docEd2Sv = findElement(svSubscriptionEd2) as XMLDocument;

// const docEd2Sv = findElement(svSubscriptionEd2) as XMLDocument;

describe("Function to check if supervision references can be removed (canRemoveSubscriptionSupervision)", () => {
  describe("For GOOSE", () => {
    describe("Only allows supervision removal if declared with valKind/valImport on DTTs/instances", () => {
      it("does not return any action if neither declared", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber4"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.false;
      });

      it("allows removals if declared on DTTs with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber4"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][daName="stVal"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.true;
      });

      it("allows removals if declared on DTTs with valKind=RO/valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber4"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"][srcCBName="GOOSE1"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.true;
      });

      it("allows removals if declared on first instantiated element with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber5"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][daName="stVal"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.true;
      });

      it("does not allow removals with only valKind=RO/Conf", () => {
        const extRef1 = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber6"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher2"][daName="stVal"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef1)).to.be.false;

        const extRef2 = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber6"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"][srcCBName="GOOSE1"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef2)).to.be.false;
      });

      it("does not allow removals with only valImport=true", () => {
        const extRef = docEd2Goose.querySelector(
          `IED[name="GOOSE_Subscriber7"] LDevice[inst="Earth_Switch"] Inputs > ExtRef[iedName="GOOSE_Publisher"][daName="stVal"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.false;
      });
    });
  });

  describe("for SMV", () => {
    describe("Only allows supervision removal if declared with valKind/valImport on DTTs/instances", () => {
      it("does not return any action if neither valKind/valImport declared", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber4"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.false;
      });

      it("allows removals if declared on DTTs with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber4"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.true;
      });

      it("allows removals if declared on DTTs with valKind=RO/valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber4"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.true;
      });

      it("allows removals if declared on first instantiated element with valKind=Conf/valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber5"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.true;
      });

      it("does not allow removals with only valKind=RO/Conf", () => {
        const extRef1 = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber6"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef1)).to.be.false;

        const extRef2 = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber6"] LDevice[inst="Overcurrent"] Inputs > ExtRef[iedName="SMV_Publisher2"][intAddr="AmpSv;TCTR3/AmpSv/instMag.i"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef2)).to.be.false;
      });

      it("does not allow removals with only valImport=true", () => {
        const extRef = docEd2Sv.querySelector(
          `IED[name="SMV_Subscriber7"] LDevice[inst="Overvoltage"] Inputs > ExtRef[iedName="SMV_Publisher"][intAddr="VolSv;TVTR1/VolSv/instMag.i"]`
        )!;
        expect(canRemoveSubscriptionSupervision(extRef)).to.be.false;
      });
    });
  });

  it("for an empty array it does not allow removals", () => {
    const extRef = [];
    expect(canRemoveSubscriptionSupervision(extRef)).to.be.false;
  });
});
