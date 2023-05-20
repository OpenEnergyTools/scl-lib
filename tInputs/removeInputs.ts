import { Remove } from "../foundation/utils.js";

function isInputLeaf(input: Element, allInputs: Element[]): boolean {
  let sameInputs = 0;
  for (const value of allInputs) if (value === input) sameInputs++;

  return input.querySelectorAll("ExtRef").length === sameInputs;
}

/**
 * Makes sure to not leave empty `Inputs` element after removing
 * its child `ExtRef` elements using [[`extRefActions`]]
 * @returns Actions to remove `Inputs` when empty
 * */
export function removeInputs(extRefs: Remove[]): Remove[] {
  const removeInputs: Remove[] = [];

  const parentInputs = extRefs
    .map((remove) => (remove.node as Element).parentElement)
    .filter((input) => input) as Element[];

  parentInputs.forEach((input, _index, inputs) => {
    const inputNotRemovedYet = !removeInputs.some(
      (removeInput) => removeInput.node === input
    );

    if (isInputLeaf(input, inputs) && inputNotRemovedYet)
      removeInputs.push({ node: input });
  });

  return extRefs.concat(removeInputs);
}
