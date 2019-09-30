import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/generic/Modal';
import { Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { RegistrationFields } from '@hackjunction/shared';
import { Rate, notification, Divider as AntDivider, Tag, Drawer, List, Select, Button as AntButton } from 'antd';
import { isEqual, groupBy, find } from 'lodash-es';

import PageWrapper from 'components/PageWrapper';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';
import DescriptionItem from 'components/generic/DescriptionItem';

import UserSelectModal from 'components/modals/UserSelectModal';
import RegistrationStatusSelect from 'components/FormComponents/RegistrationStatusSelect';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import RegistrationsService from 'services/registrations';
import MiscUtils from 'utils/misc';

const EditRegistrationModalInner = ({ idToken, event, registration, organisers, organisersMap, onEdit }) => {
    const initialValues = {
        rating: registration.rating,
        assignedTo: registration.assignedTo,
        tags: registration.tags,
        status: registration.status
    };
    const [formValues, setFormValues] = useState(initialValues);
    const dirty = !isEqual(formValues, initialValues);

    const handleEdit = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value
        });
    };

    const renderAssignedTo = () => {
        if (formValues.assignedTo) {
            const user = organisersMap[formValues.assignedTo];
            return user ? `${user.firstName} ${user.lastName}` : '???';
        }
        return 'No one';
    };

    const renderActions = () => {
        return (
            <React.Fragment>
                <List.Item>
                    <List.Item.Meta
                        title="Rating"
                        description={<Rate value={formValues.rating} onChange={value => handleEdit('rating', value)} />}
                    ></List.Item.Meta>
                </List.Item>
                <List.Item
                    actions={[
                        <UserSelectModal
                            renderTrigger={showModal => (
                                <Button text="Change" button={{ onClick: showModal }} size="small" />
                            )}
                            onDone={value => handleEdit('assignedTo', value.userId)}
                            allowMultiple={false}
                            userProfiles={organisers}
                        />
                    ]}
                >
                    <List.Item.Meta title={'Assigned to'} description={renderAssignedTo()}></List.Item.Meta>
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        title="Tags"
                        description={
                            <Select
                                placeholder="Select tags"
                                size="large"
                                value={formValues.tags}
                                style={{ width: '100%' }}
                                onChange={value => handleEdit('tags', value)}
                                mode="multiple"
                            >
                                {event.tags.map(tag => (
                                    <Select.Option value={tag.label}>
                                        <Tag color={tag.color}>{tag.label}</Tag>
                                    </Select.Option>
                                ))}
                            </Select>
                        }
                    ></List.Item.Meta>
                </List.Item>
                <List.Item>
                    <List.Item.Meta
                        title="Status"
                        description={
                            <RegistrationStatusSelect
                                value={formValues.status}
                                onChange={value => handleEdit('status', value)}
                            />
                        }
                    />
                </List.Item>
                <Divider size={1} />
                <Button
                    text="Save changes"
                    block
                    theme="accent"
                    button={{
                        onClick: () => onEdit(formValues),
                        disabled: !dirty
                    }}
                />
            </React.Fragment>
        );
    };

    const renderContent = () => {
        if (!registration) return null;
        const fields = Object.keys(registration.answers);
        const grouped = groupBy(fields, field => RegistrationFields.getCategory(field));
        const categoryNames = Object.keys(grouped).filter(key => key !== '');

        return (
            <React.Fragment>
                {categoryNames.map(name => (
                    <React.Fragment key={name}>
                        <AntDivider>
                            <h3>{name}</h3>
                        </AntDivider>
                        {grouped[name].map(field => {
                            let label = RegistrationFields.fieldToLabelMap[field];
                            if (!label) {
                                const customField = find(event.registrationQuestions, f => f.name === field);
                                if (customField) {
                                    label = customField.label;
                                }
                            }
                            return (
                                <DescriptionItem
                                    title={label}
                                    content={registration.answers[field]}
                                    fieldName={field}
                                />
                            );
                        })}
                    </React.Fragment>
                ))}
                {event.customQuestions.map(section => {
                    const sectionAnswers = registration.answers[section.name] || {};
                    return (
                        <React.Fragment key={section.name}>
                            <AntDivider>
                                <h3>{section.label}</h3>
                            </AntDivider>
                            {section.questions.map(question => {
                                return (
                                    <DescriptionItem title={question.label} content={sectionAnswers[question.name]} />
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {renderActions()}
            {renderContent()}
        </React.Fragment>
    );
};

const EditRegistrationModal = ({
    idToken,
    registrationId,
    onClose,
    event,
    editRegistration,
    enqueueSnackbar,
    organisers,
    organisersMap,
    onEdited = () => {}
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [registration, setRegistration] = useState();
    const { slug } = event;

    useEffect(() => {
        if (registrationId) {
            setLoading(true);
            RegistrationsService.getFullRegistration(idToken, slug, registrationId)
                .then(data => {
                    setRegistration(data);
                })
                .catch(err => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [idToken, registrationId, slug]);

    const handleEdit = useCallback(
        async data => {
            setLoading(true);
            await MiscUtils.sleep(1000);
            editRegistration(registrationId, data, slug)
                .then(data => {
                    enqueueSnackbar('Changes saved!', { variant: 'success' });
                    onEdited(data);
                    onClose();
                })
                .catch(err => {
                    enqueueSnackbar('Something went wrong', { variant: 'error' });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [enqueueSnackbar, editRegistration, registrationId, slug, onClose, onEdited]
    );

    return (
        <Modal isOpen={!!registrationId} handleClose={onClose} size="med" title="Edit registration">
            <PageWrapper loading={loading || !registration} error={error}>
                <EditRegistrationModalInner
                    registration={registration}
                    event={event}
                    organisers={organisers}
                    organisersMap={organisersMap}
                    onEdit={handleEdit}
                />
            </PageWrapper>
        </Modal>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    organisersMap: OrganiserSelectors.organisersMap(state),
    organisers: OrganiserSelectors.organisers(state)
});

const mapDispatch = dispatch => ({
    editRegistration: (registrationId, data, slug) =>
        dispatch(OrganiserActions.editRegistration(registrationId, data, slug))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(EditRegistrationModal)
);
