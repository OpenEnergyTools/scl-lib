import { controlBlockObjRef } from "../tControl/controlBlockObjRef.js";

export type Supervision = {
  /** Pointer to the supervision location. This can be either a subscriber IED
   * or the logical node (`LGOS`/`LSVS`) itself */
  subscriberIedOrLn: Element;
  /** The control block to be supervised */
  sourceControlBlock: Element;
};

export type SupervisionOptions = {
  /** Whether to check for `valKind`/`valImport`. Defaulting to true */
  checkEditableSrcRef: boolean;
  /**
   * Whether the given control block is already supervised in the subscriber
   * IED. Defaulting to true.
   */
  checkDuplicateSupervisions: boolean;
  /**
   * Whether a new supervision would exceed the limits set in the `Services`
   * element or whether the subscriber LN already hosts a valid supervision.
   * Defaulting to true.
   */
  checkMaxSupervisionLimits: boolean;
};

function supervisionLnClass(supervision: Supervision): "LGOS" | "LSVS" {
  const serviceType = supervision.sourceControlBlock.tagName;
  return serviceType === "GSEControl" ? "LGOS" : "LSVS";
}

function type(supervision: Supervision): "GoCBRef" | "SvCBRef" {
  const serviceType = supervision.sourceControlBlock.tagName;
  return serviceType === "GSEControl" ? "GoCBRef" : "SvCBRef";
}

/** @returns Whether a supervision LN holds a valid control block object ref */
function holdsValidObjRef(ln: Element, type: "GoCBRef" | "SvCBRef"): boolean {
  const objRef = ln.querySelector(
    `:scope > DOI[name="${type}"] > DAI[name="setSrcRef"] > Val`
  )?.textContent;
  if (!objRef) return false;

  // IEDnameLDinst/prefixLnClassLnInst.CbName
  const indexSlash = objRef.indexOf("/");
  const indexDot = objRef.indexOf(".");
  return (
    indexSlash !== 0 &&
    indexSlash < indexDot + 1 &&
    indexDot - 1 < objRef.length
  );
}

/** @returns Whether `Services` element requirement is met */
function exceedSupervisionLimits(supervision: Supervision): boolean {
  const subscriberIed =
    supervision.subscriberIedOrLn.tagName === "IED"
      ? supervision.subscriberIedOrLn
      : supervision.subscriberIedOrLn.closest("IED")!;

  const lnClass = supervisionLnClass(supervision);
  const max = subscriberIed
    ?.querySelector("Services > SupSubscription")
    ?.getAttribute(`${lnClass === "LGOS" ? "maxGo" : "maxSv"}`);
  if (!max || isNaN(parseInt(max, 10))) return false;

  const existingSupervisionLogicalNode = Array.from(
    subscriberIed.querySelectorAll(`LN[lnClass="${lnClass}"]`)
  );

  const availableSupervisorSpots = existingSupervisionLogicalNode.filter(
    (ln) => !holdsValidObjRef(ln, type(supervision))
  );

  return (
    existingSupervisionLogicalNode.length <= parseInt(max, 10) &&
    availableSupervisorSpots.length > 0
  );
}

/** @returns Whether `DA`|`DAI` with name `setSrcRef` is editable */
function isSrcRefEditable(supervision: Supervision): boolean {
  const lnClass = supervisionLnClass(supervision);
  const ln =
    supervision.subscriberIedOrLn.tagName === "LN"
      ? supervision.subscriberIedOrLn
      : supervision.subscriberIedOrLn.querySelector(
          `LN[lnClass="${lnClass}"]`
        )!;

  const doiName = type(supervision);
  if (
    ln.querySelector(
      `:scope > DOI[name="${doiName}"] > 
        DAI[name="setSrcRef"][valImport="true"][valKind="RO"],
       :scope > DOI[name="${doiName}"] > 
        DAI[name="setSrcRef"][valImport="true"][valKind="Conf"]`
    )
  )
    return true;

  const rootNode = ln.ownerDocument;

  const lnType = ln.getAttribute("lnType");

  const goOrSvCBRef = rootNode.querySelector(
    `DataTypeTemplates > 
            LNodeType[id="${lnType}"][lnClass="${lnClass}"] > DO[name="${type(
      supervision
    )}"]`
  );

  const cbRefId = goOrSvCBRef?.getAttribute("type");
  const setSrcRef = rootNode.querySelector(
    `DataTypeTemplates > DOType[id="${cbRefId}"] > DA[name="setSrcRef"]`
  );

  return (
    (setSrcRef?.getAttribute("valKind") === "Conf" ||
      setSrcRef?.getAttribute("valKind") === "RO") &&
    setSrcRef.getAttribute("valImport") === "true"
  );
}

