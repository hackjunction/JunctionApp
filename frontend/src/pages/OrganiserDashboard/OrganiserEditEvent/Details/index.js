import React, { useEffect } from 'react';

import { Formik } from 'formik';
import { connect } from 'react-redux';
import { forOwn } from 'lodash-es';
import { withSnackbar } from 'notistack';
import { Box, Typography } from '@material-ui/core';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import PageHeader from 'components/generic/PageHeader';
import PageWrapper from 'components/layouts/PageWrapper';
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';

import BasicInfoTab from './BasicInfo';
import ScheduleTab from './Schedule';
import QuestionsTab from './Questions';
import MiscellaneousTab from './Miscellaneous';
import ConfigurationTab from './ConfigurationTab';
import BottomBar from './BottomBar';

const OrganiserEditEventDetails = ({ event, loading, editEvent, enqueueSnackbar }) => {
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
                enqueueSnackbar('Your changes were saved successfully', { variant: 'success' });
                actions.setSubmitting(false);
            })
            .catch(err => {
                const { message, errors } = err.response.data;

                if (errors) {
                    const errorKeys = Object.keys(errors);
                    enqueueSnackbar(
                        <Box>
                            <Typography variant="body1">Unable to save changes</Typography>
                            <ul>
                                {errorKeys.map(key => (
                                    <li>
                                        <strong>{key}</strong> {errors[key].message}
                                    </li>
                                ))}
                            </ul>
                        </Box>,
                        {
                            variant: 'error',
                            autoHideDuration: 3000
                        }
                    );
                } else {
                    enqueueSnackbar(
                        <Box>
                            <Typography variant="body1">Unable to save changes</Typography>
                            <Typography variant="caption">{message}</Typography>
                        </Box>,
                        {
                            variant: 'error'
                        }
                    );
                }
            })
            .finally(() => {
                actions.setSubmitting(false);
            });
    }

    return (
        <PageWrapper loading={loading}>
            <PageHeader heading="Edit event" subheading="Configure event information, schedule and other settings" />
            <Formik initialValues={event} enableReinitialize={true} onSubmit={onSubmit}>
                {formikProps => (
                    <React.Fragment>
                        <MaterialTabsLayout
                            transparent
                            tabs={[
                                {
                                    label: 'Basic Details',
                                    content: <BasicInfoTab {...formikProps} />
                                },
                                {
                                    label: 'Configuration',
                                    content: <ConfigurationTab {...formikProps} />
                                },
                                {
                                    label: 'Schedule',
                                    content: <ScheduleTab {...formikProps} />
                                },
                                {
                                    label: 'Questions',
                                    content: <QuestionsTab {...formikProps} />
                                },
                                {
                                    label: 'Miscellaneous',
                                    content: <MiscellaneousTab {...formikProps} />
                                }
                            ]}
                        />
                        <div style={{ height: '100px' }} />
                        <BottomBar
                            onSubmit={formikProps.handleSubmit}
                            errors={formikProps.errors}
                            dirty={formikProps.dirty}
                            loading={formikProps.isSubmitting}
                        />
                    </React.Fragment>
                )}
            </Formik>
        </PageWrapper>
    );
};

const mapStateToProps = state => ({
    event: OrganiserSelectors.event(state),
    loading: OrganiserSelectors.eventLoading(state)
});

const mapDispatchToProps = dispatch => ({
    editEvent: (slug, data) => dispatch(OrganiserActions.editEvent(slug, data))
});

export default withSnackbar(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(OrganiserEditEventDetails)
);
