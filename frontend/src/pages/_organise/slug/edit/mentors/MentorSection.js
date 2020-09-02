import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, Grid } from '@material-ui/core'

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
        <Grid container>
            <Grid item xs={4}>
                <Typography>{name}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>{email}</Typography>
            </Grid>
            <Grid item xs={4} className={classes.outboundLink}>
                <OutboundLink eventLabel="myLabel" to={link} target="_blank">
                    <Button color="theme_turquoise" variant="contained">
                        Contact
                    </Button>
                </OutboundLink>
            </Grid>
        </Grid>
    )
}
