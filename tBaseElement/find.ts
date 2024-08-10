import { SCLTag, isSCLTag } from "./tags.js";
import { isPublic } from "./isPublic.js";
import { parentTags } from "./parentTags.js";

const indexedSCLTags = ["ExtRef", "IEDName", "P", "ProtNs", "Val"] as const;
type IndexedSCLTags = (typeof indexedSCLTags)[number];

export const voidSelector = ":not(*)";

function crossProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (a, b) => <T[][]>a.flatMap((d) => b.map((e) => [d, e].flat())),
    [[]],
  );
}

function pathParts(identity: string): [string, string] {
  const path = identity.split(">");
  const end = path.pop()!;
  const start = path.join(">");
  return [start, end];
}

function hitemSelector(tagName: SCLTag, identity: string): string {
  const [version, revision] = identity.split("\t");

  if (!version || !revision) return voidSelector;

  return `${tagName}[version="${version}"][revision="${revision}"]`;
}

function terminalSelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, connectivityNode] = pathParts(identity);

  const parentSelectors = parentTags(tagName).flatMap((parentTag) =>
    selector(parentTag, parentIdentity).split(","),
  );

  return crossProduct(
    parentSelectors,
    [">"],
    [`${tagName}[connectivityNode="${connectivityNode}"]`],
  )
    .map((strings) => strings.join(""))
    .join(",");
}

