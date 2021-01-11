import React from "react";
import {Card as MUICard, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import Status from "./Status";

interface Props {
    title: string,
    text: string,
    completed?: boolean,
    actions?: any,
    content?: any
}

const useStyles = makeStyles({
    root: {
        position: 'relative',
        minWidth: '300px',
        maxWidth: '420px',
        margin: '8px',
        display: 'flex',
        'flex-direction': 'column'
    },
    title: {
        'margin-bottom': '4px'
    },
    content: {
        display: 'flex',
        'flex-direction': 'column'
    },
    actions: {
        padding: '0 16px 16px 16px',
        'justify-content': 'flex-end'
    }
})

const Card = ({title, text, completed, actions, content}: Props) => {
    const classes = useStyles()

    return (
        <MUICard className={classes.root}>
            <CardContent className={classes.content}>
                {
                    completed !== undefined &&
                    <Status value={completed!} successLabel='Completed' failureLabel='Not completed'/>
                }

                <Typography variant='h6' className={classes.title}>{title}</Typography>
                <Typography variant='body2' color="textSecondary" component="p">{text}</Typography>

                {!completed && content}
            </CardContent>
            {
                !completed &&
                <CardActions className={classes.actions}>
                    {actions}
                </CardActions>
            }
        </MUICard>
    )
}

export default Card