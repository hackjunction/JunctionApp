import React from 'react'


import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import junctionStyle from 'utils/styles'
import {

    Box,

} from '@material-ui/core'



import FormControl from 'components/inputs/FormControl'

import ImageUpload from 'components/inputs/ImageUpload'


import { Formik, FastField } from 'formik'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useRouteMatch, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import { forOwn } from 'lodash-es'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'



import Container from 'components/generic/Container'


export default () => {
    const dispatch = useDispatch()
    // lhello
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
    const match = useRouteMatch()
    const location = useLocation()

    const event = useSelector(OrganiserSelectors.event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const { slug, _id } = event

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
        <PageWrapper
            // loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container center>
                    <Formik
                        initialValues={
                            saveResult.data
                                ? saveResult.data.updateEvent
                                : event
                        }
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validationSchema={yupSchema}
                    >
                        {formikProps => (
                            <FastField
                                name="coverImage"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Cover image"
                                        hint="A cool cover image for your event. Max dimensions 1920x1080 (2MB), will be scaled down if larger."
                                        error={form.errors[field.name]}
                                        touched={form.touched[field.name]}
                                    >
                                        <Box width="100%" pt="56.25%" position="relative">
                                            <ImageUpload
                                                value={field.value}
                                                onChange={value => {
                                                    form.setFieldValue(field.name, value)
                                                    form.setFieldTouched(field.name)
                                                }}
                                                uploadUrl={`/api/upload/files`}
                                                resizeMode="cover"
                                            />
                                        </Box>
                                    </FormControl>
                                )}
                            />
                        )}
                    </Formik>
                </Container>
            )}
        />
    )
}