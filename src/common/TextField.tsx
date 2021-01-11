import React, {ChangeEvent} from "react";
import {TextField as MUITextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

interface Props {
    label: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const CustomTextField = withStyles({
    root: {
        'margin-top': '12px'
    }
})(MUITextField)

const TextField = ({label, value, onChange}: Props) => {
    return (
        <CustomTextField label={label}
                         multiline
                         rows={4}
                         variant='outlined'
                         value={value}
                         onChange={onChange}/>
    )
}

export default TextField