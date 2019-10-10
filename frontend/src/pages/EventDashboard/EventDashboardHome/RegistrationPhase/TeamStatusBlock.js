import React from 'react';

import { connect } from 'react-redux';

import { RegistrationStatuses } from '@hackjunction/shared';
import NotificationBlock from 'components/generic/NotificationBlock';
import Button from 'components/generic/Button';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const STATUSES = RegistrationStatuses.asObject;

const TeamStatusBlock = ({ event, registration, hasTeam, appliedAsTeam, isTeamLocked }) => {
    if (!registration || !event) return null;

    const PENDING_STATUSES = [STATUSES.pending.id, STATUSES.softAccepted.id, STATUSES.softRejected.id];

    if (PENDING_STATUSES.indexOf(registration.status) !== -1) {
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
                            <Button
                                size="large"
                                theme="accent"
                                link={{
                                    internal: `/dashboard/${event.slug}/team`
                                }}
                                text="Join a team"
                            />
                        }
                    />
                );
            }

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
                            <Button
                                size="large"
                                theme="accent"
                                link={{
                                    internal: `/dashboard/${event.slug}/team`
                                }}
                                text="Finalize your team"
                            />
                        }
                    />
                );
            }

            return (
                <NotificationBlock
                    type="success"
                    title={'Team status:'}
                    titleExtra={'Locked'}
                    body={
                        "You've locked in your team and we will begin processing your team members' applications! Just sit back and relax."
                    }
                />
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

export default connect(mapState)(TeamStatusBlock);
