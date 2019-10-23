import React from 'react';

import { Paper, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const LoadingCard = () => {
    return (
        <Paper elevation={0} style={{ marginTop: '3px' }}>
            <Box display="flex" flexDirection="row" padding={2} width="100%">
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Skeleton variant="rect" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                </Box>
                <Box padding={2} flex="1" display="flex" flexDirection="column">
                    <Skeleton height={32} width="40%" />
                    <Skeleton height={32} width="28%" />
                    <Skeleton height={32} width="80%" />
                </Box>
            </Box>
        </Paper>
    );
};

export default LoadingCard;
