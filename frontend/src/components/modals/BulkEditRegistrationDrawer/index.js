import React, { useState, useCallback, useEffect } from 'react';
import styles from './BulkEditRegistrationDrawer.module.scss';

import { connect } from 'react-redux';
import {
    Drawer,
    Divider as AntDivider,
    Rate,
    Icon,
    Modal,
    Button as AntButton,
    Collapse,
    Tag,
    notification
} from 'antd';
import classNames from 'classnames';
import { RegistrationStatuses } from '@hackjunction/shared';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';
import UserSelectModal from 'components/modals/UserSelectModal';
import RegistrationStatusSelect from 'components/FormComponents/RegistrationStatusSelect';
import EventTagsSelect from 'components/FormComponents/EventTagsSelect';
import PageWrapper from 'components/PageWrapper';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import { useStateWithReset } from 'hooks/customHooks';

const BulkEditRegistrationDrawer = ({
    event,
    organisers,
    organisersMap,
    registrationIds = [],
    bulkEditRegistrations,
    buttonProps
}) => {
    const [visible, setVisible] = useState(false);
    const [enabledFields, setEnabledFields, resetEnabledFields] = useStateWithReset([]);
    const [loading, setLoading] = useState(false);

    const [rating, setRating, resetRating] = useStateWithReset(null);
    const [assignedTo, setAssignedTo, resetAssignedTo] = useStateWithReset(null);
    const [tags, setTags, resetTags] = useStateWithReset([]);
    const [status, setStatus, resetStatus] = useStateWithReset('pending');

    const reset = useCallback(() => {
        resetRating();
        resetAssignedTo();
        resetTags();
        resetStatus();
        resetEnabledFields();
    }, [resetRating, resetAssignedTo, resetTags, resetStatus, resetEnabledFields]);

    useEffect(() => {
        if (!visible) {
            reset();
        }
    }, [visible, reset]);

    const handleClose = useCallback(() => {
        setVisible(false);
    }, [setVisible]);

    const handleAssignedChange = useCallback(
        value => {
            setAssignedTo(value.userId);
        },
        [setAssignedTo]
    );

    const renderAssignedTo = () => {
        if (assignedTo) {
            const user = organisersMap[assignedTo];
            return user ? `${user.firstName} ${user.lastName}` : '???';
        }
        return 'No one';
    };

    const renderFieldEnabled = field => {
        const isEnabled = enabledFields.indexOf(field) !== -1;
        return (
            <span className={classNames(styles.fieldEnabledText, { [styles.fieldEnabledActive]: isEnabled })}>
                {isEnabled ? 'Edit field' : 'Leave unchanged'}
            </span>
        );
    };

    const renderPreview = useCallback(
        (renderTitle = true) => {
            if (!enabledFields.length) return null;
            return (
                <React.Fragment>
                    {renderTitle && <AntDivider>Preview your changes</AntDivider>}
                    <ul>
                        {enabledFields.map(field => {
                            const getText = () => {
                                switch (field) {
                                    case 'rating': {
                                        if (rating) {
                                            return 'Set rating to ' + rating;
                                        } else {
                                            return 'Clear rating';
                                        }
                                    }
                                    case 'assignedTo': {
                                        if (assignedTo) {
                                            const user = organisersMap[assignedTo];
                                            const name = user ? `${user.firstName} ${user.lastName}` : '???';
                                            return 'Assign to ' + name;
                                        } else {
                                            return 'Clear Assigned To';
                                        }
                                    }
                                    case 'tags': {
                                        if (tags && tags.length) {
                                            return (
                                                <React.Fragment>
                                                    <span>Set tags to</span>{' '}
                                                    {tags.map(tag => (
                                                        <Tag key={tag}>{tag}</Tag>
                                                    ))}
                                                </React.Fragment>
                                            );
                                        } else {
                                            return 'Clear tags';
                                        }
                                    }
                                    case 'status': {
                                        if (status) {
                                            const params = RegistrationStatuses.asObject[status];
                                            return (
                                                <React.Fragment>
                                                    <span>Set status to</span>{' '}
                                                    <Tag color={params.color}>{params.label}</Tag>{' '}
                                                </React.Fragment>
                                            );
                                        } else {
                                            return 'Clear status';
                                        }
                                    }
                                    default:
                                        return '';
                                }
                            };
                            return <li key={field}>{getText()}</li>;
                        })}
                    </ul>
                    <Divider size={1} />
                </React.Fragment>
            );
        },
        [enabledFields, assignedTo, status, tags, rating, organisersMap]
    );

    const handleSubmit = () => {
        Modal.confirm({
            title: 'Are you sure?',
            content: (
                <React.Fragment>
                    <span>{`This will edit all ${registrationIds.length} items, and you probably wont be able to revert these changes. Let's review the changes one last time: `}</span>
                    {renderPreview(false)}
                </React.Fragment>
            ),
            okText: 'Yep, looks good!',
            cancelText: 'Cancel',
            onOk: () => {
                setLoading(true);
                const edits = {};
                enabledFields.forEach(field => {
                    switch (field) {
                        case 'rating':
                            edits.rating = rating;
                            break;
                        case 'assignedTo':
                            edits.assignedTo = assignedTo;
                            break;
                        case 'tags':
                            edits.tags = tags;
                            break;
                        case 'status':
                            edits.status = status;
                            break;
                        default:
                            return;
                    }
                });
                bulkEditRegistrations(registrationIds, edits, event.slug)
                    .then(() => {
                        notification.success({
                            message: 'Success!',
                            description: `The selected ${registrationIds.length} registrations were edited`
                        });
                    })
                    .catch(err => {
                        notification.error({
                            message: 'Something went wrong',
                            description: 'There was an error editing the registrations, please try again.'
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                        setVisible(false);
                    });
            }
        });
    };

    if (!registrationIds.length) return null;

    return (
        <React.Fragment>
            <Drawer
                title={`Edit ${registrationIds.length} selected registrations`}
                placement="right"
                width={640}
                closable={true}
                onClose={handleClose}
                visible={visible}
                getContainer={false}
            >
                <PageWrapper loading={loading} wrapContent={false}>
                    <AntDivider>Bulk edit</AntDivider>
                    <p>
                        Here you can edit all of the selected registrations. Expand the panels for the fields which you
                        want to edit - if a panel is left <strong>un-expanded</strong>, that field will not be edited in
                        the registrations.
                    </p>
                    <Collapse activeKey={enabledFields} onChange={setEnabledFields}>
                        <Collapse.Panel key="rating" header="Rating" extra={renderFieldEnabled('rating')}>
                            <Rate
                                value={rating}
                                onChange={setRating}
                                character={<Icon type="star" theme="filled" style={{ fontSize: '2rem' }} />}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel key="assignedTo" header="Assigned to" extra={renderFieldEnabled('assignedTo')}>
                            <UserSelectModal
                                renderTrigger={showModal => (
                                    <React.Fragment>
                                        <span>{renderAssignedTo()}</span>
                                        <AntButton type="link" onClick={showModal} size="small">
                                            Change
                                        </AntButton>
                                        {assignedTo && (
                                            <AntButton type="link" onClick={() => setAssignedTo(null)}>
                                                Clear
                                            </AntButton>
                                        )}
                                    </React.Fragment>
                                )}
                                onDone={handleAssignedChange}
                                allowMultiple={false}
                                userProfiles={organisers}
                            />
                        </Collapse.Panel>
                        <Collapse.Panel key="tags" header="Tags" extra={renderFieldEnabled('tags')}>
                            <EventTagsSelect value={tags} onChange={setTags} tags={event.tags} />
                        </Collapse.Panel>
                        <Collapse.Panel key="status" header="Status" extra={renderFieldEnabled('status')}>
                            <RegistrationStatusSelect value={status} onChange={setStatus} />
                        </Collapse.Panel>
                    </Collapse>
                    <Divider size={1} />
                    {renderPreview()}
                    <Button theme="secondary" block text="Cancel" button={{ onClick: () => setVisible(false) }} />
                    <Divider size={1} />
                    <Button
                        theme="danger"
                        text={`Apply changes to ${registrationIds.length} items`}
                        block
                        button={{ onClick: handleSubmit, disabled: enabledFields.length === 0 }}
                    />
                </PageWrapper>
            </Drawer>
            <AntButton type="link" children={`Edit all`} onClick={setVisible} {...buttonProps} />
        </React.Fragment>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    organisers: OrganiserSelectors.organisers(state),
    organisersMap: OrganiserSelectors.organisersMap(state)
});

const mapDispatch = dispatch => ({
    bulkEditRegistrations: (registrationIds, edits, slug) =>
        dispatch(OrganiserActions.bulkEditRegistrations(registrationIds, edits, slug))
});

export default connect(
    mapState,
    mapDispatch
)(BulkEditRegistrationDrawer);
