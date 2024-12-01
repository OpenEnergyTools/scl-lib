import { cmvChildren } from "./CMV.js";

export const seqChildren = {
  c1: {
    tagName: "SubDataObject",
    name: "c1",
    type: "CMV",
    descID: "IEC61850_7_3.CDCAnalogueInfo::SEQ.c1.desc",
    mandatory: true,
    presCond: "M",
    children: cmvChildren,
  },
  c2: {
    tagName: "SubDataObject",
    name: "c2",
    type: "CMV",
    descID: "IEC61850_7_3.CDCAnalogueInfo::SEQ.c2.desc",
    presCond: "OMSynPh",
    children: cmvChildren,
  },
  c3: {
    tagName: "SubDataObject",
    name: "c3",
    type: "CMV",
    descID: "IEC61850_7_3.CDCAnalogueInfo::SEQ.c3.desc",
    presCond: "OMSynPh",
    children: cmvChildren,
  },
  seqT: {
    tagName: "DataAttribute",
    name: "seqT",
    fc: "MX",
    type: "SequenceKind",
    typeKind: "ENUMERATED",
    descID: "IEC61850_7_3.CDCAnalogueInfo::SEQ.seqT.desc",
    mandatory: true,
    presCond: "M",
    children: {
      "pos-neg-zero": {
        tagName: "Literal",
        name: "pos-neg-zero",
        literalVal: "0",
        descID: "IEC61850_7_3.DAEnums::SequenceKind.pos-neg-zero.desc",
      },
      "dir-quad-zero": {
        tagName: "Literal",
        name: "dir-quad-zero",
        literalVal: "1",
        descID: "IEC61850_7_3.DAEnums::SequenceKind.dir-quad-zero.desc",
      },
    },
  },
  phsRef: {
    tagName: "DataAttribute",
    name: "phsRef",
    fc: "CF",
    type: "PhaseReferenceKind",
    typeKind: "ENUMERATED",
    dchg: "true",
    descID: "IEC61850_7_3.CDCAnalogueInfo::SEQ.phsRef.desc",
    presCond: "O",
    children: {
      A: {
        tagName: "Literal",
        name: "A",
        literalVal: "0",
      },
      B: {
        tagName: "Literal",
        name: "B",
        literalVal: "1",
      },
      C: {
        tagName: "Literal",
        name: "C",
        literalVal: "2",
      },
      Synchrophasor: {
        tagName: "Literal",
        name: "Synchrophasor",
        literalVal: "3",
      },
    },
  },
  d: {
    tagName: "DataAttribute",
    name: "d",
    fc: "DC",
    type: "VisString255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BaseComposedCDC.d.desc",
    presCond: "O",
  },
  dU: {
    tagName: "DataAttribute",
    name: "dU",
    fc: "DC",
    type: "Unicode255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BaseComposedCDC.dU.desc",
    presCond: "O",
  },
  cdcName: {
    tagName: "DataAttribute",
    name: "cdcName",
    fc: "EX",
    type: "VisString255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BaseComposedCDC.cdcName.desc",
    presCond: "O",
  },
  dataNs: {
    tagName: "DataAttribute",
    name: "dataNs",
    fc: "EX",
    type: "VisString255",
    descID: "IEC61850_7_3.CoreAbstractCDCs::BaseComposedCDC.dataNs.desc",
    presCond: "MOdataNs",
  },
};
