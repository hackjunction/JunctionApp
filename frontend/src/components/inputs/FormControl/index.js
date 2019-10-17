import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    hint: ({ hasError }) => ({
        marginTop: theme.spacing(0.5),
        color: hasError ? theme.palette.error.main : theme.palette.text.hint
    })
}));

const FormControl = ({ label, hint, touched, error, children }) => {
    const hasError = touched && error;
    const classes = useStyles({ hasError });
    const theme = useTheme();
    console.log('THEME', theme);
    return (
        <Box className={classes.wrapper}>
            <Typography className={classes.label} variant="caption">
                {label}
            </Typography>
            {children}
            <Typography className={classes.hint} variant="caption">
                {hasError ? error : hint}
            </Typography>
        </Box>
    );
};

export default FormControl;
