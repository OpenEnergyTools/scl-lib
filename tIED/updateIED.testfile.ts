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
    <IED name="Subscriber2" desc="Subscriber1" manufacturer="Dummy">
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
        </Server>
      </AccessPoint>
    </IED>
  </SCL>`;