/**
 * A pre requirement for a subscription supervision is an already existing
 * LN of the class `LGOS` or `LSVS` in the subscriber IED.
 * @returns Whether there is a logical node element `LN` with the class `LGOS`, `LSVS`
 */
function existFirstSupervisionOfType(supervision: Supervision): boolean {
  const lnClass =
    supervision.sourceControlBlock.tagName === "GSEControl" ? "LGOS" : "LSVS";

  const firstSupervisionOfType = supervision.subscriberIedOrLn.querySelector(
    `:scope > AccessPoint > Server > LDevice > LN[lnClass="${lnClass}"]`
  );

  return firstSupervisionOfType ? true : false;
}

/** @returns Whether [[`controlBlock`]] is supervised in [[`subscriberIed`]] */
function isControlBlockSupervised(supervision: Supervision): boolean {
  const subscriberIed =
    supervision.subscriberIedOrLn.tagName === "IED"
      ? supervision.subscriberIedOrLn
      : supervision.subscriberIedOrLn.closest("IED")!;

  const lnClass =
    supervision.sourceControlBlock.tagName === "GSEControl" ? "LGOS" : "LSVS";
  const refType =
    supervision.sourceControlBlock.tagName === "GSEControl"
      ? "GoCBRef"
      : "SvCBRef";

  return Array.from(
    subscriberIed?.querySelectorAll(
      `:scope > AccessPoint > Server > LDevice > LN[lnClass="${lnClass}"] 
      > DOI[name="${refType}"] > DAI[name="setSrcRef"] > Val`
    )
  ).some(
    (val) =>
      val.textContent === controlBlockObjRef(supervision.sourceControlBlock)
  );
}

/** Whether subscription supervision instantiation can be performed.
 * ```md
 * - check if `valImport` and `valKind` allow to change subscriber logical node
 * - check whether the control block is already supervised in the IED
 * - check whether there is an available location for the control block
 *   reference to be stored in the supervision source reference.
 * - check whether `Service` element requirements are met
 * - check whether the logical node has missing or empty `Val` content
 *   (iedOrLn is LN)
 * ```
 * @returns Whether subscription supervision can be done */
export function canInstantiateSubscriptionSupervision(
  supervision: Supervision,
  options: SupervisionOptions = {
    checkEditableSrcRef: true,
    checkDuplicateSupervisions: true,
    checkMaxSupervisionLimits: true,
  }
): boolean {
  if (
    options.checkDuplicateSupervisions &&
    isControlBlockSupervised(supervision)
  )
    return false;

  if (supervision.subscriberIedOrLn.tagName === "LN") {
    const type =
      supervision.sourceControlBlock.tagName === "GSEControl"
        ? "GoCBRef"
        : "SvCBRef";
    if (holdsValidObjRef(supervision.subscriberIedOrLn, type)) return false;
  } else {
    if (!existFirstSupervisionOfType(supervision)) return false;
  }

  if (
    options.checkMaxSupervisionLimits &&
    !exceedSupervisionLimits(supervision)
  )
    return false;

  if (options.checkEditableSrcRef && !isSrcRefEditable(supervision))
    return false;

  return true;
}
