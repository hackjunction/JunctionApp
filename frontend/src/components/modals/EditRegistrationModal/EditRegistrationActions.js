import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Rate, Tag, List, Select, Input } from 'antd';
import { Grid, Typography, Box } from '@material-ui/core';

import Button from 'components/generic/Button';

import UserSelectModal from 'components/modals/UserSelectModal';
import RegistrationStatusSelect from 'components/FormComponents/RegistrationStatusSelect';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import { useFormField } from 'hooks/formHooks';

const EditRegistrationActions = ({ registration, event, organisers, organisersMap, onSubmit }) => {
    const rating = useFormField(registration.rating);
    const assignedTo = useFormField(registration.assignedTo);
    const tags = useFormField(registration.tags);
    const status = useFormField(registration.status);
    const travelGrant = useFormField(registration.travelGrant);

    const formFields = [rating, assignedTo, tags, status, travelGrant];
    const formValues = {
        rating: rating.value,
        assignedto: assignedTo.value,
        tags: tags.value,
        status: status.value,
        travelGrant: travelGrant.value
    };
    const formDirty = formFields.map(field => field.dirty).indexOf(true) !== -1;

    const handleSubmit = useCallback(() => {
        const errors = formFields
            .map(field => {
                return field.validate();
            })
            .filter(err => typeof err !== 'undefined');

        if (errors.length > 0) {
            return;
        }

        onSubmit(formValues);
    }, [formFields, formValues, onSubmit]);

    const renderAssignedTo = () => {
        if (assignedTo.value) {
            const user = organisersMap[assignedTo.value];
            return user ? `${user.firstName} ${user.lastName}` : '???';
        }
        return 'No one';
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box pt={3}>
                    <Typography variant="h5">Edit registration</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <List.Item>
                    <List.Item.Meta
                        title="Rating"
                        description={<Rate value={rating.value} onChange={rating.setValue} />}
                    ></List.Item.Meta>
                </List.Item>
            </Grid>
            <Grid item xs={12}>
                <List.Item
                    actions={[
                        <UserSelectModal
                            renderTrigger={showModal => (
                                <Button text="Change" button={{ onClick: showModal }} size="small" />
                            )}
                            onDone={value => assignedTo.setValue(value.userId)}
                            allowMultiple={false}
                            userProfiles={organisers}
                        />
                    ]}
                >
                    <List.Item.Meta title={'Assigned to'} description={renderAssignedTo()}></List.Item.Meta>
                </List.Item>
            </Grid>
            <Grid item xs={12}>
                <List.Item>
                    <List.Item.Meta
                        title="Tags"
                        description={
                            <Select
                                placeholder="Select tags"
                                size="large"
                                value={tags.value}
                                style={{ width: '100%' }}
                                onChange={tags.setValue}
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
            </Grid>
            <Grid item xs={12}>
                <List.Item>
                    <List.Item.Meta
                        title="Status"
                        description={<RegistrationStatusSelect value={status.value} onChange={status.setValue} />}
                    />
                </List.Item>
            </Grid>
            <Grid item xs={12}>
                <List.Item>
                    <List.Item.Meta
                        title="Travel grant"
                        description={
                            <Input
                                placeholder="Enter amount (EUR)"
                                size="large"
                                type="number"
                                value={travelGrant.value}
                                onChange={travelGrant.onChange}
                            />
                        }
                    />
                </List.Item>
            </Grid>
            <Grid item xs={12}>
                <Button
                    text="Save changes"
                    block
                    theme="accent"
                    button={{
                        onClick: handleSubmit,
                        disabled: !formDirty
                    }}
                />
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    organisers: OrganiserSelectors.organisers(state),
    organisersMap: OrganiserSelectors.organisersMap(state)
});

export default connect(mapState)(EditRegistrationActions);
