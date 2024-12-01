export const spgChildren = {
  setVal: {
    tagName: "DataAttribute",
    name: "setVal",
    fc: "SE",
    type: "BOOLEAN",
    descID: "IEC61850_7_3.SPG::SPG_SE.setVal.desc",
    mandatory: true,
    presCond: "M",
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

/** To be considered for a future release 
const setValE = {
  tagName: "DataAttribute",
  name: "setVal",
  fc: "SE",
  type: "BOOLEAN",
  descID: "IEC61850_7_3.SPG::SPG_SE.setVal.desc",
  mandatory: true,
  presCond: "M",
};

const setValG = {
  tagName: "DataAttribute",
  name: "setVal",
  fc: "SG",
  type: "BOOLEAN",
  descID: "IEC61850_7_3.SPG::SPG_SG.setVal.desc",
  mandatory: true,
  presCond: "M",
};

const setValP = {
  tagName: "DataAttribute",
  name: "setVal",
  fc: "SP",
  type: "BOOLEAN",
  descID: "IEC61850_7_3.SPG::SPG_SP.setVal.desc",
  mandatory: true,
  presCond: "M",
};

export const spgEcHildren = (spgChildren["setVal"] = setValE);
export const spgGcHildren = (spgChildren["setVal"] = setValG);
export const spgPcHildren = (spgChildren["setVal"] = setValP);
*/
