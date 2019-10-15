import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { RegistrationStatuses } from '@hackjunction/shared';
import { withSnackbar } from 'notistack';
import {
    Button,
    Link,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    CircularProgress
} from '@material-ui/core';

import NotificationBlock from 'components/generic/NotificationBlock';

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

    if (!registration || !event) return <NotificationBlock loading />;

    switch (registration.status) {
        case RegistrationStatuses.asObject.pending.id:
        case RegistrationStatuses.asObject.softAccepted.id:
        case RegistrationStatuses.asObject.softRejected.id: {
            const bottom = isRegistrationOpen ? (
                <Button color="primary" size="small" onClick={() => editRegistration(event.slug)}>
                    Edit your registration
                </Button>
            ) : null;
            const body = isRegistrationOpen
                ? "Your registration is being processed! You'll receive an email notification when we've made the decision, so stay tuned! If you wish, you can still tweak your registration to maximise your chances of being accepted."
                : "Your registration is being processed! You'll receive an email notification when we've made the decision, so stay tuned! The registration period is now over and you can no longer edit your application.";
            return (
                <NotificationBlock
                    type="info"
                    title="Registration status:"
                    titleExtra="Pending"
                    body={body}
                    bottom={bottom}
                />
            );
        }
        case RegistrationStatuses.asObject.accepted.id: {
            return (
                <React.Fragment>
                    <NotificationBlock
                        type="success"
                        title="Registration status:"
                        titleExtra="Accepted"
                        body={`Congratulations, your application has been accepted! Welcome to ${event.name}! You'll still need to confirm your participation to lock in your spot though - please click the button below to do so.`}
                        bottomLoading={loading}
                        bottom={
                            <React.Fragment>
                                <Box m={1}>
                                    <Button size="small" onClick={() => setCancelDialogOpen(true)}>
                                        Can't make it after all?
                                    </Button>
                                </Box>
                                <Button color="primary" variant="contained" onClick={handleConfirm}>
                                    Confirm participation
                                </Button>
                            </React.Fragment>
                        }
                    />
                    <Dialog
                        open={cancelDialogOpen}
                        onClose={() => setCancelDialogOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Cancel your participation?</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you wish to cancel your participation? This means your spot will be given
                                to someone on the waiting list, and you won't be able to attend the event yourself. If
                                you really can't make it, please cancel your participation so we can take someone else
                                instead.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {loading && <CircularProgress size={24} />}
                            <Button disabled={loading} onClick={() => setCancelDialogOpen(false)}>
                                No, I don't want to cancel
                            </Button>
                            <Button disabled={loading} onClick={handleCancel} color="secondary">
                                Yes, I'm sure
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            );
        }
        case RegistrationStatuses.asObject.rejected.id: {
            return (
                <NotificationBlock
                    type="error"
                    title={'Registration Status:'}
                    titleExtra={'Rejected'}
                    body={
                        "Unfortunately you didn't quite make it this time...But don't be discouraged, we get a lot of applications and sometimes we have to reject even very talented applicants. Luckily we organise events all of the time, and we would love to have you at one of our other events - see the event calendar below :)"
                    }
                    bottom={
                        <Link
                            variant="button"
                            textAlign="center"
                            target="_blank"
                            href="https://www.hackjunction.com/calendar"
                        >
                            Junction event calendar
                        </Link>
                    }
                />
            );
        }
        case RegistrationStatuses.asObject.cancelled.id: {
            return (
                <NotificationBlock
                    type="error"
                    title={'Registration Status:'}
                    titleExtra={'Cancelled'}
                    body={
                        "You've cancelled your participation - bummer. We'd love to see you attend one of our other events, see the event calendar below for more information. If something has gone horribly wrong and you've cancelled your participation by accident, please contact us at participants@hackjunction.com as soon as possible."
                    }
                    bottom={
                        <Link
                            variant="button"
                            textAlign="center"
                            target="_blank"
                            href="https://www.hackjunction.com/calendar"
                        >
                            Junction event calendar
                        </Link>
                    }
                />
            );
        }
        default:
            return <NotificationBlock loading />;
    }
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
