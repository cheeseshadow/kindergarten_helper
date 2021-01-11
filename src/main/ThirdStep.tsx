import React, {useState} from "react";
import {thirdStepText} from "../App.text";
import Card from "../components/Card";
import {matchData} from "../service/processing";
import Button from "../common/Button";
import {Typography} from "@material-ui/core";
import {useAlert} from "react-alert";

interface Props {
    parsedData: any,
    tableData: any,
    successfulMatches: Map<string, string> | null,
    setSuccessfulMatches: (value: React.SetStateAction<Map<string, string> | null>) => void,
}

const ThirdStep = ({parsedData, tableData, successfulMatches, setSuccessfulMatches,}: Props) => {
    const alert = useAlert()

    const [failedMatches, setFailedMatches] = useState<string[]>([])

    const onSubmit = () => {
        if (!parsedData || !tableData) {
            alert.error('You should complete the first two steps before you are able to do that. The fuck are you thinking?')
            return
        }

        const {failures, matchedIds} = matchData(parsedData.children, tableData.children)
        setSuccessfulMatches(matchedIds)
        setFailedMatches(failures)
    }

    return (
        <Card title='Step 3' text={thirdStepText} completed={!!successfulMatches}
              content={
                  !!failedMatches.length &&
                  <React.Fragment>
                      <Typography variant='h6'>Failed to match</Typography>
                      <Typography variant='body2' color="textSecondary"
                                  component="p">{failedMatches.join('\n')}</Typography>
                  </React.Fragment>
              }
              actions={
                  !successfulMatches &&
                  <Button importance='primary' type="submit" onClick={onSubmit}>Submit</Button>
              }/>
    )
}

export default ThirdStep