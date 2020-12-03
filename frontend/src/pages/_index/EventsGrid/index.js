import React from 'react'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { Grid, Typography } from '@material-ui/core'

import CenteredContainer from 'components/generic/CenteredContainer'
import EventCard from 'components/events/EventCard'
import Button from 'components/generic/Button'
import PageWrapper from 'components/layouts/PageWrapper'
import { useTranslation } from 'react-i18next'

export default ({ events, loading = false, title }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    var date = new Date()
    const isodate = date.toISOString()
    function renderEvents() {
        return events.map(event => {
            const canApply =
                isodate < event.registrationEndTime &&
                isodate > event.registrationStartTime
            return (
                <Grid key={event.slug} item xs={12} md={6} lg={4}>
                    <EventCard
                        event={event}
                        organization={
                            event?.organizations ? event.organizations[0] : null
                        }
                        buttons={[
                            !canApply && !event.galleryOpen && (
                                <Button
                                    color="theme_lightgray"
                                    variant="outlinedNew"
                                    strong
                                    onClick={() =>
                                        dispatch(push('/events/' + event.slug))
                                    }
                                >
                                    {t('Register_now_')}
                                </Button>
                            ),
                            canApply && !event.galleryOpen && (
                                <Button
                                    color="theme_lightgray"
                                    variant="outlinedNew"
                                    strong
                                    onClick={() =>
                                        dispatch(
                                            push(
                                                '/events/' +
                                                    event.slug +
                                                    '/register/',
                                            ),
                                        )
                                    }
                                >
                                    {t('Register_now_')}
                                </Button>
                            ),
                            event.galleryOpen && (
                                <Button
                                    color="theme_lightgray"
                                    variant="outlinedNew"
                                    strong
                                    onClick={() =>
                                        dispatch(
                                            push('/projects/' + event.slug),
                                        )
                                    }
                                >
                                    {t('View_projects_')}
                                </Button>
                            ),
                        ]}
                    />
                </Grid>
            )
        })
    }

    if (!events || events.length === 0) {
        return null
    }

    return (
        <PageWrapper
            loading={loading}
            render={() => (
                <CenteredContainer>
                    <Grid
                        container
                        spacing={6}
                        direction="row"
                        alignItems="stretch"
                        justify="center"
                    >
                        <Grid item xs={12}>
                            <Typography variant="h3" align="center">
                                {title}
                            </Typography>
                        </Grid>
                        {renderEvents()}
                    </Grid>
                </CenteredContainer>
            )}
        />
    )
}
