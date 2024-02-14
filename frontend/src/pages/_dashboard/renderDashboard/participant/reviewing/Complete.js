import React from 'react'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.primary.main,
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
                        <CheckCircleOutlineIcon className={classes.icon} />
                        <Typography variant="h4" color="primary" gutterBottom>
                            That's it!
                        </Typography>
                        <Typography
                            width="200px"
                            align="center"
                            variant="subtitle1"
                        >
                            Wow, looks like you've reviewed all of the projects
                            assigned to you! You're done here for now. Thanks a
                            lot for being an active reviewer!
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
