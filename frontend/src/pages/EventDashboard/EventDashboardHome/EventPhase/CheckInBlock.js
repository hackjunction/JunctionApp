import React, { useState } from 'react';

import { connect } from 'react-redux';
import { RegistrationStatuses } from '@hackjunction/shared';
import { Button } from '@material-ui/core';
import NotificationBlock from 'components/generic/NotificationBlock';
import QRCodeModal from 'components/modals/QRCodeModal';

import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const STATUSES = RegistrationStatuses.asObject;

const RegistrationStatusBlock = ({
    event,
    registration,
    confirmRegistration,
    cancelRegistration,
    isRegistrationOpen
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    if (!registration || !event || !registration.user) return null;

    if (registration.status === STATUSES.checkedIn.id) {
        return (
            <NotificationBlock
                type="success"
                title="Check-in status:"
                titleExtra="complete"
                body="You've checked in to the event, awesome!"
            />
        );
    } else {
        return (
            <NotificationBlock
                type="info"
                title="Check-in status:"
                titleExtra="Incomplete"
                body="Head to the venue, and check-in with this QR Code!"
                bottom={
                    <React.Fragment>
                        <QRCodeModal
                            open={modalOpen}
                            onClose={() => setModalOpen(false)}
                            value={registration.user}
                            title="Check-In"
                            message="Show this QR code at the reception when arriving to the venue"
                        />
                        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                            Show QR Code
                        </Button>
                    </React.Fragment>
                }
            />
        );
    }
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state),
    isRegistrationOpen: DashboardSelectors.isRegistrationOpen(state)
});

const mapDispatch = dispatch => ({
    confirmRegistration: slug => dispatch(DashboardActions.confirmRegistration(slug)),
    cancelRegistration: slug => dispatch(DashboardActions.cancelRegistration(slug))
});

export default connect(
    mapState,
    mapDispatch
)(RegistrationStatusBlock);
