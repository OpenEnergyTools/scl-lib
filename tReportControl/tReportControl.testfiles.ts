export const subscribedReport = `
<SCL version="2007">
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
                            srcCBName="someReport"
                            serviceType="Report" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="q"
                            srcLDInst="someLDInst"
                            srcLNClass="LLN0"
                            srcLNInst=""
                            srcCBName="someReport"
                            serviceType="Report" />
                    </Inputs>
                </LN0>
                <LN lnClass="USER" inst="1" />
            </LDevice>
            <LDevice inst="second" />
        </Server>
    </AccessPoint>
</IED>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Services>
            <ConfReportControl max="3" />
        </Services>
        <Server>
            <LDevice inst="someLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="rptDataSet">
                        <FCDA 
                            ldInst="someLDInst" 
                            prefix="" 
                            lnClass="LLN0" 
                            lnInst="" 
                            doName="Op" 
                            daName="general" 
                            fc="ST" />
                        <FCDA 
                            ldInst="someLDInst" 
                            prefix="" 
                            lnClass="LLN0" 
                            lnInst="" 
                            doName="Op" 
                            daName="q" 
                            fc="ST" />
                        <FCDA 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Beh" 
                            daName="stVal" 
                            fc="ST" />
                        <FCDA 
                            ldInst="someLDInst" 
                            prefix="" 
                            lnClass="LLN0" 
                            lnInst="" 
                            doName="Beh" 
                            daName="q" 
                            fc="ST" />
                    </DataSet>
                    <ReportControl name="someReport" datSet="rptDataSet" confRev="10001"/>
                    <ReportControl name="newReportControl_001" />
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
</SCL>`;
