import React from 'react'

import { Box, Typography } from '@material-ui/core'

const OverallPlacements = () => {
    return (
        <Box>
            <Typography variant="h4">Overall placement</Typography>
            <Typography variant="body1">
                How do you want to determine the overall ranking of projects?
            </Typography>
            <ul>
                <li>Manually</li>
                <li>By finalist voting</li>
                <li>From gavel results</li>
            </ul>
        </Box>
    )
}

export default OverallPlacements
