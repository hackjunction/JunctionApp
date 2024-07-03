import React from 'react'
import { Box, Typography } from '@mui/material'
import MiscUtils from 'utils/misc'

const ErrorsBox = ({ title = 'Please correct the following', errors }) => {
    return (
        <Box>
            <Typography className="text-red-600 font-bold" variant="subtitle1">
                {title}
            </Typography>
            <Box className="pl-4">
                {MiscUtils.parseFormikErrors(errors).map((error, index) => (
                    <Typography
                        key={index}
                        className="text-red-600"
                        variant="body1"
                    >
                        * {error}
                    </Typography>
                ))}
            </Box>
        </Box>
    )
}

export default ErrorsBox
