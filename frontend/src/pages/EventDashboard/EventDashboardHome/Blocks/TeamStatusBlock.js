import React from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Typography } from '@material-ui/core';
import NotificationBlock from 'components/generic/NotificationBlock';
import GradientBox from 'components/generic/GradientBox';
import Button from 'components/generic/Button';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const TeamStatusBlock = ({ event, registration, hasTeam, appliedAsTeam, isTeamLocked, editTeam }) => {
    if (!registration || !event) return <NotificationBlock loading />;

    if (appliedAsTeam) {
        if (!hasTeam) {
            return (
                <GradientBox p={3} color="theme_white">
                    <Typography key="overline" variant="button" color="inherit">
                        Team status
                    </Typography>
                    <Typography key="title" variant="h4" color="secondary" paragraph>
                        No team
                    </Typography>
                    <Typography key="body" variant="body1" paragraph>
                        You've chosen to apply as a team but haven't joined a team yet. We will not begin processing
                        your application before you've joined a team!
                    </Typography>
                    <Button color="theme_lightgray" variant="contained" onClick={() => editTeam(event.slug)}>
                        Create/join a team
                    </Button>
                </GradientBox>
            );
        } else if (!isTeamLocked) {
            return (
                <GradientBox p={3} color="theme_white">
                    <Typography key="overline" variant="button" color="inherit">
                        Team status
                    </Typography>
                    <Typography key="title" variant="h4" color="secondary" paragraph>
                        Not locked
                    </Typography>
                    <Typography key="body" variant="body1" paragraph>
                        You haven't locked down your team! We will not begin processing your team's application before
                        you've locked down your team!
                    </Typography>
                    <Button color="theme_lightgray" variant="contained" onClick={() => editTeam(event.slug)}>
                        Finalize your team
                    </Button>
                </GradientBox>
            );
        } else {
            return (
                <GradientBox p={3} color="theme_white">
                    <Typography key="overline" variant="button" color="inherit">
                        Team status
                    </Typography>
                    <Typography key="title" variant="h4" color="primary" paragraph>
                        Complete
                    </Typography>
                    <Typography key="body" variant="body1" paragraph>
                        You've locked in your team and we can now process your team members' applications - just sit
                        back and relax. You'll also be able to edit your team again closer to the event, if you want to
                        add or remove members.
                    </Typography>
                </GradientBox>
            );
        }
    }

    return null;
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state),
    appliedAsTeam: DashboardSelectors.appliedAsTeam(state),
    hasTeam: DashboardSelectors.hasTeam(state),
    isTeamLocked: DashboardSelectors.isTeamLocked(state)
});

const mapDispatch = dispatch => ({
    editTeam: slug => dispatch(push(`/dashboard/${slug}/team`))
});

export default connect(
    mapState,
    mapDispatch
)(TeamStatusBlock);
