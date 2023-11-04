const tAbstractConductingEquipment = [
  "TransformerWinding",
  "ConductingEquipment",
] as const;

const tEquipment = [
  "GeneralEquipment",
  "PowerTransformer",
  ...tAbstractConductingEquipment,
] as const;
const tEquipmentContainer = ["Substation", "VoltageLevel", "Bay"] as const;
const tGeneralEquipmentContainer = ["Process", "Line"] as const;
const tAbstractEqFuncSubFunc = ["EqSubFunction", "EqFunction"] as const;

const tPowerSystemResource = [
  "SubFunction",
  "Function",
  "TapChanger",
  "SubEquipment",
  ...tEquipment,
  ...tEquipmentContainer,
  ...tGeneralEquipmentContainer,
  ...tAbstractEqFuncSubFunc,
] as const;
const tLNodeContainer = ["ConnectivityNode", ...tPowerSystemResource] as const;
const tCertificate = ["GOOSESecurity", "SMVSecurity"] as const;
const tNaming = ["SubNetwork", ...tCertificate, ...tLNodeContainer] as const;

const tAbstractDataAttribute = ["BDA", "DA"] as const;
const tControlWithIEDName = ["SampledValueControl", "GSEControl"] as const;
const tControlWithTriggerOpt = ["LogControl", "ReportControl"] as const;
const tControl = [...tControlWithIEDName, ...tControlWithTriggerOpt] as const;
const tControlBlock = ["GSE", "SMV"] as const;
const tUnNaming = [
  "ConnectedAP",
  "PhysConn",
  "SDO",
  "DO",
  "DAI",
  "SDI",
  "DOI",
  "Inputs",
  "RptEnabled",
  "Server",
  "ServerAt",
  "SettingControl",
  "Communication",
  "Log",
  "LDevice",
  "DataSet",
  "AccessPoint",
  "IED",
  "NeutralPoint",
  ...tControl,
  ...tControlBlock,
  ...tAbstractDataAttribute,
] as const;

const tAnyLN = ["LN0", "LN"] as const;

const tAnyContentFromOtherNamespace = [
  "Text",
  "Private",
  "Hitem",
  "AccessControl",
] as const;

const tCert = ["Subject", "IssuerName"] as const;
const tDurationInMilliSec = ["MinTime", "MaxTime"] as const;

const tIDNaming = ["LNodeType", "DOType", "DAType", "EnumType"] as const;

const tServiceYesNo = [
  "FileHandling",
  "TimeSyncProt",
  "CommProt",
  "SGEdit",
  "ConfSG",
  "GetDirectory",
  "GetDataObjectDefinition",
  "DataObjectDirectory",
  "GetDataSetValue",
  "SetDataSetValue",
  "DataSetDirectory",
  "ReadWrite",
  "TimerActivatedControl",
  "GetCBValues",
  "GSEDir",
  "ConfLdName",
] as const;

const tServiceWithMaxAndMaxAttributes = ["DynDataSet", "ConfDataSet"] as const;

const tServiceWithMax = [
  "GSSE",
  "GOOSE",
  "ConfReportControl",
  "SMVsc",
  ...tServiceWithMaxAndMaxAttributes,
] as const;

const tServiceWithMaxNonZero = ["ConfLogControl", "ConfSigRef"] as const;

const tServiceSettings = [
  "ReportSettings",
  "LogSettings",
  "GSESettings",
  "SMVSettings",
] as const;

const tBaseElement = ["SCL", ...tNaming, ...tUnNaming, ...tIDNaming] as const;

const sCLTags = [
  ...tBaseElement,
  ...tAnyContentFromOtherNamespace,
  "Header",
  "LNode",
  "Val",
  "Voltage",
  "Services",
  ...tCert,
  ...tDurationInMilliSec,
  "Association",
  "FCDA",
  "ClientLN",
  "IEDName",
  "ExtRef",
  "Protocol",
  ...tAnyLN,
  ...tServiceYesNo,
  "DynAssociation",
  "SettingGroups",
  ...tServiceWithMax,
  ...tServiceWithMaxNonZero,
  ...tServiceSettings,
  "ConfLNs",
  "ClientServices",
  "SupSubscription",
  "ValueHandling",
  "RedProt",
  "McSecurity",
  "KDC",
  "Address",
  "P",
  "ProtNs",
  "EnumVal",
  "Terminal",
  "BitRate",
  "Authentication",
  "DataTypeTemplates",
  "History",
  "OptFields",
  "SmvOpts",
  "TrgOps",
  "SamplesPerSec",
  "SmpRate",
  "SecPerSamples",
] as const;

