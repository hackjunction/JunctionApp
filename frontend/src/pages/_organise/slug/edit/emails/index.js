import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, Typography, Box } from '@material-ui/core'
import { FastField, useFormikContext } from 'formik'

import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import Button from 'components/generic/Button'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import EmailService from 'services/email'
import { useTranslation } from 'react-i18next'

export default () => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const user = useSelector(UserSelectors.userProfile)
    const event = useSelector(OrganiserSelectors.event)
    const [loading, setLoading] = useState({
        acceptanceEmail: false,
        rejectionEmail: false,
        registrationEmail: false,
    })
    const { t } = useTranslation()
    const { values } = useFormikContext()

    // function to extract email params from formik values
    const extractEmailParams = (emailConfig, type) => {
        return {
            subject: emailConfig[type].title,
            subtitle: emailConfig[type].subtitle,
            body: emailConfig[type].body,
        }
    }

    const handleTestEmail = useCallback(async (values, emailType) => {
        setLoading(prevState => ({ ...prevState, [emailType]: true }))

        let params
        switch (emailType) {
            case 'acceptanceEmail':
            case 'rejectionEmail':
            case 'registrationEmail':
                params = extractEmailParams(values.emailConfig, emailType)
                break
            default:
                params = extractEmailParams(values.emailConfig, 'acceptanceEmail')
        }

        const senderEmail = values.emailConfig.senderEmail // email to send to oneself
        const from = {
            name: values.emailConfig.senderName,
            email: senderEmail,
        }

        const PLACEHOLDERS_HINT = "You can use the following placeholders: {USER_ID}, {FIRST_NAME}, {LAST_NAME}, {EVENT_NAME}, {REGISTRATION_START_TIME}, {REGISTRATION_END_TIME}, {SUBMISSION_START_TIME}, {SUBMISSION_END_TIME}, {REVIEW_START_TIME}, {REVIEW_END_TIME}, {EVENT_START_TIME}, {EVENT_END_TIME}, {CURRENT_TIME}. For example, to greet the user with their first name, you can use 'Hi {FIRST_NAME}, ...' in the email body. If you want to use the current time, you can use {CURRENT_TIME} in the email body. The time placeholders will be replaced with the time in the timezone of the event."


        await EmailService.sendPreviewEmail({ idToken: idToken, slug: event.slug, to: senderEmail, params, from })
            .then(() => {
                dispatch(
                    SnackbarActions.success(
                        t('Test_email_sent_', { user: senderEmail }),
                    ),
                )
            })
            .catch(err => {
                dispatch(SnackbarActions.error(t('Something_wrong_')))
            })
            .finally(() => {
                setLoading(prevState => ({ ...prevState, [emailType]: false }))
            })
        return null
    }, [idToken, event.slug, user.email, dispatch, t])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="emailConfig.senderEmail"
                    render={({ field, form }) => (
                        <FormControl
                            label="Sender"
                            hint="Sender details for emails sent from the platform"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Sender Email</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.senderEmail"
                                    placeholder="Sender's email"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.senderName"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Sender Name</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.senderName"
                                            placeholder="Sender's name"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="emailConfig.acceptanceEmail.title"
                    render={({ field, form }) => (
                        <FormControl
                            label="Acceptance Email"
                            hint="Email sent to the participant when their registration is accepted"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.acceptanceEmail.title"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.acceptanceEmail.subtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.acceptanceEmail.subtitle"
                                            placeholder="Email subtitle"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                            <FastField
                                name="emailConfig.acceptanceEmail.body"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="emailConfig.acceptanceEmail.body"
                                            placeholder="Email body"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
                <Grid item xs={12}>
                    <Box mt={1}>
                        <Button
                            loading={loading.acceptanceEmail}
                            variant="contained"
                            color="primary"
                            onClick={() => handleTestEmail(values, 'acceptanceEmail')}
                        >
                            {t('Send_yourself_')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="emailConfig.rejectionEmail.title"
                    render={({ field, form }) => (
                        <FormControl
                            label="Rejection Email"
                            hint="Email sent to the participant when their registration is rejected"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.rejectionEmail.title"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.rejectionEmail.subtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.rejectionEmail.subtitle"
                                            placeholder="Email subtitle"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                            <FastField
                                name="emailConfig.rejectionEmail.body"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="emailConfig.rejectionEmail.body"
                                            placeholder="Email body"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
                <Grid item xs={12}>
                    <Box mt={1}>
                        <Button
                            loading={loading.rejectionEmail}
                            variant="contained"
                            color="primary"
                            onClick={() => handleTestEmail(values, 'rejectionEmail')}
                        >
                            {t('Send_yourself_')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="emailConfig.registrationEmail.title"
                    render={({ field, form }) => (
                        <FormControl
                            label="Registration Email"
                            hint="Email sent to the participant when they register for the event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.registrationEmail.title"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.registrationEmail.subtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.registrationEmail.subtitle"
                                            placeholder="Email subtitle"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                            <FastField
                                name="emailConfig.registrationEmail.body"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="emailConfig.registrationEmail.body"
                                            placeholder="Email body"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
                <Grid item xs={12}>
                    <Box mt={1}>
                        <Button
                            loading={loading.registrationEmail}
                            variant="contained"
                            color="primary"
                            onClick={() => handleTestEmail(values, 'registrationEmail')}
                        >
                            {t('Send_yourself_')}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Grid >
    )
}
