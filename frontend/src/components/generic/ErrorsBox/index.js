import React from 'react'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MiscUtils from 'utils/misc'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.error.main,
        fontWeight: 'bold',
    },
    error: {
        color: theme.palette.error.main,
    },
}))

const ErrorsBox = ({ title = 'Please correct the following', errors }) => {
    const classes = useStyles()
    return (
        <Box>
            <Typography className={classes.title} variant="subtitle1">
                {title}
            </Typography>
            <Box pl={1}>
                {MiscUtils.parseFormikErrors(errors).map(error => (
                    <Typography className={classes.error} variant="body1">
                        * {error}
                    </Typography>
                ))}
            </Box>
        </Box>
    )
}

export default ErrorsBox
