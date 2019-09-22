import React, { useEffect, useMemo, useState } from 'react';
import styles from './TeamsPage.module.scss';

import { connect } from 'react-redux';
import { Tag, Table, Switch, Input } from 'antd';
import { sumBy } from 'lodash-es';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import PageWrapper from 'components/PageWrapper';
import AttendeeTable from 'components/tables/AttendeeTable';
import BulkEditRegistrationDrawer from 'components/modals/BulkEditRegistrationDrawer';

const TeamsPage = ({ event, teams, registrationsLoading, teamsLoading, registrations, registrationsMap }) => {
    const [onlyLocked, setOnlyLocked] = useState(false);
    const [onlyReviewed, setOnlyReviewed] = useState(false);
    const [minRating, setMinRating] = useState(0);
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
            const reviewedCount = allMembers.filter(member => member && member.rating).length;
            const memberCount = allMembers.length;
            return {
                ...team,
                owner: ownerMapped,
                members: allMembers,
                avgRating: (sumBy(allMembers, m => m.rating || 0) / allMembers.length).toFixed(2),
                reviewedPercent: Math.floor((reviewedCount * 100) / memberCount)
            };
        });
    }, [teams, registrationsMap]);

    const teamsFiltered = teamsPopulated.filter(team => {
        if (onlyLocked && !team.locked) {
            return false;
        }
        if (onlyReviewed && team.reviewedPercent < 100) {
            return false;
        }
        if (minRating && team.avgRating < minRating) {
            return false;
        }
        return true;
    });

    return (
        <PageWrapper loading={registrationsLoading || teamsLoading}>
            <div className={styles.filters}>
                <div className={styles.filterItem}>
                    <span className={styles.filterItemLabel}>Only locked teams</span>
                    <Switch value={onlyLocked} onChange={setOnlyLocked}></Switch>
                </div>
                <div className={styles.filterItem}>
                    <span className={styles.filterItemLabel}>Only fully reviewed teams</span>
                    <Switch value={onlyReviewed} onChange={setOnlyReviewed}></Switch>
                </div>
                <div className={styles.filterItem}>
                    <span className={styles.filterItemLabel}>Min. team rating</span>
                    <Input
                        type="number"
                        placeholder="0-5"
                        value={minRating}
                        onChange={e => setMinRating(e.target.value)}
                    />
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
                    dataIndex="reviewedPercent"
                    key="percentReviewed"
                    render={percent => {
                        if (percent === 100) {
                            return <Tag color="green">100%</Tag>;
                        } else {
                            return <Tag color="orange">{percent}%</Tag>;
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
        </PageWrapper>
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
