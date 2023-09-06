import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    subheading: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(0.5),
        fontFamily: 'Lato',
    },
}))

const PageHeader = ({ heading, subheading = null }) => {
    const classes = useStyles()
    return (
        <Box pb={2} pt={2}>
            <Typography
                className="tw-font-bold tw-tracking-tight"
                variant="h3"
                component="h3"
            >
                {heading}
            </Typography>
            {subheading && (
                <Typography
                    className="tw-text-lg tw-text-gray-600"
                    variant="body1"
                    component="p"
                >
                    {subheading}
                </Typography>
            )}
        </Box>
    )
}

export default PageHeader
