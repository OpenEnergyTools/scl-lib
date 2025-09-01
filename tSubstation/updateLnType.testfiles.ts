export const docWithLNodesAndDataTypes = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
      <DO name="A" type="WYE" />
      <DO name="PhV" type="WYE" />
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
      <DA name="q" type="Quality" fc="ST" />
      <DA name="t" type="Timestamp" fc="ST" />
    </DOType>
    <DOType id="WYE">
      <SDO name="phsA" type="CMV" />
      <SDO name="phsB" type="CMV" />
      <SDO name="phsC" type="CMV" />
    </DOType>
    <DOType id="CMV">
      <DA name="cVal" type="Vector" fc="MX" />
      <DA name="q" type="Quality" fc="MX" />
      <DA name="t" type="Timestamp" fc="MX" />
    </DOType>
    <DAType id="Vector">
      <BDA name="mag" type="AnalogueValue" />
      <BDA name="ang" type="AnalogueValue" />
    </DAType>
    <DAType id="AnalogueValue">
      <BDA name="f" type="FLOAT32" />
    </DAType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="Beh">
              <eTr_6-100:SDS name="stVal" />
              <eTr_6-100:DAS name="q" />
              <eTr_6-100:DAS name="t" />
            </eTr_6-100:DOS>
            <eTr_6-100:DOS name="A">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="phsB">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="phsC">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
            <eTr_6-100:DOS name="PhV">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="phsB">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="phsC">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
    <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="2">
      <Private type="eIEC61850-6-100">
        <eTr_6-100:DOS name="Beh">
          <eTr_6-100:DAS name="stVal" />
          <eTr_6-100:DAS name="q" />
          <eTr_6-100:DAS name="t" />
        </eTr_6-100:DOS>
        <eTr_6-100:DOS name="A">
          <eTr_6-100:SDS name="phsA">
            <eTr_6-100:SDS name="cVal">
              <eTr_6-100:SDS name="mag">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="ang">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
            </eTr_6-100:SDS>
            <eTr_6-100:DAS name="q" />
            <eTr_6-100:DAS name="t" />
          </eTr_6-100:SDS>
          <eTr_6-100:SDS name="phsB">
            <eTr_6-100:SDS name="cVal">
              <eTr_6-100:SDS name="mag">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="ang">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
            </eTr_6-100:SDS>
            <eTr_6-100:DAS name="q" />
            <eTr_6-100:DAS name="t" />
          </eTr_6-100:SDS>
          <eTr_6-100:SDS name="phsC">
            <eTr_6-100:SDS name="cVal">
              <eTr_6-100:SDS name="mag">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="ang">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
            </eTr_6-100:SDS>
            <eTr_6-100:DAS name="q" />
            <eTr_6-100:DAS name="t" />
          </eTr_6-100:SDS>
        </eTr_6-100:DOS>
        <eTr_6-100:DOS name="PhV">
          <eTr_6-100:SDS name="phsA">
            <eTr_6-100:SDS name="cVal">
              <eTr_6-100:SDS name="mag">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="ang">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
            </eTr_6-100:SDS>
            <eTr_6-100:DAS name="q" />
            <eTr_6-100:DAS name="t" />
          </eTr_6-100:SDS>
          <eTr_6-100:SDS name="phsB">
            <eTr_6-100:SDS name="cVal">
              <eTr_6-100:SDS name="mag">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="ang">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
            </eTr_6-100:SDS>
            <eTr_6-100:DAS name="q" />
            <eTr_6-100:DAS name="t" />
          </eTr_6-100:SDS>
          <eTr_6-100:SDS name="phsC">
            <eTr_6-100:SDS name="cVal">
              <eTr_6-100:SDS name="mag">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="ang">
                <eTr_6-100:DAS name="f" />
              </eTr_6-100:SDS>
            </eTr_6-100:SDS>
            <eTr_6-100:DAS name="q" />
            <eTr_6-100:DAS name="t" />
          </eTr_6-100:SDS>
        </eTr_6-100:DOS>
      </Private>
    </LNode>
  </Substation>
