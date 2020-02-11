import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Typography,
    Grid,
    Box,
    Dialog,
    DialogContent,
    DialogActions,
} from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'
import PageHeader from 'components/generic/PageHeader'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import ConfirmDialog from 'components/generic/ConfirmDialog'
import Button from 'components/generic/Button'

import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useFormField } from 'hooks/formHooks'
import EmailService from 'services/email'

export default ({ visible, userIds = [], onClose }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const user = useSelector(UserSelectors.userProfile)
    const event = useSelector(OrganiserSelectors.event)
    const [loading, setLoading] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const headerImage = useFormField('')
    const subject = useFormField('', value => {
        if (!value || value.length === 0) {
            return 'Message subject is required!'
        }
        if (value.length > 50) {
            return 'Message subject can be at most 50 characters'
        }

        return
    })
    const subtitle = useFormField('')
    const body = useFormField('', value => {
        if (!body || body.length === 0) {
            return 'Message body is required!'
        }

        if (body.length > 1000) {
            return 'Message body can be at most 1000 characters'
        }

        return
    })
    const messageId = useFormField('')
    const ctaText = useFormField('')
    const ctaLink = useFormField(
        '',
        useCallback(
            value => {
                if (ctaText.value && ctaText.value.length > 0) {
                    if (!value || value.length === 0) {
                        return 'Call to action link is required, if call to action title is entered'
                    }
                    if (value.indexOf('http') !== 0) {
                        return 'Call to action link must be a valid url, starting with http...'
                    }
                }
                return
            },
            [ctaText.value]
        )
    )

    const fields = [
        headerImage,
        subject,
        subtitle,
        body,
        messageId,
        ctaText,
        ctaLink,
    ]

    const params = {
        subject: subject.value,
        subtitle: subtitle.value,
        header_image: headerImage.value,
        body: body.value,
        cta_text: ctaText.value,
        cta_link: ctaLink.value,
    }

    const validate = useCallback(() => {
        const errors = fields
            .map(field => {
                return field.validate()
            })
            .filter(error => typeof error !== 'undefined')

        if (errors.length > 0) {
            errors.forEach(error => {
                dispatch(SnackbarActions.error(error))
            })
            return false
        }
        return true
    }, [dispatch, fields])

    const handleTestEmail = useCallback(() => {
        if (!validate()) return
        setLoading(true)
        EmailService.sendPreviewEmail(idToken, event.slug, user.email, params)
            .then(() => {
                dispatch(
                    SnackbarActions.success('Test email sent to ' + user.email)
                )
            })
            .catch(err => {
                dispatch(SnackbarActions.error('Something went wrong...'))
            })
            .finally(() => {
                setLoading(false)
            })
        return null
    }, [validate, idToken, event.slug, user.email, params, dispatch])

    const handleConfirm = useCallback(() => {
        if (!validate()) return
        setLoading(true)
        EmailService.sendBulkEmail(
            idToken,
            event.slug,
            userIds,
            params,
            messageId.value
        )
            .then(data => {
                dispatch(
                    SnackbarActions.success(
                        `Email sent to ${userIds.length} recipients`,
                        { autoHideDuration: 5000 }
                    )
                )
            })
            .catch(err => {
                dispatch(SnackbarActions.error('Something went wrong...'))
            })
            .finally(() => {
                setLoading(false)
                onClose()
            })
    }, [
        validate,
        idToken,
        event.slug,
        userIds,
        params,
        messageId.value,
        dispatch,
        onClose,
    ])

    if (!userIds.length) return null

    return (
        <Dialog fullScreen open={visible} onClose={onClose}>
            <DialogContent>
                <PageWrapper loading={loading} wrapContent={false}>
                    <CenteredContainer>
                        <ConfirmDialog
                            open={confirmModalOpen}
                            title="Are you sure?"
                            message={`This will send an email to ${userIds.length} recipient(s). If you haven't yet, please send the email to yourself and make sure it looks like you want.`}
                            onClose={setConfirmModalOpen}
                            onOk={handleConfirm}
                        />
                        <PageHeader
                            heading="Bulk email"
                            subheading={
                                userIds.length + ' selected participants'
                            }
                        />
                        <Typography variant="body1" paragraph>
                            Here you can send an email to all selected
                            participants. Type in your own email address below
                            to test the email before sending it out to everyone!
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextInput
                                    value={headerImage.value}
                                    onChange={headerImage.setValue}
                                    error={headerImage.error}
                                    rawOnChange
                                    label="Header image url"
                                    helperText="Url to a header image for your email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={subject.value}
                                    onChange={subject.setValue}
                                    error={subject.error}
                                    rawOnChange
                                    label="Subject"
                                    helperText="The subject line of your message"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={subtitle.value}
                                    onChange={subtitle.setValue}
                                    error={subtitle.error}
                                    rawOnChange
                                    label="Subtitle"
                                    helperText="A subtitle to be shown under the subject (optional)"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextAreaInput
                                    value={body.value}
                                    textarea
                                    onChange={body.setValue}
                                    rawOnChange
                                    label="Message body"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={messageId.value}
                                    onChange={messageId.setValue}
                                    error={messageId.error}
                                    rawOnChange
                                    label="Unique message id"
                                    helperText=" If you want, you can enter a unique message id here. Messages with the same id will only be sent
                                once to a given participant - this is useful if you want to avoid sending out the same message to a
                                participant who has already received it earlier."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={ctaText.value}
                                    onChange={ctaText.setValue}
                                    error={ctaText.error}
                                    rawOnChange
                                    label="Call to action title"
                                    helperText="If your want a Call to Action button in your email, enter the text for the button here."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={ctaLink.value}
                                    onChange={ctaLink.setValue}
                                    error={ctaLink.error}
                                    rawOnChange
                                    label="Call to action link"
                                />
                            </Grid>
                        </Grid>
                    </CenteredContainer>
                </PageWrapper>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Box p={1} />
                <Button onClick={handleTestEmail}>Send to yourself</Button>
                <Box p={1} />
                <Button
                    loading={loading}
                    variant="contained"
                    color="primary"
                    onClick={setConfirmModalOpen}
                >
                    Send to {userIds.length} recipients
                </Button>
            </DialogActions>
        </Dialog>
    )
}
