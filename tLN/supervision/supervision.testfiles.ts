export const supervision = `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <Header id="Supervision"/>
    <IED name="SupervisionNotSupported" desc="GOOSE subscriber" manufacturer="Dummy">
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Earth_Switch">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" />
            <LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI" />
            <LN lnClass="LGOS" lnType="Dummy.LGOS2" />
            <LN lnClass="LSVS" lnType="Dummy.LSVS2" />
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="Publisher" desc="Publisher IED" manufacturer="Dummy">
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="GOOSE">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
              <DataSet name="GOOSE_DataSet">
                <FCDA ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
                <FCDA ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" fc="ST" />
              </DataSet>
              <GSEControl name="GOOSE6" type="GOOSE" appID="GOOSE3" confRev="0" />
              <GSEControl name="GOOSE5" type="GOOSE" appID="GOOSE3" confRev="0" />
              <GSEControl name="GOOSE4" type="GOOSE" appID="GOOSE3" confRev="0" />
              <GSEControl name="GOOSE3" type="GOOSE" appID="GOOSE3" confRev="0" />
              <GSEControl name="GOOSE2" type="GOOSE" appID="GOOSE2" confRev="0" />
              <GSEControl name="GOOSE1" type="GOOSE" appID="GOOSE1" confRev="0" />
            </LN0>
          </LDevice>
          <LDevice inst="SampledValue">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
              <SampledValueControl name="SMV1" confRev="0" />
              <SampledValueControl name="SMV2" confRev="0" />
              <SampledValueControl name="SMV3" confRev="0" />
              <SampledValueControl name="SMV4" confRev="0" />
              <SampledValueControl name="SMV5" confRev="0" />
              <SampledValueControl name="SMV6" confRev="0" />
            </LN0>
          </LDevice>
          <LDevice inst="CB" >
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" />
            <LN prefix="CB" lnClass="CSWI" inst="1" lnType="Dummy.CSWI" />
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="GOOSE_Subscriber1" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="4" maxSv="0"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val></Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="GOOSE_Subscriber2" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="4" maxSv="0"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="GOOSE_Subscriber3" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="4" maxSv="0"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="GOOSE_Subscriber4" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="6" maxSv="0"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
              <Inputs>
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE1" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE1" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE2" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE2" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE4" /> 
                <ExtRef intAddr="Pos.stVal" pServT="GOOSE" pDO="Pos" pDA="stVal" /> 
                <ExtRef intAddr="Pos.q" pServT="GOOSE" pDO="Pos" pDA="q" /> 
              </Inputs>
            </LN0>
            <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS">
              
            </LN>
            <LN lnClass="LGOS" inst="5" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="GOOSE_Subscriber5" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="6" maxSv="0"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="Supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0" >
              <Inputs>
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE1" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE1" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE2" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE2" /> 
                <ExtRef iedName="Publisher" ldInst="CB" prefix="CB" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" serviceType="GOOSE" srcLDInst="GOOSE" srcLNClass="LLN0" srcCBName="GOOSE4" /> 
                <ExtRef intAddr="Pos.stVal" pServT="GOOSE" pDO="Pos" pDA="stVal" /> 
                <ExtRef intAddr="Pos.q" pServT="GOOSE" pDO="Pos" pDA="q" /> 
              </Inputs>
            </LN0>
            <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LGOS" inst="5" lnType="Dummy.LGOS">
              <Private type="OpenSCD.create"/>
              <DOI name="GoCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherGOOSE/LLN0.GOOSE4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="SV_Subscriber1" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="0" maxSv="4"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="SV_supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="2" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val></Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="3" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="4" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="SV_Subscriber2" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="0" maxSv="4"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="SV_supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="2" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" />
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="3" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="4" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="SV_Subscriber3" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="0" maxSv="4"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="SV_supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LSVS1">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="2" lnType="Dummy.LSVS1">
              <DOI name="SvCBRef">
               
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="3" lnType="Dummy.LSVS1">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="4" lnType="Dummy.LSVS1">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="SV_Subscriber4" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="0" maxSv="4"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="SV_supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="2" lnType="Dummy.LSVS2">
              
            </LN>
            <LN lnClass="LSVS" inst="3" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="4" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="SV_Subscriber5" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="0" maxSv="4"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="SV_supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN prefix="SMVPrefix" lnClass="LSVS" inst="1" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV1</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="3" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV2</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="4" lnType="Dummy.LSVS2">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef" valImport="true" valKind="Conf" >
                    <Val>PublisherSampledValue/LLN0.SMV4</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <IED name="SvAndGo_Subscriber" desc="GOOSE subscriber" manufacturer="Dummy">
      <Services>
        <SupSubscription maxGo="1" maxSv="2"/>
      </Services>
      <AccessPoint name="AP1">
        <Server>
          <LDevice inst="SV_supervision">
            <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
            <LN lnClass="LSVS" inst="1" lnType="Dummy.LSVS">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherSampledValue/LLN0.someSmv</Val>
                </DAI>
              </DOI>
            </LN>
            <LN lnClass="LSVS" inst="2" lnType="Dummy.LSVS">
              <DOI name="SvCBRef">
                <DAI name="setSrcRef">
                  <Val>PublisherSampledValue/LLN0.someSmv2</Val>
                </DAI>
              </DOI>
            </LN>
          </LDevice>
          <LDevice inst="Go_supervision">
          <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
          <LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
            <DOI name="GoCBRef">
              <DAI name="setSrcRef">
                <Val>PublisherQB2_Disconnector/LLN0.GOOSE2</Val>
              </DAI>
            </DOI>
          </LN>
        </LDevice>
        </Server>
      </AccessPoint>
    </IED>
    <DataTypeTemplates>
      <LNodeType lnClass="LGOS" id="Dummy.LGOS">
        <DO name="GoCBRef" type="Dummy.ORG"/>
      </LNodeType>
      <LNodeType lnClass="LGOS" id="Dummy.LGOS1">
        <DO name="GoCBRef" type="Dummy.ORG1"/>
      </LNodeType>
      <LNodeType lnClass="LGOS" id="Dummy.LGOS2">
        <DO name="GoCBRef" type="Dummy.ORG2"/>
      </LNodeType>
      <LNodeType lnClass="LSVS" id="Dummy.LSVS">
        <DO name="SvCBRef" type="Dummy.ORG"/>
      </LNodeType>
      <LNodeType lnClass="LSVS" id="Dummy.LSVS1">
        <DO name="SvCBRef" type="Dummy.ORG1"/>
      </LNodeType>
      <DOType cdc="ORG" id="Dummy.ORG">
        <DA name="setSrcRef" bType="ObjRef" dchg="true" valKind="RO" valImport="true" fc="SP"/>
      </DOType>
      <DOType cdc="ORG" id="Dummy.ORG1">
        <DA name="setSrcRef" bType="ObjRef" dchg="true" valKind="Conf" valImport="true" fc="SP"/>
      </DOType>
      <DOType cdc="ORG" id="Dummy.ORG2">
        <DA name="setSrcRef" bType="ObjRef" dchg="true" fc="SP"/>
      </DOType>
    </DataTypeTemplates>
  </SCL>`;

export const orphanControlBlock = `<GSEControl name="GOOSE3" />`;
