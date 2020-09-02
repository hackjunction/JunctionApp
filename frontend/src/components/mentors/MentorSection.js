import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

import Markdown from 'components/generic/Markdown'

import Button from 'components/generic/Button'

import { OutboundLink } from 'react-ga'

const useStyles = makeStyles(theme => ({
    outboundLink: {
        '& a': {
            textDecoration: 'none !important',
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    },
}))

export default ({ name, email, phoneNumber, link }) => {
    const classes = useStyles()

    return (
        <Box p={3}>
            <Typography variant="h5">{name}</Typography>
            <Typography>{email}</Typography>

            <Box className={classes.outboundLink}>
                <OutboundLink eventLabel="myLabel" to={link} target="_blank">
                    <Button color="theme_turquoise" variant="contained">
                        Contact
                    </Button>
                </OutboundLink>
            </Box>
        </Box>
    )
}
