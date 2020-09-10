import React, { useState, useEffect } from 'react'

import moment from 'moment-timezone'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Box } from '@material-ui/core'
import Countdown from 'react-countdown-now'

import PageWrapper from 'components/layouts/PageWrapper'
import PageHeader from 'components/generic/PageHeader'
import GradientBox from 'components/generic/GradientBox'
import Button from 'components/generic/Button'
import SubmissionForm from './SubmissionForm'
import ProjectsList from './ProjectsList'

import * as DashboardSelectors from 'redux/dashboard/selectors'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const teamLoading = useSelector(DashboardSelectors.teamLoading)
    const isTeamValid = useSelector(DashboardSelectors.isTeamValid)
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const isSubmissionsUpcoming = useSelector(
        DashboardSelectors.isSubmissionsUpcoming,
    )
    const projects = useSelector(DashboardSelectors.projects)

    const [selectedProjectId, setSelectedProjectId] = useState(undefined)
    const [showSubmissionForm, setShowSubmissionForm] = useState(false)
    const [showProjectSelector, setShowProjectSelector] = useState(false)

    useEffect(() => {
        if (projects && event) {
            if (event.allowProjectSubmissionsPerChallenge) {
                setShowProjectSelector(true)
            } else {
                setShowSubmissionForm(true)
                if (projects.length) handleProjectSelected(projects[0]._id)
            }
        }
    }, [projects, event])

    const handleProjectSelected = id => {
        setSelectedProjectId(id)
        setShowSubmissionForm(id !== undefined)
    }

    if (!event || teamLoading) {
        return <PageWrapper loading />
    }

    const renderContent = () => {
        if (!hasTeam) {
            return (
                <GradientBox p={3} color="theme_orange">
                    <Typography variant="h4" gutterBottom>
                        No team
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        You need to join or create a team to submit a project!
                        If you're participating alone, just create a team where
                        you are the only member and come back here.
                    </Typography>
                    <Button
                        color="theme_white"
                        variant="contained"
                        onClick={() =>
                            dispatch(push(`/dashboard/${event.slug}/team`))
                        }
                    >
                        Create or join a team
                    </Button>
                </GradientBox>
            )
        }

        if (!isTeamValid) {
            return (
                <GradientBox p={3} color="theme_orange">
                    <Typography variant="h4" gutterBottom>
                        Invalid team
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Looks like not everyone in your team has checked in to
                        the event! Before submitting your project, all of the
                        members in your team must have checked in to the event.
                        If your team still contains members who are not
                        participating at the event, please have the team owner
                        remove them from the team and then come back here.
                    </Typography>
                    <Button
                        color="theme_white"
                        variant="contained"
                        onClick={() =>
                            dispatch(push(`/dashboard/${event.slug}/team`))
                        }
                    >
                        Edit your team
                    </Button>
                </GradientBox>
            )
        }

        if (isSubmissionsUpcoming) {
            return (
                <GradientBox p={3} color="theme_white">
                    <Typography variant="overline" gutterBottom>
                        Submissions not yet open
                    </Typography>
                    <Typography variant="h4" color="primary" gutterBottom>
                        Submissions open{' '}
                        {moment(event.submissionsStartTime).format(
                            'dddd MMM Do, hhA',
                        )}
                    </Typography>
                    <Typography variant="body1">
                        You can't submit your project yet - hang tight and come
                        back here once the submission period has opened!
                    </Typography>
                </GradientBox>
            )
        }

        return (
            <>
                <GradientBox p={3} color="theme_white">
                    <Countdown
                        date={event.submissionsEndTime}
                        daysInHours
                        renderer={args => {
                            const { completed } = args
                            const { hours, minutes, seconds } = args.formatted

                            if (!completed) {
                                return (
                                    <>
                                        <Typography
                                            variant="overline"
                                            gutterBottom
                                        >
                                            Submissions open
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            color="secondary"
                                            gutterBottom
                                        >
                                            Submissions close in {hours}:
                                            {minutes}:{seconds}
                                        </Typography>
                                        <Typography variant="body1">
                                            The submission period is open -
                                            remember to submit your project
                                            before the deadline! Late
                                            submissions will not be accepted.
                                        </Typography>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <Typography
                                            variant="overline"
                                            gutterBottom
                                        >
                                            Submissions closed
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            color="error"
                                            gutterBottom
                                        >
                                            The submission period is over
                                        </Typography>
                                        <Typography variant="body1">
                                            Alright, that's it! The submission
                                            period is now over and you can no
                                            longer make edits to your project.
                                            You can, however, still change some
                                            important details such as your table
                                            number to make sure people find your
                                            project - please make sure that it's
                                            always correct and up-to-date!
                                        </Typography>
                                    </>
                                )
                            }
                        }}
                    />
                </GradientBox>
                <Box p={1} />

                {showProjectSelector && (
                    <>
                        {selectedProjectId === undefined && (
                            <ProjectsList
                                projectSelectedCallback={id =>
                                    handleProjectSelected(id)
                                }
                            />
                        )}
                        {selectedProjectId !== undefined && (
                            <Box my={2}>
                                <Button
                                    color="theme_orange"
                                    variant="contained"
                                    onClick={() =>
                                        handleProjectSelected(undefined)
                                    }
                                >
                                    Back to Projects
                                </Button>
                            </Box>
                        )}
                    </>
                )}
                <Box p={1} />
                {showSubmissionForm && (
                    <SubmissionForm id={selectedProjectId} />
                )}
            </>
        )
    }

    return (
        <Box>
            <PageHeader
                heading="Project submission"
                subheading={`Here's where you submit your project for ${
                    event.name
                }. As soon as you have a general idea of what you're building, please make a draft submission here - you'll be able to make edits to it until the final submission deadline on ${moment(
                    event.submissionsEndTime,
                ).format(
                    'LLLL',
                )}. All of the members in your team can edit your team's project submission.`}
            />
            {renderContent()}
        </Box>
    )
}
