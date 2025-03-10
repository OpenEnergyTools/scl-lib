import { dplChildren } from "./DPL.js";
import { ingChildren } from "./ING.js";
import { insChildren } from "./INS.js";
import { lplChildren } from "./LPL.js";
import { spcChildren } from "./SPC.js";
import { spsChildren } from "./SPS.js";

export const lphd = {
  NamPlt: {
    tagName: "DataObject",
    name: "NamPlt",
    type: "LPL",
    descID: "IEC61850_7_4.LNGroupL::LPHD.NamPlt.desc",
    presCond: "MONamPlt",
    presCondArgsID:
      "IEC61850_7_4.LNGroupL::LPHD__(_MONamPlt_=__((_NamPlt_))__)_.cond.LNGroupL::LPHD.NamPlt",
    dsPresCond: "na",
    children: lplChildren,
  },
  PhyNam: {
    tagName: "DataObject",
    name: "PhyNam",
    type: "DPL",
    descID: "IEC61850_7_4.LNGroupL::LPHD.PhyNam.desc",
    mandatory: true,
    presCond: "M",
    dsPresCond: "na",
    children: dplChildren,
  },
  PhyHealth: {
    tagName: "DataObject",
    name: "PhyHealth",
    type: "ENS",
    underlyingType: "HealthKind",
    descID: "IEC61850_7_4.LNGroupL::LPHD.PhyHealth.desc",
    mandatory: true,
    presCond: "M",
    dsPresCond: "na",
    children: {
      stVal: {
        tagName: "DataAttribute",
        name: "stVal",
        fc: "ST",
        typeKind: "ENUMERATED",
        dchg: "true",
        dupd: "true",
        descID: "IEC61850_7_3.CDCStatusInfo::ENS.stVal.desc",
        mandatory: true,
        presCond: "M",
        type: "HealthKind",
        children: {
          Ok: {
            tagName: "Literal",
            name: "Ok",
            literalVal: "1",
            descID: "IEC61850_7_4.DOEnums::HealthKind.Ok.desc",
          },
          Warning: {
            tagName: "Literal",
            name: "Warning",
            literalVal: "2",
            descID: "IEC61850_7_4.DOEnums::HealthKind.Warning.desc",
          },
          Alarm: {
            tagName: "Literal",
            name: "Alarm",
            literalVal: "3",
            descID: "IEC61850_7_4.DOEnums::HealthKind.Alarm.desc",
          },
        },
      },
      q: {
        tagName: "DataAttribute",
        name: "q",
        fc: "ST",
        type: "Quality",
        qchg: "true",
        descID: "IEC61850_7_3.CDCStatusInfo::ENS.q.desc",
        mandatory: true,
        presCond: "M",
      },
      t: {
        tagName: "DataAttribute",
        name: "t",
        fc: "ST",
        type: "Timestamp",
        descID: "IEC61850_7_3.CDCStatusInfo::ENS.t.desc",
        mandatory: true,
        presCond: "M",
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
        typeKind: "ENUMERATED",
        descID: "IEC61850_7_3.CDCStatusInfo::ENS.subVal.desc",
        presCond: "MFsubst",
        type: "HealthKind",
        children: {
          Ok: {
            tagName: "Literal",
            name: "Ok",
            literalVal: "1",
            descID: "IEC61850_7_4.DOEnums::HealthKind.Ok.desc",
          },
          Warning: {
            tagName: "Literal",
            name: "Warning",
            literalVal: "2",
            descID: "IEC61850_7_4.DOEnums::HealthKind.Warning.desc",
          },
          Alarm: {
            tagName: "Literal",
            name: "Alarm",
            literalVal: "3",
            descID: "IEC61850_7_4.DOEnums::HealthKind.Alarm.desc",
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
    },
  },
  OutOv: {
    tagName: "DataObject",
    name: "OutOv",
    type: "SPS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.OutOv.desc",
    presCond: "O",
    dsPresCond: "na",
    children: spsChildren,
  },
  Proxy: {
    tagName: "DataObject",
    name: "Proxy",
    type: "SPS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.Proxy.desc",
    mandatory: true,
    presCond: "M",
    dsPresCond: "na",
    children: spsChildren,
  },
  InOv: {
    tagName: "DataObject",
    name: "InOv",
    type: "SPS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.InOv.desc",
    presCond: "O",
    dsPresCond: "na",
    children: spsChildren,
  },
  OpTmh: {
    tagName: "DataObject",
    name: "OpTmh",
    type: "INS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.OpTmh.desc",
    presCond: "O",
    dsPresCond: "na",
    children: insChildren,
  },
  NumPwrUp: {
    tagName: "DataObject",
    name: "NumPwrUp",
    type: "INS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.NumPwrUp.desc",
    presCond: "O",
    dsPresCond: "na",
    children: insChildren,
  },
  WrmStr: {
    tagName: "DataObject",
    name: "WrmStr",
    type: "INS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.WrmStr.desc",
    presCond: "O",
    dsPresCond: "na",
    children: insChildren,
  },
  WacTrg: {
    tagName: "DataObject",
    name: "WacTrg",
    type: "INS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.WacTrg.desc",
    presCond: "O",
    dsPresCond: "na",
    children: insChildren,
  },
  PwrUp: {
    tagName: "DataObject",
    name: "PwrUp",
    type: "SPS",
    transient: "true",
    descID: "IEC61850_7_4.LNGroupL::LPHD.PwrUp.desc",
    presCond: "O",
    dsPresCond: "na",
    children: spsChildren,
  },
  PwrDn: {
    tagName: "DataObject",
    name: "PwrDn",
    type: "SPS",
    transient: "true",
    descID: "IEC61850_7_4.LNGroupL::LPHD.PwrDn.desc",
    presCond: "O",
    dsPresCond: "na",
    children: spsChildren,
  },
  PwrSupAlm: {
    tagName: "DataObject",
    name: "PwrSupAlm",
    type: "SPS",
    descID: "IEC61850_7_4.LNGroupL::LPHD.PwrSupAlm.desc",
    presCond: "O",
    dsPresCond: "na",
    children: spsChildren,
  },
  RsStat: {
    tagName: "DataObject",
    name: "RsStat",
    type: "SPC",
    transient: "true",
    descID: "IEC61850_7_4.LNGroupL::LPHD.RsStat.desc",
    presCond: "O",
    dsPresCond: "na",
    children: spcChildren,
  },
  Sim: {
    tagName: "DataObject",
    name: "Sim",
    type: "SPC",
    descID: "IEC61850_7_4.LNGroupL::LPHD.Sim.desc",
    presCond: "O",
    dsPresCond: "na",
    children: spcChildren,
  },
  MaxDl: {
    tagName: "DataObject",
    name: "MaxDl",
    type: "ING",
    descID: "IEC61850_7_4.LNGroupL::LPHD.MaxDl.desc",
    presCond: "MOcond",
    presCondArgs: "1",
    presCondArgsID:
      "IEC61850_7_4.LNGroupL::LPHD__(_MOcond(1)_=__((_MaxDl_))__)_.cond.LNGroupL::LPHD.MaxDl",
    dsPresCond: "na",
    children: ingChildren,
  },
};
