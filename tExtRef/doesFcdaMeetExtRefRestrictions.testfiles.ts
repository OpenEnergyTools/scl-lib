export const publisherIED = `
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <Header id="GOOSELaterBinding"/>
    <IED name="GOOSE_Publisher" desc="GOOSE publisher" manufacturer="Dummy">
        <AccessPoint name="AP1">
            <Server>
                <Authentication/>
                <LDevice inst="QB2_Disconnector">
                <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
                    <DataSet name="GOOSE2sDataSet">
                        <FCDA desc="invalidFCDA1"  prefix="" lnInst="1" daName="stVal" fc="ST"/>
                        <FCDA desc="invalidFCDA2" ldInst="QB2_Disconnector" prefix="" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                        <FCDA desc="invalidFCDA3" ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" daName="stVal" fc="ST"/>
                        <FCDA desc="missingAnyLN" ldInst="QB2_Disconnector" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" fc="MX" />    
                        <FCDA desc="invalidDoName" ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="invalidDoName" daName="q" fc="ST"/>
                        <FCDA desc="invalidDaName" ldInst="Measurement" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.q" fc="MX" />    
                        <FCDA desc="DPCq" ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
                        <FCDA desc="DPCdbpos" ldInst="QB2_Disconnector" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                        <FCDA desc="DPCnull" ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" fc="ST"/>
                        <FCDA desc="USERENSnull" ldInst="QB2_Disconnector" prefix="" lnClass="USER" lnInst="1" doName="Pos" fc="ST"/>
                        <FCDA desc="USERENSstVal" ldInst="QB2_Disconnector" prefix="" lnClass="USER" lnInst="1" doName="Beh" daName="stVal" fc="ST"/>
                        <FCDA desc="SPSBool" ldInst="QB2_Disconnector" lnClass="CILO" lnInst="1" doName="EnaOpn" daName="stVal" fc="ST"/>
                        <FCDA desc="LPLVis" ldInst="QB2_Disconnector" lnClass="LLN0" doName="NamPlt" daName="vendor" fc="DC"/>
                        <FCDA desc="CMVFLOAT32" ldInst="Measurement" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" fc="MX" />    
                        <FCDA desc="WYE" ldInst="Measurement" lnClass="MMXU" lnInst="1" doName="A" fc="MX" />    
                        <FCDA desc="ACTBool" ldInst="QB2_Disconnector" lnClass="PTOC" lnInst="1" doName="Op" daName="general" fc="ST" />    
                        <!-- INS -->
                        <FCDA ldInst="Measurement" lnClass="GGIO" lnInst="1" doName="IntIn" daName="stVal" fc="ST" />
                        <!-- ENS -->
                        <FCDA ldInst="QB2_Disconnector" lnClass="XSWI" lnInst="1" doName="Beh" daName="stVal" fc="ST" />
                        <!-- INC -->
                        <FCDA ldInst="QB2_Disconnector" lnClass="PTOC" lnInst="1" doName="OpCntRs" daName="stVal" fc="ST" />
                        <!-- ENC -->
                        <FCDA ldInst="QB2_Disconnector" lnClass="XSWI" lnInst="1" doName="Mod" daName="stVal" fc="ST" />
                    </DataSet>
                </LN0>
                <LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
                <LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
                <LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
                <LN prefix="" lnClass="USER" inst="1" lnType="Dummy.USER"/>
                <LN prefix="" lnClass="PTOC" inst="1" lnType="Dummy.PTOC"/>
            </LDevice>
            <LDevice inst="Measurement">
                <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
                    <DataSet name="Meas">
                        </DataSet>
                    <DataSet name="InvalidFCDAs">
                        <FCDA ldInst="NonExistingLDinst" lnClass="MMXU" lnInst="1" doName="A.phsA" daName="cVal.mag.f" fc="MX" />
                    </DataSet>
                    <ReportControl name="someReport" datSet="Meas" />
                </LN0>
                <LN lnClass="MMXU" inst="1" lnType="Dummy.MMXU" />
                <LN lnClass="GGIO" inst="1" lnType="Dummy.GGIO" />
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<DataTypeTemplates>
    <LNodeType lnClass="XSWI" id="Dummy.XSWI" desc="Switch: one phase represenation">
        <DO name="Mod" type="OpenSCD_ENC_Mod"/>
        <DO name="Beh" type="OpenSCD_ENS_Beh"/>
        <DO name="Health" type="OpenSCD_ENS_Health"/>
        <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
        <DO name="LocKey" type="OpenSCD_SPS_simple"/>
        <DO name="Loc" type="OpenSCD_SPS_simple"/>
        <DO name="OpCnt" type="OpenSCD_INS_simple"/>
        <DO name="Pos" type="OpenSCD_DPC_statusonly"/>
        <DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
        <DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
        <DO name="SwTyp" type="OpenSCD_ENS_SwTyp"/>
    </LNodeType>
    <LNodeType lnClass="XSWI" id="Dummy.USER" desc="Switch: one phase represenation">
        <DO name="Beh" type="OpenSCD_ENS_Pos"/>
        <DO name="Pos" type="OpenSCD_ENS_Pos"/>
    </LNodeType>
    <LNodeType lnClass="CSWI" id="Dummy.CSWI" desc="Switch control: no process bus(PB)">
        <DO name="Mod" type="OpenSCD_ENC_Mod"/>
        <DO name="Beh" type="OpenSCD_ENS_Beh"/>
        <DO name="Health" type="OpenSCD_ENS_Health"/>
        <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
        <DO name="LocKey" type="OpenSCD_SPS_simple"/>
        <DO name="Loc" type="OpenSCD_SPS_simple"/>
        <DO name="Pos" type="OpenSCD_DPC"/>
    </LNodeType>
    <LNodeType lnClass="CILO" id="Dummy.CILO" desc="Interlocking">
        <DO name="Mod" type="OpenSCD_ENC_Mod"/>
        <DO name="Beh" type="OpenSCD_ENS_Beh"/>
        <DO name="Health" type="OpenSCD_ENS_Health"/>
        <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
        <DO name="EnaOpn" type="OpenSCD_SPS_simple"/>
        <DO name="EnaCls" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="LLN0" id="Dummy.LLN0" desc="Logical device LN: parent">
        <DO name="Mod" type="OpenSCD_ENC_Mod"/>
        <DO name="Beh" type="OpenSCD_ENS_Beh"/>
        <DO name="Health" type="OpenSCD_ENS_Health"/>
        <DO name="NamPlt" type="OpenSCD_LPL_LD"/>
        <DO name="LocKey" type="OpenSCD_SPS_simple"/>
        <DO name="Loc" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="MMXU" id="Dummy.MMXU" desc="Logical device LN: parent">
        <DO name="Mod" type="OpenSCD_ENC_Mod"/>
        <DO name="Beh" type="OpenSCD_ENS_Beh"/>
        <DO name="Health" type="OpenSCD_ENS_Health"/>
        <DO name="NamPlt" type="OpenSCD_LPL_LD"/>
        <DO name="A" type="someWYE"/>
    </LNodeType>
    <LNodeType lnClass="PTOC" id="Dummy.PTOC" desc="Logical device LN: parent">
        <DO name="Mod" type="OpenSCD_ENC_Mod"/>
        <DO name="Beh" type="OpenSCD_ENS_Beh"/>
        <DO name="Health" type="OpenSCD_ENS_Health"/>
        <DO name="NamPlt" type="OpenSCD_LPL_LD"/>
        <DO name="Op" type="someACT"/>
        <DO name="OpCntRs" type="OpenSCD_INC_simple"/>
    </LNodeType>
    <LNodeType lnClass="GGIO" id="Dummy.GGIO" desc="GGIO with integer input">
        <DO name="IntIn" type="OpenSCD_INS_simple"/>
        <DO name="Mod" type="OpenSCD_ENC_Mod"/>
        <DO name="Beh" type="OpenSCD_ENS_Beh"/>
    </LNodeType>
    <DOType cdc="WYE" id="someWYE">
        <SDO name="phsA" type="someMV"/>
    </DOType>
    <DOType cdc="ACT" id="someACT">
        <DA name="general" bType="BOOLEAN" dchg="true" fc="ST" />
    </DOType>
    <DOType cdc="CMV" id="someMV">
        <DA fc="MX" dchg="true" name="cVal" bType="Struct" type="someVector"/>   
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENS_SwTyp">
        <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="SwitchFunctionKind"/>
        <DA fc="ST" qchg="true" name="q" bType="Quality"/>
        <DA fc="ST" name="t" bType="Timestamp"/>
    </DOType>
    <DOType cdc="SPC" id="OpenSCD_SPC_statusonly">
        <DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="ctlModel" bType="Enum" dchg="true" type="OpenSCD_StatusOnly" fc="CF">
            <Val>status-only</Val>
        </DA>
    </DOType>
    <DOType cdc="DPC" id="OpenSCD_DPC_statusonly">
        <DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="ctlModel" bType="Enum" fc="CF" type="OpenSCD_StatusOnly">
            <Val>status-only</Val>
        </DA>
    </DOType>
    <DOType cdc="INS" id="OpenSCD_INS_simple">
        <DA name="stVal" bType="INT32" dchg="true" fc="ST"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="d" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="DPC" id="OpenSCD_DPC">
        <DA name="origin" bType="Struct" dchg="true" fc="ST" type="OpenSCD_Originator"/>
        <DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="ctlModel" bType="Enum" fc="CF" type="CtlModelKind">
            <Val>sbo-with-enhanced-security</Val>
        </DA>
        <DA name="sboTimeout" bType="INT32U" fc="CF">
            <Val>30000</Val>
        </DA>
        <DA name="operTimeout" bType="INT32U" fc="CF">
            <Val>600</Val>
        </DA>
        <DA name="pulseConfig" bType="Struct" fc="CO" type="OpenSCD_PulseConfig"/>
        <DA name="SBOw" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_Dbpos"/>
        <DA name="Oper" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_Dbpos"/>
        <DA name="Cancel" bType="Struct" fc="CO" type="OpenSCD_Cancel_Dbpos"/>
    </DOType>
    <DOType cdc="LPL" id="OpenSCD_LPL_noLD">
        <DA name="vendor" bType="VisString255" fc="DC"/>
        <DA name="swRev" bType="VisString255" fc="DC"/>
        <DA name="d" bType="VisString255" fc="DC"/>
        <DA name="configRev" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="SPS" id="OpenSCD_SPS_simple">
        <DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="d" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="LPL" id="OpenSCD_LPL_LD">
        <DA name="vendor" bType="VisString255" fc="DC"/>
        <DA name="swRev" bType="VisString255" fc="DC"/>
        <DA name="d" bType="VisString255" fc="DC"/>
        <DA name="configRev" bType="VisString255" fc="DC"/>
        <DA name="ldNs" bType="VisString255" fc="EX">
            <Val>IEC 61850-7-4:2007B4</Val>
        </DA>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENS_Health">
        <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="HealthKind"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENS_Beh">
        <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENS_Pos">
        <DA name="stVal" bType="FLOAT32" dchg="true" fc="ST"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
    </DOType>
    <DOType cdc="ENC" id="OpenSCD_ENC_Mod">
        <DA name="origin" bType="Struct" dchg="true" fc="ST" type="OpenSCD_Originator"/>
        <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="ctlModel" bType="Enum" fc="CF" type="CtlModelKind">
            <Val>sbo-with-enhanced-security</Val>
        </DA>
        <DA name="sboTimeout" bType="INT32U" fc="CF">
            <Val>30000</Val>
        </DA>
        <DA name="operTimeout" bType="INT32U" fc="CF">
            <Val>600</Val>
        </DA>
        <DA name="SBOw" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_BehaviourModeKind"/>
        <DA name="Oper" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_BehaviourModeKind"/>
        <DA name="Cancel" bType="Struct" fc="CO" type="OpenSCD_Cancel_BehaviourModeKind"/>
    </DOType>
    <DOType cdc="INC" id="OpenSCD_INC_simple">
        <DA name="stVal" bType="INT32" dchg="true" fc="ST"/>
        <DA name="q" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="d" bType="VisString255" fc="DC"/>
    </DOType>   
    <DAType id="someVector">
        <BDA name="mag" bType="Struct" type="someAnalogueValue"/>
        <BDA name="ang" bType="Struct" type="someAnalogueValue"/>
    </DAType>
    <DAType id="someAnalogueValue">
        <BDA name="f" bType="FLOAT32" />
    </DAType>
    <DAType id="someAnalogueValueINT32">
        <BDA name="i" bType="INT32" />
    </DAType>
    <DAType id="OpenSCD_Cancel_Dbpos">
        <BDA name="ctlVal" bType="Dbpos"/>
        <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
        <BDA name="ctlNum" bType="INT8U"/>
        <BDA name="T" bType="Timestamp"/>
        <BDA name="Test" bType="BOOLEAN"/>
        <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_Dbpos">
        <BDA name="ctlVal" bType="Dbpos"/>
        <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
        <BDA name="ctlNum" bType="INT8U"/>
        <BDA name="T" bType="Timestamp"/>
        <BDA name="Test" bType="BOOLEAN"/>
        <BDA name="Check" bType="Check"/>
        <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_PulseConfig">
        <BDA name="cmdQual" bType="Enum" type="OutputSignalKind"/>
        <BDA name="onDur" bType="INT32U"/>
        <BDA name="offDur" bType="INT32U"/>
        <BDA name="numPls" bType="INT32U"/>
    </DAType>
    <DAType id="OpenSCD_Cancel_BehaviourModeKind">
        <BDA name="ctlVal" bType="Enum" type="BehaviourModeKind"/>
        <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
        <BDA name="ctlNum" bType="INT8U"/>
        <BDA name="T" bType="Timestamp"/>
        <BDA name="Test" bType="BOOLEAN"/>
        <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_BehaviourModeKind">
        <BDA name="ctlVal" bType="Enum" type="BehaviourModeKind"/>
        <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
        <BDA name="ctlNum" bType="INT8U"/>
        <BDA name="T" bType="Timestamp"/>
        <BDA name="Test" bType="BOOLEAN"/>
        <BDA name="Check" bType="Check"/>
        <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Originator">
        <BDA name="orCat" bType="Enum" type="OriginatorCategoryKind"/>
        <BDA name="orIdent" bType="Octet64"/>
    </DAType>
    <EnumType id="SwitchFunctionKind">
        <EnumVal ord="1">Load Break</EnumVal>
        <EnumVal ord="2">Disconnector</EnumVal>
        <EnumVal ord="3">Earthing Switch</EnumVal>
        <EnumVal ord="4">High Speed Earthing Switch</EnumVal>
    </EnumType>
    <EnumType id="OpenSCD_StatusOnly">
        <EnumVal ord="0">status-only</EnumVal>
    </EnumType>
    <EnumType id="OutputSignalKind">
        <EnumVal ord="0">pulse</EnumVal>
        <EnumVal ord="1">persistent</EnumVal>
        <EnumVal ord="2">persistent-feedback</EnumVal>
    </EnumType>
    <EnumType id="HealthKind">
        <EnumVal ord="1">Ok</EnumVal>
        <EnumVal ord="2">Warning</EnumVal>
        <EnumVal ord="3">Alarm</EnumVal>
    </EnumType>
    <EnumType id="CtlModelKind">
        <EnumVal ord="0">status-only</EnumVal>
        <EnumVal ord="1">direct-with-normal-security</EnumVal>
        <EnumVal ord="2">sbo-with-normal-security</EnumVal>
        <EnumVal ord="3">direct-with-enhanced-security</EnumVal>
        <EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
    </EnumType>
    <EnumType id="BehaviourModeKind">
        <EnumVal ord="1">on</EnumVal>
        <EnumVal ord="2">blocked</EnumVal>
        <EnumVal ord="3">test</EnumVal>
        <EnumVal ord="4">test/blocked</EnumVal>
        <EnumVal ord="5">off</EnumVal>
    </EnumType>
    <EnumType id="OriginatorCategoryKind">
        <EnumVal ord="0">not-supported</EnumVal>
        <EnumVal ord="1">bay-control</EnumVal>
        <EnumVal ord="2">station-control</EnumVal>
        <EnumVal ord="3">remote-control</EnumVal>
        <EnumVal ord="4">automatic-bay</EnumVal>
        <EnumVal ord="5">automatic-station</EnumVal>
        <EnumVal ord="6">automatic-remote</EnumVal>
        <EnumVal ord="7">maintenance</EnumVal>
        <EnumVal ord="8">process</EnumVal>
    </EnumType>
</DataTypeTemplates>
</SCL>

`;
