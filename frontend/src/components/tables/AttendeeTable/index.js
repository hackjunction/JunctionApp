import React, { useState } from 'react';
import moment from 'moment';
import { Empty, Tag } from 'antd';
import { connect } from 'react-redux';

import { RegistrationStatuses } from '@hackjunction/shared';

import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import Table from 'components/generic/Table';
import MaterialTable from 'components/generic/MaterialTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import EditRegistrationModal from 'components/modals/EditRegistrationModal';

const AttendeeTable = ({ organiserProfilesMap, emptyRenderer, event, loading, attendees = [], footer = null }) => {
    const [editing, setEditing] = useState();

    const renderTable = () => {
        if (!loading) {
            if (!Array.isArray(attendees) || attendees.length === 0) return null;
        }

        return (
            <MaterialTable
                isLoading={loading}
                data={attendees}
                onRowClick={(e, row) => setEditing(row._id)}
                options={{
                    exportButton: true
                }}
                columns={[
                    {
                        title: 'First name',
                        field: 'answers.firstName',
                        searchable: true
                    },
                    {
                        title: 'Last name',
                        field: 'answers.lastName',
                        searchable: true
                    },
                    {
                        title: 'Email',
                        field: 'answers.email',
                        searchable: true
                    },
                    {
                        title: 'Rating',
                        field: 'rating'
                    },
                    {
                        title: 'Status',
                        field: 'status',
                        render: row => {
                            const params = RegistrationStatuses.asObject[row.status];
                            if (!params) return '-';
                            return <Tag color={params.color}>{params.label}</Tag>;
                        }
                    },
                    {
                        title: 'Tags',
                        field: 'tags',
                        render: row => {
                            const { tags } = row;
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
                        title: 'Submitted',
                        field: 'createdAt',
                        render: row => moment(row.createdAt).format('MMM Do YYYY HH:mm:ss'),
                        sorting: true,
                        type: 'datetime'
                    },
                    {
                        title: 'Assigned to',
                        field: 'assignedTo',
                        render: row => {
                            const userId = row.assignedTo;
                            let text;
                            if (!userId) {
                                text = '-';
                            } else if (organiserProfilesMap.hasOwnProperty(userId)) {
                                const user = organiserProfilesMap[userId];
                                text = `${user.firstName} ${user.lastName}`;
                            } else {
                                text = '???';
                            }
                            return text;
                        }
                    }
                ]}
            />
        );

        // return (
        //     <Table
        //         dataSource={attendees}
        //         rowKey="user"
        //         loading={loading}
        //         title={`${attendees.length} results`}
        //         footer={footer}
        //         selectedActions={[
        //             {
        //                 key: 'edit',
        //                 label: 'Edit all',
        //                 icon: <EditIcon />,
        //                 action: items => window.alert('Bulk edit temporarily unavailable')
        //             },
        //             {
        //                 key: 'email',
        //                 label: 'Email all',
        //                 icon: <EmailIcon />,
        //                 action: items => window.alert('Bulk email temporarily unavailable')
        //             }
        //         ]}
        //         rowActions={[
        //             {
        //                 key: 'edit',
        //                 label: 'Edit',
        //                 action: item => setEditing(item._id)
        //             }
        //         ]}
        //         columns={[
        //             {
        //                 key: 'name',
        //                 path: 'answers',
        //                 label: 'Name',
        //                 render: answers => `${answers.firstName} ${answers.lastName}`
        //             },
        //             {
        //                 key: 'email',
        //                 path: 'answers.email',
        //                 label: 'Email'
        //             },
        //             {
        //                 key: 'rating',
        //                 path: 'rating',
        //                 label: 'Rating',
        //                 render: rating => rating || 'Pending'
        //             },
        //             {
        //                 key: 'status',
        //                 path: 'status',
        //                 label: 'Status',
        //                 render: status => {
        //                     const params = RegistrationStatuses.asObject[status];
        //                     if (!params) return '-';
        //                     return <Tag color={params.color}>{params.label}</Tag>;
        //                 }
        //             },
        //             {
        //                 key: 'tags',
        //                 path: 'tags',
        //                 label: 'Tags',
        //                 render: tags => {
        //                     if (!tags || !tags.length) {
        //                         return '-';
        //                     } else {
        //                         return event.tags
        //                             .filter(tag => {
        //                                 return tags.indexOf(tag.label) !== -1;
        //                             })
        //                             .map(({ color, label }) => (
        //                                 <Tag key={label} color={color}>
        //                                     {label}
        //                                 </Tag>
        //                             ));
        //                     }
        //                 }
        //             },
        //             {
        //                 key: 'createdAt',
        //                 path: 'createdAt',
        //                 label: 'Submitted',
        //                 render: date => moment(date).fromNow()
        //             },
        //             {
        //                 key: 'assignedTo',
        //                 path: 'assignedTo',
        //                 label: 'Assigned to',
        //                 render: (userId, record) => {
        //                     let text;
        //                     if (!userId) {
        //                         text = 'No one';
        //                     } else if (organiserProfilesMap.hasOwnProperty(userId)) {
        //                         const user = organiserProfilesMap[userId];
        //                         text = `${user.firstName} ${user.lastName}`;
        //                     } else {
        //                         text = 'Unknown user';
        //                     }
        //                     return text;
        //                 }
        //             }
        //         ]}
        //     />
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
            <EditRegistrationModal registrationId={editing} onClose={setEditing} />
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
