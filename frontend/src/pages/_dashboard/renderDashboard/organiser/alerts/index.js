import React, { useEffect, useState } from 'react'

import * as yup from 'yup'
import { useMutation } from '@apollo/client'
import { Grid, Typography } from '@material-ui/core'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import BottomBar from 'components/inputs/BottomBar'
import { FastField, Formik } from 'formik'
import { SEND_ALERT_MUTATION } from 'graphql/mutations/alertOps'
import { ALERTS_QUERY } from 'graphql/queries/alert'
import { NEW_ALERTS_SUBSCRIPTION } from 'graphql/subscriptions/alert'
import { forOwn } from 'lodash-es'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyQuery, useSubscription } from '@apollo/client'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import TextAreaInput from 'components/inputs/TextAreaInput'
import FormControl from 'components/inputs/FormControl'
import GradientBox from 'components/generic/GradientBox'
import { Alerts } from '../../../../../components/messaging/alerts'


const makeBoxStyles = () => ({


    backgroundColor: '#f7fafc',
    border: `2px solid #e2e8f0`,
    borderRadius: '6px',
    height: '100%'

    //TODO: blurr the bottom

    // backgroundColor: '#f8f8f8',

})

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)
    const loading = useSelector(OrganiserSelectors.eventLoading)
    const [alerts, setAlerts] = useState([])
    const [alertCount, setAlertCount] = useState(0)
    const { data: newAlert } = useSubscription(NEW_ALERTS_SUBSCRIPTION, {
        variables: event.slug,
    })
    const [saveChanges, saveResult] = useMutation(SEND_ALERT_MUTATION, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Sending failed', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        )
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to send'))
            }
        },
        onCompleted: () => {
            console.log("saveResult", saveResult.data.sendAlert)
            dispatch(SnackbarActions.success('Announcement sent 🚀'))
            setAlerts(alerts.concat(saveResult.data.sendAlert))
        },
    })

    // Must use lazy query because event is fetched asynchnronously
    const [getAlerts, { loading: alertsLoading, data: alertsData }] =
        useLazyQuery(ALERTS_QUERY)
    useEffect(() => {
        if (event) {
            getAlerts({ variables: { eventId: event._id } })
        }
    }, [event, getAlerts])

    // Set alerts when data is fetched or recieved through websocket
    useEffect(() => {
        console.log("got newAlert", newAlert)
        if (alertsData) {
            setAlerts(old => {
                const newArray = [...old, ...alertsData.alerts]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return old.length === 0 ? newArray : old
            })
        }
        if (newAlert) {
            if (
                'Notification' in window &&
                Notification.permission === 'granted'
            ) {
                new Notification('Announcement', {
                    body: newAlert.newAlert.content,
                })
            }
            setAlertCount(alertCount + 1)
            setAlerts(old => {
                const newArray = [...old, newAlert.newAlert]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return newArray
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alertsData, setAlerts, newAlert, setAlertCount])



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

                            <Grid
                                direction="column"
                                alignItems="stretch"
                                item
                                xs={12}
                                style={{ marginLeft: '10px', marginRight: '10px', marginTop: '40px' }}
                            >
                                <GradientBox
                                    style={makeBoxStyles()}
                                    color="theme_white"
                                    p={3}
                                >
                                    <Typography variant="button" gutterBottom>
                                        sent announcements
                                    </Typography>
                                    <hr className="tw-h-px  tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                                    <Alerts alerts={alerts} />
                                </GradientBox>

                            </Grid>
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
