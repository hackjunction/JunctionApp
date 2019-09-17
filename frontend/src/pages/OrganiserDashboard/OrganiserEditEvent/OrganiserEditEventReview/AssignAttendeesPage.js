import React, { useState } from 'react';
import styles from './AssignAttendeesPage.module.scss';

import { Empty, Modal, message } from 'antd';

import Divider from 'components/generic/Divider';
import Button from 'components/generic/Button';
// import AttendeeTable from './AttendeeTable';

import RegistrationsService from 'services/registrations';

const AttendeeTable = () => {};
const SearchAttendeesPage = ({ idToken, slug }) => {
    const [filtersUpdated, setFiltersUpdated] = useState();
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
                        hideMessage();
                        setFiltersUpdated(Date.now());
                    });
            }
        });
    };

    return (
        <React.Fragment>
            <Divider size={1} />
            <AttendeeTable
                filters={{ selfAssignedOnly: true }}
                idToken={idToken}
                slug={slug}
                emptyRenderer={() => {
                    return (
                        <Empty
                            description={
                                <div className={styles.empty}>
                                    <strong>No attendees assigned to you</strong>
                                    <Divider size={1} />
                                    <p>
                                        Applications assigned to you will be "reserved" for you to review. This way,
                                        your team can avoid two people accidentally reviewing the same applications at
                                        the same time. Using the button below, you can randomly assign 10 applications
                                        to yourself and start reviewing!
                                    </p>
                                    <Button
                                        text="Assign applications"
                                        theme="accent"
                                        button={{
                                            onClick: handleSelfAssign
                                        }}
                                    />
                                </div>
                            }
                        />
                    );
                }}
            />
        </React.Fragment>
    );
};

export default SearchAttendeesPage;
