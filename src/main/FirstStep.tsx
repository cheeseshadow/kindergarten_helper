import React, {ChangeEvent, useState} from "react";
import {firstStepText} from "../App.text";
import Card from "../components/Card";
import {structureTableData} from "../service/processing";
import TextField from "../common/TextField";
import FileInput from "../components/FileInput";
import Button from "../common/Button";
import {readFile} from "../service/utils";
import {read as readXLSX, utils as XLSXUtils} from 'xlsx'
import {useAlert} from "react-alert";

interface Props {
    tableData: any,
    setTableData: (value: React.SetStateAction<any>) => void,
}

const FirstStep = ({tableData, setTableData}: Props) => {
    const alert = useAlert()

    const [file, setFile] = useState<File | null>(null)
    const [rawCsv, setRawCsv] = useState('')

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
        if (!file && rawCsv === '') {
            alert.error('Select a workbook file for conversion or fill the text area with the .csv data. Why the fuck didn\'t you do this?')
            return
        }

        let contentsPromise = !!file ? readCsv(file) : Promise.resolve(rawCsv)
        contentsPromise.then(contents => setTableData(structureTableData(contents)))
    }

    return (
        <Card title='Step 1' text={firstStepText} completed={!!tableData}
              content={
                  !tableData &&
                  <React.Fragment>
                      <FileInput file={file} setFile={setFile}/>
                      <TextField label='.csv contents'
                                 value={rawCsv}
                                 onChange={onRawCsvSet}/>
                  </React.Fragment>
              }
              actions={
                  !tableData &&
                  <Button importance='primary' type='submit' onClick={onSubmit}>Submit</Button>
              }/>
    )
}

export default FirstStep