type SCLTag = (typeof sCLTags)[number];

const tBaseNameSequence = ["Text", "Private"] as const;
const tNamingSequence = [...tBaseNameSequence] as const;
const tUnNamingSequence = [...tBaseNameSequence] as const;
const tIDNamingSequence = [...tBaseNameSequence] as const;

const tAbstractDataAttributeSequence = [...tUnNamingSequence, "Val"] as const;
const tLNodeContainerSequence = [...tNamingSequence, "LNode"] as const;
const tPowerSystemResourceSequence = [...tLNodeContainerSequence] as const;
const tEquipmentSequence = [...tPowerSystemResourceSequence] as const;
const tEquipmentContainerSequence = [
  ...tPowerSystemResourceSequence,
  "PowerTransformer",
  "GeneralEquipment",
] as const;
const tAbstractConductingEquipmentSequence = [
  ...tEquipmentSequence,
  "Terminal",
] as const;
const tControlBlockSequence = [...tUnNamingSequence, "Address"] as const;
const tControlSequence = [...tNamingSequence] as const;
const tControlWithIEDNameSequence = [...tControlSequence, "IEDName"] as const;
const tAnyLNSequence = [
  ...tUnNamingSequence,
  "DataSet",
  "ReportControl",
  "LogControl",
  "DOI",
  "Inputs",
  "Log",
] as const;
const tGeneralEquipmentContainerSequence = [
  ...tPowerSystemResourceSequence,
  "GeneralEquipment",
  "Function",
] as const;
const tControlWithTriggerOptSequence = [...tControlSequence, "TrgOps"] as const;
const tAbstractEqFuncSubFuncSequence = [
  ...tPowerSystemResourceSequence,
  "GeneralEquipment",
  "EqSubFunction",
] as const;

export const tags: Record<
  SCLTag,
  {
    parents: SCLTag[];
    children: SCLTag[];
  }
