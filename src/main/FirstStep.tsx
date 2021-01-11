import React, {ChangeEvent, useRef, useState} from "react";
import {firstStepText} from "../App.text";
import Card from "../components/Card";
import {structureTableData} from "../service/processing";
import TextField from "../common/TextField";
import Button from "../common/Button";
import {readFile} from "../service/utils";
import {read as readXLSX, utils as XLSXUtils} from 'xlsx'

interface Props {
    tableData: any,
    setTableData: (value: React.SetStateAction<any>) => void,
}

const FirstStep = ({tableData, setTableData}: Props) => {
    const [rawCsv, setRawCsv] = useState('')
    const fileInput = useRef<HTMLInputElement>(null)

    const onRawCsvSet = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setRawCsv(e.target.value)
    }

    const readCsv = (file: File): Promise<string> => {
        return readFile(file).then(data => {
            const sheet = readXLSX(data, {
                type: 'binary'
            })
            return XLSXUtils.sheet_to_csv(sheet.Sheets[sheet.SheetNames[0]])
        })
    }

    const onSubmit = () => {
        const fileSelected = fileInput.current!.files && fileInput.current!.files[0]
        if (!fileSelected && rawCsv === '') {
            alert('Select a workbook file for conversion or fill the text area with the .csv data. Why the fuck didn\'t you do this?')
            return
        }

        let contentsPromise = fileSelected ? readCsv(fileInput.current!.files![0]) : Promise.resolve(rawCsv)
        contentsPromise.then(contents => setTableData(structureTableData(contents)))
    }

    return (
        <Card title='Step 1' text={firstStepText} completed={!!tableData}>
            {
                !tableData &&
                <React.Fragment>
                    <input type='file' ref={fileInput}/>
                    <TextField label='.csv contents'
                               value={rawCsv}
                               onChange={onRawCsvSet}/>
                    <Button importance='primary' type='submit' onClick={onSubmit}>Submit</Button>
                </React.Fragment>
            }
        </Card>
    )
}

export default FirstStep