import React, {useState} from "react";
import {thirdStepText} from "../App.text";
import Card from "../components/Card";
import {Button, Title, Wrapper} from "../App.styles";
import {matchData} from "../service/processing";

interface Props {
    parsedData: any,
    tableData: any,
    successfulMatches: Map<string, string> | null,
    setSuccessfulMatches: (value: React.SetStateAction<Map<string, string> | null>) => void,
}

const ThirdStep = ({parsedData, tableData, successfulMatches, setSuccessfulMatches,}: Props) => {
    const [failedMatches, setFailedMatches] = useState<string[]>([])

    const onSubmit = () => {
        if (!parsedData || !tableData) {
            alert('You should complete the first two steps before you are able to do that. The fuck are you thinking?')
            return
        }

        const {failures, matchedIds} = matchData(parsedData.children, tableData.children)
        setSuccessfulMatches(matchedIds)
        setFailedMatches(failures)
    }

    return (
        <Card title='Step 3' text={thirdStepText} completed={!!successfulMatches}>
            {
                !!failedMatches.length &&
                <Wrapper><Title>Failed to match</Title>: {failedMatches.join(', ')}</Wrapper>
            }
            {
                !successfulMatches &&
                <Button type="submit" onClick={onSubmit}>Submit</Button>
            }
        </Card>
    )
}

export default ThirdStep