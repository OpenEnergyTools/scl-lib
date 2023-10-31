export const woInstType = `
<GSE ldInst="ldInst" cbName="cbName">
<Address>
    <P type="MAC-Address">01-0C-CD-01-00-03</P>
    <P type="APPID">0004</P>
    <P type="VLAN-ID">000</P>
    <P type="VLAN-PRIORITY">4</P>
</Address>
<MinTime unit="s" multiplier="m">8</MinTime>
<MaxTime unit="s" multiplier="m">4096</MaxTime>
</GSE>`;

export const withInstType = `
<GSE ldInst="ldInst" cbName="cbName">
<Address>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_MAC-Address" type="MAC-Address">01-0C-CD-01-00-03</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_APPID" type="APPID">0004</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_VLAN-ID" type="VLAN-ID">000</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_VLAN-PRIORITY" type="VLAN-PRIORITY">4</P>
</Address>
<MinTime unit="s" multiplier="m">8</MinTime>
<MaxTime unit="s" multiplier="m">4096</MaxTime>
</GSE>`;

export const partlyInstType = `
<GSE ldInst="ldInst" cbName="cbName">
<Address>
    <P type="MAC-Address">01-0C-CD-01-00-03</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_APPID" type="APPID">0004</P>
    <P type="VLAN-ID">000</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_VLAN-PRIORITY" type="VLAN-PRIORITY">4</P>
</Address>
<MinTime unit="s" multiplier="m">8</MinTime>
<MaxTime unit="s" multiplier="m">4096</MaxTime>
</GSE>`;

export const nulledGSE = `
<GSE ldInst="ldInst" cbName="cbName">
</GSE>`;

export const orphanGSEControl = `
<GSEControl name="someGse">
</GSEControl>`;

export const simpleReferenceGSE = `
<SCL version="2007">
<Communication>
    <SubNetwork name="someSubNet">
        <ConnectedAP iedName="srcIED" apName="someAP">
            <GSE ldInst="someLDInst" cbName="someGse2" />
        </ConnectedAP>
    </SubNetwork>
</Communication>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="gseDatSet">
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
                    <GSEControl name="someGse" datSet="gseDatSet"/>
                    <GSEControl name="someGse2" datSet="gseDatSet"/>
                    <GSEControl name="someGse3" datSet="gseDatSet"/>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
</SCL>`;

export const multiReferenceGSE = `
<SCL version="2007">
<Communication>
    <SubNetwork name="someSubNet">
        <ConnectedAP iedName="srcIED" apName="someAP">
            <GSE ldInst="someLDInst" cbName="someGse2">
                <Address>
                    <P type="MAC-Address">01-0C-CD-01-00-00</P>
                    <P type="APPID">0000</P>
                    <P type="VLAN-ID">001</P>
                    <P type="VLAN-PRIORITY">4</P>
                </Address>
                <MinTime multiplier=""
            </GSE>
        </ConnectedAP>
    </SubNetwork>
</Communication>
<IED name="srcIED">
    <AccessPoint name="someAP">
        <Server>
            <LDevice inst="someLDInst">
                <LN0 lnClass="LLN0" inst="" lnType="someLnType">
                    <DataSet name="gseDatSet">
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
                    <GSEControl name="someGse" datSet="gseDatSet"/>
                    <GSEControl name="someGse2" datSet="gseDatSet"/>
                    <GSEControl name="someGse3" datSet="gseDatSet"/>
                </LN0>
            </LDevice>
        </Server>
    </AccessPoint>
</IED>
</SCL>`;
