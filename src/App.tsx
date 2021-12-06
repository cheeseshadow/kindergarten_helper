import React, {useState} from 'react';
import styled from "styled-components";
import FirstStep from "./main/FirstStep";
import SecondStep from "./main/SecondStep";
import ThirdStep from "./main/ThirdStep";
import FourthStep from "./main/FourthStep";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
`

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin: 20px auto;
  display: flex;
  position: relative;
`

const Version = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: #9c27b0;
  border: 1px solid #9c27b0;
  border-radius: 16px;
  padding: 0 8px;
  position: absolute;
  left: calc(100% + 4px);
`

const versionNumber = '1.0.1'

const App = () => {
    const [tableData, setTableData] = useState<any>(null)
    const [parsedData, setParsedData] = useState<any>(null)
    const [successfulMatches, setSuccessfulMatches] = useState<Map<string, string> | null>(null)

    return (
        <Page>
            <Title>Ultra Helper<Version>{versionNumber}</Version></Title>

            <StepsContainer>
                <FirstStep tableData={tableData} setTableData={setTableData}/>

                <SecondStep parsedData={parsedData} setParsedData={setParsedData}/>

                <ThirdStep parsedData={parsedData} tableData={tableData}
                           successfulMatches={successfulMatches} setSuccessfulMatches={setSuccessfulMatches}/>

                <FourthStep parsedData={parsedData} tableData={tableData} successfulMatches={successfulMatches}/>
            </StepsContainer>

        </Page>
    )
}

export default App
