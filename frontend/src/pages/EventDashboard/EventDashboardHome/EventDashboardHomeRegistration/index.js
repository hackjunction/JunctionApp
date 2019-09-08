import React from 'react';
import styles from './EventDashboardHomeRegistration.module.scss';

import { connect } from 'react-redux';

import * as DashboardSelectors from 'redux/dashboard/selectors';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
import NotificationBlock from 'components/generic/NotificationBlock';

const EventDashboardHomeRegistration = ({ event, registration, appliedAsTeam, hasTeam, isTeamLocked }) => {
    if (!registration || !event) return null;

    function renderRegistrationStatus() {
        switch (registration.status) {
            case 'rejected': {
                return (
                    <NotificationBlock
                        type="error"
                        title={'Registration Status:'}
                        titleExtra={'Rejected'}
                        body={'Unfortunately your application was rejected'}
                    />
                );
            }
            case 'accepted': {
                return (
                    <NotificationBlock
                        type="success"
                        title="Registration status:"
                        titleExtra="Accepted"
                        body={`Your application has been accepted! Welcome to ${event.name}!`}
                    />
                );
            }
            default: {
                return (
                    <NotificationBlock
                        type="info"
                        title="Registration status:"
                        titleExtra="Pending"
                        body="Your registration is being processed! You'll receive an email notification when we've made the decision, so stay tuned! If you wish, you can still tweak your registration to maximise your chances of being accepted."
                        bottom={
                            <Button
                                size="large"
                                theme="accent"
                                link={{
                                    internal: `/events/${event.slug}/register`
                                }}
                                text="Edit your registration"
                            />
                        }
                    />
                );
            }
        }
    }

    function renderTeamStatus() {
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
        return null;
    }

    return (
        <div className={styles.wrapper}>
            {renderTeamStatus()}
            <Divider size={1} />
            {renderRegistrationStatus()}
        </div>
    );
};

const mapStateToProps = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state),
    appliedAsTeam: DashboardSelectors.appliedAsTeam(state),
    hasTeam: DashboardSelectors.hasTeam(state),
    isTeamLocked: DashboardSelectors.isTeamLocked(state),
    team: DashboardSelectors.team(state)
});

export default connect(mapStateToProps)(EventDashboardHomeRegistration);
