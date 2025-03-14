export const iscChildren = {
  origin: {
    tagName: "DataAttribute",
    name: "origin",
    fc: "ST",
    type: "Originator",
    typeKind: "CONSTRUCTED",
    descID: "IEC61850_7_3.CDCControl::ISC.origin.desc",
    presCond: "O",
    children: {
      orCat: {
        tagName: "SubDataAttribute",
        name: "orCat",
        type: "OriginatorCategoryKind",
        typeKind: "ENUMERATED",
        descID: "IEC61850_7_2.DomainTypesGeneral::S_Originator.orCat.desc",
        mandatory: true,
        presCond: "M",
        children: {
          "not-supported": {
            tagName: "Literal",
            name: "not-supported",
            literalVal: "0",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.not-supported.desc",
          },
          "bay-control": {
            tagName: "Literal",
            name: "bay-control",
            literalVal: "1",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.bay-control.desc",
          },
          "station-control": {
            tagName: "Literal",
            name: "station-control",
            literalVal: "2",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.station-control.desc",
          },
          "remote-control": {
            tagName: "Literal",
            name: "remote-control",
            literalVal: "3",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.remote-control.desc",
          },
          "automatic-bay": {
            tagName: "Literal",
            name: "automatic-bay",
            literalVal: "4",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-bay.desc",
          },
          "automatic-station": {
            tagName: "Literal",
            name: "automatic-station",
            literalVal: "5",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-station.desc",
          },
          "automatic-remote": {
            tagName: "Literal",
            name: "automatic-remote",
            literalVal: "6",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-remote.desc",
          },
          maintenance: {
            tagName: "Literal",
            name: "maintenance",
            literalVal: "7",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.maintenance.desc",
          },
          process: {
            tagName: "Literal",
            name: "process",
            literalVal: "8",
            descID:
              "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.process.desc",
          },
        },
      },
      orIdent: {
        tagName: "SubDataAttribute",
        name: "orIdent",
        type: "Octet64",
        descID: "IEC61850_7_2.DomainTypesGeneral::S_Originator.orIdent.desc",
        mandatory: true,
        presCond: "M",
      },
    },
  },
  ctlNum: {
    tagName: "DataAttribute",
    name: "ctlNum",
    fc: "ST",
    type: "INT8U",
    descID: "IEC61850_7_3.CDCControl::ISC.ctlNum.desc",
    presCond: "O",
  },
  valWTr: {
    tagName: "DataAttribute",
    name: "valWTr",
    fc: "ST",
    type: "ValWithTrans",
    typeKind: "CONSTRUCTED",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.valWTr.desc",
    presCond: "MAllOrNonePerGroup",
    presCondArgs: "1",
    children: {
      posVal: {
        tagName: "SubDataAttribute",
        name: "posVal",
        type: "INT8",
        minValue: "-64",
        maxValue: "63",
        descID: "IEC61850_7_3.ConstructedDAs::ValWithTrans.posVal.desc",
        mandatory: true,
        presCond: "M",
      },
      transInd: {
        tagName: "SubDataAttribute",
        name: "transInd",
        type: "BOOLEAN",
        descID: "IEC61850_7_3.ConstructedDAs::ValWithTrans.transInd.desc",
        presCond: "O",
      },
    },
  },
  q: {
    tagName: "DataAttribute",
    name: "q",
    fc: "ST",
    type: "Quality",
    qchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.q.desc",
    presCond: "MAllOrNonePerGroup",
    presCondArgs: "1",
  },
  t: {
    tagName: "DataAttribute",
    name: "t",
    fc: "ST",
    type: "Timestamp",
    descID: "IEC61850_7_3.CDCControl::ISC.t.desc",
    presCond: "MAllOrNonePerGroup",
    presCondArgs: "1",
  },
  stSeld: {
    tagName: "DataAttribute",
    name: "stSeld",
    fc: "ST",
    type: "BOOLEAN",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.stSeld.desc",
    presCond: "MOsbo",
  },
  opRcvd: {
    tagName: "DataAttribute",
    name: "opRcvd",
    fc: "OR",
    type: "BOOLEAN",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ControlTestingCDC.opRcvd.desc",
    presCond: "O",
  },
  opOk: {
    tagName: "DataAttribute",
    name: "opOk",
    fc: "OR",
    type: "BOOLEAN",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ControlTestingCDC.opOk.desc",
    presCond: "O",
  },
  tOpOk: {
    tagName: "DataAttribute",
    name: "tOpOk",
    fc: "OR",
    type: "Timestamp",
    descID: "IEC61850_7_3.CDCControl::ControlTestingCDC.tOpOk.desc",
    presCond: "O",
  },
  subEna: {
    tagName: "DataAttribute",
    name: "subEna",
    fc: "SV",
    type: "BOOLEAN",
    descID: "IEC61850_7_3.CoreAbstractCDCs::SubstitutionCDC.subEna.desc",
    presCond: "MFsubst",
  },
  subVal: {
    tagName: "DataAttribute",
    name: "subVal",
    fc: "SV",
    type: "ValWithTrans",
    typeKind: "CONSTRUCTED",
    descID: "IEC61850_7_3.CDCControl::ISC.subVal.desc",
    presCond: "MFsubst",
    children: {
      posVal: {
        tagName: "SubDataAttribute",
        name: "posVal",
        type: "INT8",
        minValue: "-64",
        maxValue: "63",
        descID: "IEC61850_7_3.ConstructedDAs::ValWithTrans.posVal.desc",
        mandatory: true,
        presCond: "M",
      },
      transInd: {
        tagName: "SubDataAttribute",
        name: "transInd",
        type: "BOOLEAN",
        descID: "IEC61850_7_3.ConstructedDAs::ValWithTrans.transInd.desc",
        presCond: "O",
      },
    },
  },
  subQ: {
    tagName: "DataAttribute",
    name: "subQ",
    fc: "SV",
    type: "Quality",
    descID: "IEC61850_7_3.CoreAbstractCDCs::SubstitutionCDC.subQ.desc",
    presCond: "MFsubst",
  },
  subID: {
    tagName: "DataAttribute",
    name: "subID",
    fc: "SV",
    type: "VisString64",
    descID: "IEC61850_7_3.CoreAbstractCDCs::SubstitutionCDC.subID.desc",
    presCond: "MFsubst",
  },
  blkEna: {
    tagName: "DataAttribute",
    name: "blkEna",
    fc: "BL",
    type: "BOOLEAN",
    descID: "IEC61850_7_3.CoreAbstractCDCs::SubstitutionCDC.blkEna.desc",
    presCond: "O",
  },
  ctlModel: {
    tagName: "DataAttribute",
    name: "ctlModel",
    fc: "CF",
    type: "CtlModelKind",
    typeKind: "ENUMERATED",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.ctlModel.desc",
    mandatory: true,
    presCond: "M",
    children: {
      "status-only": {
        tagName: "Literal",
        name: "status-only",
        literalVal: "0",
        descID: "IEC61850_7_3.DAEnums::CtlModelKind.status-only.desc",
      },
      "direct-with-normal-security": {
        tagName: "Literal",
        name: "direct-with-normal-security",
        literalVal: "1",
        descID:
          "IEC61850_7_3.DAEnums::CtlModelKind.direct-with-normal-security.desc",
      },
      "sbo-with-normal-security": {
        tagName: "Literal",
        name: "sbo-with-normal-security",
        literalVal: "2",
        descID:
          "IEC61850_7_3.DAEnums::CtlModelKind.sbo-with-normal-security.desc",
      },
      "direct-with-enhanced-security": {
        tagName: "Literal",
        name: "direct-with-enhanced-security",
        literalVal: "3",
        descID:
          "IEC61850_7_3.DAEnums::CtlModelKind.direct-with-enhanced-security.desc",
      },
      "sbo-with-enhanced-security": {
        tagName: "Literal",
        name: "sbo-with-enhanced-security",
        literalVal: "4",
        descID:
          "IEC61850_7_3.DAEnums::CtlModelKind.sbo-with-enhanced-security.desc",
      },
    },
  },
  sboTimeout: {
    tagName: "DataAttribute",
    name: "sboTimeout",
    fc: "CF",
    type: "INT32U",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.sboTimeout.desc",
    presCond: "MOsbo",
  },
  sboClass: {
    tagName: "DataAttribute",
    name: "sboClass",
    fc: "CF",
    type: "SboClassKind",
    typeKind: "ENUMERATED",
    defaultValue: "operate-once",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.sboClass.desc",
    presCond: "O",
    children: {
      "operate-once": {
        tagName: "Literal",
        name: "operate-once",
        literalVal: "0",
        descID: "IEC61850_7_3.DAEnums::SboClassKind.operate-once.desc",
      },
      "operate-many": {
        tagName: "Literal",
        name: "operate-many",
        literalVal: "1",
        descID: "IEC61850_7_3.DAEnums::SboClassKind.operate-many.desc",
      },
    },
  },
  minVal: {
    tagName: "DataAttribute",
    name: "minVal",
    fc: "CF",
    type: "INT8",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.minVal.desc",
    presCond: "O",
  },
  maxVal: {
    tagName: "DataAttribute",
    name: "maxVal",
    fc: "CF",
    type: "INT8",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.maxVal.desc",
    presCond: "O",
  },
  operTimeout: {
    tagName: "DataAttribute",
    name: "operTimeout",
    fc: "CF",
    type: "INT32U",
    dchg: "true",
    descID: "IEC61850_7_3.CDCControl::ISC.operTimeout.desc",
    presCond: "MOenhanced",
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
  SBO: {
    tagName: "ServiceDataAttribute",
    name: "SBO",
    typeKind: "BASIC",
    type: "VisString129",
    fc: "CO",
    presCond: "MOsboNormal",
    descID: "IEC 61850-8-1:2003.SBO",
  },
  SBOw: {
    tagName: "ServiceDataAttribute",
    name: "SBOw",
    typeKind: "CONSTRUCTED",
    type: "SBOw",
    underlyingTypeKind: "BASIC",
    underlyingType: "INT8",
    fc: "CO",
    presCond: "MOsboEnhanced",
    children: {
      ctlVal: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.ctlVal",
        name: "ctlVal",
        typeKind: "undefined",
        mandatory: true,
        presCond: "M",
      },
      operTm: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.operTm",
        name: "operTm",
        typeKind: "BASIC",
        type: "Timestamp",
        presCond: "MOoperTm",
      },
      origin: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.origin",
        name: "origin",
        typeKind: "CONSTRUCTED",
        type: "Originator",
        mandatory: true,
        presCond: "M",
        children: {
          orCat: {
            tagName: "SubDataAttribute",
            name: "orCat",
            type: "OriginatorCategoryKind",
            typeKind: "ENUMERATED",
            descID: "IEC61850_7_2.DomainTypesGeneral::S_Originator.orCat.desc",
            mandatory: true,
            presCond: "M",
            children: {
              "not-supported": {
                tagName: "Literal",
                name: "not-supported",
                literalVal: "0",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.not-supported.desc",
              },
              "bay-control": {
                tagName: "Literal",
                name: "bay-control",
                literalVal: "1",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.bay-control.desc",
              },
              "station-control": {
                tagName: "Literal",
                name: "station-control",
                literalVal: "2",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.station-control.desc",
              },
              "remote-control": {
                tagName: "Literal",
                name: "remote-control",
                literalVal: "3",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.remote-control.desc",
              },
              "automatic-bay": {
                tagName: "Literal",
                name: "automatic-bay",
                literalVal: "4",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-bay.desc",
              },
              "automatic-station": {
                tagName: "Literal",
                name: "automatic-station",
                literalVal: "5",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-station.desc",
              },
              "automatic-remote": {
                tagName: "Literal",
                name: "automatic-remote",
                literalVal: "6",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-remote.desc",
              },
              maintenance: {
                tagName: "Literal",
                name: "maintenance",
                literalVal: "7",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.maintenance.desc",
              },
              process: {
                tagName: "Literal",
                name: "process",
                literalVal: "8",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.process.desc",
              },
            },
          },
          orIdent: {
            tagName: "SubDataAttribute",
            name: "orIdent",
            type: "Octet64",
            descID:
              "IEC61850_7_2.DomainTypesGeneral::S_Originator.orIdent.desc",
            mandatory: true,
            presCond: "M",
          },
        },
      },
      ctlNum: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.ctlNum",
        name: "ctlNum",
        typeKind: "BASIC",
        type: "INT8U",
        mandatory: true,
        presCond: "M",
      },
      T: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.T",
        name: "T",
        typeKind: "BASIC",
        type: "Timestamp",
        mandatory: true,
        presCond: "M",
      },
      Test: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.Test",
        name: "Test",
        typeKind: "BASIC",
        type: "BOOLEAN",
        mandatory: true,
        presCond: "M",
      },
      Check: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.Check",
        name: "Check",
        typeKind: "BASIC",
        type: "Check",
        mandatory: true,
        presCond: "M",
      },
    },
  },
  Oper: {
    tagName: "ServiceDataAttribute",
    name: "Oper",
    typeKind: "CONSTRUCTED",
    type: "Oper",
    underlyingTypeKind: "BASIC",
    underlyingType: "INT8",
    fc: "CO",
    presCond: "MOctrl",
    children: {
      ctlVal: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.ctlVal",
        name: "ctlVal",
        typeKind: "undefined",
        mandatory: true,
        presCond: "M",
      },
      operTm: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.operTm",
        name: "operTm",
        typeKind: "BASIC",
        type: "Timestamp",
        presCond: "MOoperTm",
      },
      origin: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.origin",
        name: "origin",
        typeKind: "CONSTRUCTED",
        type: "Originator",
        mandatory: true,
        presCond: "M",
        children: {
          orCat: {
            tagName: "SubDataAttribute",
            name: "orCat",
            type: "OriginatorCategoryKind",
            typeKind: "ENUMERATED",
            descID: "IEC61850_7_2.DomainTypesGeneral::S_Originator.orCat.desc",
            mandatory: true,
            presCond: "M",
            children: {
              "not-supported": {
                tagName: "Literal",
                name: "not-supported",
                literalVal: "0",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.not-supported.desc",
              },
              "bay-control": {
                tagName: "Literal",
                name: "bay-control",
                literalVal: "1",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.bay-control.desc",
              },
              "station-control": {
                tagName: "Literal",
                name: "station-control",
                literalVal: "2",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.station-control.desc",
              },
              "remote-control": {
                tagName: "Literal",
                name: "remote-control",
                literalVal: "3",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.remote-control.desc",
              },
              "automatic-bay": {
                tagName: "Literal",
                name: "automatic-bay",
                literalVal: "4",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-bay.desc",
              },
              "automatic-station": {
                tagName: "Literal",
                name: "automatic-station",
                literalVal: "5",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-station.desc",
              },
              "automatic-remote": {
                tagName: "Literal",
                name: "automatic-remote",
                literalVal: "6",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-remote.desc",
              },
              maintenance: {
                tagName: "Literal",
                name: "maintenance",
                literalVal: "7",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.maintenance.desc",
              },
              process: {
                tagName: "Literal",
                name: "process",
                literalVal: "8",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.process.desc",
              },
            },
          },
          orIdent: {
            tagName: "SubDataAttribute",
            name: "orIdent",
            type: "Octet64",
            descID:
              "IEC61850_7_2.DomainTypesGeneral::S_Originator.orIdent.desc",
            mandatory: true,
            presCond: "M",
          },
        },
      },
      ctlNum: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.ctlNum",
        name: "ctlNum",
        typeKind: "BASIC",
        type: "INT8U",
        mandatory: true,
        presCond: "M",
      },
      T: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.T",
        name: "T",
        typeKind: "BASIC",
        type: "Timestamp",
        mandatory: true,
        presCond: "M",
      },
      Test: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.Test",
        name: "Test",
        typeKind: "BASIC",
        type: "BOOLEAN",
        mandatory: true,
        presCond: "M",
      },
      Check: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.Check",
        name: "Check",
        typeKind: "BASIC",
        type: "Check",
        mandatory: true,
        presCond: "M",
      },
    },
  },
  Cancel: {
    tagName: "ServiceDataAttribute",
    name: "Cancel",
    typeKind: "CONSTRUCTED",
    type: "Cancel",
    underlyingTypeKind: "BASIC",
    underlyingType: "INT8",
    fc: "CO",
    presCond: "MOsbo",
    children: {
      ctlVal: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.ctlVal",
        name: "ctlVal",
        typeKind: "undefined",
        mandatory: true,
        presCond: "M",
      },
      operTm: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.operTm",
        name: "operTm",
        typeKind: "BASIC",
        type: "Timestamp",
        presCond: "MOoperTm",
      },
      origin: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.origin",
        name: "origin",
        typeKind: "CONSTRUCTED",
        type: "Originator",
        mandatory: true,
        presCond: "M",
        children: {
          orCat: {
            tagName: "SubDataAttribute",
            name: "orCat",
            type: "OriginatorCategoryKind",
            typeKind: "ENUMERATED",
            descID: "IEC61850_7_2.DomainTypesGeneral::S_Originator.orCat.desc",
            mandatory: true,
            presCond: "M",
            children: {
              "not-supported": {
                tagName: "Literal",
                name: "not-supported",
                literalVal: "0",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.not-supported.desc",
              },
              "bay-control": {
                tagName: "Literal",
                name: "bay-control",
                literalVal: "1",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.bay-control.desc",
              },
              "station-control": {
                tagName: "Literal",
                name: "station-control",
                literalVal: "2",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.station-control.desc",
              },
              "remote-control": {
                tagName: "Literal",
                name: "remote-control",
                literalVal: "3",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.remote-control.desc",
              },
              "automatic-bay": {
                tagName: "Literal",
                name: "automatic-bay",
                literalVal: "4",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-bay.desc",
              },
              "automatic-station": {
                tagName: "Literal",
                name: "automatic-station",
                literalVal: "5",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-station.desc",
              },
              "automatic-remote": {
                tagName: "Literal",
                name: "automatic-remote",
                literalVal: "6",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.automatic-remote.desc",
              },
              maintenance: {
                tagName: "Literal",
                name: "maintenance",
                literalVal: "7",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.maintenance.desc",
              },
              process: {
                tagName: "Literal",
                name: "process",
                literalVal: "8",
                descID:
                  "IEC61850_7_2.DomainTypesEnums::OriginatorCategoryKind.process.desc",
              },
            },
          },
          orIdent: {
            tagName: "SubDataAttribute",
            name: "orIdent",
            type: "Octet64",
            descID:
              "IEC61850_7_2.DomainTypesGeneral::S_Originator.orIdent.desc",
            mandatory: true,
            presCond: "M",
          },
        },
      },
      ctlNum: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.ctlNum",
        name: "ctlNum",
        typeKind: "BASIC",
        type: "INT8U",
        mandatory: true,
        presCond: "M",
      },
      T: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.T",
        name: "T",
        typeKind: "BASIC",
        type: "Timestamp",
        mandatory: true,
        presCond: "M",
      },
      Test: {
        tagName: "SubDataAttribute",
        descID: "IEC 61850-8-1:2003.Test",
        name: "Test",
        typeKind: "BASIC",
        type: "BOOLEAN",
        mandatory: true,
        presCond: "M",
      },
    },
  },
};
