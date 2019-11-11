import React, { useCallback, useState } from 'react';

import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { RegistrationStatuses } from '@hackjunction/shared';

import PageHeader from 'components/generic/PageHeader';
import Button from 'components/generic/Button';
import Reader from './Reader';

import RegistrationsService from 'services/registrations';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const useStyles = makeStyles(theme => ({
    card: {
        background: 'white',
        padding: theme.spacing(2),
        boxShadow: '0px 3px 15px rgba(0,0,0,0.1)'
    }
}));

const CheckIn = ({ idToken, event, enqueueSnackbar }) => {
    const classes = useStyles();
    const { slug } = event;
    const [loading, setLoading] = useState(false);
    const [registration, setRegistration] = useState();

    const handleCheckIn = useCallback(() => {
        setLoading(true);
        RegistrationsService.editRegistration(idToken, slug, registration._id, {
            status: RegistrationStatuses.asObject.checkedIn.id
        })
            .then(registration => {
                setRegistration(registration);
                enqueueSnackbar('Success!', { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong... Please try again.', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [registration, slug, idToken, enqueueSnackbar]);

    const handleScan = useCallback(
        data => {
            setLoading(true);
            RegistrationsService.getFullRegistration(idToken, slug, data)
                .then(data => {
                    setRegistration(data);
                })
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        enqueueSnackbar('User not found', { variant: 'error' });
                    } else {
                        enqueueSnackbar('Something went wrong... Please try again', { variant: 'error' });
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [idToken, slug, enqueueSnackbar]
    );

    const handleError = useCallback(
        err => {
            enqueueSnackbar('Something went wrong... Please try again', { variant: 'error' });
        },
        [enqueueSnackbar]
    );

    return (
        <Box>
            <PageHeader
                heading="Check-in"
                subheading="Read participants' QR codes with the below reader to check them in to the event!"
            />
            {loading && (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size={24} />
                </Box>
            )}
            {!loading && !registration && <Reader onResult={handleScan} onError={handleError} />}
            {!loading && registration && (
                <Box className={classes.card}>
                    <Typography variant="h6">
                        {registration.answers.firstName} {registration.answers.lastName}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {registration.answers.email}
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <Box mr={1} mt={1}>
                            {registration.status === RegistrationStatuses.asObject.checkedIn.id ? (
                                <Typography color="primary">Already checked in</Typography>
                            ) : (
                                <Button color="theme_turquoise" variant="contained" onClick={handleCheckIn}>
                                    Check in
                                </Button>
                            )}
                        </Box>
                        <Box mr={1} mt={1}>
                            <Button color="theme_orange" variant="contained" onClick={() => setRegistration()}>
                                Scan again
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state)
});

export default withSnackbar(connect(mapState)(CheckIn));
