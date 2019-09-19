import React from 'react';
import moment from 'moment';
import { Table, Empty, Tag, Divider as AntDivider } from 'antd';
import { connect } from 'react-redux';

import { RegistrationStatuses } from '@hackjunction/shared';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import EditRegistrationDrawer from 'components/modals/EditRegistrationDrawer';

const AttendeeTable = ({ organiserProfilesMap, emptyRenderer, event, loading, attendees = [], footer = null }) => {
    const renderTotal = (total, range) => {
        return `${range[0]}-${range[1]} of ${total}`;
    };

    const renderTable = () => {
        if (!loading) {
            if (!Array.isArray(attendees) || attendees.length === 0) return null;
        }
        return (
            <Table
                pagination={{
                    showSizeChanger: true,
                    showTotal: renderTotal,
                    position: 'bottom',
                    hideOnSinglePage: true
                }}
                footer={footer}
                loading={loading}
                dataSource={attendees}
                rowKey="user"
                scroll={{ x: 600 }}
            >
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
                    title="Status"
                    dataIndex="status"
                    rowKey="status"
                    render={status => {
                        const params = RegistrationStatuses.asObject[status];
                        if (!params) return '-';
                        return <Tag color={params.color}>{params.label}</Tag>;
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
                            return event.tags
                                .filter(tag => {
                                    return tags.indexOf(tag.label) !== -1;
                                })
                                .map(({ color, label }) => (
                                    <Tag key={label} color={color}>
                                        {label}
                                    </Tag>
                                ));
                        }
                    }}
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
                    width={100}
                    title="Actions"
                    dataIndex="user"
                    rowKey="actions"
                    fixed="right"
                    render={(userId, registration) => {
                        return <EditRegistrationDrawer registrationId={registration._id} />;
                    }}
                />
            </Table>
        );
    };

    const renderEmpty = () => {
        if (loading) return null;
        if (!Array.isArray(attendees) || attendees.length !== 0) return null;
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
    event: OrganiserSelectors.event(state)
});

export default connect(mapStateToProps)(AttendeeTable);
