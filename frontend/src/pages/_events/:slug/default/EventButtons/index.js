import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { useRouteMatch } from 'react-router'
import moment from 'moment-timezone'
import { EventStatuses } from '@hackjunction/shared'
import { Typography, Grid } from '@material-ui/core'

import Button from 'components/generic/Button'
import * as AuthSelectors from 'redux/auth/selectors'

export default ({ event, registration }) => {
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const hasRegistration = !!registration
    switch (event?._eventStatus) {
        case EventStatuses.PUBLISHED.id: {
            return (
                <Typography align="center" variant="subtitle1">
                    The application period begins{' '}
                    {moment(event.registrationStartTime).format(
                        `LLL [(${event.timezone})]`
                    )}
                </Typography>
            )
        }
        case EventStatuses.REGISTRATION_OPEN.id: {
            if (isAuthenticated) {
                if (hasRegistration) {
                    return (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={() =>
                                        dispatch(push(`${match.url}/register`))
                                    }
                                    variant="contained"
                                    color="theme_turquoise"
                                >
                                    Edit your registration
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={() =>
                                        dispatch(
                                            push(`/dashboard/${event.slug}`)
                                        )
                                    }
                                    variant="contained"
                                    color="theme_orange"
                                >
                                    Event dashboard
                                </Button>
                            </Grid>
                        </Grid>
                    )
                } else {
                    return (
                        <Button
                            fullWidth
                            onClick={() =>
                                dispatch(push(`${match.url}/register`))
                            }
                            variant="contained"
                            color="theme_turquoise"
                        >
                            Register now
                        </Button>
                    )
                }
            } else {
                return (
                    <Button
                        fullWidth
                        onClick={() =>
                            dispatch(push(`/login`, { nextRoute: match.url }))
                        }
                        variant="contained"
                        color="theme_turquoise"
                    >
                        Log in to register
                    </Button>
                )
            }
        }
        default: {
            if (isAuthenticated) {
                if (hasRegistration) {
                    return (
                        <Button
                            fullWidth
                            onClick={() =>
                                dispatch(push(`/dashboard/${event.slug}`))
                            }
                            variant="contained"
                            color="theme_turquoise"
                        >
                            Event dashboard
                        </Button>
                    )
                } else {
                    return (
                        <Typography variant="subtitle1" align="center">
                            The application period for this event has ended!
                        </Typography>
                    )
                }
            } else {
                return (
                    <Button
                        fullWidth
                        onClick={() =>
                            dispatch(push('/login', { nextRoute: match.url }))
                        }
                        variant="contained"
                        color="theme_turquoise"
                    >
                        Log in
                    </Button>
                )
            }
        }
    }
}
