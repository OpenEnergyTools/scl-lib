export const missingMmxuTypes = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="project" />
	<DataTypeTemplates>
		<DOType cdc="ENC" id="Mod$oscd$_204eb7d305d8afc9">
			<DA name="stVal" fc="ST" dchg="true" bType="Enum" type="stVal$oscd$_74dd2cc4b188b4ad" />
			<DA name="q" fc="ST" qchg="true" bType="Quality" />
			<DA name="t" fc="ST" bType="Timestamp" />
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_d1e3fc8ab7309c84" />
			<DA name="sboTimeout" fc="CF" dchg="true" bType="INT32U" />
			<DA name="SBOw" fc="CO" bType="Struct" type="SBOw$oscd$_264aab113bc4c3d7" />
			<DA name="Oper" fc="CO" bType="Struct" type="Oper$oscd$_95c8c3c3bab27780" />
			<DA name="Cancel" fc="CO" bType="Struct" type="Cancel$oscd$_3deaf39bb05f2573" />
		</DOType>
		<DOType cdc="CMV" id="phsC$oscd$_22e91d0e180d4db5">
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_21f679e08734a896" />
			<DA name="q" fc="MX" qchg="true" bType="Quality" />
			<DA name="t" fc="MX" bType="Timestamp" />
			<DA name="zeroDb" fc="CF" dchg="true" bType="INT32U" />
			<DA name="zeroDbRef" fc="CF" dchg="true" bType="FLOAT32" />
		</DOType>
		<DOType cdc="CMV" id="phsA$oscd$_c63a8f4457479fb7">
			<DA name="cVal" fc="MX" dchg="true" dupd="true" bType="Struct" type="cVal$oscd$_21f679e08734a896" />
			<DA name="q" fc="MX" qchg="true" bType="Quality" />
			<DA name="t" fc="MX" bType="Timestamp" />
		</DOType>
		<DOType cdc="ENS" id="Beh$oscd$_c6ed035c8137b35a">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_48ba16345b8e7f5b" />
			<DA name="q" fc="ST" qchg="true" bType="Quality" />
			<DA name="t" fc="ST" bType="Timestamp" />
		</DOType>
		<DAType id="Cancel$oscd$_3deaf39bb05f2573">
			<BDA name="ctlVal" bType="Enum" type="stVal$oscd$_74dd2cc4b188b4ad" />
			<BDA name="origin" bType="Struct" type="origin$oscd$_fa375f7ac4ad2b63" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
		</DAType>
		<DAType id="origin$oscd$_fa375f7ac4ad2b63">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_9e599649ad5fb6e7" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="Oper$oscd$_95c8c3c3bab27780">
			<BDA name="ctlVal" bType="Enum" type="stVal$oscd$_74dd2cc4b188b4ad" />
			<BDA name="origin" bType="Struct" type="origin$oscd$_0ea47da5152c609c" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
		<DAType id="origin$oscd$_0ea47da5152c609c">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_28305ac316398559" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="origin$oscd$_5bd14a7e2c08190b">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_3529ca6e138aa3ca" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="units$oscd$_3f2e10def85bfeac">
			<BDA name="SIUnit" bType="Enum" type="SIUnit$oscd$_39f6ca400c633081" />
		</DAType>
		<DAType id="instCVal$oscd$_21f679e08734a896">
			<BDA name="mag" bType="Struct" type="mag$oscd$_ed49c2f7a55ad05a" />
			<BDA name="ang" bType="Struct" type="ang$oscd$_ed49c2f7a55ad05a" />
		</DAType>
		<DAType id="ang$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32" />
		</DAType>
		<DAType id="mag$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32" />
		</DAType>
		<EnumType id="orCat$oscd$_9e599649ad5fb6e7">
			<EnumVal ord="4">
				automatic-bay
			</EnumVal>
			<EnumVal ord="6">
				automatic-remote
			</EnumVal>
			<EnumVal ord="7">
				maintenance
			</EnumVal>
		</EnumType>
		<EnumType id="orCat$oscd$_28305ac316398559">
			<EnumVal ord="0">
				not-supported
			</EnumVal>
			<EnumVal ord="4">
				automatic-bay
			</EnumVal>
			<EnumVal ord="6">
				automatic-remote
			</EnumVal>
		</EnumType>
		<EnumType id="orCat$oscd$_3529ca6e138aa3ca">
			<EnumVal ord="4">
				automatic-bay
			</EnumVal>
			<EnumVal ord="5">
				automatic-station
			</EnumVal>
			<EnumVal ord="6">
				automatic-remote
			</EnumVal>
		</EnumType>
		<EnumType id="ctlModel$oscd$_d1e3fc8ab7309c84">
			<EnumVal ord="4">
				sbo-with-enhanced-security
			</EnumVal>
		</EnumType>
		<EnumType id="stVal$oscd$_74dd2cc4b188b4ad">
			<EnumVal ord="1">
				on
			</EnumVal>
		</EnumType>
		<EnumType id="SIUnit$oscd$_39f6ca400c633081">
			<EnumVal ord="1" />
			<EnumVal ord="2">
				m
			</EnumVal>
			<EnumVal ord="3">
				kg
			</EnumVal>
			<EnumVal ord="4">
				s
			</EnumVal>
			<EnumVal ord="5">
				A
			</EnumVal>
			<EnumVal ord="6">
				K
			</EnumVal>
			<EnumVal ord="7">
				mol
			</EnumVal>
			<EnumVal ord="8">
				cd
			</EnumVal>
			<EnumVal ord="9">
				deg
			</EnumVal>
			<EnumVal ord="10">
				rad
			</EnumVal>
			<EnumVal ord="11">
				sr
			</EnumVal>
			<EnumVal ord="21">
				Gy
			</EnumVal>
			<EnumVal ord="22">
				Bq
			</EnumVal>
			<EnumVal ord="23">
				°C
			</EnumVal>
			<EnumVal ord="24">
				Sv
			</EnumVal>
			<EnumVal ord="25">
				F
			</EnumVal>
			<EnumVal ord="26">
				C
			</EnumVal>
			<EnumVal ord="27">
				S
			</EnumVal>
			<EnumVal ord="28">
				H
			</EnumVal>
			<EnumVal ord="29">
				V
			</EnumVal>
			<EnumVal ord="30">
				ohm
			</EnumVal>
			<EnumVal ord="31">
				J
			</EnumVal>
			<EnumVal ord="32">
				N
			</EnumVal>
			<EnumVal ord="33">
				Hz
			</EnumVal>
			<EnumVal ord="34">
				lx
			</EnumVal>
			<EnumVal ord="35">
				Lm
			</EnumVal>
			<EnumVal ord="36">
				Wb
			</EnumVal>
			<EnumVal ord="37">
				T
			</EnumVal>
			<EnumVal ord="38">
				W
			</EnumVal>
			<EnumVal ord="39">
				Pa
			</EnumVal>
			<EnumVal ord="41">
				m²
			</EnumVal>
			<EnumVal ord="42">
				m³
			</EnumVal>
			<EnumVal ord="43">
				m/s
			</EnumVal>
			<EnumVal ord="44">
				m/s²
			</EnumVal>
			<EnumVal ord="45">
				m³/s
			</EnumVal>
			<EnumVal ord="46">
				m/m³
			</EnumVal>
			<EnumVal ord="47">
				M
			</EnumVal>
			<EnumVal ord="48">
				kg/m³
			</EnumVal>
			<EnumVal ord="49">
				m²/s
			</EnumVal>
			<EnumVal ord="50">
				W/m K
			</EnumVal>
			<EnumVal ord="51">
				J/K
			</EnumVal>
			<EnumVal ord="52">
				ppm
			</EnumVal>
			<EnumVal ord="53">
				1/s
			</EnumVal>
			<EnumVal ord="54">
				rad/s
			</EnumVal>
			<EnumVal ord="55">
				W/m²
			</EnumVal>
			<EnumVal ord="56">
				J/m²
			</EnumVal>
			<EnumVal ord="57">
				S/m
			</EnumVal>
			<EnumVal ord="58">
				K/s
			</EnumVal>
			<EnumVal ord="59">
				Pa/s
			</EnumVal>
			<EnumVal ord="60">
				J/kg K
			</EnumVal>
			<EnumVal ord="61">
				VA
			</EnumVal>
			<EnumVal ord="62">
				Watts
			</EnumVal>
			<EnumVal ord="63">
				VAr
			</EnumVal>
			<EnumVal ord="64">
				phi
			</EnumVal>
			<EnumVal ord="65">
				cos(phi)
			</EnumVal>
			<EnumVal ord="66">
				Vs
			</EnumVal>
			<EnumVal ord="67">
				V²
			</EnumVal>
			<EnumVal ord="68">
				As
			</EnumVal>
			<EnumVal ord="69">
				A²
			</EnumVal>
			<EnumVal ord="70">
				A²t
			</EnumVal>
			<EnumVal ord="71">
				VAh
			</EnumVal>
			<EnumVal ord="72">
				Wh
			</EnumVal>
			<EnumVal ord="73">
				VArh
			</EnumVal>
			<EnumVal ord="74">
				V/Hz
			</EnumVal>
			<EnumVal ord="75">
				Hz/s
			</EnumVal>
			<EnumVal ord="76">
				char
			</EnumVal>
			<EnumVal ord="77">
				char/s
			</EnumVal>
			<EnumVal ord="78">
				kgm²
			</EnumVal>
			<EnumVal ord="79">
				dB
			</EnumVal>
			<EnumVal ord="80">
				J/Wh
			</EnumVal>
			<EnumVal ord="81">
				W/s
			</EnumVal>
			<EnumVal ord="82">
				l/s
			</EnumVal>
			<EnumVal ord="83">
				dBm
			</EnumVal>
			<EnumVal ord="84">
				h
			</EnumVal>
			<EnumVal ord="85">
				min
			</EnumVal>
			<EnumVal ord="86">
				Ohm/m
			</EnumVal>
			<EnumVal ord="87">
				percent/s
			</EnumVal>
			<EnumVal ord="88">
				A/V
			</EnumVal>
			<EnumVal ord="89">
				A/Vs
			</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>
