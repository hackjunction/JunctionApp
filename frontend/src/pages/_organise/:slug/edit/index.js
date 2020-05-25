import React from 'react'

import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { forOwn } from 'lodash-es'
import { useRouteMatch, useLocation } from 'react-router'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import BottomBar from 'components/inputs/BottomBar'

import DefaultTab from './default'
import ConfigurationTab from './configuration'
import ScheduleTab from './schedule'
import QuestionsTab from './questions'
import SubmissionFormTab from './submission'
import OtherTab from './other'

export default () => {
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const location = useLocation()

    const event = useSelector(OrganiserSelectors.event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const { slug } = event

    function onSubmit(values, actions) {
        const changed = {}
        forOwn(values, (value, field) => {
            if (event[field] !== value) {
                changed[field] = value
            }
        })
        dispatch(OrganiserActions.editEvent(slug, changed))
            .then(() => {
                dispatch(
                    SnackbarActions.success(
                        'Your changes were saved successfully'
                    )
                )
                actions.setSubmitting(false)
            })
            .catch(err => {
                const errors = err?.response?.data?.errors

                if (errors) {
                    dispatch(
                        SnackbarActions.error('Unable to save changes', {
                            errorMessages: Object.keys(errors).map(
                                key => `${key}: ${errors[key].message}`
                            ),
                            persist: true,
                        })
                    )
                } else {
                    dispatch(SnackbarActions.error('Unable to save changes'))
                }
            })
            .finally(() => {
                actions.setSubmitting(false)
            })
    }

    return (
        <PageWrapper loading={loading}>
            <PageHeader
                heading="Edit event"
                subheading="Configure event information, schedule and other settings"
            />
            <Formik
                initialValues={event}
                enableReinitialize={true}
                onSubmit={onSubmit}
            >
                {formikProps => (
                    <>
                        <MaterialTabsLayout
                            transparent
                            tabs={[
                                {
                                    path: '',
                                    key: 'basic-details',
                                    label: 'Basic Details',
                                    component: DefaultTab,
                                },
                                {
                                    path: '/configuration',
                                    key: 'configuration',
                                    label: 'Configuration',
                                    component: ConfigurationTab,
                                },
                                {
                                    path: '/schedule',
                                    key: 'schedule',
                                    label: 'Schedule',
                                    component: ScheduleTab,
                                },
                                {
                                    path: '/questions',
                                    key: 'questions',
                                    label: 'Questions',
                                    component: QuestionsTab,
                                },
                                {
                                    path: '/submission',
                                    key: 'submission',
                                    label: 'Submission form',
                                    component: SubmissionFormTab,
                                },
                                {
                                    path: '/other',
                                    key: 'other',
                                    label: 'Miscellaneous',
                                    component: OtherTab,
                                },
                            ]}
                            location={location}
                            baseRoute={match.url}
                        />
                        <div style={{ height: '100px' }} />
                        <BottomBar
                            onSubmit={formikProps.handleSubmit}
                            errors={formikProps.errors}
                            dirty={formikProps.dirty}
                            loading={formikProps.isSubmitting}
                        />
                    </>
                )}
            </Formik>
        </PageWrapper>
    )
}
