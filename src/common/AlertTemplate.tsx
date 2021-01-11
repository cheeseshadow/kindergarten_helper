import {AlertComponentPropsWithStyle} from "react-alert";
import {Alert, AlertTitle} from "@material-ui/lab";
import React from "react";

const style = {
    width: '500px',
    margin: '4px',
    'max-width': '100vw'
}

const AlertTemplate = ({message, options}: AlertComponentPropsWithStyle) => {
    const title = options.type === 'error' ? 'Error' :
        options.type === 'success' ? 'Success' : 'Info'

    return (
        <Alert style={{...style}} severity={options.type}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}

export default AlertTemplate