import React, { useState } from 'react';
import styles from './AssignAttendeesPage.module.scss';

import { Button as AntButton, Modal, message } from 'antd';
import { connect } from 'react-redux';

import Divider from 'components/generic/Divider';
import AttendeeTable from 'components/tables/AttendeeTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import RegistrationsService from 'services/registrations';
import BulkEditRegistrationDrawer from 'components/modals/BulkEditRegistrationDrawer';

const SearchAttendeesPage = ({ idToken, event, registrations = [], registrationsLoading, updateRegistrations }) => {
    const { slug } = event;
    const handleSelfAssign = () => {
        Modal.confirm({
            title: 'Please read this first :)',
            content:
                "This means 10 random, un-rated registrations will be assigned to you, and won't be shown to other reviewers. Please make sure you review all of the registrations assigned to you.",
            onOk() {
                const hideMessage = message.loading('Assigning random registrations', 0);
                RegistrationsService.assignRandomRegistrations(idToken, slug)
                    .then(data => {
                        if (data === 0) {
                            message.success('No available registrations to assign!');
                        } else {
                            message.success('Done! Assigned ' + data + ' registrations to you');
                        }
                    })
                    .catch(() => {
                        message.error("Oops, something wen't wrong...");
                    })
                    .finally(() => {
                        updateRegistrations(slug);
                        hideMessage();
                    });
            }
        });
    };

    return (
        <React.Fragment>
            <div className={styles.top}>
                <span className={styles.title}>{registrations.length} registrations</span>
                <div className={styles.topLeft}>
                    <AntButton type="link" onClick={handleSelfAssign} loading={registrationsLoading}>
                        Assign random registrations
                    </AntButton>
                    <Divider size={1} />
                    <BulkEditRegistrationDrawer registrationIds={registrations.map(r => r._id)} />
                </div>
            </div>
            <AttendeeTable attendees={registrations} loading={registrationsLoading} />
            <Divider size={1} />
        </React.Fragment>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrationsAssigned(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state)
});

const mapDispatch = dispatch => ({
    updateRegistrations: slug => dispatch(OrganiserActions.updateRegistrationsForEvent(slug))
});

export default connect(
    mapState,
    mapDispatch
)(SearchAttendeesPage);
