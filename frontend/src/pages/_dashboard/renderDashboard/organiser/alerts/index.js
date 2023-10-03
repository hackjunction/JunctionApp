import React from 'react'
import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { Grid } from '@material-ui/core'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import BottomBar from 'components/inputs/BottomBar'
import { FastField, Formik } from 'formik'
import { SEND_ALERT_MUTATION } from 'graphql/mutations/alertOps'
import { forOwn } from 'lodash-es'
import { useDispatch, useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'


export default () => {
    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const [saveChanges, saveResult] = useMutation(SEND_ALERT_MUTATION, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Sending failed', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to send'))
            }
        },
        onCompleted: () => {
            dispatch(SnackbarActions.success('Announcement sent 🚀'))
        },
    })

    const onSubmit = (values, actions) => {
        const changed = {}
        forOwn(values, (value, field) => {
            if (event[field] !== value) {
                changed[field] = value
            }
        })
        saveChanges({
            variables: { input: { ...changed, eventId: event._id } },
        })
        actions.setSubmitting(false)
    }

    return (
        <PageWrapper loading={loading}>
            <PageHeader
                heading="Send Announcements"
                subheading="Send instant announcements to all participants"
            />
            <Grid item xs={12}>
                <Formik
                    initialValues={{ content: '' }}
                    onSubmit={onSubmit}
                    validationSchema={yup.object().shape({
                        content: yup.string().min(5).required(),
                    })}
                >
                    {({ handleSubmit, errors }) => (
                        <>
                            <FastField
                                name="content"
                                render={({ field, form }) => (
                                    <FormControl
                                        label="Announcement message"
                                        hint="The content of the announcement"
                                        error={form.errors[field.name]}
                                        touched={form.touched[field.name]}
                                    >
                                        <TextAreaInput
                                            name="content"
                                            placeholder=""
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                        />
                                    </FormControl>
                                )}
                            />
                            <BottomBar
                                onSubmit={handleSubmit}
                                errors={errors}
                                dirty={true}
                                loading={saveResult.loading}
                                submitLabel="Send"
                            />
                        </>
                    )}
                </Formik>
                {/* <Alerts alerts={alerts} /> //TODO: render sent allerts*/}
            </Grid>
        </PageWrapper>
    )
}
