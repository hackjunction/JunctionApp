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
            case RegistrationStatuses.asObject.accepted.id:
            case RegistrationStatuses.asObject.confirmed.id:
            case RegistrationStatuses.asObject.checkedIn.id: {
                return 'theme_turquoise'
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return 'theme_orange'
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
            case RegistrationStatuses.asObject.cancelled.id: {
                return 'Cancelled'
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return 'Confirmed'
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
                    return t('registration_info_open_')
                } else {
                    return t('registration_info_closed_')
                }
            }
            case RegistrationStatuses.asObject.rejected.id: {
                return t('registration_info_rejected_')
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return t('registration_info_accepted_', {
                    eventName: event.name,
                })
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return t('registration_info_cancelled_')
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return t('registration_info_confirmed_')
            }
            case RegistrationStatuses.asObject.checkedIn.id: {
                return t('registration_info_checked_in_', {
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
            case RegistrationStatuses.asObject.accepted.id: {
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
                                Can't make it after all?
                            </Button>
                        </Box>
                        <Box ml={1} mt={1}>
                            <Button
                                onClick={handleConfirm}
                                color="theme_white"
                                variant="contained"
                            >
                                Confirm participation
                            </Button>
                        </Box>
                    </Box>
                )
            }
            case RegistrationStatuses.asObject.confirmed.id: {
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
                                Cancel participation
                            </Button>
                        </Box>
                        <Box ml={1} mt={1}>
                            <Button
                                onClick={() =>
                                    dispatch(
                                        push(
                                            `/dashboard/${event.slug}/event-id`,
                                        ),
                                    )
                                }
                                color="theme_white"
                                variant="contained"
                            >
                                Your event ID
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
                        Cancel your participation?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you wish to cancel your participation?
                            This means your spot will be given to someone on the
                            waiting list, and you won't be able to attend the
                            event yourself. If you really can't make it, please
                            cancel your participation so we can take someone
                            else instead.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {loading && <CircularProgress size={24} />}
                        <Button
                            loading={loading}
                            onClick={() => setCancelDialogOpen(false)}
                            color="primary"
                        >
                            No, I don't want to cancel
                        </Button>
                        <Button
                            loading={loading}
                            onClick={handleCancel}
                            color="secondary"
                        >
                            Yes, I'm sure
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography key="overline" variant="button" color="inherit">
                    Registration status
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
