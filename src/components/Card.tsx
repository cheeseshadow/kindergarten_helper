import React from "react";
import {Card as MUICard, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";

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
                <Typography variant='h6'>{title}</Typography>
                <Typography variant='body2' color="textSecondary" component="p">{text}</Typography>

                {
                    completed !== undefined &&
                    <React.Fragment>
                        <Typography variant='h6'>Status</Typography>
                        <Typography variant='body2' color="textSecondary"
                                    component="p">{completed ? 'Completed' : 'Not completed'}</Typography>
                    </React.Fragment>
                }

                {
                    !!content &&
                    <Typography variant='h6'>Content</Typography>
                }

                {content}
            </CardContent>
            <CardActions className={classes.actions}>
                {actions}
            </CardActions>
        </MUICard>
    )
}

export default Card