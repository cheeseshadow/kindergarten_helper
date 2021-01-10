import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import AreaInput from "./common/AreaInput";
import {matchData, structureTableData} from './service/processing'
import {getSetAbsentFunction, scrapChildrenFunction} from './service/scraping'
import {copyToClipboard} from './service/utils'
import Card from "./components/Card";
import {firstStepText, fourthStepText, secondStepText, thirdStepText} from "./App.text";

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

const Button = styled.button`
  border-radius: 4px;
  border: solid 1px #0039C7;
  color: #0039C7;
  background: white;
  margin-top: 12px;
  height: 40px;

  &:hover {
    background: #ccdaff;
  }
`


const App = () => {
    const [rawCsv, setRawCsv] = useState('')
    const [tableData, setTableData] = useState<any>(null)
    const [scrapedData, setScrappedData] = useState('')
    const [parsedData, setParsedData] = useState<any>(null)
    const [successfulMatches, setSuccessfulMatches] = useState<Map<string, string> | null>(null)
    const [failedMatches, setFailedMatches] = useState<string[]>([])


    const onRawCsvSet = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setRawCsv(value)
    }

    const onScrappedDataSet = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setScrappedData(value)
    }

    const onStep1Submit = () => {
        if (rawCsv === '') {
            alert('The area you should have filled with the .csv data is empty. The fuck?')
            return
        }

        const childrenData = structureTableData(rawCsv)
        setTableData(childrenData)
    }

    const onStep2GetFunction = () => {
        copyToClipboard(scrapChildrenFunction)
    }

    const onStep2Submit = () => {
        if (scrapedData === '') {
            alert('The area you should have filled with the scrapped children data is empty. The fuck?')
            return
        }

        setParsedData(JSON.parse(scrapedData))
    }

    const onStep3Submit = () => {
        if (!parsedData || !tableData) {
            alert('You should complete the first two steps before you are able to do that. The fuck are you thinking?')
            return
        }

        const {failures, matchedIds} = matchData(parsedData.children, tableData.children)
        setSuccessfulMatches(matchedIds)
        setFailedMatches(failures)
    }

    const onStep4GetFunction = () => {
        if (!successfulMatches) {
            alert('No matched data. Did you do the steps 1-3? The fuck are you thinking?')
            return
        }

        const absentIds = new Map<string, string[]>()
        for (const day in tableData.absentData) {
            absentIds.set(day, tableData.absentData[day]
                .map((name: string) => successfulMatches.get(name))
                .filter((e: any) => !!e)
            )
        }

        const setAbsentFunction = getSetAbsentFunction(absentIds, parsedData.groupId, parsedData.dou_id,
            parsedData.month, parsedData.year)
        copyToClipboard(setAbsentFunction)
    }

    return (
        <Page>
            <Title>Useful stuff</Title>

            <StepsContainer>
                <Card title='Step 1' text={firstStepText} completed={!!tableData}>
                    {
                        !tableData &&
                        <React.Fragment>
                            <AreaInput value={rawCsv} placeholder={'Paste the .csv file contents here'}
                                       onChange={onRawCsvSet}/>
                            <Button type="submit" onClick={onStep1Submit}>Submit</Button>
                        </React.Fragment>
                    }
                </Card>

                <Card title='Step 2' text={secondStepText} completed={!!parsedData}>
                    {
                        !parsedData &&
                        <React.Fragment>
                            <Button type="button" onClick={onStep2GetFunction}>Get Function</Button>

                            <AreaInput value={scrapedData} placeholder={'Paste the result of the function here'}
                                       onChange={onScrappedDataSet}/>
                            <Button type="submit" onClick={onStep2Submit}>Submit</Button>
                        </React.Fragment>
                    }
                </Card>

                <Card title='Step 3' text={thirdStepText} completed={!!successfulMatches}>
                    {
                        !!failedMatches.length &&
                        <div><b>Failed to match</b>: {failedMatches.join(', ')}</div>
                    }
                    {
                        !successfulMatches &&
                        <Button type="submit" onClick={onStep3Submit}>Submit</Button>
                    }
                </Card>

                <Card title='Step 4' text={fourthStepText}>
                    <Button type="button" onClick={onStep4GetFunction}>Get Function</Button>
                </Card>
            </StepsContainer>

        </Page>
    )
}

export default App
