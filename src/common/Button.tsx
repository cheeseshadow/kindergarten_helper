import React from "react";
import {Button as MUIButton} from "@material-ui/core";

interface Props {
    importance: 'primary' | 'secondary',
    type?: 'button' | 'reset' | 'submit',
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    children?: any
}

const Button = ({importance, children, ...other}: Props) => {
    const variant = importance === 'primary' ? 'contained' : importance === 'secondary' ? 'outlined' : 'text'

    return (
        <MUIButton variant={variant} color='primary' {...other}>{children}</MUIButton>
    )
}

export default Button
