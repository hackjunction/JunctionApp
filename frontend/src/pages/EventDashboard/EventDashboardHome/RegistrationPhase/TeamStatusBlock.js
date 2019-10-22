import React from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '@material-ui/core';
import NotificationBlock from 'components/generic/NotificationBlock';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const TeamStatusBlock = ({ event, registration, hasTeam, appliedAsTeam, isTeamLocked, editTeam }) => {
    if (!registration || !event) return <NotificationBlock loading />;

    if (appliedAsTeam) {
        if (!hasTeam) {
            return (
                <NotificationBlock
                    type="warning"
                    title={'Team status:'}
                    titleExtra={'No team'}
                    body={
                        "You've chosen to apply as a team but haven't joined a team yet. We will not begin processing your application before you've joined a team!"
                    }
                    bottom={
                        <Button color="primary" onClick={() => editTeam(event.slug)}>
                            Join a team
                        </Button>
                    }
                />
            );
        } else {
            if (!isTeamLocked) {
                return (
                    <NotificationBlock
                        type="warning"
                        title={'Team status:'}
                        titleExtra={'Not locked'}
                        body={
                            "You haven't locked down your team! We will not begin processing your team's application before you've locked down your team!"
                        }
                        bottom={
                            <Button color="primary" onClick={() => editTeam(event.slug)}>
                                Finalize your team
                            </Button>
                        }
                    />
                );
            } else {
                return (
                    <NotificationBlock
                        type="success"
                        title="Team status:"
                        titleExtra="Complete"
                        body="You've locked in your team and we can now process your team members' applications - just sit back and relax. You'll also be able to edit your team again closer to the event, if you want to add or remove members."
                    />
                );
            }
        }
    }
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