`;

export const incompleteLtrkTypes = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="project"/>
	<DataTypeTemplates>
		<DOType cdc="CTS" id="ApcIntTrk$oscd$_18f1c3575016d234">
			<DA name="objRef" fc="SR" dupd="true" bType="ObjRef"/>
			<DA name="serviceType" fc="SR" bType="Enum" type="serviceType$oscd$_2221a9e59b9fe227"/>
			<DA name="errorCode" fc="SR" bType="Enum" type="errorCode$oscd$_6436363c9d07ac56"/>
			<DA name="t" fc="SR" bType="Timestamp"/>
			<DA name="ctlVal" fc="SR"/>
			<DA name="origin" fc="SR" bType="Struct" type="origin$oscd$_7268d0f278193d66"/>
			<DA name="ctlNum" fc="SR" bType="INT8U"/>
			<DA name="T" fc="SR" bType="Timestamp"/>
			<DA name="Test" fc="SR" bType="BOOLEAN"/>
			<DA name="Check" fc="SR" bType="Check"/>
			<DA name="respAddCause" fc="SR" bType="Enum" type="respAddCause$oscd$_4167d7d7ad18e34f"/>
		</DOType>
		<DOType cdc="CTS" id="ApcFTrk$oscd$_18f1c3575016d234">
			<DA name="objRef" fc="SR" dupd="true" bType="ObjRef"/>
			<DA name="serviceType" fc="SR" bType="Enum" type="serviceType$oscd$_2221a9e59b9fe227"/>
			<DA name="errorCode" fc="SR" bType="Enum" type="errorCode$oscd$_6436363c9d07ac56"/>
			<DA name="t" fc="SR" bType="Timestamp"/>
			<DA name="ctlVal" fc="SR"/>
			<DA name="origin" fc="SR" bType="Struct" type="origin$oscd$_7268d0f278193d66"/>
			<DA name="ctlNum" fc="SR" bType="INT8U"/>
			<DA name="T" fc="SR" bType="Timestamp"/>
			<DA name="Test" fc="SR" bType="BOOLEAN"/>
			<DA name="Check" fc="SR" bType="Check"/>
			<DA name="respAddCause" fc="SR" bType="Enum" type="respAddCause$oscd$_4167d7d7ad18e34f"/>
		</DOType>
		<DOType cdc="ENS" id="Beh$oscd$_ec88f2973fd0d14f">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_74dd2cc4b188b4ad"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DAType id="origin$oscd$_7268d0f278193d66">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_929ee017c8f9feb5"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<EnumType id="respAddCause$oscd$_4167d7d7ad18e34f">
			<EnumVal ord="14">1-of-n-control</EnumVal>
			<EnumVal ord="15">Abortion-by-cancel</EnumVal>
		</EnumType>
		<EnumType id="errorCode$oscd$_6436363c9d07ac56">
			<EnumVal ord="3">access-violation</EnumVal>
			<EnumVal ord="4">access-not-allowed-in-current-state</EnumVal>
		</EnumType>
		<EnumType id="serviceType$oscd$_2221a9e59b9fe227">
			<EnumVal ord="1">Associate</EnumVal>
			<EnumVal ord="2">Abort</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>`;

