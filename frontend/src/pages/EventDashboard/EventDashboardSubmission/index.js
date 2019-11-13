import React from 'react';

import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { Grid, Box } from '@material-ui/core';

import PageHeader from 'components/generic/PageHeader';
import SubmissionForm from './SubmissionForm';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const EventDashboardSubmission = ({ event, team }) => {
    console.log(team);

    return (
        <Box>
            <PageHeader
                heading="Project submission"
                subheading={`Here's where you submit your project for ${
                    event.name
                }. As soon as you have a general idea of what you're building, please make a draft submission here - you'll be able to make edits to it until the final submission deadline on ${moment(
                    event.submissionsEndTime
                ).format('LLLL')}. All of the members in your team can edit your team's project submission.`}
            />
            <SubmissionForm />
        </Box>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    team: DashboardSelectors.team(state)
});

export default connect(mapState)(EventDashboardSubmission);
