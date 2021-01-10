import React, {ChangeEvent} from "react";
import {firstStepText} from "../App.text";
import AreaInput from "../common/AreaInput";
import Card from "../components/Card";
import {structureTableData} from "../service/processing";
import {Button} from "../App.styles";

interface Props {
    tableData: any,
    rawCsv: string,
    setTableData: (value: React.SetStateAction<any>) => void,
    setRawCsv: (value: React.SetStateAction<string>) => void
}

const FirstStep = ({tableData, setTableData, rawCsv, setRawCsv}: Props) => {
    const onRawCsvSet = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setRawCsv(e.target.value)
    }

    const onSubmit = () => {
        if (rawCsv === '') {
            alert('The area you should have filled with the .csv data is empty. The fuck?')
            return
        }

        setTableData(structureTableData(rawCsv))
    }

    return (
        <Card title='Step 1' text={firstStepText} completed={!!tableData}>
            {
                !tableData &&
                <React.Fragment>
                    <AreaInput value={rawCsv} placeholder={'Paste the .csv file contents here'}
                               onChange={onRawCsvSet}/>
                    <Button type="submit" onClick={onSubmit}>Submit</Button>
                </React.Fragment>
            }
        </Card>
    )
}

export default FirstStep