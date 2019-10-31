import React, { Suspense } from 'react';

import { connect } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';

import { RegistrationStatuses } from '@hackjunction/shared';
import GradientBox from 'components/generic/GradientBox';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const STATUSES = RegistrationStatuses.asObject;
const VisaInvitationDrawer = React.lazy(() => import('components/modals/VisaInvitationDrawer'));

const VisaInvitationBlock = ({ event, registration }) => {
    if (!registration || !event) return null;
    if (registration.answers && !registration.answers.needsTravelGrant) return null;

    const statuses = [STATUSES.accepted.id, STATUSES.confirmed.id];

    if (statuses.indexOf(registration.status) === -1) {
        return null;
    }

    return (
        <GradientBox p={3} color="theme_purple">
            <Typography variant="h4" paragraph>
                Visa invitation letter
            </Typography>
            <Typography variant="body1" paragraph>
                If you need a visa to travel to the event, you're in luck! Click the button below to download a visa
                invitation letter.
            </Typography>
            <Suspense fallback={<CircularProgress style={{ color: 'white' }} />}>
                <VisaInvitationDrawer />
            </Suspense>
        </GradientBox>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapState)(VisaInvitationBlock);
