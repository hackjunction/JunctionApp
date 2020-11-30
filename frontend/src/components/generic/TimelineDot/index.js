import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles(theme => ({
    root: {
        width: '14px',
        height: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    dot: ({ active }) => ({
        width: '14px',
        height: '14px',
        borderStyle: 'solid',
        borderRadius: '50%',
        borderColor: active ? '#19DDEA' : '#ccc',
        backgroundColor: active ? 'transparent' : '#19DDEA',
        borderWidth: '1px',
    }),
}))

const TimelineDot = ({ active, completed }) => {
    const classes = useStyles({ active })
    return (
        <div className={classes.root}>
            {completed ? (
                <CheckIcon color="primary" fontSize="small" />
            ) : (
                <div className={classes.dot} />
            )}
        </div>
    )
}

export default TimelineDot
