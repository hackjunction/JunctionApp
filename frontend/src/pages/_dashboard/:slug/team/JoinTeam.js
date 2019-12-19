import React, { useState, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Typography } from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'

import * as DashboardActions from 'redux/dashboard/actions'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

const useStyles = makeStyles(theme => ({
    box: {
        background: 'white',
        padding: theme.spacing(3),
        borderRadius: '12px',
        boxShadow: '4px 6px 20px #F3F3F3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const classes = useStyles()
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState('')

    const handleCreate = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.createTeam(event.slug))
            .then(() => {
                dispatch(SnackbarActions.success('Created new team'))
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... please try again.'
                    )
                )
            })
    }, [dispatch, event.slug])

    const handleJoin = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.joinTeam(event.slug, code))
            .then(() => {
                dispatch(SnackbarActions.success('Joined team ' + code))
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    dispatch(
                        SnackbarActions.error('No team found with code ' + code)
                    )
                } else if (err.response && err.response.status === 403) {
                    dispatch(
                        SnackbarActions.error(
                            'Unable to join team: ' +
                                err?.response?.data?.message
                        )
                    )
                } else {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... please try again.'
                        )
                    )
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [code, dispatch, event.slug])

    return (
        <Box>
            <Typography variant="body1">
                It seems like you don’t have a team yet. Here you can create a
                new team or join already existing one.
            </Typography>
            <Box mt={2} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box className={classes.box}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Join an existing team
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            If one of your team members has already created a
                            team, all you need to do is fill in the team code
                            here.
                        </Typography>
                        <Box
                            mt={2}
                            width="200px"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <TextInput
                                value={code}
                                onChange={setCode}
                                label="Your team code here"
                            />
                            <Box p={1} />
                            <Button
                                loading={loading}
                                disabled={code.length === 0}
                                onClick={handleJoin}
                                fullWidth
                                color="theme_turquoise"
                                variant="contained"
                            >
                                Join team
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box className={classes.box}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Create a new team
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            You can also create a new team, and you'll be given
                            a unique team code. You can then share this code
                            with people you want to invite to your team.
                        </Typography>
                        <Box
                            mt={2}
                            width="200px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Button
                                loading={loading}
                                onClick={handleCreate}
                                fullWidth
                                color="theme_turquoise"
                                variant="contained"
                            >
                                Create team
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
