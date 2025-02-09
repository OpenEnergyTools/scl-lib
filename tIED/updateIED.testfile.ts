export const scl = `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <Header id="GOOSELaterBinding"/>
    <Substation name="AA1">
        <LNode iedName="Pub" ldInst="lisher" lnClass="LLN0" />
        <LNode iedName="Publi" ldInst="sher" lnClass="LLN0" />
        <VoltageLevel name="E1" >
            <Bay name="Q01">
                <ConductingEquipment name="QA1" type="CBR">
                    <SubEquipment name="">
                        <LNode iedName="Pub" ldInst="lisher" lnClass="LLN0" />
                        <LNode iedName="Publi" ldInst="sher" lnClass="LLN0" />
                    </SubEquipment>
                </ConductingEquipment>
            </Bay>
        </VoltageLevel>
    </Substation>
    <Communication>
        <SubNetwork name="Bus">
            <ConnectedAP iedName="Pub" apName="AP1" />
            <ConnectedAP iedName="Publi" apName="AP1" />
            <ConnectedAP iedName="Subscriber1" apName="AP1" />
            <ConnectedAP iedName="Subscriber2" apName="AP1" />
        </SubNetwork>
    </Communication>
    <IED name="Client">
        <AccessPoint name="AP1">
            <LN lnClass="LHMI" inst="1" />
            <LN lnClass="LTCI" inst="1" />
        </AccessPoint>
    </IED>
    <IED name="Pub" desc="GOOSE subscriber" manufacturer="Dummy">
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="lisher">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" >
                <DataSet name="gooseDataSet">
                    <FCDA ldInst="ldInst" doName="Pos" daName="stVal" fc="ST" />
                    <FCDA ldInst="ldInst" doName="Pos" daName="q" fc="ST" />
                </DataSet>
                <DataSet name="smvDataSet">
                    <FCDA ldInst="ldInst" doName="AmpSv" daName="cVal.i" fc="ST" />
                    <FCDA ldInst="ldInst" doName="AmpSv" daName="q" fc="ST" />
                </DataSet>
                <GSEControl name="gooseCB1" datSet="gooseDataSet" >
                    <IEDName>Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </GSEControl>
                <GSEControl name="gooseCB2" datSet="gooseDataSet" >
                    <IEDName>Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </GSEControl>
                <SampledValueControl name="smvCB1" datSet="smvDataSet" >
                    <IEDName>Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </SampledValueControl>
                <SampledValueControl name="smvCB2" datSet="smvDataSet" >
                    <IEDName>Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </SampledValueControl>
                <ReportControl name="reportCB" >
                    <RptEnabled max="1">
                        <ClientLN iedName="Client" apName="AP1" lnClass="LHMI" lnInst="1" />
                        <ClientLN iedName="Client" apName="AP1" lnClass="LTCI" lnInst="1" />
                    </RptEnabled>
                </ReportControl>
            </LN0>
          </LDevice>
          <Association iedName="Publi" lsInst="sher" lnClass="LLN0" lnInst="" kind="predefined" />
        </Server>
      </AccessPoint>
    </IED>
    <IED name="Publi" desc="GOOSE subscriber" manufacturer="Dummy">
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="sher">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" >
                <DataSet name="gooseDataSet">
                    <FCDA ldInst="ldInst" doName="Pos" daName="stVal" fc="ST" />
                    <FCDA ldInst="ldInst" doName="Pos" daName="q" fc="ST" />
                </DataSet>
                <DataSet name="smvDataSet">
                    <FCDA ldInst="ldInst" doName="AmpSv" daName="cVal.i" fc="ST" />
                    <FCDA ldInst="ldInst" doName="AmpSv" daName="q" fc="ST" />
                </DataSet>
                <GSEControl name="gooseCB1" datSet="gooseDataSet" >
                    <IEDName>Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </GSEControl>
                <GSEControl name="gooseCB2" datSet="gooseDataSet" >
                    <IEDName>Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </GSEControl>
                <SampledValueControl name="smvCB1" datSet="smvDataSet" >
                    <IEDName>Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </SampledValueControl>
                <SampledValueControl name="smvCB2" datSet="smvDataSet" >
                    <IEDName><!-- I'm a sneaky comment-->Subscriber1</IEDName>
                    <IEDName>Subscriber2</IEDName>
                </SampledValueControl>
            </LN0>
          </LDevice>
        </Server>
      </AccessPoint>
      <KDC iedName="Pub" apName="AP1" />
    </IED>
    <IED name="Subscriber1" desc="Subscriber1" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="4" maxSv="4"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Subscription">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" >
              <Inputs>
                <ExtRef iedName="Pub" ldInst="ldInst" doName="Pos" daName="stVal" serviceType="GOOSE" srcCBName="gooseCB1" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Pub" ldInst="ldInst" doName="Pos" daName="q" serviceType="GOOSE" srcCBName="gooseCB1" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="Pos" daName="stVal" serviceType="GOOSE" srcCBName="gooseCB2" srcLDInst="sher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="Pos" daName="q" serviceType="GOOSE" srcCBName="gooseCB2" srcLDInst="sher" srcLNClass="LLN0" />
                <ExtRef iedName="Pub" ldInst="ldInst" doName="AmpSv" daName="cVal.i" serviceType="SMV" srcCBName="smvCB1" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Pub" ldInst="ldInst" doName="AmpSv" daName="q" serviceType="SMV" srcCBName="smvCB1" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="AmpSv" daName="q" serviceType="SMV" srcCBName="smvCB2" srcLDInst="sher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="AmpSv" daName="cVal.i" serviceType="SMV" srcCBName="smvCB2" srcLDInst="sher" srcLNClass="LLN0" />
              </Inputs>
            </LN0>
          </LDevice>
          <LDevice inst="GOOSE_Supervision">
            <LN0 lnClass="LLN0" inst="" />
            <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>Publisher/LLN0.gooseCB1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="2" >
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>Publisher/LLN0.gooseCB2</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
          <LDevice inst="SMV_Supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" />
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LGOS">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef">
                  <Val>Publisher/LLN0.smvCB1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LGOS">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef">
                  <Val>Publisher/LLN0.smvCB2</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="Subscriber2" desc="Subscriber2" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="4" maxSv="4"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Subscription">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" >
              <Inputs>
                <ExtRef iedName="Pub" ldInst="ldInst" doName="Pos" daName="stVal" serviceType="GOOSE" srcCBName="gooseCB2" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Pub" ldInst="ldInst" doName="Pos" daName="q" serviceType="GOOSE" srcCBName="gooseCB2" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="Pos" daName="stVal" serviceType="GOOSE" srcCBName="gooseCB1" srcLDInst="sher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="Pos" daName="q" serviceType="GOOSE" srcCBName="gooseCB1" srcLDInst="sher" srcLNClass="LLN0" />
                <ExtRef iedName="Pub" ldInst="ldInst" doName="AmpSv" daName="cVal.i" serviceType="SMV" srcCBName="smvCB2" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Pub" ldInst="ldInst" doName="AmpSv" daName="q" serviceType="SMV" srcCBName="smvCB2" srcLDInst="lisher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="AmpSv" daName="q" serviceType="SMV" srcCBName="smvCB1" srcLDInst="sher" srcLNClass="LLN0" />
                <ExtRef iedName="Publi" ldInst="ldInst" doName="AmpSv" daName="cVal.i" serviceType="SMV" srcCBName="smvCB1" srcLDInst="sher" srcLNClass="LLN0" />
              </Inputs>
            </LN0>
          </LDevice>
          <LDevice inst="GOOSE_Supervision">
            <LN0 lnClass="LLN0" inst="" />
            <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>Publisher/LLN0.gooseCB2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="2" >
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>Publisher/LLN0.gooseCB1</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
          <LDevice inst="SMV_Supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" />
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LGOS">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef">
                  <Val>Publisher/LLN0.smvCB2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="2" lnType="Dummy.LGOS">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef">
                  <Val><!-- I'm a sneaky comment-->Publisher/LLN0.smvCB1</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
          <LDevice inst="TestObjRef">
            <LN lnType="MyCSWI" prefix="CB1" lnClass="CSWI" inst="1">
            <DOI name="Pos">
              <SDI name="Oper">
                <DAI name="ctlVal"/>
                <SDI name="origin">
                  <DAI name="orCat"/>
                </SDI>
              </SDI>
              <DAI name="stVal"/>
              <DAI name="ctlModel">
                <Val>sbo-with-enhanced-security</Val>
              </DAI>
              <DAI name="sboTimeout">
                <Val>10000</Val>
              </DAI>
              <DAI name="stSeld">
                <Val>false</Val>
              </DAI>
            </DOI>
            <DOI name="InRef1">
              <DAI name="setSrcRef">
                <Val>Subscriber2TestObjRef/CB1CILO1.EnaOpn.stVal</Val>
              </DAI>
            </DOI>
            <DOI name="InRef2">
              <DAI name="setSrcRef">
                <Val>Subscriber2TestObjRef/CB2CILO1.EnaCls.stVal</Val>
              </DAI>
            </DOI>
            <DOI name="InRef3">
              <DAI name="setSrcRef">
                <Val>Subscriber2TestObjRef/CB3CILO1.EnaOpn.stVal</Val>
              </DAI>
            </DOI>
            <DOI name="InRef4">
              <DAI name="setSrcRef" valKind="Conf" valImport="true">
                <Val>Subscriber2TestObjRef/CB4CILO1.EnaCls.stVal</Val>
              </DAI>
            </DOI>
            <DOI name="InRef5">
              <DAI name="setSrcRef" valKind="Conf" valImport="true">
                <Val>Subscriber2TestObjRef/CB5CILO1.EnaCls.stVal</Val>
              </DAI>
            </DOI>
            <DOI name="InRef6">
              <DAI name="setSrcRef" valKind="Conf" valImport="true">
                <Val>SomeOtherIEDObjRef/CB5CILO1.EnaCls.stVal</Val>
              </DAI>
            </DOI>
            <DOI name="InRef7">
              <DAI name="setSrcRef" valKind="Conf" valImport="true">
              </DAI>
            </DOI>
            <DOI name="InRef8">
              <DAI name="setSrcRef" valKind="Conf" valImport="true">
                <Val>Subscriber2TestObjRef/CB5CILO1.EnaCls.stVal</Val>
              </DAI>
            </DOI>
            <DOI name="InRef9">
              <DAI name="setSrcRef" valKind="Conf" valImport="true">
                <Val>Subscriber2NotExistingObjRef/CB5CILO1.EnaCls.stVal</Val>
              </DAI>
            </DOI>
          </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <DataTypeTemplates>
      <LNodeType id="MyCSWI" lnClass="CSWI">
        <DO name="Beh" type="behENS"/>
        <DO name="Loc" type="SPS_0"/>
        <DO name="LocSta" type="SPC_0"/>
        <DO name="OpOpn" type="ACT_0"/>
        <DO name="OpCls" type="ACT_0"/>
        <DO name="Pos" type="MyPos"/>
        <DO name="InRef1" type="InRefDOType1"/>
        <DO name="InRef2" type="InRefDOType2"/>
        <DO name="InRef3" type="InRefDOType3"/>
        <DO name="InRef4" type="InRefDOType45"/>
        <DO name="InRef5" type="InRefDOType45"/>
        <DO name="InRef6" type="InRefDOType3"/>
        <DO name="InRef7" type="InRefDOType45"/>
        <DO name="InRef8" type="InRefDOType6"/>
        <DO name="InRef9" type="InRefDOType3"/>
     </LNodeType>
      <DOType id="InRefDOType1" cdc="ORG">
        <DA name="setSrcRef" bType="ObjRef" valKind="RO" dchg="true" fc="SP"/>
      </DOType>
      <DOType id="InRefDOType2" cdc="ORG">
        <DA name="setSrcRef" bType="ObjRef" valKind="RO" valImport="true" dchg="true" fc="SP"/>
      </DOType>
      <DOType id="InRefDOType3" cdc="ORG">
        <DA name="setSrcRef" bType="ObjRef" valKind="Conf" valImport="true" dchg="true" fc="SP"/>
      </DOType>
      <DOType id="InRefDOType45" cdc="ORG">
        <DA name="setSrcRef" bType="ObjRef" dchg="true" fc="SP"/>
      </DOType>
      <DOType id="InRefDOType6" cdc="ORG">
        <!--Whoops, sorry - no DA! -->
        <DA name="setSrcRefX" bType="ObjRef" dchg="true" fc="SP"/>
      </DOType>
      <DOType id="MyPos" cdc="DPC">
        <DA name="SBOw" bType="Struct" type="SomeMissingType1" fc="CO"/>
        <DA name="Oper" bType="Struct" type="SomeMissingType2" fc="CO"/>
        <DA name="Cancel" bType="Struct" type="SomeMissingType3" fc="CO"/>
        <DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
        <DA name="q" sAddr="1002" bType="Quality" qchg="true" fc="ST"/>
        <DA name="t" bType="Timestamp" fc="ST"/>
        <DA name="stSeld" bType="BOOLEAN" dchg="true" fc="ST">
          <Val>false</Val>
        </DA>
        <DA name="ctlModel" bType="Enum" valKind="RO" type="CtlModelKindEnum" dchg="true" fc="CF"/>
        <DA name="sboTimeout" bType="INT32U" valKind="RO" dchg="true" fc="CF">
          <Val>10000</Val>
        </DA>
        <DA name="operTimeout" bType="INT32U" valKind="RO" dchg="true" fc="CF">
          <Val>1000</Val>
        </DA>
      </DOType>
      <EnumType id="CtlModelKindEnum">
        <EnumVal ord="0">status-only</EnumVal>
        <EnumVal ord="1">direct-with-normal-security</EnumVal>
        <EnumVal ord="3">direct-with-enhanced-security</EnumVal>
        <EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
      </EnumType>
    </DataTypeTemplates>
  </SCL>`;
