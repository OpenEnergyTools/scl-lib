export const substation = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100"
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
        <NeutralPoint
          name="N1"
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
      <Bay name="Q01">
        <ConductingEquipment name="QA1" type="CBR">
          <Terminal
            name="T1"
            connectivityNode="AA1/J1/BB1/L1"
            substationName="AA1"
            voltageLevelName="J1"
            bayName="BB1"
            cNodeName="L1"
          ></Terminal>
          <Terminal
            name="T1"
            connectivityNode="AA1/J1/Q01/L1"
            substationName="AA1"
            voltageLevelName="J1"
            bayName="Q01"
            cNodeName="L1"
          ></Terminal>
          <EqFunction name="CBR">
            <LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="someCSWI" />
          </EqFunction>
        </ConductingEquipment>
        <ConductingEquipment name="QB1" type="DIS">
          <Terminal
            name="T1"
            connectivityNode="AA1/J1/Q01/L1"
            substationName="AA1"
            voltageLevelName="J1"
            bayName="Q01"
            cNodeName="L1"
          ></Terminal>
          <Terminal
            name="T2"
            connectivityNode="AA1/J1/Q01/L2"
            substationName="AA1"
            voltageLevelName="J1"
            bayName="Q01"
            cNodeName="L2"
          ></Terminal>
        </ConductingEquipment>
        <ConnectivityNode name="L1" pathName="AA1/J1/Q01/L1" />
        <ConnectivityNode name="L2" pathName="AA1/J1/Q01/L2" />
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
          <EqFunction name="CBR">
            <LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="someCSWI" />
          </EqFunction>
        </ConductingEquipment>
        <ConnectivityNode name="L1" />
        <ConnectivityNode />
      </Bay>
    </VoltageLevel>
  </Substation>
  <Substation name="AA3">
    <VoltageLevel name="J1">
      <Bay name="Q01">
        <ConductingEquipment name="QA1" >
          <Terminal name="T1" connectivityNode="" substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
          <Terminal substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
          <EqFunction name="CBR">
            <LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="someCSWI" />
          </EqFunction>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
  <Substation name="AA4">
    <VoltageLevel name="D1">
      <Bay name="Q01">
        <ConductingEquipment name="QA1" >
          <Terminal name="T1" connectivityNode="" substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
          <Terminal substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
          <EqFunction name="CBR">
            <LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="someCSWI" />
          </EqFunction>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
  <Substation name="AA5">
    <VoltageLevel name="D1">
      <Bay name="Q01">
        <ConductingEquipment name="QA1" >
          <Terminal name="T1" connectivityNode="" substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
          <Terminal substationName="AA2" voltageLevelName="D1" bayName="Q01" cNodeName="L1" />
          <EqFunction name="CBR">
            <LNode iedName="None" lnClass="XCBR" lnInst="1" lnType="someXCBR" >
              <Private type="eIEC61850-6-100">
								<eTr_6-100:LNodeSpecNaming sIedName="None" sLnClass="XCBR" sLnInst="1"/>
								<eTr_6-100:LNodeInputs>
									<eTr_6-100:SourceRef source="AA3/J1/Q01/QA2/CBR/CSWI1/OpCls.general" input="CSWI1" inputInst="1" service="GOOSE"/>
									<eTr_6-100:SourceRef source="AA3/J1/Q01/QA2/CBR/CSWI1/OpCls.q" input="CSWI1" inputInst="2" service="GOOSE"/>
									<eTr_6-100:SourceRef source="AA3/J1/Q01/QA2/CBR/CSWI1/OpOpn.general" input="CSWI1" inputInst="3" service="GOOSE"/>
									<eTr_6-100:SourceRef source="AA3/J1/Q01/QA2/CBR/CSWI1/OpOpn.q" input="CSWI1" inputInst="4" service="GOOSE"/>
                  <eTr_6-100:SourceRef source="AA4/D1/Q01/QA1/CBR/CSWI1/OpCls.general" input="CSWI1" inputInst="5" service="GOOSE"/>
									<eTr_6-100:SourceRef source="AA4/D1/Q01/QA1/CBR/CSWI1/OpCls.q" input="CSWI1" inputInst="6" service="GOOSE"/>
									<eTr_6-100:SourceRef source="AA4/D1/Q01/QA1/CBR/CSWI1/OpOpn.general" input="CSWI1" inputInst="7" service="GOOSE"/>
									<eTr_6-100:SourceRef source="AA4/D1/Q01/QA1/CBR/CSWI1/OpOpn.q" input="CSWI1" inputInst="8" service="GOOSE"/>
									<eTr_6-100:SourceRef input="CSWI1" inputInst="9" service="GOOSE" resourceName="outsideThisFile"/>
								</eTr_6-100:LNodeInputs>
							</Private>
            <LNode>
          </EqFunction>
        </ConductingEquipment>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;
