import React, { useState, useRef, useCallback } from 'react';
import QrReader from 'react-qr-reader';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Avatar, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Tag } from 'antd';
import { RegistrationStatuses } from '@hackjunction/shared';

import Modal from 'components/generic/Modal';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import UserProfilesService from 'services/userProfiles';

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 200,
        height: 200,
        margin: theme.spacing(2)
    }
}));

const QRCodeReaderModal = ({ open, onClose, enqueueSnackbar, registrationsMap, event, editRegistration }) => {
    const classes = useStyles();
    const reader = useRef(null);
    const [user, setUser] = useState();
    const [legacyMode, setLegacyMode] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleError = useCallback(() => {
        enqueueSnackbar('Error scanning QR code', { variant: 'error' });
        setLegacyMode(true);
    }, [enqueueSnackbar]);

    const handleCheckIn = useCallback(() => {
        setLoading(true);
        const registration = registrationsMap[user.userId];
        editRegistration(registration._id, { status: RegistrationStatuses.asObject.checkedIn.id }, event.slug)
            .then(() => {
                enqueueSnackbar('Changed status to checked in', { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [editRegistration, event, registrationsMap, enqueueSnackbar, user]);

    const handleScan = useCallback(
        data => {
            if (data) {
                setLoading(true);
                UserProfilesService.getPublicUserProfiles(data)
                    .then(users => {
                        if (users.length === 0) {
                            enqueueSnackbar('Unknown user', { variant: 'warning' });
                        } else {
                            setUser(users[0]);
                        }
                    })
                    .catch(err => {
                        enqueueSnackbar('Unknown error', { variant: 'error' });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                if (legacyMode) {
                    enqueueSnackbar('No QR code detected, please upload another image', { variant: 'error' });
                }
            }
        },
        [enqueueSnackbar, legacyMode]
    );

    const renderRegistrationInfo = () => {
        const registration = registrationsMap[user.userId];
        if (!registration) {
            return (
                <React.Fragment>
                    <Typography variant="subtitle1" color="secondary" align="center">
                        No registration found!
                    </Typography>
                </React.Fragment>
            );
        }
        const status = RegistrationStatuses.asObject[registration.status];

        return (
            <React.Fragment>
                <Typography variant="subtitle1" color="textSecondary" align="center">
                    Registration status: <br />
                    <Tag color={status.color}>{status.label}</Tag>
                </Typography>
                <Box mt={2} />
                {renderActions(status)}
            </React.Fragment>
        );
    };

    const renderActions = status => {
        if (!status) return null;
        switch (status.id) {
            case RegistrationStatuses.asObject.confirmed.id: {
                return (
                    <Button color="primary" variant="contained" onClick={handleCheckIn}>
                        Check in
                    </Button>
                );
            }
            default:
                return (
                    <Button color="primary" variant="contained" onClick={() => setUser()}>
                        Scan again
                    </Button>
                );
        }
    };

    if (!open) return null;

    return (
        <Modal isOpen={true} handleClose={onClose} size="max">
            <Box p={5} display="flex" height="100%" flexDirection="column" alignItems="center" justifyContent="center">
                {loading ? (
                    <CircularProgress size={24} />
                ) : user ? (
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            alt={`${user.firstName} ${user.lastName}`}
                            src={user.avatar}
                            className={classes.avatar}
                        />
                        <Typography variant="h6" align="center">
                            {user.firstName} {user.lastName}
                        </Typography>
                        {renderRegistrationInfo()}
                    </Box>
                ) : (
                    <React.Fragment>
                        <QrReader
                            ref={reader}
                            delay={500}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%', maxWidth: 600 }}
                            facingMode="environment"
                            legacyMode={legacyMode}
                        />
                        <Box p={2}>
                            <Typography variant="subtitle1">Camera not working?</Typography>
                            <Box mt={1} />
                            <Button variant="contained" onClick={() => reader.current.openImageDialog()}>
                                Take a picture
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Modal>
    );
};

const mapState = state => ({
    registrationsMap: OrganiserSelectors.registrationsMap(state),
    event: OrganiserSelectors.event(state)
});

const mapDispatch = dispatch => ({
    editRegistration: (registrationId, data, slug) =>
        dispatch(OrganiserActions.editRegistration(registrationId, data, slug))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(QRCodeReaderModal)
);
