import React from "react";
import {Button as MUIButton} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

interface Props {
    importance: 'primary' | 'secondary',
    type?: 'button' | 'reset' | 'submit',
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    children?: any
}

const CustomButton = withStyles({
    root: {
        'margin-top': '12px'
    }
})(MUIButton)

const Button = ({importance, children, ...other}: Props) => {
    const variant = importance === 'primary' ? 'contained' : importance === 'secondary' ? 'outlined' : 'text'

    return (
        <CustomButton variant={variant} color='primary' {...other}>{children}</CustomButton>
    )
}

export default Button
