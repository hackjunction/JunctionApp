import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import junctionStyle from 'utils/styles'

import { Formik } from 'formik'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useRouteMatch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import { forOwn } from 'lodash-es'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'
import CandidatesPage from './candidates'
import ProfilePage from './profile'

import Container from 'components/generic/Container'
import TeamsPage from './teams'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import PageHeader from 'components/generic/PageHeader'
import BottomBar from 'components/inputs/BottomBar'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()
    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)

    const loading = useSelector(OrganiserSelectors.eventLoading)
    const { slug, _id } = event
    const [saveChanges, saveResult] = useMutation(UPDATE_EVENT, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to save changes', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: false, // this could be the problem why errors messages persist? => solution: set to false
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

    function onSubmit(values, actions) {
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

    // const [events, loading] = useMyEvents()
    const classes = junctionStyle()
    return (
        <Container>
            <PageHeader heading="Team management" />
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
                                    label: 'Join a team',
                                    key: 'teams',
                                    path: '',
                                    component: TeamsPage,
                                },
                                {
                                    label: 'Your team',
                                    key: 'profile',
                                    path: '/profile',
                                    component: ProfilePage,
                                },
                                {
                                    label: 'Team candidates',
                                    key: 'candidates',
                                    path: '/candidates',
                                    component: CandidatesPage,
                                },
                            ]}
                            baseRoute={match.url}
                            location={location}
                        />
                        <BottomBar
                            onSubmit={formikProps.handleSubmit}
                            errors={formikProps.errors}
                            dirty={formikProps.dirty}
                            loading={saveResult.loading}
                        />
                    </>
                )}
            </Formik>
        </Container>
    )
}
