import React from 'react'

import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'

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
import EmailsTab from './emails'
import ChallengesTab from './challenges'
import ScheduleTab from './schedule'
import QuestionsTab from './questions'
import SubmissionFormTab from './submission'
import TimelineTab from './timeline'
import MeetingRoomsTab from './meetingRooms'
import OtherTab from './other'
import HackerpackTab from './hackerpack'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'

export default () => {
    const dispatch = useDispatch()
    const [saveChanges, saveResult] = useMutation(UPDATE_EVENT, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to save changes', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: false,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to save changes'))
            }
        },
        onCompleted: () => {
            dispatch(OrganiserActions.updateEvent(slug)).then(() =>
                dispatch(
                    SnackbarActions.success(
                        'Your changes were saved successfully',
                    ),
                ),
            )
        },
    })
    const match = useRouteMatch()
    const location = useLocation()

    const event = useSelector(OrganiserSelectors.event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const { slug, _id } = event

    function onSubmit(values, actions) {
        console.log('Values on submit from edit:', values)
        console.log('Actions on submit from edit:', actions)
        const changed = {}
        forOwn(values, (value, field) => {
            if (event[field] !== value) {
                changed[field] = value
            }
        })
        saveChanges({
            variables: { _id, input: changed },
        })
        actions.setSubmitting(false)
    }
    return (
        <PageWrapper loading={loading}>
            <PageHeader
                heading="Edit event"
                subheading="Configure event information, schedule and other settings"
            />
            <Formik
                initialValues={
                    saveResult.data ? saveResult.data.updateEvent : event
                }
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={yupSchema}
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
                                    path: '/emails',
                                    key: 'emails',
                                    label: 'Emails',
                                    component: EmailsTab,
                                },
                                {
                                    path: '/challenges',
                                    key: 'challenges',
                                    label: 'Challenges',
                                    component: ChallengesTab,
                                },
                                {
                                    path: '/schedule',
                                    key: 'schedule',
                                    label: 'Schedule',
                                    component: ScheduleTab,
                                },
                                {
                                    path: '/rooms',
                                    key: 'meetingRooms',
                                    label: 'Meeting Rooms',
                                    component: MeetingRoomsTab,
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
                                    path: '/hackerpack',
                                    key: 'hackerpacks',
                                    label: 'Hackerpack',
                                    component: HackerpackTab,
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
                            loading={saveResult.loading}
                        />
                    </>
                )}
            </Formik>
        </PageWrapper>
    )
}
