import { expect } from "chai";

import { findElement } from "../foundation/helpers.test.js";

import {
  atccSelection,
  ltrkSelection,
  mmxuSelection,
} from "./insertSelectedLNodeType.testdata.js";

import {
  incompleteAtccTypes,
  missingMmxuTypes,
  incompleteLtrkTypes,
  emptySSD,
} from "./insertSelectedDataType.testfiles.js";

import { insertSelectedLNodeType } from "./insertSelectedLNodeType.js";

const incompleteMmxu = findElement(missingMmxuTypes) as XMLDocument;
const imcompleteLtrk = findElement(incompleteLtrkTypes) as XMLDocument;
const incompleteAtcc = findElement(incompleteAtccTypes) as XMLDocument;
const missingDataTypes = findElement(emptySSD) as XMLDocument;

describe("insertLNodeTypeSelection", () => {
  it("return empty array with invlaid lnClass", () => {
    expect(
      insertSelectedLNodeType(incompleteMmxu, mmxuSelection, "ERRO").length,
    ).to.equal(0);
  });

  it("insert MMXU LNodeType including missing sub data", () => {
    const edits = insertSelectedLNodeType(
      incompleteMmxu,
      mmxuSelection,
      "MMXU",
    );

    expect(edits.length).to.equal(6);

    const lNodeType = edits[0].node as Element;
    expect(lNodeType.tagName).to.equal("LNodeType");
    expect(lNodeType.getAttribute("lnClass")).to.equal("MMXU");
    expect(lNodeType.getAttribute("id")).to.equal(
      "MMXU$oscd$_3f831c4c0fa5f6bd",
    );

    const doTypeCmv = edits[1].node as Element;
    expect(doTypeCmv.tagName).to.equal("DOType");
    expect(doTypeCmv.getAttribute("cdc")).to.equal("CMV");
    expect(doTypeCmv.getAttribute("id")).to.equal(
      "phsB$oscd$_3a6c99c1de0ca1c1",
    );

    const doTypeWye = edits[2].node as Element;
    expect(doTypeWye.tagName).to.equal("DOType");
    expect(doTypeWye.getAttribute("cdc")).to.equal("WYE");
    expect(doTypeWye.getAttribute("id")).to.equal("A$oscd$_bd01f85651a2b3ee");

    const daTypecVal = edits[3].node as Element;
    expect(daTypecVal.tagName).to.equal("DAType");
    expect(daTypecVal.getAttribute("id")).to.equal(
      "cVal$oscd$_21f679e08734a896",
    );

    const daTypeSBOw = edits[4].node as Element;
    expect(daTypeSBOw.tagName).to.equal("DAType");
    expect(daTypeSBOw.getAttribute("id")).to.equal(
      "SBOw$oscd$_264aab113bc4c3d7",
    );

    const enumType = edits[5].node as Element;
    expect(enumType.tagName).to.equal("EnumType");
    expect(enumType.getAttribute("id")).to.equal(
      "stVal$oscd$_48ba16345b8e7f5b",
    );
  });

  it("insert LTRK LNodeType including missing sub data", () => {
    const edits = insertSelectedLNodeType(
      imcompleteLtrk,
      ltrkSelection,
      "LTRK",
    );

    expect(edits.length).to.equal(7);

    const lNodeType = edits[0].node as Element;
    expect(lNodeType.tagName).to.equal("LNodeType");
    expect(lNodeType.getAttribute("lnClass")).to.equal("LTRK");
    expect(lNodeType.getAttribute("id")).to.equal(
      "LTRK$oscd$_f8074960800758df",
    );

    const doTypeCmv = edits[1].node as Element;
    expect(doTypeCmv.tagName).to.equal("DOType");
    expect(doTypeCmv.getAttribute("cdc")).to.equal("CTS");
    expect(doTypeCmv.getAttribute("id")).to.equal(
      "ApcFTrk$oscd$_9039fc5f67d3778a",
    );

    const doTypeWye = edits[2].node as Element;
    expect(doTypeWye.tagName).to.equal("DOType");
    expect(doTypeWye.getAttribute("cdc")).to.equal("CTS");
    expect(doTypeWye.getAttribute("id")).to.equal(
      "ApcIntTrk$oscd$_0b6b0a301af5aa77",
    );

    const daTypecVal = edits[3].node as Element;
    expect(daTypecVal.tagName).to.equal("DAType");
    expect(daTypecVal.getAttribute("id")).to.equal(
      "ctlVal$oscd$_ed49c2f7a55ad05a",
    );

    const daTypeSBOw = edits[4].node as Element;
    expect(daTypeSBOw.tagName).to.equal("DAType");
    expect(daTypeSBOw.getAttribute("id")).to.equal(
      "ctlVal$oscd$_5a5af9e249dc7f84",
    );

    const enumTypeStVal = edits[5].node as Element;
    expect(enumTypeStVal.tagName).to.equal("EnumType");
    expect(enumTypeStVal.getAttribute("id")).to.equal(
      "stVal$oscd$_74dd2cc4b188b4ad",
    );

    const enumTypeOrCat = edits[6].node as Element;
    expect(enumTypeOrCat.tagName).to.equal("EnumType");
    expect(enumTypeOrCat.getAttribute("id")).to.equal(
      "orCat$oscd$_929ee017c8f9feb5",
    );
  });

  it("insert ATCC LNodeType including missing sub data", () => {
    const edits = insertSelectedLNodeType(
      incompleteAtcc,
      atccSelection,
      "ATCC",
    );

    expect(edits.length).to.equal(5);

    const lNodeType = edits[0].node as Element;
    expect(lNodeType.tagName).to.equal("LNodeType");
    expect(lNodeType.getAttribute("lnClass")).to.equal("ATCC");
    expect(lNodeType.getAttribute("id")).to.equal(
      "ATCC$oscd$_f9d7914eb0ce0e92",
    );

    const doTypeCmv = edits[1].node as Element;
    expect(doTypeCmv.tagName).to.equal("DOType");
    expect(doTypeCmv.getAttribute("cdc")).to.equal("APC");
    expect(doTypeCmv.getAttribute("id")).to.equal(
      "VolSpt$oscd$_ef3a36fd78b41086",
    );

    const daTypecVal = edits[2].node as Element;
    expect(daTypecVal.tagName).to.equal("DAType");
    expect(daTypecVal.getAttribute("id")).to.equal(
      "SBOw$oscd$_61d7e600207c9456",
    );

    const daTypeSBOw = edits[3].node as Element;
    expect(daTypeSBOw.tagName).to.equal("DAType");
    expect(daTypeSBOw.getAttribute("id")).to.equal(
      "Oper$oscd$_5b11d63fa0ade588",
    );

    const enumTypeOrCat = edits[4].node as Element;
    expect(enumTypeOrCat.tagName).to.equal("EnumType");
    expect(enumTypeOrCat.getAttribute("id")).to.equal(
      "ctlModel$oscd$_e975941313cb546c",
    );
  });

  it("insert DataTypeTemplates when missing", () => {
    const edits = insertSelectedLNodeType(
      missingDataTypes,
      atccSelection,
      "ATCC",
    );

    expect(edits.length).to.equal(19);

    const lNodeType = edits[0].node as Element;
    expect(lNodeType.tagName).to.equal("DataTypeTemplates");
  });
});
