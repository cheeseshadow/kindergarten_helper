import React, {ChangeEvent, useState} from "react";
import {secondStepText} from "../App.text";
import Card from "../components/Card";
import {copyToClipboard} from "../service/utils";
import {scrapChildrenFunction} from "../service/scraping";
import Button from "../common/Button";
import TextField from "../common/TextField";
import {useAlert} from "react-alert";

interface Props {
    parsedData: any,
    setParsedData: (value: React.SetStateAction<any>) => void,
}

const SecondStep = ({parsedData, setParsedData}: Props) => {
    const alert = useAlert()

    const [scrapedData, setScrappedData] = useState('')

    const onScrappedDataSet = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setScrappedData(e.target.value)
    }

    const getFunction = () => {
        copyToClipboard(scrapChildrenFunction, alert, 'The function was copied successfully.')
    }

    const onSubmit = () => {
        if (scrapedData === '') {
            alert.error('The area you should have filled with the scrapped children data is empty. The fuck?')
            return
        }

        setParsedData(JSON.parse(scrapedData))
    }

    return (
        <Card title='Step 2' text={secondStepText} completed={!!parsedData}
              content={
                  !parsedData &&
                  <TextField value={scrapedData} label='Function result' onChange={onScrappedDataSet}/>
              }
              actions={
                  !parsedData &&
                  <React.Fragment>
                      <Button importance='secondary' type="button" onClick={getFunction}>Get Function</Button>
                      <Button importance='primary' type="submit" onClick={onSubmit}>Submit</Button>
                  </React.Fragment>
              }/>
    )
}

export default SecondStep