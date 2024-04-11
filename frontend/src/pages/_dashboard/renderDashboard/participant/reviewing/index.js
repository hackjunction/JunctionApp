import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'
import GradientBox from 'components/generic/GradientBox'

// import Instructions from './Instructions'
// import FirstProject from './FirstProject'
// import CompareProjects from './CompareProjects'
// import Complete from './Complete'
import Disabled from './Disabled'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import PageHeader from 'components/generic/PageHeader'
import Button from 'components/generic/Button'
import Countdown from 'react-countdown-now'

export default () => {
    const dispatch = useDispatch()
    const team = useSelector(DashboardSelectors.team)
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const annotator = useSelector(DashboardSelectors.annotator)
    const annotatorError = useSelector(DashboardSelectors.annotatorError)
    const annotatorLoading = useSelector(DashboardSelectors.annotatorLoading)

    useEffect(() => {
        dispatch(DashboardActions.updateAnnotator(event.slug))
    }, [event.slug, dispatch])

    const renderContent = () => {
        if (!team) {
            return (
                <GradientBox p={3} color="theme_orange">
                    <Typography variant="button">Team status</Typography>
                    <Typography variant="h4">Not in a team</Typography>
                    <Typography variant="body1">
                        You need to be in a team to participate in reviewing
                    </Typography>
                </GradientBox>
            )
        }

        if (registration?.gavelLogin) {
            return (
                <div>
                    <PageHeader heading="Reviewing" />
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Countdown
                            daysInHours
                            date={event.reviewingStartTime}
                            renderer={({ formatted, completed }) => {
                                if (completed) {
                                    return (
                                        <Countdown
                                            daysInHours
                                            date={event.reviewingEndTime}
                                            renderer={({
                                                formatted,
                                                completed,
                                            }) => {
                                                if (!completed) {
                                                    return (
                                                        <>
                                                            <Typography
                                                                variant="subtitle1"
                                                                style={{
                                                                    fontWeight:
                                                                        'bold',
                                                                }}
                                                                gutterBottom
                                                            >
                                                                The reviewing
                                                                period is open!
                                                                Time left:{' '}
                                                                {
                                                                    formatted.hours
                                                                }
                                                                :
                                                                {
                                                                    formatted.minutes
                                                                }
                                                                :
                                                                {
                                                                    formatted.seconds
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                paragraph
                                                            >
                                                                Once you click
                                                                "Start
                                                                reviewing", a
                                                                new tab will
                                                                open on your
                                                                browser were you
                                                                can start
                                                                reviewing the
                                                                projects.
                                                            </Typography>
                                                            <Button
                                                                onClick={() => {
                                                                    window.open(
                                                                        `${registration?.gavelLogin}`,
                                                                        '_blank',
                                                                    )
                                                                }}
                                                                color="primary"
                                                                variant="contained"
                                                            >
                                                                Start reviewing
                                                                projects
                                                            </Button>
                                                            <p>
                                                                Copy this link
                                                                if for some
                                                                reason the
                                                                button doesn't
                                                                work:
                                                                {
                                                                    registration?.gavelLogin
                                                                }
                                                            </p>
                                                        </>
                                                    )
                                                } else {
                                                    return (
                                                        <Typography
                                                            variant="subtitle1"
                                                            style={{
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                            gutterBottom
                                                        >
                                                            The reviewing period
                                                            is over! Thanks for
                                                            participating!
                                                        </Typography>
                                                    )
                                                }
                                            }}
                                        />
                                    )
                                } else {
                                    return (
                                        <>
                                            <Typography
                                                variant="subtitle1"
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                The reviewing period begins in{' '}
                                                {formatted.hours}:
                                                {formatted.minutes}:
                                                {formatted.seconds}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                paragraph
                                                gutterBottom
                                            >
                                                Come back here then!
                                            </Typography>
                                        </>
                                    )
                                }
                            }}
                        />
                    </Box>
                </div>
            )
        }

        return <Disabled />

        // if (!annotator) {
        //     return <Instructions />
        // }

        // if (!annotator.active) {
        //     return <Disabled />
        // }

        // if (!annotator.prev && annotator.next) {
        //     return <FirstProject projectId={annotator.next} />
        // }

        // if (annotator.prev && annotator.next) {
        //     return (
        //         <CompareProjects
        //             annotator={annotator}
        //             prevId={annotator.prev}
        //             nextId={annotator.next}
        //             isFirstChoice={annotator.ignore.length === 1}
        //         />
        //     )
        // }

        // return <Complete />
    }
    // console.log("annotator", annotator, annotatorError)
    return (
        <PageWrapper loading={annotatorLoading} error={annotatorError}>
            {renderContent()}
        </PageWrapper>
    )
}
