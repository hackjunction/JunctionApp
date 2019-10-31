import React, { useCallback, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { RegistrationStatuses } from '@hackjunction/shared';
import { withSnackbar } from 'notistack';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    CircularProgress,
    Typography
} from '@material-ui/core';

import Button from 'components/generic/Button';
import GradientBox from 'components/generic/GradientBox';

import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const RegistrationStatusBlock = ({
    event,
    registration,
    confirmRegistration,
    cancelRegistration,
    isRegistrationOpen,
    editRegistration,
    enqueueSnackbar
}) => {
    const [loading, setLoading] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const { status } = registration;
    const handleConfirm = useCallback(() => {
        setLoading(true);
        confirmRegistration(event.slug)
            .catch(err => {
                enqueueSnackbar('Something went wrong, please try again', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [event.slug, confirmRegistration, enqueueSnackbar]);

    const handleCancel = useCallback(() => {
        setLoading(true);
        cancelRegistration(event.slug)
            .catch(() => {
                enqueueSnackbar('Something went wrong while cancelling your participation', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [event.slug, cancelRegistration, enqueueSnackbar]);

    const color = useMemo(() => {
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                return 'theme_lightgray';
            }
            case RegistrationStatuses.asObject.rejected.id: {
                return 'error';
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return 'theme_success';
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return 'theme_turquoise';
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return 'theme_orange';
            }
            default:
                return null;
        }
    }, [status]);

    const title = useMemo(() => {
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                return 'Pending';
            }
            case RegistrationStatuses.asObject.rejected.id: {
                return 'Rejected';
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return 'Accepted';
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return 'Cancelled';
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return 'Confirmed';
            }
            default:
                return null;
        }
    }, [status]);

    const body = useMemo(() => {
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                return "Your registration is being processed! You'll receive an email notification when we've made the decision, so stay tuned! If you wish, you can still tweak your registration to maximise your chances of being accepted.";
            }
            case RegistrationStatuses.asObject.rejected.id: {
                return "Unfortunately you didn't quite make it this time...But don't be discouraged, we get a lot of applications and sometimes we have to reject even very talented applicants. Luckily we organise events all of the time, and we would love to have you at one of our other events.";
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return `Congratulations, your application has been accepted! Welcome to ${event.name}! You'll still need to confirm your participation to lock in your spot though - please click the button below to do so.`;
            }
            case RegistrationStatuses.asObject.cancelled.id: {
                return "You've cancelled your participation - bummer. We'd love to see you attend one of our other events, see the event calendar below for more information. If something has gone horribly wrong and you've cancelled your participation by accident, please contact us at participants@hackjunction.com as soon as possible.";
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return 'Awesome, thanks for confirming your participation! You should probably start making travel and other arrangements as soon as possible. Once you do arrive at the venue, show your Event ID at the registration to gain access to the venue!';
            }
            default:
                return null;
        }
    }, [event, status]);

    const action = useMemo(() => {
        switch (status) {
            case RegistrationStatuses.asObject.pending.id:
            case RegistrationStatuses.asObject.softAccepted.id:
            case RegistrationStatuses.asObject.softRejected.id: {
                return (
                    <Button onClick={() => editRegistration(event.slug)} color="primary" variant="contained">
                        Edit registration
                    </Button>
                );
            }
            case RegistrationStatuses.asObject.rejected.id:
            case RegistrationStatuses.asObject.cancelled.id: {
                return (
                    <Button
                        onClick={() => window.open('https://hackjunction.com/calendar', '_blank')}
                        color="theme_white"
                        variant="contained"
                    >
                        Junction event calendar
                    </Button>
                );
            }
            case RegistrationStatuses.asObject.accepted.id: {
                return (
                    <React.Fragment>
                        <Button onClick={handleConfirm} color="theme_white" variant="contained">
                            Confirm participation
                        </Button>
                        <Button onClick={() => setCancelDialogOpen(true)} color="theme_white">
                            Can't make it after all?
                        </Button>
                    </React.Fragment>
                );
            }
            case RegistrationStatuses.asObject.confirmed.id: {
                return (
                    <Button onClick={() => setCancelDialogOpen(false)} color="theme_white" variant="contained">
                        Cancel participation
                    </Button>
                );
            }
            default:
                return null;
        }
    }, [event, status, editRegistration, handleConfirm]);

    if (!title) {
        return null;
    }

    return (
        <GradientBox p={3} color={color}>
            <Dialog
                open={cancelDialogOpen}
                onClose={() => setCancelDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Cancel your participation?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you wish to cancel your participation? This means your spot will be given to
                        someone on the waiting list, and you won't be able to attend the event yourself. If you really
                        can't make it, please cancel your participation so we can take someone else instead.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {loading && <CircularProgress size={24} />}
                    <Button
                        size="small"
                        strong
                        disabled={loading}
                        onClick={() => setCancelDialogOpen(false)}
                        color="text"
                    >
                        No, I don't want to cancel
                    </Button>
                    <Button size="small" disabled={loading} onClick={handleCancel} color="secondary" strong>
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
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state),
    isRegistrationOpen: DashboardSelectors.isRegistrationOpen(state)
});

const mapDispatch = dispatch => ({
    confirmRegistration: slug => dispatch(DashboardActions.confirmRegistration(slug)),
    cancelRegistration: slug => dispatch(DashboardActions.cancelRegistration(slug)),
    editRegistration: slug => dispatch(push(`/events/${slug}/register`))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(RegistrationStatusBlock)
);
