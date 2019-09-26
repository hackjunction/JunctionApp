import React from 'react';
import moment from 'moment';
import { Empty, Tag, Divider as AntDivider } from 'antd';
import { connect } from 'react-redux';

import { RegistrationStatuses } from '@hackjunction/shared';

import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import Table from 'components/generic/Table';

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
            // <Table.Column
            //     width={100}
            //     title="Actions"
            //     dataIndex="user"
            //     rowKey="actions"
            //     fixed="right"
            //     render={(userId, registration) => {
            //         return <EditRegistrationDrawer registrationId={registration._id} />;
            //     }}
            // />
            <Table
                dataSource={attendees}
                rowKey="user"
                loading={loading}
                title="Travel Grants"
                footer={footer}
                selectedActions={[
                    {
                        key: 'edit',
                        label: 'Edit all',
                        icon: <EditIcon />,
                        action: items => window.alert(items.length)
                    },
                    {
                        key: 'email',
                        label: 'Email all',
                        icon: <EmailIcon />,
                        action: items => window.alert(items.length)
                    }
                ]}
                rowActions={[
                    {
                        key: 'edit',
                        label: 'Edit',
                        action: item => window.alert('Edit ' + item.answers.email)
                    }
                ]}
                columns={[
                    {
                        key: 'name',
                        path: 'answers',
                        label: 'Name',
                        render: answers => `${answers.firstName} ${answers.lastName}`
                    },
                    {
                        key: 'email',
                        path: 'answers.email',
                        label: 'Email'
                    },
                    {
                        key: 'rating',
                        path: 'rating',
                        label: 'Rating',
                        render: rating => rating || 'Pending'
                    },
                    {
                        key: 'status',
                        path: 'status',
                        label: 'Status',
                        render: status => {
                            const params = RegistrationStatuses.asObject[status];
                            if (!params) return '-';
                            return <Tag color={params.color}>{params.label}</Tag>;
                        }
                    },
                    {
                        key: 'tags',
                        path: 'tags',
                        label: 'Tags',
                        render: tags => {
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
                        }
                    },
                    {
                        key: 'createdAt',
                        path: 'createdAt',
                        label: 'Submitted',
                        render: date => moment(date).fromNow()
                    },
                    {
                        key: 'assignedTo',
                        path: 'assignedTo',
                        label: 'Assigned to',
                        render: (userId, record) => {
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
                        }
                    }
                ]}
            />
        );
        // return (
        //     <Table
        //         pagination={{
        //             showSizeChanger: true,
        //             showTotal: renderTotal,
        //             position: 'bottom',
        //             hideOnSinglePage: true
        //         }}
        //         footer={footer}
        //         loading={loading}
        //         dataSource={attendees}
        //         rowKey="user"
        //         scroll={{ x: 600 }}
        //     >
        //     </Table>
        // );
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
