import React, { useState, useEffect } from 'react';
import styles from './AttendeeDrawer.module.scss';

import { connect } from 'react-redux';
import { RegistrationFields, RegistrationStatuses } from '@hackjunction/shared';
import { Drawer, Skeleton, Descriptions, Tabs, Button, Tag, Popconfirm } from 'antd';
import { find, groupBy } from 'lodash-es';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import Divider from 'components/generic/Divider';
import AttendeeDrawerEdit from './AttendeeDrawerEdit';

const AttendeeDrawer = ({
    event,
    idToken,
    slug,
    registrationId,
    isOpen,
    onClose,
    editAttendee,
    acceptAttendee,
    rejectAttendee,
    updateAttendee,
    getAttendee
}) => {
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const registration = getAttendee(slug, registrationId);
    const { answers } = registration;

    useEffect(() => {
        if (registrationId) {
            setLoading(true);
            updateAttendee(slug, registrationId)
                .catch(err => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [registrationId, slug, updateAttendee]);

    function handleRegistrationEdit(values) {
        editAttendee(slug, registrationId, values);
    }

    function handleAccept() {
        acceptAttendee(slug, registrationId);
    }

    function handleReject() {
        rejectAttendee(slug, registrationId);
    }

    function renderError() {
        return (
            <div className={styles.error}>
                <h3 className={styles.errorTitle}>Something went wrong</h3>
                <p className={styles.errorText}>Please close the drawer and try again</p>
            </div>
        );
    }

    function renderContent() {
        const fields = Object.keys(answers);
        const grouped = groupBy(fields, field => RegistrationFields.getCategory(field));
        const categoryNames = Object.keys(grouped);
        const currentStatus = RegistrationStatuses.asObject[registration.status];

        return (
            <React.Fragment>
                {currentStatus.allowEdit && (
                    <div className={styles.buttonsWrapper}>
                        <span className={styles.buttonsLabel}>Actions:</span>
                        <Divider size={1} />
                        <Popconfirm
                            placement="top"
                            title={
                                'Are you sure? This will send an email to the participant, and you will not be able to undo this action.'
                            }
                            onConfirm={handleAccept}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="default">
                                <span className={styles.acceptButton}>Accept</span>
                            </Button>
                        </Popconfirm>
                        <Divider size={1} />
                        <Popconfirm
                            placement="top"
                            title={
                                'Are you sure? This will send an email to the participant, and you will not be able to undo this action.'
                            }
                            onConfirm={handleReject}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="default">
                                <span className={styles.rejectButton}>Reject</span>
                            </Button>
                        </Popconfirm>
                    </div>
                )}
                <Divider size={1} />
                <Tabs
                    tabBarExtraContent={
                        <Button block type="primary" shape="round" onClick={() => setEditOpen(true)}>
                            Edit
                        </Button>
                    }
                >
                    {categoryNames.map((categoryName, index) => {
                        return (
                            <Tabs.TabPane tab={categoryName} key={index}>
                                <Descriptions column={1} bordered>
                                    {grouped[categoryName].map(field => {
                                        let label = RegistrationFields.fieldToLabelMap[field];
                                        if (!label) {
                                            const customField = find(
                                                event.registrationQuestions,
                                                f => f.name === field
                                            );
                                            if (customField) {
                                                label = customField.label;
                                            }
                                        }
                                        return (
                                            <Descriptions.Item key={field} label={label}>
                                                {JSON.stringify(registration.answers[field])}
                                            </Descriptions.Item>
                                        );
                                    })}
                                </Descriptions>
                            </Tabs.TabPane>
                        );
                    })}
                </Tabs>
                <AttendeeDrawerEdit
                    isOpen={editOpen}
                    onClose={() => setEditOpen(false)}
                    onSubmit={handleRegistrationEdit}
                    registration={registration}
                />
            </React.Fragment>
        );
    }

    function renderTitle() {
        const currentStatus = RegistrationStatuses.asObject[registration.status];
        return (
            <div className={styles.drawerTitle}>
                <span>{registration.answers.firstName + ' ' + registration.answers.lastName}</span>
                <Divider size={1} />
                <Tag color={currentStatus.color}>status: {currentStatus.label}</Tag>
            </div>
        );
    }
    return (
        <Drawer
            destroyOnClose={true}
            title={answers && renderTitle()}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={isOpen}
            width={800}
        >
            <Skeleton active loading={loading} avatar paragraph={{ rows: 20 }}>
                {error && renderError()}
                {!error && answers && renderContent()}
            </Skeleton>
        </Drawer>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    getAttendee: OrganiserSelectors.getAttendeeByEvent(state)
});

const mapDispatchToProps = dispatch => ({
    editAttendee: (slug, registrationId, data) => dispatch(OrganiserActions.editAttendee(slug, registrationId, data)),
    acceptAttendee: (slug, registrationId) => dispatch(OrganiserActions.acceptAttendee(slug, registrationId)),
    rejectAttendee: (slug, registrationId) => dispatch(OrganiserActions.rejectAttendee(slug, registrationId)),
    updateAttendee: (slug, registrationId) => dispatch(OrganiserActions.updateAttendee(slug, registrationId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AttendeeDrawer);
