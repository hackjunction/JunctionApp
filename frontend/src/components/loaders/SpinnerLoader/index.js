import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const SpinnerLoader = () => {
    return (
        <Box p={2} display="flex" alignItems="center" justifyContent="center">
            <CircularProgress size={24} />
        </Box>
    )
}

export default SpinnerLoader
