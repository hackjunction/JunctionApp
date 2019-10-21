import React, { Suspense } from 'react';

import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { RegistrationStatuses } from '@hackjunction/shared';
import NotificationBlock from 'components/generic/NotificationBlock';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const VisaInvitationDrawer = React.lazy(() => import('components/modals/VisaInvitationDrawer'));

const STATUSES = RegistrationStatuses.asObject;

const VisaInvitationBlock = ({ event, registration }) => {
    if (!registration || !event) return null;
    // if (registration.answers && !registration.answers.needsTravelGrant) return null;

    const statuses = [STATUSES.accepted.id, STATUSES.confirmed.id];

    if (statuses.indexOf(registration.status) !== -1) {
        return (
            <NotificationBlock
                type="info"
                title="Visa Invitation"
                body={`If you need a visa to travel to the event, you're in luck! Click the button below to download a visa invitation letter.`}
                bottom={
                    <Suspense fallback={<CircularProgress />}>
                        <VisaInvitationDrawer />
                    </Suspense>
                }
            />
        );
    }

    return null;
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapState)(VisaInvitationBlock);
