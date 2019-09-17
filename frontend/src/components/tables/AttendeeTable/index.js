import React from 'react';
import moment from 'moment';
import { Table, Empty, Tag, Divider as AntDivider } from 'antd';
import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import EditRegistrationDrawer from 'components/modals/EditRegistrationDrawer';

const AttendeeTable = ({ organiserProfilesMap, emptyRenderer, event, loading, attendees = [] }) => {
    const renderTable = () => {
        if (!Array.isArray(attendees) || attendees.length === 0) return null;
        return (
            <Table loading={loading} dataSource={attendees} rowKey="user" scroll={{ x: 600 }}>
                <Table.Column
                    title="Name"
                    dataIndex="answers"
                    key="name"
                    sorter={(a, b) =>
                        `${a.answers.firstName}${a.answers.lastName}`.localeCompare(
                            `${b.answers.firstName}${b.answers.lastName}`
                        )
                    }
                    render={answers => {
                        return `${answers.firstName} ${answers.lastName}`;
                    }}
                />
                <Table.Column title="Email" dataIndex="answers.email" rowKey="email" />
                <Table.Column
                    title="Rating"
                    dataIndex="rating"
                    rowKey="rating"
                    sorter={(a, b) => a.rating > b.rating}
                    render={rating => rating || 'Pending'}
                />
                <Table.Column
                    title="Submitted"
                    dataIndex="createdAt"
                    rowKey="createdAt"
                    sorter={(a, b) => a.createdAt > b.createdAt}
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
                            return event.tags
                                .filter(tag => {
                                    return tags.indexOf(tag.label) !== -1;
                                })
                                .map(({ color, label }) => <Tag color={color}>{label}</Tag>);
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
                        return <EditRegistrationDrawer registrationId={registration._id} />;
                    }}
                />
            </Table>
        );
    };

    const renderEmpty = () => {
        if (!Array.isArray(attendees) || attendees.length !== 0) return null;
        if (typeof emptyRenderer === 'function') return emptyRenderer();
        return <Empty />;
    };

    return (
        <React.Fragment>
            {attendees.length > 0 && <AntDivider>{attendees.length} results</AntDivider>}
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
