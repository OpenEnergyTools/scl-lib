import { expect } from "chai";
import {
  laterBindingExtRefs,
  multipleExtRefs,
  withSubscriptionSupervision,
} from "./unsubscribe.testfiles.js";

import { Remove, Update, isRemove, isUpdate } from "../foundation/utils.js";
import { unsubscribe } from "./unsubscribe.js";
import { findElement } from "../foundation/helpers.test.js";

function findElements(str: string, selector: string): Element[] {
  return Array.from(
    new DOMParser()
      .parseFromString(str, "application/xml")
      .querySelectorAll(selector),
  );
}

describe("Function allowing to unsubscribe multiple external references", () => {
  it("returns empty array for empty array input", () =>
    expect(unsubscribe([])).to.be.empty);

  it("returns a remove edit for each non later binding ExtRef", () => {
    const extRefs = findElements(multipleExtRefs, "ExtRef");
    const edits = unsubscribe(extRefs);

    expect(edits.length).to.equal(4);
    expect(edits[0]).to.satisfies(isRemove);
    expect((edits[0] as Remove).node).to.equal(extRefs[0]);
    expect(edits[1]).to.satisfies(isRemove);
    expect((edits[1] as Remove).node).to.equal(extRefs[1]);
    expect(edits[2]).to.satisfies(isRemove);
    expect((edits[2] as Remove).node).to.equal(extRefs[2]);
  });

  it("returns an additional remove edit for leave parent Input", () => {
    const extRefs = findElements(multipleExtRefs, "ExtRef");
    const edits = unsubscribe(extRefs);

    expect(edits[3]).to.satisfies(isRemove);
    expect((edits[3] as Remove).node).to.equal(extRefs[0].parentElement);
  });

  it("returns update edit for later binding type ExtRef", () => {
    const extRefs = findElements(laterBindingExtRefs, "ExtRef");
    const edits = unsubscribe(extRefs);

    expect(edits.length).to.equal(3);
    expect(edits[0]).to.satisfies(isUpdate);
    expect((edits[0] as Update).element).to.equal(extRefs[0]);
    expect(edits[1]).to.satisfies(isUpdate);
    expect((edits[1] as Update).element).to.equal(extRefs[1]);
    expect(edits[2]).to.satisfies(isUpdate);
    expect((edits[2] as Update).element).to.equal(extRefs[2]);
  });

  it("does not remove ICT defined Ed2 attributes", () => {
    const extRef = findElement(laterBindingExtRefs, "ExtRef")!;
    const edits = unsubscribe([extRef]);

    expect(edits.length).to.equal(1);
    expect(edits[0]).to.satisfies(isUpdate);

    const update = edits[0] as Update;
    expect(update.attributes["intAddr"]).to.be.undefined;
    expect(update.attributes).to.not.have.own.property("serviceType");
  });

  it("does not remove ICT defined Ed2.1 attributes", () => {
    const extRef = findElement(
      laterBindingExtRefs,
      'ExtRef[intAddr="someOtherIntAddr"]',
    )!;
    const edits = unsubscribe([extRef]);

    expect(edits.length).to.equal(1);
    expect(edits[0]).to.satisfies(isUpdate);

    const update = edits[0] as Update;
    expect(update.attributes["intAddr"]).to.be.undefined;
    // remove service type if pServT defined
    expect(update.attributes["serviceType"]).to.be.null;
    expect(update.attributes["pDo"]).to.be.undefined;
    expect(update.attributes["pDA"]).to.be.undefined;
    expect(update.attributes["pServT"]).to.be.undefined;
  });

  it("per default remove subscription LGOS supervision as well", () => {
    const extRefs = findElements(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someGse"], ExtRef[srcCBName="someGse2"]',
    );
    const edits = unsubscribe(extRefs);
    const val = extRefs[0].ownerDocument.querySelector(
      'LN[lnClass="LGOS"][inst="1"] > DOI[name="GoCBRef"] > DAI[name="setSrcRef"] > Val',
    );
    const val2 = extRefs[0].ownerDocument.querySelector(
      'LN[lnClass="LGOS"][inst="2"] > DOI[name="GoCBRef"] > DAI[name="setSrcRef"] > Val',
    );
    expect(edits.length).to.equal(5);
    expect(edits[0]).to.satisfies(isRemove);
    expect((edits[0] as Remove).node).to.equal(extRefs[0]);
    expect(edits[1]).to.satisfies(isRemove);
    expect((edits[1] as Remove).node).to.equal(extRefs[1]);
    expect(edits[2]).to.satisfies(isUpdate);
    expect((edits[2] as Update).element).to.equal(extRefs[2]);
    expect(edits[3]).to.satisfies(isRemove);
    expect((edits[3] as Remove).node).to.equal(val!.firstChild);
    expect(edits[4]).to.satisfies(isRemove);
    expect((edits[4] as Remove).node).to.equal(val2!.firstChild);
  });

  it("with ignoreSupervision do not remove subscription LGOS supervision", () => {
    const extRefs = findElements(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someGse"], ExtRef[srcCBName="someGse2"]',
    );
    const edits = unsubscribe(extRefs, { ignoreSupervision: true });

    expect(edits.length).to.equal(3);
    expect(edits[0]).to.satisfies(isRemove);
    expect((edits[0] as Remove).node).to.equal(extRefs[0]);
    expect(edits[1]).to.satisfies(isRemove);
    expect((edits[1] as Remove).node).to.equal(extRefs[1]);
    expect(edits[2]).to.satisfies(isUpdate);
    expect((edits[2] as Update).element).to.equal(extRefs[2]);
  });

  it("does not remove subscription supervision with remaining connections", () => {
    const extRef = findElement(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someGse"]',
    )!;
    const edits = unsubscribe([extRef]);

    expect(edits.length).to.equal(1);
    expect(edits[0]).to.satisfies(isRemove);
    expect((edits[0] as Remove).node).to.equal(extRef);
  });

  it("does not remove subscription supervision without missing object reference", () => {
    const extRef = findElement(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someGse3"]',
    )!;
    const edits = unsubscribe([extRef]);

    expect(edits.length).to.equal(1);
    expect(edits[0]).to.satisfies(isRemove);
    expect((edits[0] as Remove).node).to.equal(extRef);
  });

  it("makes sure to remove subscription LSVS supervision as well", () => {
    const extRefs = findElements(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someSmv"]',
    );
    const val = extRefs[0].ownerDocument.querySelector(
      'LN[lnClass="LSVS"][inst="1"] > DOI[name="SvCBRef"] > DAI[name="setSrcRef"] > Val',
    );
    const edits = unsubscribe(extRefs);

    expect(edits.length).to.equal(4);
    expect(edits[0]).to.satisfies(isRemove);
    expect((edits[0] as Remove).node).to.equal(extRefs[0]);
    expect(edits[1]).to.satisfies(isRemove);
    expect((edits[1] as Remove).node).to.equal(extRefs[1]);
    expect(edits[2]).to.satisfies(isRemove);
    expect((edits[2] as Remove).node).to.equal(extRefs[1].parentElement);
    expect(edits[3]).to.satisfies(isRemove);
    expect((edits[3] as Remove).node).to.equal(val?.firstChild);
  });

  it("with ignoreSupervision do not remove subscription LGOS supervision", () => {
    const extRefs = findElements(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someSmv"]',
    );
    const edits = unsubscribe(extRefs, { ignoreSupervision: true });

    expect(edits.length).to.equal(3);
    expect(edits[0]).to.satisfies(isRemove);
    expect((edits[0] as Remove).node).to.equal(extRefs[0]);
    expect(edits[1]).to.satisfies(isRemove);
    expect((edits[1] as Remove).node).to.equal(extRefs[1]);
    expect(edits[2]).to.satisfies(isRemove);
    expect((edits[2] as Remove).node).to.equal(extRefs[1].parentElement);
  });

  it("with pServT present, serviceType is removed", () => {
    const extRefs = findElements(
      laterBindingExtRefs,
      'ExtRef[intAddr="someOtherIntAddr"]',
    );
    const edits = unsubscribe(extRefs, { ignoreSupervision: true });

    expect(edits.length).to.equal(1);
    expect((edits[0] as Update).element).to.equal(extRefs[0]);
    expect((edits[0] as Update).attributes.serviceType).to.be.null;
  });

  it("without pServT, serviceType is not removed", () => {
    const extRefs = findElements(
      laterBindingExtRefs,
      'ExtRef[intAddr="someIntAddr"]',
    )[0];
    const edits = unsubscribe([extRefs], { ignoreSupervision: true });

    expect(edits.length).to.equal(1);
    expect((edits[0] as Update).element).to.equal(extRefs);
    expect((edits[0] as Update).attributes).to.not.have.own.property(
      "serviceType",
    );
  });
});
