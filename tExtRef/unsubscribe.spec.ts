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
      .querySelectorAll(selector)
  );
}

describe("Function allowing to unsubscribe multiple external references", () => {
  it("returns empty array for empty array input", () =>
    expect(unsubscribe([])).to.be.empty);

  it("returns a remove action for each non later binding ExtRef", () => {
    const extRefs = findElements(multipleExtRefs, "ExtRef");
    const actions = unsubscribe(extRefs);

    expect(actions.length).to.equal(4);
    expect(actions[0]).to.satisfies(isRemove);
    expect((actions[0] as Remove).node).to.equal(extRefs[0]);
    expect(actions[1]).to.satisfies(isRemove);
    expect((actions[1] as Remove).node).to.equal(extRefs[1]);
    expect(actions[2]).to.satisfies(isRemove);
    expect((actions[2] as Remove).node).to.equal(extRefs[2]);
  });

  it("returns an additional remove action for leave parent Input", () => {
    const extRefs = findElements(multipleExtRefs, "ExtRef");
    const actions = unsubscribe(extRefs);

    expect(actions[3]).to.satisfies(isRemove);
    expect((actions[3] as Remove).node).to.equal(extRefs[0].parentElement);
  });

  it("returns update action for later binding type ExtRef", () => {
    const extRefs = findElements(laterBindingExtRefs, "ExtRef");
    const actions = unsubscribe(extRefs);

    expect(actions.length).to.equal(3);
    expect(actions[0]).to.satisfies(isRemove);
    expect((actions[0] as Remove).node).to.equal(extRefs[0]);
    expect(actions[1]).to.satisfies(isRemove);
    expect((actions[1] as Remove).node).to.equal(extRefs[2]);
    expect(actions[2]).to.satisfies(isUpdate);
    expect((actions[2] as Update).element).to.equal(extRefs[1]);
  });

  it("makes sure to remove subscription LGOS supervision as well", () => {
    const extRefs = findElements(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someGse"], ExtRef[srcCBName="someGse2"]'
    );
    const actions = unsubscribe(extRefs);
    const doi = extRefs[0].ownerDocument.querySelector(
      'LN[lnClass="LGOS"][inst="1"] > DOI'
    );
    const ln = extRefs[0].ownerDocument.querySelector(
      'LN[lnClass="LGOS"][inst="2"]'
    );

    expect(actions.length).to.equal(5);
    expect(actions[0]).to.satisfies(isRemove);
    expect((actions[0] as Remove).node).to.equal(extRefs[0]);
    expect(actions[1]).to.satisfies(isRemove);
    expect((actions[1] as Remove).node).to.equal(extRefs[1]);
    expect(actions[2]).to.satisfies(isUpdate);
    expect((actions[2] as Update).element).to.equal(extRefs[2]);
    expect(actions[3]).to.satisfies(isRemove);
    expect((actions[3] as Remove).node).to.equal(doi);
    expect(actions[4]).to.satisfies(isRemove);
    expect((actions[4] as Remove).node).to.equal(ln);
  });

  it("does not remove subscription supervision with remaining connections", () => {
    const extRef = findElement(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someGse"]'
    )!;
    const actions = unsubscribe([extRef]);

    expect(actions.length).to.equal(1);
    expect(actions[0]).to.satisfies(isRemove);
    expect((actions[0] as Remove).node).to.equal(extRef);
  });

  it("does not remove subscription supervision without missing object reference", () => {
    const extRef = findElement(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someGse3"]'
    )!;
    const actions = unsubscribe([extRef]);

    expect(actions.length).to.equal(1);
    expect(actions[0]).to.satisfies(isRemove);
    expect((actions[0] as Remove).node).to.equal(extRef);
  });

  it("makes sure to remove subscription LSVS supervision as well", () => {
    const extRefs = findElements(
      withSubscriptionSupervision,
      'ExtRef[srcCBName="someSmv"]'
    );
    const actions = unsubscribe(extRefs);

    expect(actions.length).to.equal(3);
    expect(actions[0]).to.satisfies(isRemove);
    expect((actions[0] as Remove).node).to.equal(extRefs[0]);
    expect(actions[1]).to.satisfies(isRemove);
    expect((actions[1] as Remove).node).to.equal(extRefs[1]);
  });
});