> = {
  AccessControl: {
    parents: ["LDevice"],
    children: [],
  },
  AccessPoint: {
    parents: ["IED"],
    children: [
      ...tNamingSequence,
      "Server",
      "LN",
      "ServerAt",
      "Services",
      "GOOSESecurity",
      "SMVSecurity",
    ],
  },
  Address: {
    parents: ["ConnectedAP", "GSE", "SMV"],
    children: ["P"],
  },
  Association: {
    parents: ["Server"],
    children: [],
  },
  Authentication: {
    parents: ["Server"],
    children: [],
  },
  BDA: {
    parents: ["DAType"],
    children: [...tAbstractDataAttributeSequence],
  },
  BitRate: {
    parents: ["SubNetwork"],
    children: [],
  },
  Bay: {
    parents: ["VoltageLevel"],
    children: [
      ...tEquipmentContainerSequence,
      "ConductingEquipment",
      "ConnectivityNode",
      "Function",
    ],
  },
  ClientLN: {
    parents: ["RptEnabled"],
    children: [],
  },
  ClientServices: {
    parents: ["Services"],
    children: ["TimeSyncProt", "McSecurity"],
  },
  CommProt: {
    parents: ["Services"],
    children: [],
  },
  Communication: {
    parents: ["SCL"],
    children: [...tUnNamingSequence, "SubNetwork"],
  },
  ConductingEquipment: {
    parents: ["Process", "Line", "SubFunction", "Function", "Bay"],
    children: [
      ...tAbstractConductingEquipmentSequence,
      "EqFunction",
      "SubEquipment",
    ],
  },
  ConfDataSet: {
    parents: ["Services"],
    children: [],
  },
  ConfLdName: {
    parents: ["Services"],
    children: [],
  },
  ConfLNs: {
    parents: ["Services"],
    children: [],
  },
  ConfLogControl: {
    parents: ["Services"],
    children: [],
  },
  ConfReportControl: {
    parents: ["Services"],
    children: [],
  },
  ConfSG: {
    parents: ["SettingGroups"],
    children: [],
  },
  ConfSigRef: {
    parents: ["Services"],
    children: [],
  },
  ConnectedAP: {
    parents: ["SubNetwork"],
    children: [...tUnNamingSequence, "Address", "GSE", "SMV", "PhysConn"],
  },
  ConnectivityNode: {
    parents: ["Bay", "Line"],
    children: [...tLNodeContainerSequence],
  },
  DA: {
    parents: ["DOType"],
    children: [...tAbstractDataAttributeSequence],
  },
  DAI: {
    parents: ["DOI", "SDI"],
    children: [...tUnNamingSequence, "Val"],
  },
  DAType: {
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "BDA", "ProtNs"],
  },
  DO: {
    parents: ["LNodeType"],
    children: [...tUnNamingSequence],
  },
  DOI: {
    parents: [...tAnyLN],
    children: [...tUnNamingSequence, "SDI", "DAI"],
  },
  DOType: {
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "SDO", "DA"],
  },
  DataObjectDirectory: {
    parents: ["Services"],
    children: [],
  },
  DataSet: {
    parents: [...tAnyLN],
    children: [...tNamingSequence, "FCDA"],
  },
  DataSetDirectory: {
    parents: ["Services"],
    children: [],
  },
  DataTypeTemplates: {
    parents: ["SCL"],
    children: ["LNodeType", "DOType", "DAType", "EnumType"],
  },
  DynAssociation: {
    parents: ["Services"],
    children: [],
  },
  DynDataSet: {
    parents: ["Services"],
    children: [],
  },
  EnumType: {
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "EnumVal"],
  },
  EnumVal: {
    parents: ["EnumType"],
    children: [],
  },
  EqFunction: {
    parents: [
      "GeneralEquipment",
      "TapChanger",
      "TransformerWinding",
      "PowerTransformer",
      "SubEquipment",
      "ConductingEquipment",
    ],
    children: [...tAbstractEqFuncSubFuncSequence],
  },
  EqSubFunction: {
    parents: ["EqSubFunction", "EqFunction"],
    children: [...tAbstractEqFuncSubFuncSequence],
  },
  ExtRef: {
    parents: ["Inputs"],
    children: [],
  },
  FCDA: {
    parents: ["DataSet"],
    children: [],
  },
  FileHandling: {
    parents: ["Services"],
    children: [],
  },
  Function: {
    parents: ["Bay", "VoltageLevel", "Substation", "Process", "Line"],
    children: [
      ...tPowerSystemResourceSequence,
      "SubFunction",
      "GeneralEquipment",
      "ConductingEquipment",
    ],
  },
  GeneralEquipment: {
    parents: [
      "SubFunction",
      "Function",
      ...tGeneralEquipmentContainer,
      ...tAbstractEqFuncSubFunc,
      ...tEquipmentContainer,
    ],
    children: [...tEquipmentSequence, "EqFunction"],
  },
  GetCBValues: {
    parents: ["Services"],
    children: [],
  },
  GetDataObjectDefinition: {
    parents: ["Services"],
    children: [],
  },
  GetDataSetValue: {
    parents: ["Services"],
    children: [],
  },
  GetDirectory: {
    parents: ["Services"],
    children: [],
  },
  GOOSE: {
    parents: ["Services"],
    children: [],
  },
  GOOSESecurity: {
    parents: ["AccessPoint"],
    children: [...tNamingSequence, "Subject", "IssuerName"],
  },
  GSE: {
    parents: ["ConnectedAP"],
    children: [...tControlBlockSequence, "MinTime", "MaxTime"],
  },
  GSEDir: {
    parents: ["Services"],
    children: [],
  },
  GSEControl: {
    parents: ["LN0"],
    children: [...tControlWithIEDNameSequence, "Protocol"],
  },
  GSESettings: {
    parents: ["Services"],
    children: [],
  },
  GSSE: {
    parents: ["Services"],
    children: [],
  },
  Header: {
    parents: ["SCL"],
    children: ["Text", "History"],
  },
  History: {
    parents: ["Header"],
    children: ["Hitem"],
  },
  Hitem: {
    parents: ["History"],
    children: [],
  },
  IED: {
    parents: ["SCL"],
    children: [...tUnNamingSequence, "Services", "AccessPoint", "KDC"],
  },
  IEDName: {
    parents: ["GSEControl", "SampledValueControl"],
    children: [],
  },
  Inputs: {
    parents: [...tAnyLN],
    children: [...tUnNamingSequence, "ExtRef"],
  },
  IssuerName: {
    parents: ["GOOSESecurity", "SMVSecurity"],
    children: [],
  },
  KDC: {
    parents: ["IED"],
    children: [],
  },
  LDevice: {
    parents: ["Server"],
    children: [...tUnNamingSequence, "LN0", "LN", "AccessControl"],
  },
  LN: {
    parents: ["AccessPoint", "LDevice"],
    children: [...tAnyLNSequence],
  },
  LN0: {
    parents: ["LDevice"],
    children: [
      ...tAnyLNSequence,
      "GSEControl",
      "SampledValueControl",
      "SettingControl",
    ],
  },
  LNode: {
    parents: [...tLNodeContainer],
    children: [...tUnNamingSequence],
  },
  LNodeType: {
    parents: ["DataTypeTemplates"],
    children: [...tIDNamingSequence, "DO"],
  },
  Line: {
    parents: ["Process", "SCL"],
    children: [
      ...tGeneralEquipmentContainerSequence,
      "Voltage",
      "ConductingEquipment",
    ],
  },
  Log: {
    parents: [...tAnyLN],
    children: [...tUnNamingSequence],
  },
  LogControl: {
    parents: [...tAnyLN],
    children: [...tControlWithTriggerOptSequence],
  },
  LogSettings: {
    parents: ["Services"],
    children: [],
  },
  MaxTime: {
    parents: ["GSE"],
    children: [],
  },
  McSecurity: {
    parents: ["GSESettings", "SMVSettings", "ClientServices"],
    children: [],
  },
  MinTime: {
    parents: ["GSE"],
    children: [],
  },
  NeutralPoint: {
    parents: ["TransformerWinding"],
    children: [...tUnNamingSequence],
  },
  OptFields: {
    parents: ["ReportControl"],
    children: [],
  },
  P: {
    parents: ["Address", "PhysConn"],
    children: [],
  },
  PhysConn: {
    parents: ["ConnectedAP"],
    children: [...tUnNamingSequence, "P"],
  },
  PowerTransformer: {
    parents: [...tEquipmentContainer],
    children: [
      ...tEquipmentSequence,
      "TransformerWinding",
      "SubEquipment",
      "EqFunction",
    ],
  },
  Private: {
    parents: [],
    children: [],
  },
  Process: {
    parents: ["Process", "SCL"],
    children: [
      ...tGeneralEquipmentContainerSequence,
      "ConductingEquipment",
      "Substation",
      "Line",
      "Process",
    ],
  },
  ProtNs: {
    parents: ["DAType", "DA"],
    children: [],
  },
  Protocol: {
    parents: ["GSEControl", "SampledValueControl"],
    children: [],
  },
  ReadWrite: {
    parents: ["Services"],
    children: [],
  },
  RedProt: {
    parents: ["Services"],
    children: [],
  },
  ReportControl: {
    parents: [...tAnyLN],
    children: [...tControlWithTriggerOptSequence, "OptFields", "RptEnabled"],
  },
  ReportSettings: {
    parents: ["Services"],
    children: [],
  },
  RptEnabled: {
    parents: ["ReportControl"],
    children: [...tUnNamingSequence, "ClientLN"],
  },
  SamplesPerSec: {
    parents: ["SMVSettings"],
    children: [],
  },
  SampledValueControl: {
    parents: ["LN0"],
    children: [...tControlWithIEDNameSequence, "SmvOpts"],
  },
  SecPerSamples: {
    parents: ["SMVSettings"],
    children: [],
  },
  SCL: {
    parents: [],
    children: [
      ...tBaseNameSequence,
      "Header",
      "Substation",
      "Communication",
      "IED",
      "DataTypeTemplates",
      "Line",
      "Process",
    ],
  },
  SDI: {
    parents: ["DOI", "SDI"],
    children: [...tUnNamingSequence, "SDI", "DAI"],
  },
  SDO: {
    parents: ["DOType"],
    children: [...tNamingSequence],
  },
  Server: {
    parents: ["AccessPoint"],
    children: [
      ...tUnNamingSequence,
      "Authentication",
      "LDevice",
      "Association",
    ],
  },
  ServerAt: {
    parents: ["AccessPoint"],
    children: [...tUnNamingSequence],
  },
  Services: {
    parents: ["IED", "AccessPoint"],
    children: [
      "DynAssociation",
      "SettingGroups",
      "GetDirectory",
      "GetDataObjectDefinition",
      "DataObjectDirectory",
      "GetDataSetValue",
      "SetDataSetValue",
      "DataSetDirectory",
      "ConfDataSet",
      "DynDataSet",
      "ReadWrite",
      "TimerActivatedControl",
      "ConfReportControl",
      "GetCBValues",
      "ConfLogControl",
      "ReportSettings",
      "LogSettings",
      "GSESettings",
      "SMVSettings",
      "GSEDir",
      "GOOSE",
      "GSSE",
      "SMVsc",
      "FileHandling",
      "ConfLNs",
      "ClientServices",
      "ConfLdName",
      "SupSubscription",
      "ConfSigRef",
      "ValueHandling",
      "RedProt",
      "TimeSyncProt",
      "CommProt",
    ],
  },
  SetDataSetValue: {
    parents: ["Services"],
    children: [],
  },
  SettingControl: {
    parents: ["LN0"],
    children: [...tUnNamingSequence],
  },
  SettingGroups: {
    parents: ["Services"],
    children: ["SGEdit", "ConfSG"],
  },
  SGEdit: {
    parents: ["SettingGroups"],
    children: [],
  },
  SmpRate: {
    parents: ["SMVSettings"],
    children: [],
  },
  SMV: {
    parents: ["ConnectedAP"],
    children: [...tControlBlockSequence],
  },
  SmvOpts: {
    parents: ["SampledValueControl"],
    children: [],
  },
  SMVsc: {
    parents: ["Services"],
    children: [],
  },
  SMVSecurity: {
    parents: ["AccessPoint"],
    children: [...tNamingSequence, "Subject", "IssuerName"],
  },
  SMVSettings: {
    parents: ["Services"],
    children: ["SmpRate", "SamplesPerSec", "SecPerSamples", "McSecurity"],
  },
  SubEquipment: {
    parents: [
      "TapChanger",
      "PowerTransformer",
      "ConductingEquipment",
      "TransformerWinding",
      ...tAbstractConductingEquipment,
    ],
    children: [...tPowerSystemResourceSequence, "EqFunction"],
  },
  SubFunction: {
    parents: ["SubFunction", "Function"],
    children: [
      ...tPowerSystemResourceSequence,
      "GeneralEquipment",
      "ConductingEquipment",
      "SubFunction",
    ],
  },
  SubNetwork: {
    parents: ["Communication"],
    children: [...tNamingSequence, "BitRate", "ConnectedAP"],
  },
  Subject: {
    parents: ["GOOSESecurity", "SMVSecurity"],
    children: [],
  },
  Substation: {
    parents: ["SCL"],
    children: [...tEquipmentContainerSequence, "VoltageLevel", "Function"],
  },
  SupSubscription: {
    parents: ["Services"],
    children: [],
  },
  TapChanger: {
    parents: ["TransformerWinding"],
    children: [...tPowerSystemResourceSequence, "SubEquipment", "EqFunction"],
  },
  Terminal: {
    parents: [...tEquipment],
    children: [...tUnNamingSequence],
  },
  Text: {
    parents: sCLTags.filter((tag) => tag !== "Text" && tag !== "Private"),
    children: [],
  },
  TimerActivatedControl: {
    parents: ["Services"],
    children: [],
  },
  TimeSyncProt: {
    parents: ["Services", "ClientServices"],
    children: [],
  },
  TransformerWinding: {
    parents: ["PowerTransformer"],
    children: [
      ...tAbstractConductingEquipmentSequence,
      "TapChanger",
      "NeutralPoint",
      "EqFunction",
      "SubEquipment",
    ],
  },
  TrgOps: {
    parents: ["ReportControl"],
    children: [],
  },
  Val: {
    parents: ["DAI", "DA", "BDA"],
    children: [],
  },
  ValueHandling: {
    parents: ["Services"],
    children: [],
  },
  Voltage: {
    parents: ["VoltageLevel"],
    children: [],
  },
  VoltageLevel: {
    parents: ["Substation"],
    children: [...tEquipmentContainerSequence, "Voltage", "Bay", "Function"],
  },
};

const tagSet = new Set<string>(sCLTags);

export function isSCLTag(tag: string): tag is SCLTag {
  return tagSet.has(tag);
}
