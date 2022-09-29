import React from 'react'
import { Box, Typography } from '@material-ui/core'

const Sealing = () => {
    return (
        <Box my={5}>
            <Typography variant="h4">
                Waiting for transaction to finalize...
            </Typography>
            <Typography variant="body1">
                This may take up to 20 seconds. Please be patient and do not
                close the tab
            </Typography>
        </Box>
    )
}

export default Sealing
