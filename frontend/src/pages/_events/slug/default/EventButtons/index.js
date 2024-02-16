import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { useRouteMatch } from 'react-router'
import { EventStatuses } from '@hackjunction/shared'
import { Typography, Grid } from '@material-ui/core'

import Button from 'components/generic/Button'
import * as AuthSelectors from 'redux/auth/selectors'
import { useTranslation } from 'react-i18next'

export default ({ event, registration }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const hasRegistration = registration
        ? registration.status !== 'incomplete'
        : false
    switch (event?._eventStatus) {
        case EventStatuses.PUBLISHED.id: {
            return (
                <Button
                    disabled
                    variant="applicationsClosed"
                    color="theme_blue"
                >
                    Applications not open
                </Button>
            )
        }
        case EventStatuses.REGISTRATION_OPEN.id: {
            if (isAuthenticated) {
                if (hasRegistration) {
                    return (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() =>
                                        dispatch(push(`${match.url}/register`))
                                    }
                                    variant="applicationsClosed"
                                    color="theme_blue"
                                >
                                    {t('Edit_registration_')}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={() =>
                                        dispatch(
                                            push(`/dashboard/event/${event.slug}`),
                                        )
                                    }
                                    variant="applicationsClosed"
                                    color="theme_blue"
                                >
                                    {t('Event_dashboard_')}
                                </Button>
                            </Grid>
                        </Grid>
                    )
                } else {
                    return (
                        <Button
                            onClick={() =>
                                dispatch(push(`${match.url}/register`))
                            }
                            variant="applicationsClosed"
                            color="theme_blue"
                        >
                            {t('Register_now_')}
                        </Button>
                    )
                }
            } else {
                return (
                    <Button
                        onClick={() =>
                            dispatch(
                                push(`/login`, {
                                    nextRoute: `${match.url}/register`,
                                }),
                            )
                        }
                        variant="applicationsClosed"
                        color="theme_blue"
                    >
                        {t('Log_in_register_')}
                    </Button>
                )
            }
        }
        default: {
            if (isAuthenticated) {
                if (hasRegistration) {
                    return (
                        <Button
                            onClick={() =>
                                dispatch(push(`/dashboard/event/${event.slug}`))
                            }
                            variant="applicationsClosed"
                            color="theme_blue"
                        >
                            {t('Event_dashboard_')}
                        </Button>
                    )
                } else {
                    return (
                        <Typography variant="subtitle1" align="center">
                            {t('Period_ended_')}
                        </Typography>
                    )
                }
            } else {
                return (
                    <Button
                        onClick={() =>
                            dispatch(push('/login', { nextRoute: match.url }))
                        }
                        variant="applicationsClosed"
                        color="theme_blue"
                    >
                        {t('Log_in_')}
                    </Button>
                )
            }
        }
    }
}
