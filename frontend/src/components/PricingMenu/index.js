import React from 'react'
import { useDispatch } from 'react-redux'

import { Box } from '@mui/material'
import Button from 'components/generic/Button'

export default () => {
    const dispatch = useDispatch()

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Button
                color="primary"
                variant="contained"
                strong
                onClick={() => dispatch(push('/pricing'))}
            >
                Pricing
            </Button>
        </Box>
    )
}
