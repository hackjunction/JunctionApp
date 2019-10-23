import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        }
    }
}));

const LoadingCard = () => {
    const classes = useStyles();
    return (
        <Paper elevation={0} style={{ marginTop: '3px' }}>
            <Box className={classes.wrapper}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Skeleton variant="rect" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                </Box>
                <Box padding={2} flex="1" display="flex" flexDirection="column">
                    <Skeleton height={24} width="200px" />
                    <Skeleton height={20} width="80px" />
                    <Skeleton height={20} width="320px" />
                    <Skeleton height={20} width="320px" />
                </Box>
            </Box>
        </Paper>
    );
};

export default LoadingCard;
