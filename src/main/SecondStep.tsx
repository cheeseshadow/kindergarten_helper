import React, {ChangeEvent, useState} from "react";
import {secondStepText} from "../App.text";
import AreaInput from "../common/AreaInput";
import Card from "../components/Card";
import {Button} from "../App.styles";
import {copyToClipboard} from "../service/utils";
import {scrapChildrenFunction} from "../service/scraping";

interface Props {
    parsedData: any,
    setParsedData: (value: React.SetStateAction<any>) => void,
}

const SecondStep = ({parsedData, setParsedData}: Props) => {
    const [scrapedData, setScrappedData] = useState('')

    const onScrappedDataSet = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setScrappedData(e.target.value)
    }

    const getFunction = () => {
        copyToClipboard(scrapChildrenFunction)
    }

    const onSubmit = () => {
        if (scrapedData === '') {
            alert('The area you should have filled with the scrapped children data is empty. The fuck?')
            return
        }

        setParsedData(JSON.parse(scrapedData))
    }

    return (
        <Card title='Step 2' text={secondStepText} completed={!!parsedData}>
            {
                !parsedData &&
                <React.Fragment>
                    <Button type="button" onClick={getFunction}>Get Function</Button>

                    <AreaInput value={scrapedData} placeholder={'Paste the result of the function here'}
                               onChange={onScrappedDataSet}/>
                    <Button type="submit" onClick={onSubmit}>Submit</Button>
                </React.Fragment>
            }
        </Card>
    )
}

export default SecondStep