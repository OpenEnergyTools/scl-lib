export const edgeScl = `<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns="http://www.iec.ch/61850/2003/SCL"
     xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="someTool" nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<Substation name="AA1">
		<LNode iedName="IED1" lnClass="LLN0" lnInst="" />
	</Substation>
	<Communication>
		<SubNetwork name="StationBus" desc="desc" type="8-MMS">
			<BitRate unit="b/s">100.0</BitRate>
			<ConnectedAP iedName="IED1" apName="P1">
				<Address>
					<P type="IP">192.168.210.111</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="IP-GATEWAY">192.168.210.1</P>
					<P type="OSI-AP-Title">1,3,9999,23</P>
					<P type="OSI-AE-Qualifier">23</P>
					<P type="OSI-PSEL">00000001</P>
					<P type="OSI-SSEL">0001</P>
					<P type="OSI-TSEL">0001</P>
				</Address>
				<GSE ldInst="CircuitBreaker_CB1" cbName="GCB">
					<Address>
						<P type="MAC-Address">01-0C-CD-01-00-10</P>
						<P type="VLAN-ID">005</P>
						<P type="VLAN-PRIORITY">4</P>
						<P type="APPID">0010</P>
					</Address>
				</GSE>
				<PhysConn type="RedConn" >
					<P type="Plug">RJ45</P>
				</PhysConn>
				<PhysConn type="SomeOtherType">
  					<P type="Plug">RJ45</P>
				</PhysConn>
			</ConnectedAP>
		</SubNetwork>
	</Communication>
	<IED name="IED1" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
		<Services>
			<DynAssociation />
			<GetDirectory />
			<GetDataObjectDefinition />
			<DataObjectDirectory />
			<GetDataSetValue />
			<SetDataSetValue />
			<DataSetDirectory />
			<ConfDataSet modify="false" max="3" />
			<DynDataSet max="42" />
			<ReadWrite />
			<ConfReportControl bufConf="false" max="10"/>
			<GetCBValues />
			<ReportSettings rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="true" owner="true" />
			<GOOSE max="1" />
			<GSSE max="0" />
			<ConfLNs fixPrefix="true" fixLnInst="true" />
		</Services>
		<AccessPoint name="P1">
			<Server>
				<Authentication none="true" />
				<LDevice inst="CircuitBreaker_CB1">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<DataSet name="GooseDataSet1">
                            <FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
                            <FCDA ldInst="Disconnectors" lnClass="LLN0" doName="Beh" fc="ST" ix="3"/>
                        </DataSet>
						<GSEControl type="GOOSE" appID="0001" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1">
							<Private type="privateType">textContent</Private>
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1">IED2</IEDName>
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="CSWI" lnInst="1">IED2</IEDName>
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="CSWI" lnInst="1">IED3</IEDName>
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" prefix="" lnClass="CSWI" lnInst="1">IED4</IEDName>
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" prefix="CB" lnClass="CSWI" lnInst="1">IED1</IEDName>
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="LLN0" lnInst="">IED2</IEDName>
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="LLN0">IED3</IEDName>
							<IEDName>IED5</IEDName>
						</GSEControl>
						<GSEControl type="GOOSE" appID="0003" fixedOffs="false" confRev="1" name="GCB2"/>
					</LN0>
					<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="CSWI" inst="1" lnType="Dummy.CSWIwithoutCtlModel">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="CB" lnClass="XCBR" inst="2" lnType="Dummy.XCBR1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="CB" lnClass="CSWI" inst="2" lnType="Dummy.CSWIwithoutCtlModel">
						<DOI name="Pos">
							<SDI name="pulseConfig">
								<DAI name="numPls">
									<Private type="Val">
										<Val sGroup="1">1</Val>
									</Private>
    								<Val sGroup="1">1</Val>
    								<Val sGroup="2">2</Val>
    								<Val sGroup="3">3</Val>
								</DAI>
                            </SDI>
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="Disconnectors">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="DC" lnClass="XSWI" inst="1" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="DC" lnClass="CSWI" inst="1" lnType="Dummy.CSWI">
						<Inputs>
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" serviceType="GOOSE" srcCBName="GCB" srcLDInst="CBSW" srcLNClass="LLN0"/>
							<ExtRef iedName="IED2" ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q"/>
							<ExtRef intAddr="stVal-t" pDO="Pos" pDA="t" pLN="XCBR" serviceType="GOOSE"/>
							<ExtRef intAddr="stVal-t" pDO="Pos" pDA="ctlModel" pLN="XCBR" serviceType="GOOSE"/>
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="t" intAddr="stVal-t" />
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="LLN0" doName="Beh" />
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" serviceType="GOOSE" srcCBName="GCB" srcLDInst="CBSW" srcLNClass="LLN0" intAddr="instAddr"/>
						</Inputs>
					</LN>
					<LN prefix="DC" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN lnClass="XSWI" inst="3" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="CSWI" inst="3" lnType="Dummy.CSWI"/>
					<LN lnClass="CILO" inst="3" lnType="Dummy.CILO"/>
					<LN lnClass="XSWI" inst="2" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="CSWI" inst="2" lnType="Dummy.CSWIwithoutCtlModel">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>sbo-with-normal-security</Val>
							</DAI>s
						</DOI>
					</LN>
				</LDevice>
				<Association iedName="IED3" ldInst="MU01" lnClass="LLN0" lnInst="" kind="predefined" />
				<Association iedName="IED2" ldInst="MU01" lnClass="LLN0" kind="predefined" />
			</Server>
		</AccessPoint>
		<KDC iedName="IED1" apName="P1"/>
	</IED>
	<DataTypeTemplates>
		<LNodeType lnClass="LLN0" id="Dummy.LLN0">
			<DO name="Mod" type="Dummy.LLN0.Mod" />
			<DO name="ExtendedMod" type="Dummy.LLN0.ExtendedMod" />
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="Health" type="Dummy.LLN0.Health" />
			<DO name="NamPlt" type="Dummy.LLN0.NamPlt" />
		</LNodeType>
		<LNodeType lnClass="LLN0" id="Dummy.LLN0.two">
			<DO name="Mod" type="Dummy.LLN0.Mod" />
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="Health" type="Dummy.LLN0.Health" />
			<DO name="NamPlt" type="Dummy.LLN0.NamPlt" />
		</LNodeType>
		<LNodeType lnClass="LPHD" id="Dummy.LPHD1">
			<DO name="PhyNam" type="Dummy.LPHD1.PhyNam" />
			<DO name="PhyHealth" type="Dummy.LLN0.Health" />
			<DO name="Proxy" type="Dummy.SPS" />
			<DO name="Sim" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<LNodeType lnClass="XCBR" id="Dummy.XCBR1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.XCBR1.Pos" />
			<DO name="BlkOpn" type="Dummy.XCBR1.BlkOpn" />
			<DO name="BlkCls" type="Dummy.XCBR1.BlkOpn" />
		</LNodeType>
		<LNodeType lnClass="CSWI" id="Dummy.CSWI">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.CSWI.Pos1" />
		</LNodeType>
		<LNodeType lnClass="CILO" id="Dummy.CILO">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="EnaOpn" type="Dummy.SPS"/>
            <DO name="EnaCls" type="Dummy.SPS"/>
		</LNodeType>
		<LNodeType lnClass="CSWI" id="Dummy.CSWIwithoutCtlModel">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.CSWI.Pos2" />
		</LNodeType>
		<LNodeType lnClass="XSWI" id="Dummy.XSWI1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.XCBR1.Pos" />
			<DO name="BlkOpn" type="Dummy.XCBR1.BlkOpn" />
			<DO name="BlkCls" type="Dummy.XCBR1.BlkOpn" />
		</LNodeType>
		<LNodeType lnClass="GGIO" id="Dummy.GGIO1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Ind1" type="Dummy.SPS" />
			<DO name="SPCSO1" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<LNodeType lnClass="TCTR" id="DummyTCTR">
            <DO name="Mod" type="Dummy.LLN0.Mod"/>
            <DO name="Beh" type="Dummy.LLN0.Beh"/>
            <DO name="NamPlt" type="Dummy.XCBR1.NamPlt"/>
            <DO name="Amp" type="DummySAV"/>
        </LNodeType>
		<LNodeType lnClass="TVTR" id="DummyTVTR">
            <DO name="Mod" type="Dummy.LLN0.Mod"/>
            <DO name="Beh" type="Dummy.LLN0.Beh"/>
            <DO name="NamPlt" type="Dummy.XCBR1.NamPlt"/>
            <DO name="Vol" type="DummySAV"/>
        </LNodeType>
		<LNodeType lnClass="MHAN" id="Dummy.MHAN">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="HaAmp" type="Dummy.HMV" />
		</LNodeType>
		<DOType cdc="HMV" id="Dummy.HMV" >
			<DA name="har" bType="Struct" count="numHar" type="someSdoType"/>
			<DA name="numHar" bType="INT16U" />
			<DA name="numCyc" bType="INT16U" />
			<DA name="evalTm" bType="INT16U" />
			<DA name="frequency" bType="INT16U" />
		</DOType>
		<DOType cdc="SAV" id="DummySAV">
            <DA fc="MX" name="instMag" bType="Struct" type="AnalogueValue_i"/>
            <DA fc="MX" qchg="true" name="q" bType="Quality"/>
            <DA fc="CF" name="sVC" bType="Struct" type="ScaledValueConfig"/>
        </DOType>
		<DOType cdc="ENC" id="Dummy.LLN0.Mod">
			<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="CO" name="SBO" bType="ObjRef" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.LLN0.Mod.Cancel" />
		</DOType>
		<DOType cdc="ENC" id="Dummy.LLN0.ExtendedMod">
			<SDO name="someSdo" type="someSdoType"/>
			<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="CO" name="SBO" bType="ObjRef" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.LLN0.Mod.Cancel" />
		</DOType>
		<DOType cdc="CMV" id="someSdoType">
			<DA fc="MX" qchg="true" name="q" bType="Quality"/>
			<DA fc="MX" name="t" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ENS" id="Dummy.LLN0.Beh">
			<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="ENS" id="Dummy.LLN0.Health">
			<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Health" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="LPL" id="Dummy.LLN0.NamPlt">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="DC" name="configRev" bType="VisString255" />
			<DA fc="EX" name="ldNs" bType="VisString255" />
		</DOType>
		<DOType cdc="DPL" id="Dummy.LPHD1.PhyNam">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="hwRev" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="serNum" bType="VisString255" />
			<DA fc="DC" name="model" bType="VisString255" />
		</DOType>
		<DOType cdc="SPC" id="Dummy.LPHD1.Sim">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="SBO" bType="ObjRef" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.LPHD1.Sim.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.LPHD1.Sim.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.LPHD1.Sim.Cancel" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.XCBR1.Pos">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.CSWI.Pos1">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
				<Val>sbo-with-enhanced-security</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.CSWI.Pos2">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel"/>
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="INS" id="Dummy.XCBR1.OpCnt">
			<DA fc="ST" name="stVal" bType="INT32" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="LPL" id="Dummy.XCBR1.NamPlt">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="SPC" id="Dummy.XCBR1.BlkOpn">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="SPS" id="Dummy.SPS">
            <DA fc="ST" dchg="true" name="stVal" bType="BOOLEAN"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
        </DOType>
		<DAType id="AnalogueValue_i">
            <BDA name="i" bType="INT32"/>
        </DAType>
		<DAType id="ScaledValueConfig">
            <BDA name="scaleFactor" bType="FLOAT32"/>
            <BDA name="offset" bType="FLOAT32"/>
        </DAType>
		<DAType id="Dummy_origin">
			<BDA name="orCat" bType="Enum" type="Dummy_orCategory" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="Dummy.LLN0.Mod.SBOw">
			<BDA name="ctlVal" bType="Enum" type="Dummy_Beh" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
			<ProtNs>IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="Dummy.LLN0.Mod.Cancel">
			<BDA name="ctlVal" bType="Enum" type="Dummy_Beh" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="Dummy.LPHD1.Sim.SBOw">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
			<ProtNs type="XMPP">IEC 61850-8-2:2021</ProtNs>
		</DAType>
		<DAType id="Dummy.LPHD1.Sim.Cancel">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
		</DAType>
		<EnumType id="Dummy_ctlModel">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="Dummy_Beh">
            <EnumVal ord="1">on</EnumVal>
            <EnumVal ord="2">blocked</EnumVal>
            <EnumVal ord="3">test</EnumVal>
            <EnumVal ord="4">test/blocked</EnumVal>
            <EnumVal ord="5">off</EnumVal>
        </EnumType>
		<EnumType id="Dummy_Health">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="Dummy_orCategory">
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
</SCL>`;
