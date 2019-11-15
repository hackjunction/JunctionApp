import React from 'react';

import moment from 'moment-timezone';
import Countdown from 'react-countdown-now';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { RegistrationStatuses } from '@hackjunction/shared';

import * as DashboardSelectors from 'redux/dashboard/selectors';

import Button from 'components/generic/Button';
import GradientBox from 'components/generic/GradientBox';

const ProjectBlock = ({
    event,
    registration,
    project,
    projectLoading,
    isSubmissionsUpcoming,
    isSubmissionsPast,
    openSubmission
}) => {
    if (!registration || registration.status !== RegistrationStatuses.asObject.checkedIn.id) return null;
    if (projectLoading) return null;

    if (isSubmissionsUpcoming) {
        return (
            <Grid item xs={12}>
                <GradientBox color="theme_white" p={3}>
                    <Typography variant="button" gutterBottom>
                        Project submissions
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        Project submissions not yet open
                    </Typography>
                    <Typography variant="body1">
                        Project submissions begin {moment(event.submissionsStartTime).format('LLLL')}, and you'll be
                        able to submit your project here. As soon as you have a general idea of what you're building,
                        you should make the first version of your project submission, so that organisers and partners
                        have a general idea of what everyone is working on. You can always edit your project submission
                        until the final submission deadline, {moment(event.submissionsEndTime).format('LLLL')}
                    </Typography>
                </GradientBox>
            </Grid>
        );
    }

    if (isSubmissionsPast) {
        return (
            <Grid item xs={12}>
                <GradientBox color="theme_white" p={3}>
                    <Typography variant="button" gutterBottom>
                        Project submissions
                    </Typography>
                    <Typography variant="h4" color="secondary" gutterBottom>
                        Project submissions closed
                    </Typography>
                    <Typography variant="body1">Project submissions are now closed!</Typography>
                </GradientBox>
            </Grid>
        );
    }

    // Project submissions are open

    if (!project) {
        return (
            <Grid item xs={12}>
                <GradientBox color="theme_orange" p={3}>
                    <Typography variant="button" gutterBottom>
                        Project submissions
                    </Typography>
                    <Typography variant="h4">Project submissions are open</Typography>
                    <Typography variant="h6" gutterBottom>
                        The submission deadline is in{' '}
                        <Countdown
                            daysInHours
                            date={event.submissionsEndTime}
                            renderer={({ formatted }) => `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`}
                        />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        You haven't yet submitted a project! You should go and submit a draft of your project as soon as
                        you have a rough idea of what you're making. You're free to edit your project submission as many
                        times as you wish until the final submission deadline. By submitting a draft of your project
                        now, event organisers, partners and mentors will be able to see what you're working on and offer
                        you assistance with your project. It'll take you under a minute, we promise.
                    </Typography>
                    <Button variant="contained" color="theme_white" onClick={() => openSubmission(event.slug)}>
                        Make a draft submission
                    </Button>
                </GradientBox>
            </Grid>
        );
    }

    return (
        <Grid item xs={12}>
            <GradientBox color="theme_turquoise" p={3}>
                <Typography variant="button" gutterBottom>
                    Project submissions
                </Typography>
                <Typography variant="h4">Project submissions are open!</Typography>
                <Typography variant="h6" gutterBottom>
                    The submission deadline is in{' '}
                    <Countdown
                        daysInHours
                        date={event.submissionsEndTime}
                        renderer={({ formatted }) => `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`}
                    />
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Great, you've already made a submission! You can make edits to it until the final submission
                    deadline, so make sure to make it as polished as possible!
                </Typography>
                <Button variant="contained" color="theme_white" onClick={() => openSubmission(event.slug)}>
                    Edit your submission
                </Button>
            </GradientBox>
        </Grid>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state),
    project: DashboardSelectors.project(state),
    projectLoading: DashboardSelectors.projectLoading(state),
    isSubmissionsUpcoming: DashboardSelectors.isSubmissionsUpcoming(state),
    isSubmissionsPast: DashboardSelectors.isSubmissionsPast(state)
});

const mapDispatch = dispatch => ({
    openSubmission: slug => push(`/dashboard/${slug}/project`)
});

export default connect(mapState, mapDispatch)(ProjectBlock);