export const incompleteAtccTypes = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="project"/>
	<DataTypeTemplates>
		<DOType cdc="BAC" id="BndCtrChg$oscd$_e6cab40f023f5d85">
			<DA name="mxVal" fc="MX" dchg="true" bType="Struct" type="mxVal$oscd$_5a5af9e249dc7f84"/>
			<DA name="persistent" fc="CF" dchg="true" bType="BOOLEAN"/>
			<DA name="ctlModel" fc="CF" dchg="true" bType="Enum" type="ctlModel$oscd$_e975941313cb546c"/>
			<DA name="dbRef" fc="CF" dchg="true" bType="FLOAT32"/>
			<DA name="Oper" fc="CO" bType="Struct" type="Oper$oscd$_5b11d63fa0ade588"/>
			<DA name="Cancel" fc="CO" bType="Struct" type="Cancel$oscd$_f1ae462a0371995d"/>
		</DOType>
		<DOType cdc="ENS" id="Beh$oscd$_07569a117c79139b">
			<DA name="stVal" fc="ST" dchg="true" dupd="true" bType="Enum" type="stVal$oscd$_d628cd91ee71053a"/>
			<DA name="q" fc="ST" qchg="true" bType="Quality"/>
			<DA name="t" fc="ST" bType="Timestamp"/>
		</DOType>
		<DAType id="Cancel$oscd$_f1ae462a0371995d">
			<BDA name="ctlVal" bType="Tcmd"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_9253817b0d49df0e"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
		</DAType>
		<DAType id="origin$oscd$_9253817b0d49df0e">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_5d5ec95f5faf1bdb"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<DAType id="mxVal$oscd$_5a5af9e249dc7f84">
			<BDA name="i" bType="INT32"/>
		</DAType>
		<DAType id="Cancel$oscd$_eb983a29477599ad">
			<BDA name="ctlVal" bType="Struct" type="mxVal$oscd$_ed49c2f7a55ad05a"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_b64fef98567214f4"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
		</DAType>
		<DAType id="Oper$oscd$_61d7e600207c9456">
			<BDA name="ctlVal" bType="Struct" type="mxVal$oscd$_ed49c2f7a55ad05a"/>
			<BDA name="origin" bType="Struct" type="origin$oscd$_b64fef98567214f4"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
		</DAType>
		<DAType id="origin$oscd$_b64fef98567214f4">
			<BDA name="orCat" bType="Enum" type="orCat$oscd$_1f59630cc084c46a"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<DAType id="mxVal$oscd$_ed49c2f7a55ad05a">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<EnumType id="orCat$oscd$_5d5ec95f5faf1bdb">
			<EnumVal ord="6">automatic-remote</EnumVal>
		</EnumType>
		<EnumType id="orCat$oscd$_1f59630cc084c46a">
			<EnumVal ord="4">automatic-bay</EnumVal>
		</EnumType>
		<EnumType id="ctlModel$oscd$_d1e3fc8ab7309c84">
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="stVal$oscd$_d628cd91ee71053a">
			<EnumVal ord="2">blocked</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>`;

export const emptySSD = `<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="project"/>
</SCL>`;