</SCL>`;

export const docWithMissingDOs = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100"
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
      <DO name="A" type="WYE" />
      <!-- PhV DO removed from LNodeType but still exists in LNode instances -->
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
      <DA name="q" type="Quality" fc="ST" />
      <DA name="t" type="Timestamp" fc="ST" />
    </DOType>
    <DOType id="WYE">
      <SDO name="phsA" type="CMV" />
      <SDO name="phsB" type="CMV" />
      <SDO name="phsC" type="CMV" />
    </DOType>
    <DOType id="CMV">
      <DA name="cVal" type="Vector" fc="MX" />
      <DA name="q" type="Quality" fc="MX" />
      <DA name="t" type="Timestamp" fc="MX" />
    </DOType>
    <DAType id="Vector">
      <BDA name="mag" type="AnalogueValue" />
      <BDA name="ang" type="AnalogueValue" />
    </DAType>
    <DAType id="AnalogueValue">
      <BDA name="f" type="FLOAT32" />
    </DAType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="Beh">
              <eTr_6-100:SDS name="stVal" />
              <eTr_6-100:DAS name="q" />
              <eTr_6-100:DAS name="t" />
            </eTr_6-100:DOS>
            <eTr_6-100:DOS name="A">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
            <!-- This DOS should be removed as PhV is not in LNodeType -->
            <eTr_6-100:DOS name="PhV">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithMissingSDOs = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
      <DO name="A" type="WYE" />
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
      <DA name="q" type="Quality" fc="ST" />
      <DA name="t" type="Timestamp" fc="ST" />
    </DOType>
    <DOType id="WYE">
      <SDO name="phsA" type="CMV" />
      <!-- phsB and phsC removed from DOType but still exist in LNode instances -->
    </DOType>
    <DOType id="CMV">
      <DA name="cVal" type="Vector" fc="MX" />
      <DA name="q" type="Quality" fc="MX" />
      <DA name="t" type="Timestamp" fc="MX" />
    </DOType>
    <DAType id="Vector">
      <BDA name="mag" type="AnalogueValue" />
      <BDA name="ang" type="AnalogueValue" />
    </DAType>
    <DAType id="AnalogueValue">
      <BDA name="f" type="FLOAT32" />
    </DAType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="A">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
              <!-- These SDS should be removed as phsB and phsC are not in DOType -->
              <eTr_6-100:SDS name="phsB">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="phsC">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithMissingDAs = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
      <DO name="A" type="WYE" />
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
      <!-- q and t DAs removed from DOType but still exist in LNode instances -->
    </DOType>
    <DOType id="WYE">
      <SDO name="phsA" type="CMV" />
    </DOType>
    <DOType id="CMV">
      <DA name="cVal" type="Vector" fc="MX" />
      <!-- q and t DAs removed from DOType but still exist in LNode instances -->
    </DOType>
    <DAType id="Vector">
      <BDA name="mag" type="AnalogueValue" />
      <BDA name="ang" type="AnalogueValue" />
    </DAType>
    <DAType id="AnalogueValue">
      <BDA name="f" type="FLOAT32" />
    </DAType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="Beh">
              <eTr_6-100:DAS name="stVal" />
              <!-- These DAS should be removed as q and t are not in DOType -->
              <eTr_6-100:DAS name="q" />
              <eTr_6-100:DAS name="t" />
            </eTr_6-100:DOS>
            <eTr_6-100:DOS name="A">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <!-- These DAS should be removed as q and t are not in DOType -->
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithMissingBDAs = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="A" type="WYE" />
    </LNodeType>
    <DOType id="WYE">
      <SDO name="phsA" type="CMV" />
    </DOType>
    <DOType id="CMV">
      <DA name="cVal" type="Vector" fc="MX" />
    </DOType>
    <DAType id="Vector">
      <BDA name="mag" type="AnalogueValue" />
      <!-- ang BDA removed from DAType but still exists in LNode instances -->
    </DAType>
    <DAType id="AnalogueValue">
      <BDA name="f" type="FLOAT32" />
    </DAType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="A">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <!-- This SDS should be removed as ang is not in DAType -->
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithNoLNodes = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
    </DOType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <!-- No LNode instances -->
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithDifferentLnType = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
    </DOType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_2" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="Beh">
              <eTr_6-100:SDS name="stVal" />
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithoutDataTypeTemplates = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="Beh">
              <eTr_6-100:DAS name="stVal" />
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithSourceRefs = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
      <DO name="A" type="WYE" />
      <!-- PhV DO missing from LNodeType but referenced in SourceRef -->
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
      <DA name="q" type="Quality" fc="ST" />
      <DA name="t" type="Timestamp" fc="ST" />
    </DOType>
    <DOType id="WYE">
      <SDO name="phsA" type="CMV" />
      <SDO name="phsB" type="CMV" />
      <!-- phsC missing from DOType but referenced in SourceRef -->
    </DOType>
    <DOType id="CMV">
      <DA name="cVal" type="Vector" fc="MX" />
      <DA name="q" type="Quality" fc="MX" />
      <!-- t missing from DOType but referenced in SourceRef -->
    </DOType>
    <DAType id="Vector">
      <BDA name="mag" type="AnalogueValue" />
      <!-- ang missing from DAType but referenced in SourceRef -->
    </DAType>
    <DAType id="AnalogueValue">
      <BDA name="f" type="FLOAT32" />
    </DAType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1" iedName="TestIED">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="Beh">
              <eTr_6-100:DAS name="stVal" />
              <eTr_6-100:DAS name="q" />
              <eTr_6-100:DAS name="t" />
            </eTr_6-100:DOS>
            <eTr_6-100:DOS name="A">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
                <eTr_6-100:DAS name="t" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="phsB">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
              </eTr_6-100:SDS>
              <eTr_6-100:SDS name="phsC">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
            <!-- This DOS should be removed -->
            <eTr_6-100:DOS name="PhV">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <eTr_6-100:DAS name="q" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
          </Private>
          <Private type="eIEC61850-6-100">
            <eTr_6-100:LNodeSpecNaming sIedName="TestIED" sLnClass="MMXU" sLnInst="1"/>
            <eTr_6-100:LNodeInputs>
              <!-- Valid SourceRef - should be kept -->
              <eTr_6-100:SourceRef source="TestSubstation/VL1/Bay1/MMXU1/A.phsA.cVal.mag.f" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="ValidReference"/>
              <!-- Invalid SourceRef - PhV DOS will be removed -->
              <eTr_6-100:SourceRef source="TestSubstation/VL1/Bay1/MMXU1/PhV.phsA.cVal.mag.f" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="InvalidPhVReference"/>
              <!-- Invalid SourceRef - phsC SDS will be removed -->
              <eTr_6-100:SourceRef source="TestSubstation/VL1/Bay1/MMXU1/A.phsC.cVal.mag.f" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="InvalidPhsCReference"/>
              <!-- Invalid SourceRef - ang SDS will be removed -->
              <eTr_6-100:SourceRef source="TestSubstation/VL1/Bay1/MMXU1/A.phsA.cVal.ang.f" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="InvalidAngReference"/>
              <!-- Invalid SourceRef - t DAS will be removed -->
              <eTr_6-100:SourceRef source="TestSubstation/VL1/Bay1/MMXU1/A.phsA.t" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="InvalidTReference"/>
            </eTr_6-100:LNodeInputs>
          </Private>
        </LNode>
        <LNode lnClass="CSWI" lnType="CSWI_1" lnInst="1" iedName="TestIED">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:LNodeSpecNaming sIedName="TestIED" sLnClass="CSWI" sLnInst="1"/>
            <eTr_6-100:LNodeInputs>
              <!-- SourceRef that references the MMXU LNode - should be removed when PhV is removed -->
              <eTr_6-100:SourceRef source="TestSubstation/VL1/Bay1/MMXU1/PhV.phsA.cVal.mag.f" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="CrossLNodeReference"/>
              <!-- Valid SourceRef that should be kept -->
              <eTr_6-100:SourceRef source="TestSubstation/VL1/Bay1/MMXU1/A.phsA.cVal.mag.f" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="ValidCrossReference"/>
            </eTr_6-100:LNodeInputs>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithMalformedSourceRefs = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
    </DOType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1" iedName="TestIED">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="Beh">
              <eTr_6-100:DAS name="stVal" />
            </eTr_6-100:DOS>
          </Private>
          <Private type="eIEC61850-6-100">
            <eTr_6-100:LNodeInputs>
              <!-- SourceRef with missing source attribute -->
              <eTr_6-100:SourceRef input="MMXU_1" inputInst="1" service="GOOSE" resourceName="MissingSource"/>
              <!-- SourceRef with empty source attribute -->
              <eTr_6-100:SourceRef source="" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="EmptySource"/>
              <!-- SourceRef with malformed source -->
              <eTr_6-100:SourceRef source="InvalidFormat" input="MMXU_1" inputInst="1" service="GOOSE" resourceName="MalformedSource"/>
            </eTr_6-100:LNodeInputs>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithComplexNestedStructures = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="A" type="WYE" />
    </LNodeType>
    <DOType id="WYE">
      <SDO name="phsA" type="CMV" />
    </DOType>
    <DOType id="CMV">
      <DA name="cVal" type="Vector" fc="MX" />
    </DOType>
    <DAType id="Vector">
      <BDA name="mag" type="AnalogueValue" />
    </DAType>
    <DAType id="AnalogueValue">
      <BDA name="f" type="FLOAT32" />
    </DAType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="A">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                  <!-- Missing ang in DAType but present here -->
                  <eTr_6-100:SDS name="ang">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
                <!-- Missing q in DOType but present here -->
                <eTr_6-100:DAS name="q" />
              </eTr_6-100:SDS>
              <!-- Missing phsB in DOType but present here -->
              <eTr_6-100:SDS name="phsB">
                <eTr_6-100:SDS name="cVal">
                  <eTr_6-100:SDS name="mag">
                    <eTr_6-100:DAS name="f" />
                  </eTr_6-100:SDS>
                </eTr_6-100:SDS>
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
            <!-- Missing PhV in LNodeType but present here -->
            <eTr_6-100:DOS name="PhV">
              <eTr_6-100:SDS name="phsA">
                <eTr_6-100:DAS name="cVal" />
              </eTr_6-100:SDS>
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
  </Substation>
</SCL>`;

