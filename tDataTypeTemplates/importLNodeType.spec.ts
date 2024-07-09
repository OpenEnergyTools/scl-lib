import { expect } from "chai";

import { importLNodeType } from "./importLNodeType.js";
import {
  baseDataTypes,
  emptyBayTemplate,
  competeBayTemplate,
  invalidBayTemplate,
} from "./importLNodeType.testfiles.js";

import { findElement } from "../foundation/helpers.test.js";

const emptyTemplate = findElement(emptyBayTemplate) as XMLDocument;
const completeTemplate = findElement(competeBayTemplate) as XMLDocument;
const invalidTemplate = findElement(invalidBayTemplate) as XMLDocument;
const tctrLNodeType = findElement(
  baseDataTypes,
  'LNodeType[id="Dummy.TCTR"]'
) as Element;
const mmxuLNodeType = findElement(
  baseDataTypes,
  'LNodeType[id="Dummy.MMXU"]'
) as Element;

describe("Function to import LNodeType with its sub data", () => {
  it("is inserting the LNodeType itself element when missing", () => {
    const edits = importLNodeType(tctrLNodeType, emptyTemplate);

    expect(edits.length).to.equal(6);
    expect(edits[1].node).to.equal(tctrLNodeType);
  });

  it("is inserting DataTypeTemplate element when missing", () => {
    const edits = importLNodeType(tctrLNodeType, emptyTemplate);

    expect(edits.length).to.equal(6);
    expect((edits[0].node as Element).tagName).to.equal("DataTypeTemplates");
  });

  it("can deal with structure DOs and DAs", () => {
    const edits = importLNodeType(mmxuLNodeType, completeTemplate);

    expect(edits.length).to.equal(14);
  });

  it("is checking for duplicate data types", () => {
    const edits = importLNodeType(tctrLNodeType, completeTemplate);

    expect(edits.length).to.equal(0);
  });

  it("is returning an empty string on invalid SCL files", () => {
    const edits = importLNodeType(tctrLNodeType, invalidTemplate);

    expect(edits.length).to.equal(0);
  });
});