function lNodeSelector(tagName: SCLTag, identity: string): string {
  if (identity.endsWith(")")) {
    const [parentIdentity, childIdentity] = pathParts(identity);
    const [lnClass, lnInst, lnType] = childIdentity
      .substring(1, childIdentity.length - 1)
      .split(" ");

    if (!lnClass || !lnType) return voidSelector;

    const parentSelectors = parentTags(tagName).flatMap((parentTag) =>
      selector(parentTag, parentIdentity).split(","),
    );

    return crossProduct(
      parentSelectors,
      [">"],
      [`${tagName}[iedName="None"][lnClass="${lnClass}"][lnType="${lnType}"]`],
      lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
    )
      .map((strings) => strings.join(""))
      .join(",");
  }

  const [iedName, ldInst, prefix, lnClass, lnInst] = identity.split(/[ /]/);

  if (!iedName || !ldInst || !lnClass) return voidSelector;

  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    [`[iedName="${iedName}"]`],
    ldInst === "(Client)"
      ? [":not([ldInst])", '[ldInst=""]']
      : [`[ldInst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
  ];

  return crossProduct(
    [tagName],
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");
}

function kDCSelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, childIdentity] = pathParts(identity);
  const [iedName, apName] = childIdentity.split(" ");
  return `${selector(
    "IED",
    parentIdentity,
  )}>${tagName}[iedName="${iedName}"][apName="${apName}"]`;
}

function associationSelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const [iedName, ldInst, prefix, lnClass, lnInst] =
    childIdentity.split(/[ /]/);

  const parentSelectors = parentTags(tagName).flatMap((parentTag) =>
    selector(parentTag, parentIdentity).split(","),
  );

  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    [`[iedName="${iedName}"]`],
    [`[ldInst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
  ];

  return crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");
}

function lDeviceSelector(tagName: SCLTag, identity: string): string {
  const [iedName, inst] = identity.split(">>");

  if (!inst) return voidSelector;

  return `IED[name="${iedName}"] ${tagName}[inst="${inst}"]`;
}

function fCDASelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const [ldInst, prefix, lnClass, lnInst] = childIdentity.split(/[ /.]/);

  const matchDoDa = childIdentity.match(
    /.([A-Z][A-Za-z0-9.]*) ([A-Za-z0-9.]*) \(/,
  );
  const doName = matchDoDa && matchDoDa[1] ? matchDoDa[1] : "";
  const daName = matchDoDa && matchDoDa[2] ? matchDoDa[2] : "";

  const matchFx = childIdentity.match(/\(([A-Z]{2})/);
  const matchIx = childIdentity.match(/ \[([0-9]{1,2})\]/);

  const fc = matchFx && matchFx[1] ? matchFx[1] : "";
  const ix = matchIx && matchIx[1] ? matchIx[1] : "";

  const [
    parentSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    fcSelectors,
    ixSelectors,
  ] = [
    parentTags(tagName).flatMap((parentTag) =>
      selector(parentTag, parentIdentity).split(","),
    ),
    [`[ldInst="${ldInst}"]`],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
    [`[doName="${doName}"]`],
    daName ? [`[daName="${daName}"]`] : [":not([daName])", '[daName=""]'],
    [`[fc="${fc}"]`],
    ix ? [`[ix="${ix}"]`] : [":not([ix])", '[ix=""]'],
  ];

  return crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    fcSelectors,
    ixSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");
}

function lNSelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const parentSelectors = parentTags(tagName).flatMap((parentTag) =>
    selector(parentTag, parentIdentity).split(","),
  );

  const [prefix, lnClass, inst] = childIdentity.split(" ");

  if (!lnClass) return voidSelector;

  const [prefixSelectors, lnClassSelectors, instSelectors] = [
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    [`[inst="${inst}"]`],
  ];

  return crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    prefixSelectors,
    lnClassSelectors,
    instSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");
}

function clientLNSelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const parentSelectors = parentTags(tagName).flatMap((parentTag) =>
    selector(parentTag, parentIdentity).split(","),
  );

  const [iedName, apRef, ldInst, prefix, lnClass, lnInst] =
    childIdentity.split(/[ /]/);

  const [
    iedNameSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    iedName ? [`[iedName="${iedName}"]`] : [":not([iedName])", '[iedName=""]'],
    apRef ? [`[apRef="${apRef}"]`] : [":not([apRef])", '[apRef=""]'],
    ldInst ? [`[ldInst="${ldInst}"]`] : [":not([ldInst])", '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    [`[lnClass="${lnClass}"]`],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
  ];

  return crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    iedNameSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");
}

function ixNamingSelector(
  tagName: SCLTag,
  identity: string,
  depth = -1,
): string {
  // eslint-disable-next-line no-param-reassign
  if (depth === -1) depth = identity.split(">").length;

  const [parentIdentity, childIdentity] = pathParts(identity);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_0, name, _1, ix] = childIdentity.match(/([^[]*)(\[([0-9]*)\])?/)!;

  if (!name) return voidSelector;

  const parentSelectors = parentTags(tagName)
    .flatMap((parentTag) =>
      parentTag === "SDI"
        ? ixNamingSelector(parentTag, parentIdentity, depth - 1).split(",")
        : selector(parentTag, parentIdentity).split(","),
    )
    // eslint-disable-next-line no-shadow
    .filter((selector) => !selector.startsWith(voidSelector));

  if (parentSelectors.length === 0) return voidSelector;

  const [nameSelectors, ixSelectors] = [
    [`[name="${name}"]`],
    ix ? [`[ix="${ix}"]`] : ['[ix=""]', ":not([ix])"],
  ];

  return crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    nameSelectors,
    ixSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");
}

function connectedAPSelector(tagName: SCLTag, identity: string): string {
  const [iedName, apName] = identity.split(" ");
  if (!iedName || !apName) return voidSelector;
  return `${tagName}[iedName="${iedName}"][apName="${apName}"]`;
}

function controlBlockSelector(tagName: SCLTag, identity: string): string {
  const [ldInst, cbName] = identity.split(" ");

  if (!ldInst || !cbName) return voidSelector;

  return `${tagName}[ldInst="${ldInst}"][cbName="${cbName}"]`;
}

function physConnSelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, pcType] = pathParts(identity);

  const [parentSelectors, typeSelectors] = [
    parentTags(tagName).flatMap((parentTag) =>
      selector(parentTag, parentIdentity).split(","),
    ),
    pcType ? [`[type="${pcType}"]`] : [""],
  ];

  return crossProduct(parentSelectors, [">"], [tagName], typeSelectors)
    .map((strings) => strings.join(""))
    .join(",");
}

