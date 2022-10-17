import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

import Markdown from 'components/generic/Markdown'

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

export default ({ partner, title, subtitle, logo, link }) => {
    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Box p={3}>
                {logo && (
                    <img
                        alt={partner}
                        src={logo.url}
                        className={classes.companyLogo}
                    />
                )}
            </Box>
            <Box p={3}>
                <Typography variant="h5">{title}</Typography>
                <Typography>
                    <Markdown source={subtitle} />
                </Typography>
                <Box className={classes.outboundLink}>
                    <OutboundLink
                        eventLabel="myLabel"
                        to={link}
                        target="_blank"
                    ></OutboundLink>
                </Box>
            </Box>
        </Box>
    )
}