import React, {ChangeEvent, useRef, useState} from "react";
import {firstStepText} from "../App.text";
import AreaInput from "../common/AreaInput";
import Card from "../components/Card";
import {structureTableData} from "../service/processing";
import {Button} from "../App.styles";
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

    const readCsv = (file: File): string => {
        return readFile(file, (result) => {
            const sheet = readXLSX(result, {
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

        let contents = rawCsv
        if (fileSelected) {
            contents = readCsv(fileInput.current!.files![0])
        }

        setTableData(structureTableData(contents))
    }

    return (
        <Card title='Step 1' text={firstStepText} completed={!!tableData}>
            {
                !tableData &&
                <React.Fragment>
                    <input type='file' ref={fileInput}/>
                    <AreaInput value={rawCsv} placeholder={'Paste the .csv file contents here'}
                               onChange={onRawCsvSet}/>
                    <Button type="submit" onClick={onSubmit}>Submit</Button>
                </React.Fragment>
            }
        </Card>
    )
}

export default FirstStep