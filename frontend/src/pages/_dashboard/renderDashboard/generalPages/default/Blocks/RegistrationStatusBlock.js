import React, { useCallback, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { RegistrationStatuses } from '@hackjunction/shared'
import moment from 'moment-timezone'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    CircularProgress,
    Typography,
    Box,
    Grid,
} from '@material-ui/core'

import Button from 'components/generic/Button'
import GradientBox from 'components/generic/GradientBox'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import config from 'constants/config'

import { useTranslation } from 'react-i18next'

// TODO can't read null
export default () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const isRegistrationOpen = useSelector(
        DashboardSelectors.isRegistrationOpen,
    )

    const [loading, setLoading] = useState(false)
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const { status } = registration

    const handleConfirm = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.confirmRegistration(event.slug))
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong, please try again',
                    ),
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch, event.slug])

    const handleCancel = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.cancelRegistration(event.slug))
            .catch(() => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong while cancelling your participation',
                    ),
                )
            })
            .finally(() => {
                setCancelDialogOpen(false)
                setLoading(false)
            })
    }, [dispatch, event.slug])

    const color = useMemo(() => {
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                return 'theme_turquoise'
            }
            case RegistrationStatuses.asObject.rejected.id: {
                return 'error'
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return 'success'
            }
            case RegistrationStatuses.asObject.acceptedToHub.id: {
                return 'success'
            }
            case RegistrationStatuses.asObject.confirmed.id:
            case RegistrationStatuses.asObject.confirmedToHub.id:
            case RegistrationStatuses.asObject.checkedIn.id: {
                return 'primary'
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return 'warning'
            }
            default:
                return null
        }
    }, [status])

    const title = useMemo(() => {
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                return 'Pending'
            }
            case RegistrationStatuses.asObject.rejected.id: {
                return 'Rejected'
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return 'Accepted'
            }
            case RegistrationStatuses.asObject.acceptedToHub.id: {
                return 'Accepted to Hub'
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return 'Cancelled'
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return 'Confirmed'
            }
            case RegistrationStatuses.asObject.confirmedToHub.id: {
                return 'Confirmed to Hub'
            }
            // case RegistrationStatuses.asObject.checkedIn.id: {
            //     switch (event.eventType) {
            //         case EventTypes.physical.id:
            //             return 'Checked in';
            //         default:
            //             return 'Completed';
            //     }
            // }
            default:
                return null
        }
    }, [status])

    const body = useMemo(() => {
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                if (isRegistrationOpen) {
                    return t('Registration_info_open_')
                } else {
                    return t('Registration_info_closed_')
                }
            }
            case RegistrationStatuses.asObject.rejected.id: {
                return t('Registration_info_rejected_')
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return t('Registration_info_accepted_', {
                    eventName: event.name,
                })
            }
            case RegistrationStatuses.asObject.acceptedToHub.id: {
                return t('Registration_info_accepted_', {
                    eventName: event.name,
                })
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return t('Registration_info_cancelled_')
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return t('Registration_info_confirmed_')
            }
            case RegistrationStatuses.asObject.confirmedToHub.id: {
                return t('Registration_info_confirmed_')
            }
            case RegistrationStatuses.asObject.checkedIn.id: {
                return t('Registration_info_checked_in_', {
                    time: moment(event.startTime).format('LLLL'),
                })
            }
            default:
                return null
        }
    }, [status, isRegistrationOpen, t, event.name, event.startTime])

    const action = useMemo(() => {
        if (!event) return null
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                if (isRegistrationOpen) {
                    return (
                        <Button
                            onClick={() =>
                                dispatch(push(`/events/${event.slug}/register`))
                            }
                            color="theme_white"
                            variant="contained"
                        >
                            {t('Edit_registration_')}
                        </Button>
                    )
                }
                return null
            }
            case RegistrationStatuses.asObject.rejected.id:
            case RegistrationStatuses.asObject.cancelled.id: {
                return (
                    <Button
                        onClick={() =>
                            window.open(config.CALENDAR_URL, '_blank')
                        }
                        color="theme_white"
                        variant="contained"
                    >
                        {config.PLATFORM_OWNER_NAME} event calendar
                    </Button>
                )
            }

            case RegistrationStatuses.asObject.accepted.id:
            case RegistrationStatuses.asObject.acceptedToHub.id: {
                return (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        flexWrap="wrap"
                    >
                        <Box ml={1} mt={1}>
                            <Button
                                onClick={() => setCancelDialogOpen(true)}
                                color="theme_white"
                            >
                                {t('Must_cancel_participation_')}
                            </Button>
                        </Box>
                        <Box ml={1} mt={1}>
                            <Button
                                onClick={handleConfirm}
                                color="theme_white"
                                variant="contained"
                            >
                                {t('Confirm_participation_')}
                            </Button>
                        </Box>
                    </Box>
                )
            }
            case RegistrationStatuses.asObject.confirmed.id:
            case RegistrationStatuses.asObject.confirmedToHub.id: {
                return (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        flexWrap="wrap"
                    >
                        <Box ml={1} mt={1}>
                            <Button
                                onClick={() => setCancelDialogOpen(true)}
                                color="theme_white"
                            >
                                {t('Must_cancel_confirmed_participation_')}
                            </Button>
                        </Box>
                        <Box ml={1} mt={1}>
                            <Button
                                onClick={() =>
                                    dispatch(
                                        push(
                                            `/dashboard/event/${event.slug}/event-id`,
                                        ),
                                    )
                                }
                                color="theme_white"
                                variant="contained"
                            >
                                {t('View_event_id_')}
                            </Button>
                        </Box>
                    </Box>
                )
            }
            default:
                return null
        }
    }, [event, status, isRegistrationOpen, t, dispatch, handleConfirm])

    if (!title) {
        return null
    }
    return (
        <Grid item xs={12}>
            <GradientBox p={3} color={color}>
                <Dialog
                    open={cancelDialogOpen}
                    onClose={() => setCancelDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {t('Cancel_participation_question_')}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t('Cancel_participation_message_')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {loading && <CircularProgress size={24} />}
                        <Button
                            loading={loading}
                            onClick={() => setCancelDialogOpen(false)}
                            color="primary"
                        >
                            {t('Cancel_participation_no_')}
                        </Button>
                        <Button
                            loading={loading}
                            onClick={handleCancel}
                            color="secondary"
                        >
                            {t('Cancel_participation_yes_')}
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography key="overline" variant="button" color="inherit">
                    {t('Registration_status_')}
                </Typography>
                <Typography key="title" variant="h4" color="inherit" paragraph>
                    {title}
                </Typography>
                <Typography key="body" variant="body1" paragraph>
                    {body}
                </Typography>
                {action}
            </GradientBox>
        </Grid>
    )
}
