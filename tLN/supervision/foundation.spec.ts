import { expect } from "chai";

import { supervision } from "./supervision.testfiles.js";

import { type, supervisionLnClass } from "./foundation.js";

const doc = new DOMParser().parseFromString(supervision, "application/xml");

describe("Returns supervision type", () => {
  it("returns undefined for a supervision which has no control block or correct LN", () => {
    const element = doc.querySelector("LN0")!;
    expect(type({ subscriberIedOrLn: element })).to.be.undefined;
  });
});

describe("Returns supervision class", () => {
  it("returns undefined for a supervision which has no control block or correct LN", () => {
    const element = doc.querySelector("LN0")!;
    expect(supervisionLnClass({ subscriberIedOrLn: element })).to.be.undefined;
  });
});
