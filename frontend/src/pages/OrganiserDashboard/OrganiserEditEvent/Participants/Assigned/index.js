import React, { useState, useMemo } from 'react';
import styles from './AssignAttendeesPage.module.scss';

import { Button as AntButton, Modal, message, Switch } from 'antd';
import { connect } from 'react-redux';

import Divider from 'components/generic/Divider';
import AttendeeTable from 'components/tables/AttendeeTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import RegistrationsService from 'services/registrations';
import BulkEditRegistrationDrawer from 'components/modals/BulkEditRegistrationDrawer';

const SearchAttendeesPage = ({ idToken, event, registrations = [], registrationsLoading, updateRegistrations }) => {
    const [hideRated, setHideRated] = useState(false);
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

    const filtered = useMemo(() => {
        return registrations.filter(registration => {
            if (hideRated) {
                if (registration.rating) return false;
            }
            return true;
        });
    }, [registrations, hideRated]);

    return (
        <React.Fragment>
            <div className={styles.top}>
                <span className={styles.title}>{filtered.length} registrations</span>
                <div className={styles.topLeft}>
                    <div className={styles.toggle}>
                        <span className={styles.toggleText}>Hide rated registrations</span>
                        <Switch value={hideRated} onChange={setHideRated} />
                    </div>
                    <AntButton type="link" onClick={handleSelfAssign} loading={registrationsLoading}>
                        Assign random registrations
                    </AntButton>
                    <Divider size={1} />
                    {/* <BulkEditRegistrationDrawer registrationIds={registrations.map(r => r._id)} /> */}
                </div>
            </div>
            <AttendeeTable attendees={filtered} loading={registrationsLoading} />
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
