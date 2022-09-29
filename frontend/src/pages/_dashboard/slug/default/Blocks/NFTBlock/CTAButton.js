import React from 'react'
import { Box } from '@material-ui/core'
import Button from 'components/generic/Button'

export const CTAButton = ({ label, onClick, ...rest }) => {
    return (
        <Box mr={2}>
            <Button
                variant="contained"
                color="theme_white"
                onClick={onClick}
                {...rest}
            >
                {label}
            </Button>
        </Box>
    )
}
