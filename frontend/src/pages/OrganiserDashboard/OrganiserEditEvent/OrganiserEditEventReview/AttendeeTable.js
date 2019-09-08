import React, { useState, useCallback, useEffect } from 'react';
import styles from './AttendeeTable.module.scss';
import moment from 'moment';
import { Table, notification, Button as AntButton, Empty } from 'antd';
import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import Divider from 'components/generic/Divider';

import RegistrationsService from 'services/registrations';

import AttendeeModal from './AttendeeModal';
import AssignModal from './AssignModal';

const AttendeeTable = ({ filters, filtersUpdated, slug, idToken, organiserProfilesMap, emptyRenderer }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();
    const [activeRegistration, setActiveRegistration] = useState();
    const [activeAssigning, setActiveAssigning] = useState();

    const handleSearch = useCallback(
        filters => {
            setLoading(true);
            RegistrationsService.searchRegistrationsForEvent(idToken, slug, filters)
                .then(data => {
                    setResult(data);
                })
                .catch(err => {
                    notification.error({
                        message: 'Something went wrong'
                    });
                    setResult([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [idToken, slug]
    );

    const handleModalClose = useCallback(() => {
        setActiveRegistration(undefined);
        handleSearch(filters);
    }, [filters, handleSearch]);

    const handleAssignClose = useCallback(() => {
        setActiveAssigning(undefined);
        handleSearch(filters);
    }, [filters, handleSearch]);

    useEffect(() => {
        if (filters) {
            handleSearch(filters);
        }
    }, [filters, filtersUpdated, handleSearch]);

    const renderTable = () => {
        if (!Array.isArray(result) || result.length === 0) return null;
        return (
            <React.Fragment>
                <h3>{`${result.length} results`}</h3>
                <Table loading={loading} dataSource={result} rowKey="userId" scroll={{ x: 600 }}>
                    <Table.Column
                        title="Name"
                        dataIndex="answers"
                        key="name"
                        render={answers => {
                            return `${answers.firstName} ${answers.lastName}`;
                        }}
                    />
                    <Table.Column title="Email" dataIndex="answers.email" rowKey="email" />
                    <Table.Column
                        title="Rating"
                        dataIndex="rating"
                        rowKey="rating"
                        render={rating => rating || 'Pending'}
                    />
                    <Table.Column
                        title="Submitted"
                        dataIndex="createdAt"
                        rowKey="createdAt"
                        render={date => moment(date).fromNow()}
                    />
                    <Table.Column
                        title="Assigned to"
                        dataIndex="assignedTo"
                        rowKey="assignedTo"
                        render={userId => {
                            if (!userId) return 'No one';
                            if (organiserProfilesMap.hasOwnProperty(userId)) {
                                const user = organiserProfilesMap[userId];
                                return `${user.firstName} ${user.lastName}`;
                            }
                            return userId;
                        }}
                    />
                    <Table.Column
                        width={100}
                        title="Actions"
                        dataIndex="user"
                        rowKey="actions"
                        fixed="right"
                        render={(userId, registration) => {
                            return (
                                <div className={styles.actions}>
                                    <AntButton
                                        type="link"
                                        onClick={() => setActiveRegistration(registration._id.toString())}
                                    >
                                        Open
                                    </AntButton>
                                    <Divider size={1} />
                                    <AntButton type="link" onClick={() => setActiveAssigning(registration)}>
                                        Assign to
                                    </AntButton>
                                </div>
                            );
                        }}
                    />
                </Table>
            </React.Fragment>
        );
    };

    const renderEmpty = () => {
        if (!Array.isArray(result) || result.length !== 0) return null;
        if (typeof emptyRenderer === 'function') return emptyRenderer();
        return <Empty />;
    };

    return (
        <React.Fragment>
            <AttendeeModal
                idToken={idToken}
                slug={slug}
                registrationId={activeRegistration}
                onExit={handleModalClose}
            />
            <AssignModal idToken={idToken} slug={slug} registration={activeAssigning} onExit={handleAssignClose} />
            {renderTable()}
            {renderEmpty()}
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    organiserProfilesMap: OrganiserSelectors.organisersMap(state)
});

export default connect(mapStateToProps)(AttendeeTable);
