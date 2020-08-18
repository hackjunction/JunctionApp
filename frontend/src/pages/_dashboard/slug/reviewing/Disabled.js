import React from 'react'

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import { Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.secondary.main,
        fontSize: '80px',
    },
}))

export default () => {
    const classes = useStyles()
    return (
        <Grid container spacing={3} direction="row" justify="center">
            <Grid item xs={12} md={8}>
                <Box
                    p={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Box
                        width="100%"
                        maxWidth="400px"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <SentimentVeryDissatisfiedIcon
                            className={classes.icon}
                        />
                        <Typography variant="h4" color="secondary" gutterBottom>
                            Disabled
                        </Typography>
                        <Typography
                            width="200px"
                            align="center"
                            variant="subtitle1"
                        >
                            Looks like our system has put your voting on hold
                            for a bit - maybe you were submitting too many
                            votes? If you think this has happened in error,
                            please contact the nearest event organiser.
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
