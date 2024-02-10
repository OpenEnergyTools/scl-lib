import { Insert, createElement } from "../../foundation/utils.js";

import { getReference } from "../../tBaseElement/getReference.js";

import { controlBlockObjRef } from "../../tControl/controlBlockObjRef.js";

import { Supervision, supervisionLnClass, type } from "./foundation.js";

function isFixedInst(
  options: CreateSupervisionOptions,
): options is SupervisionWithFixedInst {
  return "fixedInst" in options;
}

function isNewSupervisionLn(
  options: CreateSupervisionOptions,
): options is NewSupervisionLN {
  return "newSupervisionLn" in options;
}

type SupervisionWithDynamicInst = {
  usedSupervisions?: Set<Element>;
  instGenerator: (supervision: Supervision) => string | undefined;
};

type SupervisionWithFixedInst = {
  usedSupervisions?: Set<Element>;
  fixedInst: string;
};

type NewSupervisionLN = {
  usedSupervisions?: Set<Element>;
  newSupervisionLn: boolean;
  fixedInst?: string;
  instGenerator: (supervision: Supervision) => string | undefined;
};

type CreateSupervisionOptions =
  | NewSupervisionLN
  | SupervisionWithFixedInst
  | SupervisionWithDynamicInst;

function createSupervisionDaiElement(input: {
  doc: XMLDocument;
  cbRefType: string;
  controlBlockReference: string;
}): Element {
  const dai = createElement(input.doc, "DAI", { name: "setSrcRef" });
  const val = createElement(input.doc, "Val", {});

  dai.appendChild(val);
  val.textContent = input.controlBlockReference;

  return dai;
}

function createSupervisionDoiElement(input: {
  doc: XMLDocument;
  cbRefType: string;
  controlBlockReference: string;
}): Element {
  const doi = createElement(input.doc, "DOI", { name: input.cbRefType });
  const dai = createElement(input.doc, "DAI", { name: "setSrcRef" });
  const val = createElement(input.doc, "Val", {});

  doi.appendChild(dai);
  dai.appendChild(val);
  val.textContent = input.controlBlockReference;

  return doi;
}

function cdRefType(logicalNode: Element): string {
  const lnClass = logicalNode.getAttribute("lnClass");
  const cbRefType = lnClass === "LGOS" ? "GoCBRef" : "SvCBRef";

  return cbRefType;
}

function availableSupervisionLn(
  supervision: Supervision,
  usedSupervisions?: Set<Element>,
): Element | null {
  const lnClass = supervisionLnClass(supervision);
  const cbRefType = type(supervision);

  return (
    Array.from(
      supervision.subscriberIedOrLn.querySelectorAll(
        `:scope > AccessPoint > Server > LDevice > LN[lnClass="${lnClass}"]`,
      ),
    )
      // filter already used available logical nodes
      .filter((ln) => !usedSupervisions?.has(ln))
      .find((ln) => {
        return (
          ln.querySelector(
            `:scope > DOI[name="${cbRefType}"] > DAI[name="setSrcRef"] > Val`,
          ) === null ||
          ln.querySelector(
            `:scope > DOI[name="${cbRefType}"] > DAI[name="setSrcRef"] > Val`,
          )?.textContent === ""
        );
      }) ?? null
  );
}

function createSupervisionLogicalNode(
  supervision: Supervision,
  controlBlockReference: string,
  inst: string,
): Insert | null {
  const subscriberIed = supervision.subscriberIedOrLn;
  if (!subscriberIed || !supervision.sourceControlBlock) return null;

  const lnClass = supervisionLnClass(supervision)!;

  const formLn = subscriberIed.querySelector(`LN[lnClass="${lnClass}"]`)!;
  const parent = formLn.parentElement!;

  const lnType = formLn.getAttribute("lnType")!;
  const prefix = formLn.getAttribute("prefix");

  const ln = createElement(subscriberIed.ownerDocument, "LN", {
    prefix,
    lnClass,
    lnType,
    inst,
  });
  const openScdTag = createElement(subscriberIed.ownerDocument, "Private", {
    type: "OpenSCD.create",
  });
  ln.appendChild(openScdTag);

  const lastSupervisionLn = parent.querySelector(
    `:scope > LN[lnClass="${lnClass}"]:last-child`,
  );
  const reference = lastSupervisionLn
    ? lastSupervisionLn.nextElementSibling
    : getReference(parent, "LN");

  const doc = ln.ownerDocument;
  const cbRefType = cdRefType(ln);

  ln.appendChild(
    createSupervisionDoiElement({
      doc,
      cbRefType,
      controlBlockReference,
    }),
  );

  return { parent, node: ln, reference };
}

function updateSupervisionLogicalNode(
  controlBlockReference: string,
  logicalNode: Element,
): Insert {
  const doc = logicalNode.ownerDocument;
  const cbRefType = cdRefType(logicalNode);

  const createSupervisionElementInput = {
    doc,
    cbRefType,
    controlBlockReference,
  };

  const doi = logicalNode.querySelector(`:scope > DOI[name="${cbRefType}"]`);
  if (!doi)
    return {
      parent: logicalNode,
      node: createSupervisionDoiElement(createSupervisionElementInput),
      reference: getReference(logicalNode, "DOI"),
    };

  const dai = logicalNode.querySelector(
    `:scope > DOI[name="${cbRefType}"] > DAI[name="setSrcRef"]`,
  );
  if (!dai)
    return {
      parent: doi,
      node: createSupervisionDaiElement(createSupervisionElementInput),
      reference: getReference(doi, "DAI"),
    };

  const val = logicalNode.querySelector(
    `:scope > DOI[name="${cbRefType}"] > DAI[name="setSrcRef"] > Val`,
  );
  if (!val) {
    const newVal = createElement(doc, "Val", {});

    dai.appendChild(newVal);
    newVal.textContent = controlBlockReference;

    return { parent: dai, node: newVal, reference: getReference(dai, "Val") };
  }

  const cbRef = document.createTextNode(controlBlockReference);
  return { parent: val, node: cbRef, reference: null };
}

/** @returns Insert edit on unused supervision logical node or new supervision logical node */
export function createSupervisionEdit(
  supervision: Supervision,
  options: CreateSupervisionOptions,
): Insert | null {
  const sourceControlBlock = supervision.sourceControlBlock;
  if (!sourceControlBlock) return null;

  const controlBlockReference = controlBlockObjRef(sourceControlBlock);
  if (!controlBlockReference) return null;

  if (supervision.subscriberIedOrLn.tagName === "LN")
    return updateSupervisionLogicalNode(
      controlBlockReference,
      supervision.subscriberIedOrLn,
    );

  if (isNewSupervisionLn(options) && options.newSupervisionLn) {
    const inst = options.fixedInst
      ? options.fixedInst
      : options.instGenerator(supervision);

    return createSupervisionLogicalNode(
      supervision,
      controlBlockReference,
      inst!,
    );
  }

  const unusedSupervisionLogicalNode = availableSupervisionLn(
    supervision,
    options?.usedSupervisions,
  );
  if (!unusedSupervisionLogicalNode) {
    const inst = isFixedInst(options)
      ? options.fixedInst
      : options.instGenerator(supervision);

    return createSupervisionLogicalNode(
      supervision,
      controlBlockReference,
      inst!,
    );
  }

  options.usedSupervisions?.add(unusedSupervisionLogicalNode);
  return updateSupervisionLogicalNode(
    controlBlockReference,
    unusedSupervisionLogicalNode,
  );
}