function enumValSelector(tagName: SCLTag, identity: string): string {
  const [parentIdentity, ord] = pathParts(identity);
  return `${selector("EnumType", parentIdentity)}>${tagName}[ord="${ord}"]`;
}

function sCLSelector(): string {
  return ":root";
}

function namingSelector(tagName: SCLTag, identity: string, depth = -1): string {
  // eslint-disable-next-line no-param-reassign
  if (depth === -1) depth = identity.split(">").length;

  const [parentIdentity, name] = pathParts(identity);
  if (!name) return voidSelector;

  // eslint-disable-next-line prefer-destructuring
  const parents = parentTags(tagName) as SCLTag[];

  const parentSelectors = parents
    .flatMap((parentTag) =>
      selectorTags[parentTag] === selectorTags.Substation
        ? namingSelector(parentTag, parentIdentity, depth - 1).split(",")
        : selector(parentTag, parentIdentity).split(","),
    )
    // eslint-disable-next-line no-shadow
    .filter((selector) => !selector.startsWith(voidSelector));

  if (parentSelectors.length === 0) return voidSelector;

  return crossProduct(parentSelectors, [">"], [tagName], [`[name="${name}"]`])
    .map((strings) => strings.join(""))
    .join(",");
}

function singletonSelector(tagName: SCLTag, identity: string): string {
  // eslint-disable-next-line prefer-destructuring
  const parents = parentTags(tagName) as SCLTag[];

  const parentSelectors = parents
    .flatMap((parentTag) => selector(parentTag, identity).split(","))
    // eslint-disable-next-line no-shadow
    .filter((selector) => !selector.startsWith(voidSelector));

  if (parentSelectors.length === 0) return voidSelector;

  return crossProduct(parentSelectors, [">"], [tagName])
    .map((strings) => strings.join(""))
    .join(",");
}

