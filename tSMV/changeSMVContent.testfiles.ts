export const woInstType = `
<SMV ldInst="ldInst" cbName="cbName">
<Address>
    <P type="MAC-Address">01-0C-CD-04-00-03</P>
    <P type="APPID">4004</P>
    <P type="VLAN-ID">000</P>
    <P type="VLAN-PRIORITY">4</P>
</Address>
</SMV>`;

export const withInstType = `
<SMV ldInst="ldInst" cbName="cbName">
<Address>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_MAC-Address" type="MAC-Address">01-0C-CD-04-00-03</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_APPID" type="APPID">4004</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_VLAN-ID" type="VLAN-ID">000</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_VLAN-PRIORITY" type="VLAN-PRIORITY">4</P>
</Address>
</SMV>`;

export const partlyInstType = `
<SMV ldInst="ldInst" cbName="cbName">
<Address>
    <P type="MAC-Address">01-0C-CD-04-00-03</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_APPID" type="APPID">4004</P>
    <P type="VLAN-ID">000</P>
    <P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="tP_VLAN-PRIORITY" type="VLAN-PRIORITY">4</P>
</Address>
</SMV>`;

export const nulledSMV = `
<SMV ldInst="ldInst" cbName="cbName">
</SMV>`;
