import React, { useState, useCallback, useEffect } from 'react';
import styles from './AttendeeTable.module.scss';
import moment from 'moment';
import { Table, notification, Button as AntButton, Empty, Icon } from 'antd';
import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import RegistrationsService from 'services/registrations';
import EditRegistrationDrawer from 'components/modals/EditRegistrationDrawer';

const AttendeeTable = ({ filters, filtersUpdated, slug, idToken, organiserProfilesMap, organisers, emptyRenderer }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();

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

    const handleEdited = useCallback(
        registration => {
            const newData = result.map(reg => {
                if (reg.user === registration.user) {
                    return registration;
                }
                return reg;
            });
            setResult(newData);
        },
        [result]
    );

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
                        render={(userId, record) => {
                            let text;
                            if (!userId) {
                                text = 'No one';
                            } else if (organiserProfilesMap.hasOwnProperty(userId)) {
                                const user = organiserProfilesMap[userId];
                                text = `${user.firstName} ${user.lastName}`;
                            } else {
                                text = 'Unknown user';
                            }
                            return text;
                        }}
                    />
                    <Table.Column
                        title="Tags"
                        dataIndex="tags"
                        rowKey="tags"
                        render={tags => {
                            if (!tags || !tags.length) {
                                return '-';
                            } else {
                                return tags.join(', ');
                            }
                        }}
                    />
                    <Table.Column
                        width={100}
                        title="Actions"
                        dataIndex="user"
                        rowKey="actions"
                        fixed="right"
                        render={(userId, registration) => {
                            return <EditRegistrationDrawer registrationId={registration._id} onEdited={handleEdited} />;
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
            {renderTable()}
            {renderEmpty()}
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    organiserProfilesMap: OrganiserSelectors.organisersMap(state),
    organisers: OrganiserSelectors.organisers(state)
});

export default connect(mapStateToProps)(AttendeeTable);