function idNamingSelector(tagName: SCLTag, identity: string): string {
  const id = identity.replace(/^#/, "");

  if (!id) return voidSelector;

  return `${tagName}[id="${id}"]`;
}

type SelectorFunction = (tagName: SCLTag, identity: string) => string;

export const selectorTags: Record<SCLTag, SelectorFunction> = {
  AccessControl: singletonSelector,
  AccessPoint: namingSelector,
  Address: singletonSelector,
  Association: associationSelector,
  Authentication: singletonSelector,
  BDA: namingSelector,
  BitRate: singletonSelector,
  Bay: namingSelector,
  ClientLN: clientLNSelector,
  ClientServices: singletonSelector,
  CommProt: singletonSelector,
  Communication: singletonSelector,
  ConductingEquipment: namingSelector,
  ConfDataSet: singletonSelector,
  ConfLdName: singletonSelector,
  ConfLNs: singletonSelector,
  ConfLogControl: singletonSelector,
  ConfReportControl: singletonSelector,
  ConfSG: singletonSelector,
  ConfSigRef: singletonSelector,
  ConnectedAP: connectedAPSelector,
  ConnectivityNode: namingSelector,
  DA: namingSelector,
  DAI: ixNamingSelector,
  DAType: idNamingSelector,
  DO: namingSelector,
  DOI: namingSelector,
  DOType: idNamingSelector,
  DataObjectDirectory: singletonSelector,
  DataSet: namingSelector,
  DataSetDirectory: singletonSelector,
  DataTypeTemplates: singletonSelector,
  DynAssociation: singletonSelector,
  DynDataSet: singletonSelector,
  EnumType: idNamingSelector,
  EnumVal: enumValSelector,
  EqFunction: namingSelector,
  EqSubFunction: namingSelector,
  ExtRef: () => voidSelector,
  FCDA: fCDASelector,
  FileHandling: singletonSelector,
  Function: namingSelector,
  GeneralEquipment: namingSelector,
  GetCBValues: singletonSelector,
  GetDataObjectDefinition: singletonSelector,
  GetDataSetValue: singletonSelector,
  GetDirectory: singletonSelector,
  GOOSE: singletonSelector,
  GOOSESecurity: namingSelector,
  GSE: controlBlockSelector,
  GSEDir: singletonSelector,
  GSEControl: namingSelector,
  GSESettings: singletonSelector,
  GSSE: singletonSelector,
  Header: singletonSelector,
  History: singletonSelector,
  Hitem: hitemSelector,
  IED: namingSelector,
  IEDName: () => voidSelector,
  Inputs: singletonSelector,
  IssuerName: singletonSelector,
  KDC: kDCSelector,
  LDevice: lDeviceSelector,
  LN: lNSelector,
  LN0: singletonSelector,
  LNode: lNodeSelector,
  LNodeType: idNamingSelector,
  Line: namingSelector,
  Log: namingSelector,
  LogControl: namingSelector,
  LogSettings: singletonSelector,
  MaxTime: singletonSelector,
  McSecurity: singletonSelector,
  MinTime: singletonSelector,
  NeutralPoint: terminalSelector,
  OptFields: singletonSelector,
  P: () => voidSelector,
  PhysConn: physConnSelector,
  PowerTransformer: namingSelector,
  Private: () => voidSelector,
  Process: namingSelector,
  ProtNs: () => voidSelector,
  Protocol: singletonSelector,
  ReadWrite: singletonSelector,
  RedProt: singletonSelector,
  ReportControl: namingSelector,
  ReportSettings: singletonSelector,
  RptEnabled: singletonSelector,
  SamplesPerSec: singletonSelector,
  SampledValueControl: namingSelector,
  SecPerSamples: singletonSelector,
  SCL: sCLSelector,
  SDI: ixNamingSelector,
  SDO: namingSelector,
  Server: singletonSelector,
  ServerAt: singletonSelector,
  Services: singletonSelector,
  SetDataSetValue: singletonSelector,
  SettingControl: singletonSelector,
  SettingGroups: singletonSelector,
  SGEdit: singletonSelector,
  SmpRate: singletonSelector,
  SMV: controlBlockSelector,
  SmvOpts: singletonSelector,
  SMVsc: singletonSelector,
  SMVSecurity: namingSelector,
  SMVSettings: singletonSelector,
  SubEquipment: namingSelector,
  SubFunction: namingSelector,
  SubNetwork: namingSelector,
  Subject: singletonSelector,
  Substation: namingSelector,
  SupSubscription: singletonSelector,
  TapChanger: namingSelector,
  Terminal: terminalSelector,
  Text: singletonSelector,
  TimerActivatedControl: singletonSelector,
  TimeSyncProt: singletonSelector,
  TransformerWinding: namingSelector,
  TrgOps: singletonSelector,
  Val: () => voidSelector,
  ValueHandling: singletonSelector,
  Voltage: singletonSelector,
  VoltageLevel: namingSelector,
};

function selector(tagName: SCLTag, identity: string): string {
  return selectorTags[tagName](tagName, identity);
}

function findExtRef(
  root: XMLDocument | Element | DocumentFragment,
  tagName: IndexedSCLTags,
  identity: string,
): Element | null {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const parentSelectors = parentTags(tagName).flatMap((parentTag) =>
    selector(parentTag, parentIdentity).split(","),
  );

  if (childIdentity.endsWith("]")) {
    const [intAddr] = childIdentity.split("[");
    const intAddrSelectors = [`[intAddr="${intAddr}"]`];

    const index =
      childIdentity &&
      childIdentity.match(/\[([0-9]+)\]/) &&
      childIdentity.match(/\[([0-9]+)\]/)![1]
        ? parseFloat(childIdentity.match(/\[([0-9]+)\]/)![1])
        : NaN;

    const extRefSelector = crossProduct(
      parentSelectors,
      [">"],
      [tagName],
      intAddrSelectors,
    )
      .map((strings) => strings.join(""))
      .join(",");

    return (
      Array.from(root.querySelectorAll(extRefSelector)).filter(isPublic)[
        index
      ] ?? null
    );
  }

  let iedName;
  let ldInst;
  let prefix;
  let lnClass;
  let lnInst;
  let doName;
  let daName;
  let serviceType;
  let srcCBName;
  let srcLDInst;
  let srcPrefix;
  let srcLNClass;
  let srcLNInst;

  if (!childIdentity.includes(":") && !childIdentity.includes("@")) {
    [iedName, ldInst, prefix, lnClass, lnInst, doName, daName] =
      childIdentity.split(/[ /]/);
  } else if (childIdentity.includes(":") && !childIdentity.includes("@")) {
    [
      serviceType,
      srcCBName,
      srcLDInst,
      srcPrefix,
      srcLNClass,
      srcLNInst,
      iedName,
      ldInst,
      prefix,
      lnClass,
      lnInst,
      doName,
      daName,
    ] = childIdentity.split(/[ /:]/);
  }

  const [
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    serviceTypeSelectors,
    srcCBNameSelectors,
    srcLDInstSelectors,
    srcPrefixSelectors,
    srcLNClassSelectors,
    srcLNInstSelectors,
  ] = [
    iedName ? [`[iedName="${iedName}"]`] : [":not([iedName])"],
    ldInst ? [`[ldInst="${ldInst}"]`] : [":not([ldInst])", '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    lnClass ? [`[lnClass="${lnClass}"]`] : [":not([lnClass])"],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
    doName ? [`[doName="${doName}"]`] : [":not([doName])"],
    daName ? [`[daName="${daName}"]`] : [":not([daName])", '[daName=""]'],
    serviceType
      ? [`[serviceType="${serviceType}"]`]
      : [":not([serviceType])", '[serviceType=""]'],
    srcCBName
      ? [`[srcCBName="${srcCBName}"]`]
      : [":not([srcCBName])", '[srcCBName=""]'],
    srcLDInst
      ? [`[srcLDInst="${srcLDInst}"]`]
      : [":not([srcLDInst])", '[srcLDInst=""]'],
    srcPrefix
      ? [`[srcPrefix="${srcPrefix}"]`]
      : [":not([srcPrefix])", '[srcPrefix=""]'],
    srcLNClass
      ? [`[srcLNClass="${srcLNClass}"]`]
      : [":not([srcLNClass])", '[srcLNClass=""]'],
    srcLNInst
      ? [`[srcLNInst="${srcLNInst}"]`]
      : [":not([srcLNInst])", '[srcLNInst=""]'],
  ];

  const extRefSelector = crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    iedNameSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
    doNameSelectors,
    daNameSelectors,
    serviceTypeSelectors,
    srcCBNameSelectors,
    srcLDInstSelectors,
    srcPrefixSelectors,
    srcLNClassSelectors,
    srcLNInstSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");

  return (
    Array.from(root.querySelectorAll(extRefSelector)).filter(isPublic)[0] ??
    null
  );
}

function findIEDName(
  root: XMLDocument | Element | DocumentFragment,
  tagName: IndexedSCLTags,
  identity: string,
): Element | null {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const [iedName, apRef, ldInst, prefix, lnClass, lnInst] =
    childIdentity.split(/[ /]/);

  const [
    parentSelectors,
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  ] = [
    parentTags(tagName).flatMap((parentTag) =>
      selector(parentTag, parentIdentity).split(","),
    ),
    apRef ? [`[apRef="${apRef}"]`] : [":not([apRef])", '[apRef=""]'],
    ldInst ? [`[ldInst="${ldInst}"]`] : [":not([ldInst])", '[ldInst=""]'],
    prefix ? [`[prefix="${prefix}"]`] : [":not([prefix])", '[prefix=""]'],
    lnClass ? [`[lnClass="${lnClass}"]`] : [":not([lnClass])", '[lnClass=""]'],
    lnInst ? [`[lnInst="${lnInst}"]`] : [":not([lnInst])", '[lnInst=""]'],
  ];

  const iEDNameSelector = crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    apRefSelectors,
    ldInstSelectors,
    prefixSelectors,
    lnClassSelectors,
    lnInstSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");

  return (
    Array.from(root.querySelectorAll(iEDNameSelector))
      .filter(isPublic)
      .find((iEDName) => iEDName.textContent === iedName) ?? null
  );
}

function findP(
  root: XMLDocument | Element | DocumentFragment,
  tagName: IndexedSCLTags,
  identity: string,
): Element | null {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const [type] = childIdentity.split(" ");
  const index =
    childIdentity &&
    childIdentity.match(/\[([0-9]+)\]/) &&
    childIdentity.match(/\[([0-9]+)\]/)![1]
      ? parseFloat(childIdentity.match(/\[([0-9]+)\]/)![1])
      : NaN;

  const [parentSelectors, typeSelectors] = [
    parentTags(tagName).flatMap((parentTag) =>
      selector(parentTag, parentIdentity).split(","),
    ),
    [`[type="${type}"]`],
  ];

  const pSelector = crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    typeSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");

  return Number.isNaN(index)
    ? Array.from(root.querySelectorAll(pSelector)).find(isPublic) ?? null
    : Array.from(root.querySelectorAll(pSelector)).filter(isPublic)[index] ??
        null;
}

function findProtNs(
  root: XMLDocument | Element | DocumentFragment,
  tagName: IndexedSCLTags,
  identity: string,
): Element | null {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const [type, protNsContent] = childIdentity.split("\t");

  const [parentSelectors, typeSelector] = [
    parentTags(tagName).flatMap((parentTag) =>
      selector(parentTag, parentIdentity).split(","),
    ),
    type && type !== "8-MMS"
      ? [`[type="${type}"]`]
      : [":not([type])", '[type="8-MMS"]'],
  ];

  const protNsSelector = crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    typeSelector,
  )
    .map((strings) => strings.join(""))
    .join(",");

  return (
    Array.from(root.querySelectorAll(protNsSelector))
      .filter(isPublic)
      .find((protNs) => protNs.textContent === protNsContent) ?? null
  );
}

function findVal(
  root: XMLDocument | Element | DocumentFragment,
  tagName: IndexedSCLTags,
  identity: string,
): Element | null {
  const [parentIdentity, childIdentity] = pathParts(identity);

  const [sGroup, indexText] = childIdentity.split(" ");
  const index = parseFloat(indexText);

  const parentSelectors = parentTags(tagName).flatMap((parentTag) =>
    selector(parentTag, parentIdentity).split(","),
  );

  const [nameSelectors] = [sGroup ? [`[sGroup="${sGroup}"]`] : [""]];

  const valSelector = crossProduct(
    parentSelectors,
    [">"],
    [tagName],
    nameSelectors,
  )
    .map((strings) => strings.join(""))
    .join(",");

  return (
    Array.from(root.querySelectorAll(valSelector)).filter(isPublic)[index] ??
    null
  );
}

type FindFunction = (
  doc: XMLDocument | Element | DocumentFragment,
  tagName: IndexedSCLTags,
  identity: string,
) => Element | null;

const sclTags: Record<IndexedSCLTags, FindFunction> = {
  ExtRef: findExtRef,
  IEDName: findIEDName,
  P: findP,
  ProtNs: findProtNs,
  Val: findVal,
};

const tagSet = new Set<string>(indexedSCLTags);

function isIndexedSCL(tag: string): tag is IndexedSCLTags {
  return tagSet.has(tag);
}

export function find(
  root: XMLDocument | Element | DocumentFragment,
  tagName: string,
  identity: string | number,
): Element | null {
  if (typeof identity !== "string" || !isSCLTag(tagName)) return null;

  if (isIndexedSCL(tagName)) return sclTags[tagName](root, tagName, identity);

  return (
    Array.from(
      root.querySelectorAll(selectorTags[tagName](tagName, identity)),
    ).filter(isPublic)[0] ?? null
  );
}