export const docWithMixedLNodes = `<SCL
  xmlns="http://www.iec.ch/61850/2003/SCL"
  xmlns:eTr_6-100="http://www.iec.ch/61850/2019/SCL/6-100" 
  version="2007"
  revision="B"
  release="4"
>
  <Header id="TestSCL" />
  <DataTypeTemplates>
    <LNodeType id="MMXU_1" lnClass="MMXU">
      <DO name="Beh" type="BehaviourDO" />
    </LNodeType>
    <DOType id="BehaviourDO">
      <DA name="stVal" type="ENS" fc="ST" />
    </DOType>
  </DataTypeTemplates>
  <Substation name="TestSubstation">
    <VoltageLevel name="VL1">
      <Bay name="Bay1">
        <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="1">
          <Private type="eIEC61850-6-100">
            <eTr_6-100:DOS name="MissingDO">
              <eTr_6-100:DAS name="test" />
            </eTr_6-100:DOS>
          </Private>
        </LNode>
      </Bay>
    </VoltageLevel>
    <LNode lnClass="MMXU" lnType="MMXU_1" lnInst="2">
      <Private type="eIEC61850-6-100">
        <eTr_6-100:DOS name="MissingDO">
          <eTr_6-100:DAS name="test" />
        </eTr_6-100:DOS>
      </Private>
    </LNode>
  </Substation>
</SCL>`;
