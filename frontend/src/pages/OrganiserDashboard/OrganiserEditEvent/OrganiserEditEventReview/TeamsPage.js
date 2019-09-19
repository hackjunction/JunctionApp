import React, { useEffect, useMemo, useState } from 'react';
import styles from './TeamsPage.module.scss';

import { connect } from 'react-redux';
import { Tag, Table, Switch } from 'antd';
import { sumBy } from 'lodash-es';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import AttendeeTable from 'components/tables/AttendeeTable';
import BulkEditRegistrationDrawer from 'components/modals/BulkEditRegistrationDrawer';

const TeamsPage = ({ event, teams, registrationsLoading, teamsLoading, registrations, registrationsMap }) => {
    const [onlyLocked, setOnlyLocked] = useState(false);
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
            const membersMapped = team.members
                .map(member => {
                    return registrationsMap[member];
                })
                .filter(member => typeof member !== 'undefined');
            const ownerMapped = registrationsMap[team.owner] || {};
            const allMembers = membersMapped.concat(ownerMapped);
            return {
                ...team,
                owner: ownerMapped,
                members: allMembers,
                avgRating: (sumBy(allMembers, m => m.rating || 0) / allMembers.length).toFixed(2)
            };
        });
    }, [teams, registrationsMap]);

    const teamsFiltered = teamsPopulated.filter(team => {
        if (onlyLocked && !team.locked) {
            return false;
        }
        return true;
    });

    return (
        <React.Fragment>
            <div className={styles.filters}>
                <div className={styles.filterItem}>
                    <span className={styles.filterItemLabel}>Only locked teams</span>
                    <Switch value={onlyLocked} onChange={setOnlyLocked}></Switch>
                </div>
            </div>
            <div className={styles.top}>
                <span className={styles.title}>{teamsFiltered.length} teams</span>
            </div>

            <Table
                rowKey="code"
                dataSource={teamsFiltered}
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
                    dataIndex="avgRating"
                    key="avgRating"
                    sorter={(a, b) => a.avgRating > b.avgRating}
                />
                <Table.Column
                    title="% Reviewed"
                    dataIndex="members"
                    key="percentReviewed"
                    render={members => {
                        const reviewedCount = members.filter(member => member && member.rating).length;
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
