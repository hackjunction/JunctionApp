import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Grid } from '@material-ui/core'

import Markdown from 'components/generic/Markdown'

import Button from 'components/generic/Button'
import defaultLogo from 'assets/logos/JunctionPlatform_Emblem_Black.svg'
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

export default ({ name, logo, partner, description, link, redeemable }) => {
    const classes = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={4}>
                    <Box p={3}>
                        {logo ? (
                            <img
                                alt={logo}
                                src={logo.url}
                                className={classes.companyLogo}
                            />
                        ) : (
                            <img
                                alt='default logo'
                                src={defaultLogo}
                                className={classes.companyLogo}
                            />
                        )
                        }
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box p={3}>
                        <Typography variant="h5">
                            {name} by {partner}
                        </Typography>
                        <Typography>
                            <Markdown source={description} />
                        </Typography>
                        {redeemable ? (
                            <Box className={classes.outboundLink}>
                                <OutboundLink
                                    eventLabel="myLabel"
                                    to={link}
                                    target="_blank"
                                >
                                    <Button color="primary" variant="contained">
                                        Redeem
                                    </Button>
                                </OutboundLink>
                            </Box>
                        ) : null}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}


