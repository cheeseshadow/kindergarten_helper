import React from "react";
import {fourthStepText} from "../App.text";
import Card from "../components/Card";
import {getSetAbsentFunction} from "../service/scraping";
import {copyToClipboard} from "../service/utils";
import Button from "../common/Button";
import {useAlert} from "react-alert";

interface Props {
    parsedData: any,
    tableData: any,
    successfulMatches: Map<string, string> | null,
}

const FourthStep = ({parsedData, tableData, successfulMatches}: Props) => {
    const alert = useAlert()

    const getFunction = () => {
        if (!successfulMatches) {
            alert.error('No matched data. Did you do the steps 1-3? The fuck are you thinking?')
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
            parsedData.month, parsedData.year, parsedData.lastDay)
        copyToClipboard(setAbsentFunction, alert, 'The function was copied successfully.')
    }

    return (
        <Card title='Step 4' text={fourthStepText}
              actions={
                  <Button importance='primary' type="button" onClick={getFunction}>Get Function</Button>
              }/>
    )
}

export default FourthStep