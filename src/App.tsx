import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import AreaInput from "./common/AreaInput";
import {matchData, structureTableData} from './service/processing'
import {getSetAbsentFunction, scrapChildrenFunction} from './service/scraping'
import {copyToClipboard} from './service/utils'

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

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  margin: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .3), 0 3px 30px rgba(0, 0, 0, .3);
  border-radius: 6px;
  padding: 32px;
`

const Button = styled.button`
  border-radius: 4px;
  border: solid 1px #333;
  background: white;
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
                <Block>
                    <div><b>Step 1</b>: Copy and paste the .csv file contents into the text area and then press
                        the Submit button to read the children data.
                    </div>

                    <div><b>Status</b>: {tableData ? 'Completed!' : 'Not completed'}</div>

                    <AreaInput value={rawCsv} placeholder={'Paste the .csv file contents here'} onChange={onRawCsvSet}/>
                    <Button type="submit" onClick={onStep1Submit}>Submit</Button>
                </Block>

                <Block>
                    <div><b>Step 2</b>: Press the Get Function button to copy the code to your clipboard.
                        Paste and execute the code on the page with the children list to get the data.
                    </div>

                    <div><b>Status</b>: {parsedData ? 'Completed!' : 'Not completed'}</div>

                    <Button type="button" onClick={onStep2GetFunction}>Get Function</Button>

                    <AreaInput value={scrapedData} placeholder={'Paste the result of the function here'}
                               onChange={onScrappedDataSet}/>
                    <Button type="submit" onClick={onStep2Submit}>Submit</Button>
                </Block>

                <Block>
                    <div><b>Step 3</b>: Map children from the .csv to the scrapped children from the web page.
                    </div>

                    {
                        failedMatches &&
                        <div><b>Failed to match</b>: {failedMatches.join(', ')}</div>
                    }

                    <div><b>Status</b>: {successfulMatches ? 'Completed!' : 'Not completed'}</div>

                    <Button type="submit" onClick={onStep3Submit}>Submit</Button>
                </Block>

                <Block>
                    <div><b>Step 4</b>: Press the Get Function button to copy the code to your clipboard.
                        Paste and execute the code on the page with the children list to set the data from the .csv.
                    </div>

                    <Button type="button" onClick={onStep4GetFunction}>Get Function</Button>
                </Block>
            </StepsContainer>

        </Page>
    )
}

export default App
