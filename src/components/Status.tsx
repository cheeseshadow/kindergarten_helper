import React from "react";
import {Chip, makeStyles} from "@material-ui/core";

interface Props {
    value: boolean,
    successLabel: string,
    failureLabel: string
}

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        right: '16px',
        top: '20px'
    }
})

const Status = ({value, successLabel, failureLabel}: Props) => {
    const classes = useStyles()
    const color = value ? 'primary' : 'secondary'
    const variant = value ? 'default' : 'outlined'
    const label = value ? successLabel : failureLabel

    return (
        <Chip className={classes.root} variant={variant} size='small' color={color} label={label}/>
    )
}

export default Status