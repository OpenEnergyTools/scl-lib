export const invalidScl = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <LNodeType id="someFakeIds" >
        <DO name="Beh" type="someType"
    </LNodeType>
</SCL>`;

export const mmxu = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="project"/>
	<DataTypeTemplates>
		<LNodeType lnClass="MMXU" id="MMXU$oscd$_c83c0b5963558681">
			<DO name="Beh" type="Beh$oscd$_f1a426046ceedd46"/>
			<DO name="A" type="A$oscd$_67cc94e14f712b32"/>
			<DO name="Hz" type="Hz$oscd$_979742e3ddefd568"/>
			<DO name="Mod" type="Mod$oscd$_f595ae60fd1bdba5"/>
		</LNodeType>
        <LNodeType lnClass="PTOC" id="PTOC$oscd$_c83c0b59635asdd">
			<DO name="Beh" type="Beh$oscd$_f1a426046ceedd46"/>
			<DO name="Mod" type="Mod$oscd$_f595ae60fd1bdba5"/>
		</LNodeType>
		<DOType cdc="ENC" id="Mod$oscd$_f595ae60fd1bdba5">
			<DA name="stVal" fc="ST" dchg="true" bType="Enum" type="stVal$oscd$_48ba16345b8e7f5b"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_d3bc74b2690f022e"/>
			<DA name="SBOw" fc="CO" bType="Struct" type="SBOw$oscd$_e57fac30c1740d87"/>
			<DA name="Oper" fc="CO" bType="Struct" type="Oper$oscd$_e57fac30c1740d87"/>
			<DA name="Cancel" fc="CO" bType="Struct" type="Cancel$oscd$_7f4258185194f976"/>
		</DOType>
        <DOType cdc="ENC" id="Mod$oscd$_f595ae60fd1bdasdf">
			<DA name="stVal" fc="ST" dchg="true" bType="Enum" type="stVal$oscd$_48ba16345b8e7f5b"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_d3bc74b2690f022e"/>
		</DOType>
		<DOType cdc="MV" id="Hz$oscd$_979742e3ddefd568">
			<DA name="mag" fc="MX" dchg="true" dupd="true" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="units" fc="CF" dchg="true" bType="Struct" type="units$oscd$_18b92a11f3e0b360"/>
			<DA name="sVC" fc="CF" dchg="true" bType="Struct" type="sVC$oscd$_df6488ea078bf55c"/>
		</DOType>
		<DOType cdc="WYE" id="A$oscd$_67cc94e14f712b32">
			<SDO name="phsC" type="phsC$oscd$_16d33d83a36d07b3"/>
			<SDO name="phsB" type="phsB$oscd$_0b99219f396fac0f"/>
			<SDO name="phsA" type="phsA$oscd$_16d33d83a36d07b3"/>
		</DOType>
		<DOType cdc="CMV" id="phsC$oscd$_16d33d83a36d07b3">
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_21f679e08734a896"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="units" fc="CF" dchg="true" bType="Struct" type="units$oscd$_18b92a11f3e0b360"/>
		</DOType>
		<DOType cdc="CMV" id="phsB$oscd$_0b99219f396fac0f">
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_b2a7664de2216dae"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
		</DOType>
		<DOType cdc="CMV" id="phsA$oscd$_16d33d83a36d07b3">
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_21f679e08734a896"/>
			<DA name="q" fc="MX" qchg="true" bType="Quality"/>
			<DA name="t" fc="MX" bType="Timestamp"/>
			<DA name="units" fc="CF" dchg="true" bType="Struct" type="units$oscd$_18b92a11f3e0b360"/>
		</DOType>
		<DOType cdc="ENS" id="Beh$oscd$_f1a426046ceedd46">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_3bbb381e9c7a72b0"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DAType id="Cancel$oscd$_7f4258185194f976">
			<BDA name="ctlVal" bType="Enum" type="stVal$oscd$_48ba16345b8e7f5b"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_7268d0f278193d66"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
		</DAType>
		<DAType id="Oper$oscd$_e57fac30c1740d87">
			<BDA name="ctlVal" bType="Enum" type="stVal$oscd$_48ba16345b8e7f5b"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_7268d0f278193d66"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
		</DAType>
		<DAType id="SBOw$oscd$_e57fac30c1740d87">
			<BDA name="ctlVal" bType="Enum" type="stVal$oscd$_48ba16345b8e7f5b"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_7268d0f278193d66"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
		</DAType>
		<DAType id="origin$oscd$_7268d0f278193d66">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_929ee017c8f9feb5"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<DAType id="sVC$oscd$_df6488ea078bf55c">
			<BDA name="scaleFactor" bType="FLOAT32"/>
			<BDA name="offset" bType="FLOAT32"/>
		</DAType>
		<DAType id="cVal$oscd$_b2a7664de2216dae">
			<BDA name="mag" bType="Struct" type="mag$oscd$_5a5af9e249dc7f84"/>
			<BDA name="ang" bType="Struct" type="ang$oscd$_5a5af9e249dc7f84"/>
		</DAType>
		<DAType id="ang$oscd$_5a5af9e249dc7f84">
			<BDA name="i" bType="INT32"/>
		</DAType>
		<DAType id="mag$oscd$_5a5af9e249dc7f84">
			<BDA name="i" bType="INT32"/>
		</DAType>
		<DAType id="units$oscd$_18b92a11f3e0b360">
			<BDA name="SIUnit" bType="Enum" type="SIUnit$oscd$_4ee8604931a723d7"/>
		</DAType>
		<DAType id="cVal$oscd$_21f679e08734a896">
			<BDA name="mag" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a"/>
			<BDA name="ang" bType="Struct" type="ang$oscd$_ed49c2f7a55ad05a"/>
		</DAType>
		<DAType id="ang$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<DAType id="mag$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<EnumType id="orCat$oscd$_929ee017c8f9feb5">
			<EnumVal ord="4">automatic-bay</EnumVal>
			<EnumVal ord="6">automatic-remote</EnumVal>
		</EnumType>
		<EnumType id="ctlModel$oscd$_d3bc74b2690f022e">
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="stVal$oscd$_48ba16345b8e7f5b">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="SIUnit$oscd$_4ee8604931a723d7">
			<EnumVal ord="5">A</EnumVal>
			<EnumVal ord="29">V</EnumVal>
			<EnumVal ord="33">Hz</EnumVal>
		</EnumType>
		<EnumType id="stVal$oscd$_3bbb381e9c7a72b0">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>`;
