import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
    root: {
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: ({ active }) => ({
        width: '24px',
        height: '24px',
        borderStyle: 'solid',
        borderRadius: '12px',
        borderColor: active ? theme.palette.primary.main : '#ccc',
        borderWidth: '3px'
    })
}));

const TimelineDot = ({ active, completed }) => {
    const classes = useStyles({ active });
    return (
        <div className={classes.root}>
            {completed ? <CheckIcon color="primary" fontSize="small" /> : <div className={classes.dot} />}
        </div>
    );
};

export default TimelineDot;
