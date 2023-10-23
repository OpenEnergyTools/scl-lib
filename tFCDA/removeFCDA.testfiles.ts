export const orphanFCDA = `
<FCDA ldName="ldName" />`;

export const singleConnection = `
<SCL>
<IED name="sinkIED">
    <AccessPoint name="someOtherAP">
        <Server>
            <LDevice inst="someOtherLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <Inputs>
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general" 
                            fc="ST" />
                    </Inputs>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="someDataSet1">
                        <FCDA 
                            ldInst="someLDInst" 
                            prefix="" 
                            lnClass="LLN0" 
                            lnInst="" 
                            doName="Op" 
                            daName="general" 
                            fc="ST" />
                    </DataSet>
                    <DataSet name="someDataSet2">
                        <FCDA 
                            ldInst="someLDInst" 
                            prefix="" 
                            lnClass="LLN0" 
                            lnInst="" 
                            doName="Op" 
                            daName="q" 
                            fc="ST" />
                    </DataSet>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
</SCL>`;

export const multipleConnectionsEd1 = `
<SCL schema="1.7">
<IED name="sinkIED1">
    <AccessPoint name="someOtherAP">
        <Server>
            <LDevice inst="someOtherLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <Inputs>
                        <ExtRef 
                            iedName="srcIED" 
                            prefix="" 
                            lnInst="" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general"
                            intAddr="someIntAddr" />
                    </Inputs>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<IED name="sinkIED2">
    <AccessPoint name="someOtherAP">
        <Server>
            <LDevice inst="someOtherLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <Inputs>
                        <ExtRef 
                            iedName="srcIED" 
                            prefix="" 
                            lnInst="" 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general" />
                    </Inputs>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="someName">
                        <FCDA 
                            ldInst="someLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general" 
                            fc="ST" />
                    </DataSet>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
</SCL>`;

export const singleConnectionEd2 = `
<SCL>
<IED name="sinkIED">
    <AccessPoint name="someOtherAP">
        <Server>
            <LDevice inst="someOtherLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <Inputs>
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someOtherLDInst" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general" 
                            srcCBName="cbName"
                            srcLNClass="LLN0"
                            srcLDInst="someLDInst" 
                            serviceType="GOOSE" />
                            />
                    </Inputs>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDInst">
                <LN0 prefix="" lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="someName">
                        <FCDA 
                            ldInst="someOtherLDInst" 
                            prefix="" 
                            lnClass="LLN0" 
                            lnInst="" 
                            doName="Op" 
                            daName="general" 
                            fc="ST" />
                    </DataSet>
                    <GSEControl name="cbName" datSet="someName" />
                </LN0>
            </LDevice>
            <LDevice inst="someOtherLDInst">
                <LN0 prefix="" lnClass="LLN0" inst="" lnType="someLnType" />
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
</SCL>`;

export const multipleConnectionsEd2 = `
<SCL version="2007" revision="A" release="1">
<IED name="sinkIED1">
    <AccessPoint name="someOtherAP">
        <Server>
            <LDevice inst="someOtherLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <Inputs>
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someOtherLDInst2" 
                            prefix="" 
                            lnClass="LLN0" 
                            lnInst="" 
                            doName="Op" 
                            daName="general" 
                            srcCBName="cbName2"
                            srcPrefix=""
                            srcLNClass="LLN0"
                            srcLNInst=""
                            srcLDInst="someLDInst" 
                            serviceType="GOOSE" 
                            intAddr="someIntAddr" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someOtherLDInst1" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general" 
                            srcCBName="cbName2"
                            srcLNClass="LLN0"
                            srcLDInst="someLDInst" 
                            serviceType="GOOSE" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someOtherLDInst2" 
                            lnClass="LLN0" 
                            doName="Op"
                            srcCBName="cbName3"
                            srcLNClass="LLN0"
                            srcLDInst="someLDInst" 
                            serviceType="SMV" />
                        <ExtRef 
                            iedName="srcIED" 
                            ldInst="someOtherLDInst3" 
                            prefix=""
                            lnClass="LLN0" 
                            lnInst=""
                            doName="Op" 
                            daName=""
                            srcPrefix=""
                            srcCBName="cbName4"
                            srcLNClass="LLN0"
                            srcLDInst="someOtherLDInst1" 
                            serviceType="GOOSE" />
                    </Inputs>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<IED name="sinkIED2">
    <AccessPoint name="someOtherAP">
        <Server>
            <LDevice inst="someOtherLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType" />
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDInst">
                <LN0 prefix="" lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="someDataSet1">
                        <FCDA 
                            ldInst="someOtherLDInst1" 
                            lnClass="LLN0" 
                            doName="Op" 
                            daName="general" 
                            fc="ST" />
                    </DataSet>
                    <DataSet name="someDataSet2">
                        <FCDA 
                            ldInst="someOtherLDInst2" 
                            prefix=""
                            lnClass="LLN0"
                            lnInst="" 
                            doName="Op" 
                            daName="general" 
                            fc="ST" />
                    </DataSet>
                    <DataSet name="someDataSet3">
                        <FCDA 
                            ldInst="someOtherLDInst2" 
                            prefix=""
                            lnClass="LLN0"
                            lnInst="" 
                            doName="Op" 
                            daName=""
                            fc="ST" />
                    </DataSet>
                    <GSEControl name="cbName1" datSet="someDataSet1" />
                    <GSEControl name="cbName2" datSet="someDataSet2" />
                    <GSEControl name="cbName3" datSet="someDataSet3" />
                </LN0>
            </LDevice>
            <LDevice inst="someOtherLDInst1">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType" >
                    <DataSet name="someDataSet4">
                        <FCDA 
                            ldInst="someOtherLDInst3" 
                            lnClass="LLN0"
                            doName="Op" 
                            fc="ST" />
                    </DataSet>
                    <GSEControl name="cbName4" datSet="someDataSet4" />
                </LN0>
            </LDevice>
            <LDevice inst="someOtherLDInst2">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType" />
            </LDevice>
            <LDevice inst="someOtherLDInst3">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType" />
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
</SCL>`;
