import React from 'react'

import { useDispatch } from 'react-redux'

import { useResolvedPath } from 'react-router'

import { Grid, Paper, Box, Typography, ButtonBase } from '@mui/material'

const useStyles = makeStyles(theme => ({
    paperButton: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}))

export default () => {
    const classes = useStyles()
    const url = useResolvedPath('').pathname
    const dispatch = useDispatch()
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper elevation={0}>
                    <ButtonBase
                        onClick={() => dispatch(push(`${match.url}/overall`))}
                        component="div"
                        classes={{ root: classes.paperButton }}
                    >
                        <Box p={3}>
                            <Typography variant="h6">
                                Overall results
                            </Typography>
                            <Typography variant="body1">
                                View and edit the overall ranking of projects
                            </Typography>
                        </Box>
                    </ButtonBase>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={0}>
                    <ButtonBase
                        onClick={() => dispatch(push(`${match.url}/tracks`))}
                        component="div"
                        classes={{ root: classes.paperButton }}
                    >
                        <Box p={3}>
                            <Typography variant="h6">Track results</Typography>
                            <Typography variant="body1" gutterBottom>
                                View and edit the rankings of projects within
                                tracks
                            </Typography>
                        </Box>
                    </ButtonBase>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={0}>
                    <ButtonBase
                        onClick={() =>
                            dispatch(push(`${match.url}/challenges`))
                        }
                        component="div"
                        classes={{ root: classes.paperButton }}
                    >
                        <Box p={3} display="flex" flexDirection="column">
                            <Typography variant="h6">
                                Challenge results
                            </Typography>
                            <Typography variant="body1">
                                View and edit the rankings of projects within
                                challenges
                            </Typography>
                        </Box>
                    </ButtonBase>
                </Paper>
            </Grid>
        </Grid>
    )
}
