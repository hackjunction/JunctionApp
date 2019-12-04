import React from 'react';

import { Box, Typography } from '@material-ui/core';

const TrackPlacements = () => {
    return (
        <Box>
            <Typography variant="h4">Track placements</Typography>
            <Typography variant="body1">How do you want to determine the ranking of projects within tracks?</Typography>
            <ul>
                <li>From gavel results</li>
                <li>Manually</li>
            </ul>
        </Box>
    );
};

export default TrackPlacements;
