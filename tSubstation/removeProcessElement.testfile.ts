export const substation = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  version="2007"
  revision="B"
  release="4"
>
  <Header id="GOOSELaterBinding" />
  <Substation name="AA1">
    <PowerTransformer name="PTR1">
      <TransformerWinding name="PTW1">
        <Terminal
          name="T1"
          connectivityNode="AA1/E1/BB1/L1"
          substationName="AA1"
          voltageLevelName="E1"
          bayName="BB1"
          cNodeName="L1"
        />
      </TransformerWinding>
      <TransformerWinding name="PTW2">
        <Terminal
          name="T1"
          connectivityNode="AA1/J1/BB1/L1"
          substationName="AA1"
          voltageLevelName="J1"
          bayName="BB1"
          cNodeName="L1"
        />
      </TransformerWinding>
    </PowerTransformer>
    <VoltageLevel name="J1">
      <Bay name="BB1">
        <ConnectivityNode name="L1" pathName="AA1/J1/BB1/L1" />
      </Bay>
    </VoltageLevel>
    <VoltageLevel name="E1">
      <Bay name="BB1">
        <ConnectivityNode name="L1" pathName="AA1/E1/BB1/L1" />
      </Bay>
      <Bay name="Q01">
        <ConductingEquipment name="QB1" type="DIS">
          <Terminal
            name="T1"
            connectivityNode="AA1/E1/BB1/L1"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="BB1"
            cNodeName="L1"
          ></Terminal>
          <Terminal
            name="T2"
            connectivityNode="AA1/E1/Q01/L1"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="Q01"
            cNodeName="L1"
          ></Terminal>
        </ConductingEquipment>
        <ConductingEquipment name="QA1" type="CBR">
          <Terminal
            name="T1"
            connectivityNode="AA1/E1/Q01/L1"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="Q01"
            cNodeName="L1"
          ></Terminal>
          <Terminal
            name="T2"
            connectivityNode="AA1/E1/Q01/L2"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="Q01"
            cNodeName="L2"
          ></Terminal>
        </ConductingEquipment>
        <ConnectivityNode name="L1" pathName="AA1/E1/Q01/L1" />
        <ConnectivityNode name="L2" pathName="AA1/E1/Q01/L2" />
      </Bay>
      <Bay name="Q02">
        <ConductingEquipment name="QB1" type="DIS">
          <Terminal
            name="T1"
            connectivityNode="AA1/E1/BB1/L1"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="BB1"
            cNodeName="L1"
          ></Terminal>
          <Terminal
            name="T1"
            connectivityNode="AA1/E1/Q02/L1"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="Q02"
            cNodeName="L1"
          ></Terminal>
        </ConductingEquipment>
        <ConductingEquipment name="QA1" type="CBR">
          <Terminal
            name="T1"
            connectivityNode="AA1/E1/Q02/L1"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="Q02"
            cNodeName="L1"
          ></Terminal>
          <Terminal
            name="T2"
            connectivityNode="AA1/E1/Q02/L2"
            substationName="AA1"
            voltageLevelName="E1"
            bayName="Q02"
            cNodeName="L2"
          ></Terminal>
        </ConductingEquipment>
        <ConnectivityNode name="L1" pathName="AA1/E1/Q02/L1" />
        <ConnectivityNode name="L2" pathName="AA1/E1/Q02/L2" />
      </Bay>
    </VoltageLevel>
  </Substation>
  <Substation name="AA2">
    <VoltageLevel name="D1">
      <Bay name="Q01">
        <ConductingEquipment name="QA1" >
            <Terminal name="T1" connectivityNode="" substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
            <Terminal substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
        </ConductingEquipment>
        <ConnectivityNode name="L1" />
        <ConnectivityNode />
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;
