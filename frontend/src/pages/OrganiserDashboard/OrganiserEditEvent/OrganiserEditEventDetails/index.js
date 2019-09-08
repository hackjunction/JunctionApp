import React from 'react';
import styles from './OrganiserEditEventDetails.module.scss';

import { Tabs, PageHeader, Button, notification } from 'antd';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { forOwn } from 'lodash-es';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import Divider from 'components/generic/Divider';
import OrganiserEditEventInfo from './OrganiserEditEventInfo';
import OrganiserEditEventTimes from './OrganiserEditEventTimes';
import OrganiserEditEventRegistration from './OrganiserEditEventRegistration';
import OrganiserEditEventMisc from './OrganiserEditEventMisc';
import BlockExitIfDirty from 'components/FormComponents/BlockExitIfDirty';

const { TabPane } = Tabs;

const OrganiserEditEventDetails = ({ event, editEvent }) => {
    const { slug } = event;
    function onSubmit(values, actions) {
        const changed = {};
        forOwn(values, (value, field) => {
            if (event[field] !== value) {
                changed[field] = value;
            }
        });
        editEvent(slug, changed)
            .then(savedEvent => {
                notification.success({
                    message: 'Your changes were saved successfully'
                });
                actions.setSubmitting(false);
            })
            .catch(err => {
                const { message, errors } = err.response.data;

                if (errors) {
                    const errorKeys = Object.keys(errors);

                    notification.error({
                        message: 'Unable to save changes',
                        description: (
                            <ul>
                                {errorKeys.map(key => (
                                    <li>
                                        <strong>{key}</strong> {errors[key].message}
                                    </li>
                                ))}
                            </ul>
                        )
                    });
                } else {
                    notification.error({
                        message: 'Unable to save changes',
                        description: message
                    });
                }
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    }

    return (
        <Formik initialValues={event} enableReinitialize={true} onSubmit={onSubmit}>
            {formikProps => {
                const errorCount = Object.keys(formikProps.errors).length;
                const hasErrors = errorCount !== 0;
                const canSave = formikProps.dirty && !hasErrors;
                const isPublic = formikProps.values.published;

                return (
                    <React.Fragment>
                        <PageHeader
                            title="Edit event"
                            children={<p>Configure your event information, registration settings and schedule</p>}
                            extra={[
                                <Button
                                    type={isPublic ? 'danger' : 'primary'}
                                    shape="round"
                                    onClick={() => {
                                        formikProps.setFieldValue('published', !isPublic);
                                    }}
                                >
                                    {isPublic ? 'Un-publish' : 'Publish'}
                                </Button>,
                                <Button
                                    type="primary"
                                    disabled={!formikProps.dirty}
                                    shape="round"
                                    onClick={() => formikProps.submitForm()}
                                    key="1"
                                >
                                    Save
                                </Button>
                            ]}
                        />
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Basic Details" key="1">
                                <Divider size={3} />
                                <OrganiserEditEventInfo {...formikProps} />
                                <Divider size={5} />
                            </TabPane>
                            <TabPane tab="Schedule" key="2">
                                <Divider size={3} />
                                <OrganiserEditEventTimes {...formikProps} />
                                <Divider size={5} />
                            </TabPane>
                            <TabPane tab="Questions" key="3">
                                <Divider size={3} />
                                <OrganiserEditEventRegistration {...formikProps} />
                                <Divider size={5} />
                            </TabPane>
                            <TabPane tab="Misc" key="4">
                                <Divider size={3} />
                                <OrganiserEditEventMisc {...formikProps} />
                                <Divider size={5} />
                            </TabPane>
                        </Tabs>
                        <BlockExitIfDirty {...formikProps} />
                    </React.Fragment>
                );
            }}
        </Formik>
    );
};

const mapStateToProps = state => ({
    event: OrganiserSelectors.event(state)
});

const mapDispatchToProps = dispatch => ({
    editEvent: (slug, data) => dispatch(OrganiserActions.editEvent(slug, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEditEventDetails);
