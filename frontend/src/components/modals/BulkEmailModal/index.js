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
import Container from 'components/generic/Container'
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
import { useTranslation } from 'react-i18next'

export default ({ visible, userIds = [], onClose }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const user = useSelector(UserSelectors.userProfile)
    const event = useSelector(OrganiserSelectors.event)
    const [loading, setLoading] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const headerImage = useFormField('')
    const { t } = useTranslation()
    const subject = useFormField('', value => {
        if (!value || value.length === 0) {
            return t('Subject_required_')
        }
        if (value.length > 50) {
            return t('Subject_most_chars_')
        }

        return
    })
    const subtitle = useFormField('')
    const body = useFormField('', value => {
        if (!body || body.length === 0) {
            return t('Body_required_')
        }

        if (body.length > 1000) {
            return t('Body_most_chars_')
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
                        return t('Call_to_action_required_')
                    }
                    if (value.indexOf('http') !== 0) {
                        return t('Call_to_action_valid_')
                    }
                }
                return
            },
            [ctaText.value, t],
        ),
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
        EmailService.sendPreviewEmail({ idToken: idToken, slug: event.slug, to: user.email, params: params })
            .then(() => {
                dispatch(
                    SnackbarActions.success(
                        t('Test_email_sent_', { user: user.email }),
                    ),
                )
            })
            .catch(err => {
                dispatch(SnackbarActions.error(t('Something_wrong_')))
            })
            .finally(() => {
                setLoading(false)
            })
        return null
    }, [validate, idToken, event.slug, user.email, params, dispatch, t])

    const handleConfirm = useCallback(() => {
        if (!validate()) return
        setLoading(true)
        EmailService.sendBulkEmail(
            idToken,
            event.slug,
            userIds,
            params,
            messageId.value,
        )
            .then(data => {
                dispatch(
                    SnackbarActions.success(t(''), { autoHideDuration: 5000 }),
                )
            })
            .catch(err => {
                dispatch(SnackbarActions.error(t('Something_wrong_')))
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
        t,
    ])

    if (!userIds.length) return null

    return (
        <Dialog fullScreen open={visible} onClose={onClose}>
            <DialogContent>
                <PageWrapper loading={loading} wrapContent={false}>
                    <Container center>
                        <ConfirmDialog
                            open={confirmModalOpen}
                            title={t('Sure_')}
                            message={t('Will_send_to_', {
                                amount: userIds.length,
                            })}
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
                            {t('Send_email_selected_')}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextInput
                                    value={headerImage.value}
                                    onChange={headerImage.setValue}
                                    error={headerImage.error}
                                    rawOnChange
                                    label={t('URL_header_')}
                                    helperText={t('URL_helper_')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={subject.value}
                                    onChange={subject.setValue}
                                    error={subject.error}
                                    rawOnChange
                                    label={t('Subject_')}
                                    helperText={t('Subect_helper_')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={subtitle.value}
                                    onChange={subtitle.setValue}
                                    error={subtitle.error}
                                    rawOnChange
                                    label={t('Subtitle_')}
                                    helperText={t('Subtitle_helper_')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextAreaInput
                                    value={body.value}
                                    textarea
                                    onChange={body.setValue}
                                    rawOnChange
                                    label={t('Message_body_')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={messageId.value}
                                    onChange={messageId.setValue}
                                    error={messageId.error}
                                    rawOnChange
                                    label={t('Unique_message_id')}
                                    helperText={t('Enter_unique_')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={ctaText.value}
                                    onChange={ctaText.setValue}
                                    error={ctaText.error}
                                    rawOnChange
                                    label={t('Call_to_action_')}
                                    helperText={t('Call_to_action_helper_')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    value={ctaLink.value}
                                    onChange={ctaLink.setValue}
                                    error={ctaLink.error}
                                    rawOnChange
                                    label={t('Call_to_action_link_')}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </PageWrapper>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Box p={1} />
                <Button onClick={handleTestEmail}>{t('Send_yourself_')}</Button>
                <Box p={1} />
                <Button
                    loading={loading}
                    variant="contained"
                    color="primary"
                    onClick={setConfirmModalOpen}
                >
                    {t('Send_to_recipients_', { amount: userIds.length })}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
