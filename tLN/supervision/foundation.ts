import { lnInstGenerator } from "../../generator/lnInstGenerator.js";

export type Supervision = {
  /**
   * Reference to the supervision location either as the subscriber IED
   * or the logical node of the class `LGOS`/`LSVS` itself
   */
  subscriberIedOrLn: Element;
  /** The control block to be supervised */
  sourceControlBlock: Element;
};

export type SupervisionOptions = {
  /** Whether supervision instantiation shall be with new logical node instance */
  newSupervisionLn: boolean;
  /**
   * A fixed `inst` attribute for a new logical node (LGOS/LSVS) instance
   * otherwise ignored. The default -1 sets the `inst` attribute automatically.
   */
  fixedLnInst: number;
  /** Whether to check for `valKind`/`valImport`. Defaulting to true */
  checkEditableSrcRef: boolean;
  /**
   * Whether the given control block is already supervised in the subscriber
   * IED. Defaulting to true.
   */
  checkDuplicateSupervisions: boolean;
  /**
   * Whether a new supervision would exceed the limits set in the `Services`
   * section or whether an existing supervision LN control block reference is
   * empty or invalid and can be used. Defaulting to true.
   */
  checkMaxSupervisionLimits: boolean;
};

export function type(supervision: Supervision): "GoCBRef" | "SvCBRef" {
  const serviceType = supervision.sourceControlBlock.tagName;
  return serviceType === "GSEControl" ? "GoCBRef" : "SvCBRef";
}

export function supervisionLnClass(supervision: Supervision): "LGOS" | "LSVS" {
  const serviceType = supervision.sourceControlBlock.tagName;
  return serviceType === "GSEControl" ? "LGOS" : "LSVS";
}

/** @returns Unique attribute `inst` for supervision logical nodes. */
export function globalLnInstGenerator(): (
  supervision: Supervision,
) => string | undefined {
  const lnInstGenerators = new Map<
    string,
    (lnClass: string) => string | undefined
  >();

  return (supervision) => {
    const ied = supervision.subscriberIedOrLn;
    const lnClass = supervisionLnClass(supervision);

    const formLn = ied.querySelector(`LN[lnClass="${lnClass}"]`)!;
    const lDevice = formLn.parentElement!;

    const iedName = `${ied.getAttribute("name")}`;
    if (!lnInstGenerators.has(iedName))
      lnInstGenerators.set(iedName, lnInstGenerator(lDevice, "LN"));

    return lnInstGenerators.get(iedName)!(lnClass);
  };
}

/** @returns Whether child `DA` with name `setSrcRef` can edited by SCL editor */
export function isSrcRefEditable(supervisionLn: Element): boolean {
  const lnClass = supervisionLn.getAttribute("lnClass");
  const cbRefType = lnClass === "LGOS" ? "GoCBRef" : "SvCBRef";

  if (
    supervisionLn.querySelector(
      `:scope > DOI[name="${cbRefType}"] > 
        DAI[name="setSrcRef"][valImport="true"][valKind="RO"],
       :scope > DOI[name="${cbRefType}"] > 
        DAI[name="setSrcRef"][valImport="true"][valKind="Conf"]`,
    )
  )
    return true;

  const rootNode = supervisionLn.ownerDocument;
  const lnType = supervisionLn.getAttribute("lnType");

  const goOrSvCBRef = rootNode.querySelector(
    `DataTypeTemplates > 
        LNodeType[id="${lnType}"][lnClass="${lnClass}"] > DO[name="${cbRefType}"]`,
  );

  const cbRefId = goOrSvCBRef?.getAttribute("type");
  const setSrcRef = rootNode.querySelector(
    `DataTypeTemplates > DOType[id="${cbRefId}"] > DA[name="setSrcRef"]`,
  );

  return (
    (setSrcRef?.getAttribute("valKind") === "Conf" ||
      setSrcRef?.getAttribute("valKind") === "RO") &&
    setSrcRef.getAttribute("valImport") === "true"
  );
}
