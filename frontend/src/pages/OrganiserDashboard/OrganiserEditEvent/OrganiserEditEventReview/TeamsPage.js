import React, { useEffect, useMemo } from 'react';
import styles from './TeamsPage.module.scss';

import { connect } from 'react-redux';
import { Tag, Table } from 'antd';
import { sumBy } from 'lodash-es';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import Divider from 'components/generic/Divider';
import AttendeeTable from 'components/tables/AttendeeTable';
import BulkEditRegistrationDrawer from 'components/modals/BulkEditRegistrationDrawer';

const TeamsPage = ({ event, teams, registrationsLoading, teamsLoading, registrations, registrationsMap }) => {
    const renderAttendees = team => {
        return (
            <React.Fragment>
                <AttendeeTable
                    attendees={team.members}
                    loading={registrationsLoading}
                    footer={() => {
                        if (!team.members || !team.members.length) return null;
                        return (
                            <div className={styles.attendeeTableFooter}>
                                <BulkEditRegistrationDrawer
                                    registrationIds={team.members.map(r => r._id)}
                                    buttonProps={{ text: 'Edit all team members' }}
                                />
                            </div>
                        );
                    }}
                />
            </React.Fragment>
        );
    };

    const teamsPopulated = useMemo(() => {
        return teams.map(team => {
            const membersMapped = team.members.map(member => {
                return registrationsMap[member];
            });
            const ownerMapped = registrationsMap[team.owner];
            return {
                ...team,
                owner: ownerMapped,
                members: membersMapped.concat(ownerMapped)
            };
        });
    }, [teams, registrationsMap]);

    return (
        <React.Fragment>
            <div className={styles.top}>
                <span className={styles.title}>{teamsPopulated.length} teams</span>
            </div>

            <Table
                rowKey="code"
                dataSource={teamsPopulated}
                loading={teamsLoading || registrationsLoading}
                expandedRowRender={renderAttendees}
            >
                <Table.Column
                    title="Owner"
                    dataIndex="owner"
                    key="owner"
                    render={registration => {
                        if (!registration) return '???';
                        return `${registration.answers.firstName} ${registration.answers.lastName}`;
                    }}
                />
                <Table.Column title="Code" dataIndex="code" key="code" />
                <Table.Column
                    title="Members"
                    dataIndex="members"
                    key="membersCount"
                    render={members => members.length}
                />
                <Table.Column
                    title="Avg. Rating"
                    dataIndex="members"
                    key="avgRating"
                    render={members => {
                        const sum = sumBy(members, m => (m && !isNaN(m.rating) ? m.rating : 0));
                        return (sum / members.length).toFixed(2);
                    }}
                />
                <Table.Column
                    title="% Reviewed"
                    dataIndex="members"
                    key="percentReviewed"
                    render={members => {
                        const reviewedCount = members.filter(member => member && !isNaN(member.rating)).length;
                        const memberCount = members.length;
                        if (reviewedCount === memberCount) {
                            return <Tag color="green">100%</Tag>;
                        } else {
                            return <Tag color="orange">{Math.floor((reviewedCount * 100) / memberCount)}%</Tag>;
                        }
                    }}
                />
                <Table.Column
                    title="Locked?"
                    dataIndex="locked"
                    key="locked"
                    render={locked => (locked ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>)}
                />
            </Table>
        </React.Fragment>
    );
};

const mapState = state => ({
    teams: OrganiserSelectors.teams(state),
    registrations: OrganiserSelectors.registrations(state),
    event: OrganiserSelectors.event(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state),
    registrationsMap: OrganiserSelectors.registrationsMap(state),
    teamsLoading: OrganiserSelectors.teamsLoading(state)
});

export default connect(mapState)(TeamsPage);
