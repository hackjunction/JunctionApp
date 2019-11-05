import React, { useState, useCallback } from 'react';
import styles from './EventDashboardTeam.module.scss';

import { connect } from 'react-redux';

import * as DashboardActions from 'redux/dashboard/actions';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import { Row, Col, Input, Table, Icon, Button as AntButton, notification, Modal } from 'antd';

const EventDashboardTeam = ({
    createTeam,
    deleteTeam,
    lockTeam,
    joinTeam,
    leaveTeam,
    removeMemberFromTeam,
    event,
    team = {},
    teamLoading,
    hasTeam,
    isTeamLocked,
    userProfile,
    userProfiles,
    userProfilesLoading
}) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const isOwner = userProfile.sub === team.owner;

    const handleCreate = useCallback(() => {
        createTeam(event.slug);
    }, [createTeam, event.slug]);

    const handleJoin = useCallback(() => {
        setLoading(true);
        joinTeam(event.slug, code)
            .then(() => {
                notification.success({
                    message: 'Joined team ' + code
                });
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    notification.error({
                        message: 'Unable to find team with code ' + code,
                        description: 'Are you sure you typed it correctly?'
                    });
                } else if (err.response && err.response.status === 403) {
                    notification.error({
                        message: 'Unable to join team',
                        description: err.response.data ? err.response.data.message : ''
                    });
                } else {
                    notification.error({
                        message: 'Something went wrong',
                        description: "Are you sure you're connected to the internet?"
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [code, event.slug, joinTeam]);

    const handleLeave = useCallback(() => {
        setLoading(true);
        leaveTeam(event.slug, team.code)
            .then(() => {
                notification.success({
                    message: 'Left team ' + team.code
                });
            })
            .catch(() => {
                notification.error({
                    message: 'Unable to leave team',
                    description: "Are you sure you're connected to the internet?"
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [event.slug, leaveTeam, team.code]);

    const handleDelete = useCallback(() => {
        Modal.confirm({
            title: 'Are you sure you want to delete this team?',
            content: 'You will not be able to recover this team if you delete it.',
            okType: 'danger',
            onOk: () => {
                setLoading(true);
                deleteTeam(event.slug)
                    .then(() => {
                        notification.success({
                            message: 'Deleted team ' + team.code
                        });
                    })
                    .catch(() => {
                        notification.error({
                            message: 'Unable to delete team',
                            description: "Are you sure you're connected to the internet?"
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    }, [deleteTeam, event.slug, team.code]);

    const handleLock = useCallback(() => {
        Modal.confirm({
            title: 'Are you sure you want to lock this team?',
            content: 'You will not be able to make any more changes to it while the registration period is open.',
            okType: 'danger',
            onOk: () => {
                setLoading(true);
                lockTeam(event.slug, team.code)
                    .then(() => {
                        notification.success({
                            message: 'Your team has been locked!',
                            description:
                                "If you chose to apply as a team, we will now begin reviewing your team members' applications!"
                        });
                    })
                    .catch(() => {
                        notification.error({
                            message: 'Unable to lock team',
                            description: "Are you sure you're connected to the internet?"
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        });
    }, [event.slug, lockTeam, team.code]);

    const handleRemoveMember = useCallback(
        userId => {
            setLoading(true);
            removeMemberFromTeam(event.slug, team.code, userId)
                .then(() => {
                    notification.success({
                        message: 'Removed team member'
                    });
                })
                .catch(() => {
                    notification.error({
                        message: 'Unable to remove member',
                        notification: "Are you sure you're connected to the internet?"
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [event.slug, removeMemberFromTeam, team.code]
    );

    function renderNoTeam() {
        return (
            <div className={styles.wrapper}>
                <p className={styles.sectionDescription}>
                    Looks like you're not in a team yet. You can join an existing team by entering the team code here,
                    or create a new team and share the code with your team members.
                </p>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Divider size={1} />
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Join an existing team</h2>
                            <p className={styles.cardText}>
                                If one of your team members has already created a team, all you need to do is to fill in
                                the team code here to join the team.
                            </p>
                            <Divider size={1} />
                            <div className={styles.cardInputRow}>
                                <Input
                                    size="large"
                                    placeholder="12af8vHj"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                                <Divider size={1} />
                                <Button
                                    theme="accent"
                                    text="Join"
                                    button={{
                                        onClick: handleJoin,
                                        loading: loading
                                    }}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={12}>
                        <Divider size={1} />
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Create a new team</h2>
                            <p className={styles.cardText}>
                                Or, you can create a new team which your friends can join using the unique code that is
                                generated.
                            </p>
                            <Divider size={1} />
                            <Button
                                theme="accent"
                                text="Create team"
                                button={{
                                    onClick: handleCreate,
                                    loading: loading
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Divider size={1} />
            </div>
        );
    }

    function renderTeamStatus() {
        if (isTeamLocked) {
            return (
                <React.Fragment>
                    <h1 className={styles.sectionTitle}>
                        Team status:{' '}
                        <strong>
                            locked <Icon type="lock" />
                        </strong>
                    </h1>
                    <p className={styles.sectionBody}>
                        This means you won't be able to make any more changes to it during the registration period. If
                        you chose to apply as a team, we will now begin processing your team members' applications. If
                        you've made an error while building your team, you can still delete it and create a new one.
                        Please don't do this unless absolutely necessary.
                    </p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <h1 className={styles.sectionTitle}>
                        Team status:{' '}
                        <strong>
                            not locked <Icon type="unlock" />
                        </strong>
                    </h1>
                    <p className={styles.sectionBody}>
                        This means you can still make changes to it. The team owner (the person who created the team) is
                        the only member who can choose to lock a team. Please note that if you did choose to apply as a
                        team,{' '}
                        <strong>
                            we will not process your team members' applications until you have locked down the team!
                        </strong>
                    </p>
                </React.Fragment>
            );
        }
    }

    function renderButtons() {
        if (isOwner) {
            if (isTeamLocked) {
                return (
                    <Button
                        theme="danger"
                        text="Delete team"
                        button={{
                            loading: loading,
                            onClick: handleDelete
                        }}
                    />
                );
            } else {
                return (
                    <React.Fragment>
                        <Button
                            theme="warning"
                            text="Lock team"
                            button={{
                                loading: loading,
                                onClick: handleLock
                            }}
                        />
                        <Divider size={1} />
                        <Button
                            theme="danger"
                            text="Delete team"
                            button={{
                                loading: loading,
                                onClick: handleDelete
                            }}
                        />
                    </React.Fragment>
                );
            }
        } else {
            if (!isTeamLocked) {
                return (
                    <Button
                        theme="danger"
                        text="Leave team"
                        button={{
                            loading: loading,
                            onClick: handleLeave
                        }}
                    />
                );
            }
        }
    }

    function renderTeam() {
        return (
            <div className={styles.wrapper}>
                <h1 className={styles.sectionTitle}>
                    Your team code is <strong>{team.code}</strong>
                </h1>
                <p className={styles.sectionBody}>
                    {isTeamLocked
                        ? 'Your team is locked, and no more members can be added to your team.'
                        : 'Share this code with your team members so they can join your team! Teams can have a maximum of 5 members.'}
                    <strong> If you're not applying as a team, you don't need to create a team here for now.</strong>
                </p>
                <Table rowKey="userId" pagination={false} dataSource={userProfiles} loading={userProfilesLoading}>
                    <Table.Column
                        title="Name"
                        dataIndex="userId"
                        key="name"
                        render={(userId, record) => record.firstName + ' ' + record.lastName}
                    />
                    <Table.Column title="Email" dataIndex="email" key="email" />
                    <Table.Column
                        title="Role"
                        dataIndex="userId"
                        key="role"
                        render={userId => (team.owner === userId ? 'Owner' : 'Member')}
                    />
                    {isOwner && !isTeamLocked && (
                        <Table.Column
                            title="Actions"
                            dataIndex="userId"
                            key="actions"
                            render={(userId, record) => {
                                if (userId === userProfile.sub) {
                                    return null;
                                } else {
                                    return (
                                        <AntButton type="link" onClick={() => handleRemoveMember(userId)}>
                                            Remove
                                        </AntButton>
                                    );
                                }
                            }}
                        />
                    )}
                </Table>
                <Divider size={1} />
                <Row>
                    <Col xs={24}>
                        <Divider size={1} />
                        {renderTeamStatus()}
                    </Col>
                    <Col xs={24}>
                        <div className={styles.bottomActions}>{renderButtons()}</div>
                    </Col>
                </Row>
            </div>
        );
    }

    if (teamLoading) {
        return (
            <div className={styles.loadingWrapper}>
                <Icon type="loading" style={{ fontSize: 30 }} />
            </div>
        );
    }

    return hasTeam ? renderTeam() : renderNoTeam();
};

const mapStateToProps = state => ({
    team: DashboardSelectors.team(state),
    teamLoading: DashboardSelectors.teamLoading(state),
    hasTeam: DashboardSelectors.hasTeam(state),
    isTeamLocked: DashboardSelectors.isTeamLocked(state),
    event: DashboardSelectors.event(state),
    userProfile: AuthSelectors.getCurrentUser(state),
    userProfiles: DashboardSelectors.profiles(state),
    userProfilesLoading: DashboardSelectors.profilesLoading(state)
});

const mapDispatchToProps = dispatch => ({
    createTeam: slug => dispatch(DashboardActions.createTeam(slug)),
    deleteTeam: (slug, code) => dispatch(DashboardActions.deleteTeam(slug, code)),
    lockTeam: (slug, code) => dispatch(DashboardActions.lockTeam(slug, code)),
    joinTeam: (slug, code) => dispatch(DashboardActions.joinTeam(slug, code)),
    leaveTeam: slug => dispatch(DashboardActions.leaveTeam(slug)),
    removeMemberFromTeam: (slug, code, userId) => dispatch(DashboardActions.removeMemberFromTeam(slug, code, userId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDashboardTeam);
