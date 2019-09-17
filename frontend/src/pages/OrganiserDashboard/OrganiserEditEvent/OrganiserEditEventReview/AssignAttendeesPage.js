import React, { useState } from 'react';
import styles from './AssignAttendeesPage.module.scss';

import { Empty, Modal, message } from 'antd';
import { connect } from 'react-redux';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
import AttendeeTable from 'components/tables/AttendeeTable';
// import AttendeeTable from './AttendeeTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import RegistrationsService from 'services/registrations';

const SearchAttendeesPage = ({ idToken, event, registrations, registrationsLoading, updateRegistrations }) => {
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
            <Divider size={1} />
            <AttendeeTable attendees={registrations} loading={registrationsLoading} />
            {!registrationsLoading && !registrations.length && (
                <div className={styles.empty}>
                    <strong>No attendees assigned to you</strong>
                    <Divider size={1} />
                    <p>
                        Applications assigned to you will be "reserved" for you to review. This way, your team can avoid
                        two people accidentally reviewing the same applications at the same time. Using the button
                        below, you can randomly assign 10 applications to yourself and start reviewing!
                    </p>
                    <Button
                        text="Assign applications"
                        theme="accent"
                        button={{
                            onClick: handleSelfAssign
                        }}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrationsAssigned(state),
    regsitrationsLoading: OrganiserSelectors.registrationsLoading(state)
});

const mapDispatch = dispatch => ({
    updateRegistrations: slug => dispatch(OrganiserActions.updateRegistrationsForEvent(slug))
});

export default connect(
    mapState,
    mapDispatch
)(SearchAttendeesPage);
