import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    value: {
        textAlign: 'left'
    },
    suffix: {
        marginLeft: theme.spacing(1),
        display: 'inline-block'
    }
}));

const Statistic = ({ label, value, suffix }) => {
    const classes = useStyles();
    return (
        <Card>
            <CardContent className={classes.root}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {label}
                </Typography>
                <Typography variant="h4" className={classes.value}>
                    {value}
                    {suffix && (
                        <Typography variant="h6" className={classes.suffix}>
                            {suffix}
                        </Typography>
                    )}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Statistic;
