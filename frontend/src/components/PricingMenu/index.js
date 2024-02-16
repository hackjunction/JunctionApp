import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { Box } from '@material-ui/core'
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
