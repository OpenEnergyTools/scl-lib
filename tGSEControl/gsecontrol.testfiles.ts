export const gseControlDoc = `
<SCL version="2007">
<Communication>
    <SubNetwork name="someSubNet">
        <ConnectedAP iedName="srcIED" apName="someAP">
            <GSE ldInst="someLDInst" cbName="someGse2" />
        </ConnectedAP>
    </SubNetwork>
</Communication>
<IED name="sinkIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDevice">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <Inputs desc="GSE">
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general"
                            srcLDInst="someLDInst"
                            srcLNClass="LLN0"
                            srcCBName="someGse"
                            serviceType="GOOSE" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="q"
                            srcLDInst="someLDInst"
                            srcLNClass="LLN0"
                            srcLNInst=""
                            srcCBName="someGse"
                            serviceType="GOOSE" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Beh" 
                            daName="stVal"
                            srcPrefix=""
                            srcLDInst="someLDInst"
                            srcLNClass="LLN0"
                            srcCBName="someGse2"
                            serviceType="GOOSE" 
                            intAddr="someIntAddr" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Beh" 
                            daName="q"
                            srcLDInst="someLDInst"
                            srcPrefix=""
                            srcLNClass="LLN0"
                            srcLNInst=""
                            srcCBName="someGse3"
                            serviceType="GOOSE" />
                    </Inputs>
                </LN0>
                <LN prefix="" lnClass="PROC" lnInst="1" lnType="pTOClnType">
                    <Inputs desc="SMV">
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst"
                            prefix="L1"
                            lnClass="TCTR"
                            lnInst="1" 
                            doName="A.phsA" 
                            daName="AmpSv.instMag.i"
                            srcLDInst="someLDInst"
                            srcPrefix=""
                            srcLNClass="LLN0"
                            srcLNInst=""
                            srcCBName="someSmv"
                            serviceType="SMV" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst" 
                            prefix="L1"
                            lnClass="TVTR"
                            lnInst="1" 
                            doName="PhV.phsA" 
                            daName="VolSv.instMag.i"
                            srcLDInst="someLDInst"
                            srcLNClass="LLN0"
                            srcCBName="someSmv"
                            serviceType="SMV" />
                    </Inputs>
                </LN>
            </LDevice>
            <LDevice inst="smvSupervision">
                <LN lnClass="LSVS" inst="1" lnType="someLSVSType">
                    <DOI name="SvCBRef">
                        <DAI name="setSrcRef">
                            <Val>srcIEDsomeLDInst/LLN0.someSmv</Val>
                        </DAI>
                    </DOI>
                </LN>
            </LDevice>
            <LDevice inst="gseSupervision">
                <LN lnClass="LGOS" inst="1" lnType="someLGOSType">
                    <DOI name="GoCBRef">
                        <DAI name="setSrcRef">
                            <Val><!-- I'm a sneaky comment-->srcIEDsomeLDInst/LLN0.someGse</Val>
                        </DAI>
                    </DOI>
                </LN>
                <LN lnClass="LGOS" inst="2" lnType="someLGOSType">
                    <Private type="OpenSCD.create" />
                    <DOI name="GoCBRef">
                        <DAI name="setSrcRef">
                            <Val>srcIEDsomeLDInst/LLN0.someGse2</Val>
                        </DAI>
                    </DOI>
                </LN>           
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="gseDataSet1">
                        <FCDA ldInst="someLDInst" prefix="" lnClass="LLN0" lnInst="" doName="Op" daName="general" fc="ST" />
                        <FCDA ldInst="someLDInst" lnClass="LLN0" doName="Beh" daName="q" fc="ST" />
                    </DataSet>
                    <DataSet name="gseDataSet2" >
                        <FCDA ldInst="someLDInst" lnClass="LLN0" doName="Beh" daName="stVal" fc="ST" />
                        <FCDA ldInst="someLDInst" prefix="" lnClass="LLN0" lnInst="" doName="Beh" daName="q" fc="ST" />
                    </DataSet>
                    <DataSet name="smvDataSet">
                        <FCDA ldInst="smvLDInst" prefix="L1" lnClass="TCTR" lnInst="1" doName="A.phsA" daName="AmpSv.instMag.i" fc="MX" />
                        <FCDA ldInst="smvLDInst" prefix="L1" lnClass="TVTR" lnInst="1" doName="PhV.phsA" daName="VolSv.instMag.i" fc="MX" />
                    </DataSet>
                    <GSEControl name="someGse" datSet="gseDataSet1" confRev="10001"/>
                    <GSEControl name="someGse2" datSet="gseDataSet1" confRev="1" />
                    <GSEControl name="someGse3" datSet="gseDataSet2" confRev="20001" />
                    <SampledValueControl name="someSmv" datSet="smvDataSet" confRev="1" />
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<DataTypeTemplates>
    <LNodeType id="someLGOSType" lnClass="LGOS">
        <DO name="GoCBRef" type="someGseORG"/>
    </LNodeType>
    <LNodeType id="someLSVSType" lnClass="LSVS">
        <DO name="SvCBRef" type="someSmvORG"/>
    </LNodeType>
    <DOType cdc="ORG" id="someGseORG">
        <DA name="setSrcRef" valImport="true" valKind="RO" />
    </DOType>
    <DOType cdc="ORG" id="someSmvORG">
        <DA name="setSrcRef" />
    </DOType>
</DataTypeTemplates>
</SCL>`;
