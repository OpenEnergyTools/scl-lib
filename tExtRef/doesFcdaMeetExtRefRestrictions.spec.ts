import { expect } from "chai";

import { findElement } from "../foundation/helpers.test.js";
import { publisherIED } from "./doesFcdaMeetExtRefRestrictions.testfiles.js";

import { doesFcdaMeetExtRefRestrictions } from "./doesFcdaMeetExtRefRestrictions.js";

const orphanFCDA = `<FCDA iedName="someIED" ldInst="someLdInst" lnClass="PTOC" lnInst="1" doName="Op" daName="general" fc="ST"/>`;
const extRefXSWIPosDbPos = `<ExtRef pDO="Pos" pDA="stVal" pServT="GOOSE" pLN="XSWI"/>`;
const extRefXSWIPosQ = `<ExtRef pDO="Pos" pDA="q" pServT="GOOSE" pLN="XSWI"/>`;
const extRefPos = `<ExtRef pDO="Pos" />`;
const extRefBehstVal = `<ExtRef pDO="Beh" pDA="stVal" />`;
const extRefXSWIBehQ = `<ExtRef pDO="Beh" pDA="q" pServT="GOOSE" pLN="CSWI"/>`;
const invalidExtRef = `<ExtRef pDO="someInvalidDO" pDA="Dbpos" pServT="GOOSE" pLN="XSWI"/>`;
const invalidExtRef1 = `<ExtRef pDA="Dbpos" pServT="GOOSE" pLN="XSWI"/>`;
const extRefCMVFLOAT32 = `<ExtRef pDO="A.phsA" pDA="cVal.mag.f" pServT="Report" pLN="MMXU"/>`;
const extRefBlkOpnstVal = `<ExtRef pDO="BlkOpn" pDA="stVal" pLN="CILO" />`;

describe("Function compare FCDA basic types to ExtRef restrictions", () => {
  it("is restrictive with invalid FCDA input", () => {
    const fcda = findElement(orphanFCDA, "FCDA") as Element;
    const extRef = findElement(extRefXSWIPosDbPos, "ExtRef") as Element;

    expect(doesFcdaMeetExtRefRestrictions(extRef, fcda)).to.be.false;
  });

  it("is restrictive with invalid ExtRef input", () => {
    const fcda = findElement(orphanFCDA, "FCDA") as Element;
    const extRef = findElement(invalidExtRef, "ExtRef") as Element;

    expect(doesFcdaMeetExtRefRestrictions(extRef, fcda)).to.be.false;
  });

  it("does not check with missing pDO", () => {
    const fcda = findElement(orphanFCDA, "FCDA") as Element;
    const extRef = findElement(invalidExtRef1, "ExtRef") as Element;

    expect(doesFcdaMeetExtRefRestrictions(extRef, fcda)).to.be.true;
  });

  it("does not check pServT with missing controlServiceType", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="DPCdbpos"]`) as Element;
    const extRef = findElement(extRefXSWIPosDbPos, "ExtRef") as Element;

    expect(doesFcdaMeetExtRefRestrictions(extRef, fcda)).to.be.true;
  });

  it("returns false with not matching pServT", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="DPCdbpos"]`) as Element;
    const extRef = findElement(extRefXSWIPosDbPos, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, { controlBlockType: "SMV" })
    ).to.be.false;
  });

  it("returns false with not matching pLN", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="DPCq"]`) as Element;
    const extRef = findElement(extRefXSWIPosQ, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        controlBlockType: "GOOSE",
      })
    ).to.be.false;
  });

  it("returns false with not matching pDO", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="DPCq"]`) as Element;
    const extRef = findElement(extRefXSWIBehQ, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        controlBlockType: "GOOSE",
      })
    ).to.be.false;
  });

  it("returns false with not matching cdc", () => {
    const fcda = findElement(
      publisherIED,
      `FCDA[desc="USERENSnull"]`
    ) as Element;
    const extRef = findElement(extRefPos, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        controlBlockType: "GOOSE",
      })
    ).to.be.false;
  });

  it("returns false with not matching pDA", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="DPCdbpos"]`) as Element;
    const extRef = findElement(extRefXSWIPosQ, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        controlBlockType: "GOOSE",
      })
    ).to.be.false;
  });

  it("returns false with not matching bType", () => {
    const fcda = findElement(
      publisherIED,
      `FCDA[desc="USERENSstVal"]`
    ) as Element;
    const extRef = findElement(extRefBehstVal, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        controlBlockType: "GOOSE",
      })
    ).to.be.false;
  });

  it("returns true for matching types CMV/FLOAT32 ", () => {
    const fcda = findElement(
      publisherIED,
      `FCDA[desc="CMVFLOAT32"]`
    ) as Element;
    const extRef = findElement(extRefCMVFLOAT32, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        controlBlockType: "Report",
      })
    ).to.be.true;
  });

  it("returns true for matching types DPC/Dbpos ", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="DPCdbpos"]`) as Element;
    const extRef = findElement(extRefXSWIPosDbPos, "ExtRef") as Element;

    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        controlBlockType: "GOOSE",
      })
    ).to.be.true;
  });

  it("returns true for matching types DPC/null ", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="DPCnull"]`) as Element;
    const extRef = findElement(extRefPos, "ExtRef") as Element;

    expect(doesFcdaMeetExtRefRestrictions(extRef, fcda)).to.be.true;
  });

  it("allows to skip cdc and lnClass check ", () => {
    const fcda = findElement(publisherIED, `FCDA[desc="ACTBool"]`) as Element;
    const extRef = findElement(extRefBlkOpnstVal, "ExtRef") as Element;

    expect(doesFcdaMeetExtRefRestrictions(extRef, fcda)).to.be.false;
    expect(
      doesFcdaMeetExtRefRestrictions(extRef, fcda, {
        checkOnlyBType: true,
      })
    ).to.be.true;
  });
});
