export const secChildren = {
  cnt: {
    tagName: "DataAttribute",
    name: "cnt",
    fc: "ST",
    type: "INT32U",
    dchg: "true",
    descID: "IEC61850_7_3.CDCStatusInfo::SEC.cnt.desc",
    mandatory: true,
    presCond: "M",
  },
  sev: {
    tagName: "DataAttribute",
    name: "sev",
    fc: "ST",
    type: "SeverityKind",
    typeKind: "ENUMERATED",
    descID: "IEC61850_7_3.CDCStatusInfo::SEC.sev.desc",
    mandatory: true,
    presCond: "M",
    children: {
      unknown: {
        tagName: "Literal",
        name: "unknown",
        literalVal: "0",
        descID: "IEC61850_7_3.DAEnums::SeverityKind.unknown.desc",
      },
      critical: {
        tagName: "Literal",
        name: "critical",
        literalVal: "1",
        descID: "IEC61850_7_3.DAEnums::SeverityKind.critical.desc",
      },
      major: {
        tagName: "Literal",
        name: "major",
        literalVal: "2",
        descID: "IEC61850_7_3.DAEnums::SeverityKind.major.desc",
      },
      minor: {
        tagName: "Literal",
        name: "minor",
        literalVal: "3",
        descID: "IEC61850_7_3.DAEnums::SeverityKind.minor.desc",
      },
      warning: {
        tagName: "Literal",
        name: "warning",
        literalVal: "4",
        descID: "IEC61850_7_3.DAEnums::SeverityKind.warning.desc",
      },
    },
  },
  t: {
    tagName: "DataAttribute",
    name: "t",
    fc: "ST",
    type: "Timestamp",
    descID: "IEC61850_7_3.CDCStatusInfo::SEC.t.desc",
    mandatory: true,
    presCond: "M",
  },
  addr: {
    tagName: "DataAttribute",
    name: "addr",
    fc: "ST",
    type: "Octet64",
    descID: "IEC61850_7_3.CDCStatusInfo::SEC.addr.desc",
    presCond: "O",
  },
  addInfo: {
    tagName: "DataAttribute",
    name: "addInfo",
    fc: "ST",
    type: "VisString64",
    descID: "IEC61850_7_3.CDCStatusInfo::SEC.addInfo.desc",
    presCond: "O",
  },
  d: {
    tagName: "DataAttribute",
    name: "d",
    fc: "DC",
    type: "VisString255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BasePrimitiveCDC.d.desc",
    presCond: "O",
  },
  dU: {
    tagName: "DataAttribute",
    name: "dU",
    fc: "DC",
    type: "Unicode255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BasePrimitiveCDC.dU.desc",
    presCond: "O",
  },
  cdcName: {
    tagName: "DataAttribute",
    name: "cdcName",
    fc: "EX",
    type: "VisString255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BasePrimitiveCDC.cdcName.desc",
    presCond: "O",
  },
  dataNs: {
    tagName: "DataAttribute",
    name: "dataNs",
    fc: "EX",
    type: "VisString255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BasePrimitiveCDC.dataNs.desc",
    presCond: "MOdataNs",
  },
};
