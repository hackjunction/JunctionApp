import React from 'react'
import { Box, Typography } from '@material-ui/core'

const Sealing = () => {
    const txStatus = ''

    return (
        <Box my={5}>
            <Typography variant="h4">
                Waiting for transaction to finish...
            </Typography>
            <Typography variant="body1">Status: {txStatus}</Typography>
        </Box>
    )
}

export default Sealing
