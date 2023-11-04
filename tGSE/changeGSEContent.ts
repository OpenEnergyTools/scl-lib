import { Insert, Remove, createElement } from "../foundation/utils.js";

import { getReference } from "../tBaseElement/getReference.js";

import {
  ChangeGseOrSmvAddressOptions,
  changeGseOrSmvAddress,
} from "../tAddress/changeGseOrSmvAddress.js";

export type ChangeGseTimeOptions = { MinTime?: string; MaxTime?: string };

export type ChangeGSEContentOptions = {
  address?: ChangeGseOrSmvAddressOptions;
  timing?: ChangeGseTimeOptions;
};

function changeGseTiming(
  gSE: Element,
  options: ChangeGseTimeOptions
): (Insert | Remove)[] {
  const edits: (Insert | Remove)[] = [];

  const oldMinTime = gSE.querySelector("MinTime");
  const oldMaxTime = gSE.querySelector("MaxTime");

  if (options.MinTime) {
    const newMinTime = createElement(gSE.ownerDocument, "MinTime", {
      unit: "s",
      multiplier: "m",
    });
    newMinTime.textContent = options.MinTime;
    edits.push({
      parent: gSE,
      node: newMinTime,
      reference: getReference(gSE, "MinTime"),
    });
  }
  if (oldMinTime) edits.push({ node: oldMinTime });

  if (options.MaxTime) {
    const newMaxTime = createElement(gSE.ownerDocument, "MaxTime", {
      unit: "s",
      multiplier: "m",
    });
    newMaxTime.textContent = options.MaxTime;
    edits.push({
      parent: gSE,
      node: newMaxTime,
      reference: getReference(gSE, "MaxTime"),
    });
  }
  if (oldMaxTime) edits.push({ node: oldMaxTime });

  return edits;
}

/** Utility function to change the content of the element `GSE`
 * including the child `Address` and the children `MinTime`/`MaxTime`
 * @param element - the element to be updated
 * @param options - the requested changes
 * @returns Edit array updating GSEs children Address, MinTine and MaxTime
 * */
export function changeGSEContent(
  element: Element,
  options: ChangeGSEContentOptions
): (Insert | Remove)[] {
  const addressEdits = options.address
    ? changeGseOrSmvAddress(element, options.address)
    : [];

  const timeEdits = options.timing
    ? changeGseTiming(element, options.timing)
    : [];

  return addressEdits.concat(timeEdits);
}
