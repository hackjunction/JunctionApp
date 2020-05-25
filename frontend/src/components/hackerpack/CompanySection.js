import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

import Markdown from 'components/generic/Markdown'

import Button from 'components/generic/Button'

import { OutboundLink } from 'react-ga'

const useStyles = makeStyles(theme => ({
    companyLogo: {
        width: '200px',
    },
    outboundLink: {
        '& a': {
            textDecoration: 'none !important',
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    },
}))

export default ({ name, icon, description, link }) => {
    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Box p={3}>
                <img alt={name} src={icon} className={classes.companyLogo} />
            </Box>
            <Box p={3}>
                <Typography variant="h5">{name}</Typography>
                <Typography>
                    <Markdown source={description} />
                </Typography>
                <Box className={classes.outboundLink}>
                    <OutboundLink
                        eventLabel="myLabel"
                        to={link}
                        target="_blank"
                    >
                        <Button color="theme_turquoise" variant="contained">
                            Redeem
                        </Button>
                    </OutboundLink>
                </Box>
            </Box>
        </Box>
    )
}
