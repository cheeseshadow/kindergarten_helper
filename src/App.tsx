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
  margin: 12px auto 20px;
`


const App = () => {
    const [rawCsv, setRawCsv] = useState('')
    const [tableData, setTableData] = useState<any>(null)
    const [scrapedData, setScrappedData] = useState('')
    const [parsedData, setParsedData] = useState<any>(null)
    const [successfulMatches, setSuccessfulMatches] = useState<Map<string, string> | null>(null)
    const [failedMatches, setFailedMatches] = useState<string[]>([])


    return (
        <Page>
            <Title>Useful stuff</Title>

            <StepsContainer>
                <FirstStep tableData={tableData} rawCsv={rawCsv} setTableData={setTableData} setRawCsv={setRawCsv}/>

                <SecondStep parsedData={parsedData} scrapedData={scrapedData} setParsedData={setParsedData}
                            setScrappedData={setScrappedData}/>

                <ThirdStep parsedData={parsedData} tableData={tableData} failedMatches={failedMatches}
                           successfulMatches={successfulMatches} setSuccessfulMatches={setSuccessfulMatches}
                           setFailedMatches={setFailedMatches}/>

                <FourthStep parsedData={parsedData} tableData={tableData} successfulMatches={successfulMatches}/>
            </StepsContainer>

        </Page>
    )
}

export default App
