import React, { useState } from 'react';
import styles from './LoginWelcome.module.scss';

import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { Typography, Checkbox, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import * as AuthSelectors from 'redux/auth/selectors';
import * as UserActions from 'redux/user/actions';
import * as AuthActions from 'redux/auth/actions';

import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';
import UserProfilesService from 'services/userProfiles';
import MiscUtils from 'utils/misc';
import { useFormField } from 'hooks/formHooks';
import { String, Email } from 'services/validation';

const useStyles = makeStyles(theme => ({
    whiteCentered: {
        color: theme.palette.theme_white.main,
        textAlign: 'center'
    },
    label: {
        color: theme.palette.theme_white.main
    },
    error: {
        color: theme.palette.error.main
    }
}));

const LoginWelcome = ({ idTokenData, idToken, setUserProfile, pushNextRoute, enqueueSnackbar }) => {
    const classes = useStyles();
    const firstName = useFormField(idTokenData.given_name || '', String({ min: 0, max: 100, required: true }), null);
    const lastName = useFormField(idTokenData.family_name || '', String({ min: 0, max: 100, required: true }), null);
    const email = useFormField(idTokenData.email || '', Email({ required: true }), null);
    const [accepted, setAccepted] = useState(false);
    const [loading, setLoading] = useState(false);

    function validate() {
        const firstNameErr = firstName.validate(firstName.value);
        firstName.setError(firstNameErr);
        const lastNameErr = lastName.validate(lastName.value);
        lastName.setError(lastNameErr);
        const emailErr = email.validate(email.value);
        email.setError(emailErr);

        if (firstNameErr || lastNameErr || emailErr) {
            return false;
        } else {
            return true;
        }
    }

    async function onSubmit() {
        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            avatar: idTokenData.picture
        };
        if (!validate()) return;

        setLoading(true);
        await MiscUtils.sleep(1000);
        UserProfilesService.createUserProfile(data, idToken)
            .then(profile => {
                setUserProfile(profile);
                pushNextRoute();
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong... Please try again.', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const buttonDisabled = loading || !accepted;

    return (
        <div className={styles.wrapper}>
            <img
                className={styles.backgroundImage}
                src={require('assets/images/default_cover_image.png')}
                alt="background"
            />
            <div className={styles.content}>
                <div className={styles.contentLeft}>
                    <img
                        className={styles.contentLeftBackgroundImage}
                        src={require('assets/images/laser_2016.jpg')}
                        alt="illustration"
                    />
                    <img
                        className={styles.contentLeftLogo}
                        src={require('assets/logos/wordmark_white.png')}
                        alt="Junction logo"
                    />
                </div>
                <div className={styles.contentRight}>
                    <div className={styles.contentRightInner}>
                        <Divider size={3} />
                        <Typography variant="h4" paragraph className={classes.whiteCentered}>
                            Welcome
                        </Typography>
                        <Typography variant="body1" className={classes.whiteCentered}>
                            Looks like you're new here! Let's make sure we have your basic information correct before
                            moving on.
                        </Typography>
                        <Divider size={3} />
                        <Typography variant="subtitle2" className={classes.label}>
                            First name
                        </Typography>
                        <input
                            value={firstName.value}
                            onChange={firstName.onChange}
                            type="text"
                            className={styles.formInput}
                            placeholder="Herbert"
                        />
                        <Typography gutterTop variant="caption" className={classes.error}>
                            {firstName.error}
                        </Typography>
                        <Divider size={1} />
                        <Typography variant="subtitle2" className={classes.label}>
                            Last name
                        </Typography>
                        <input
                            value={lastName.value}
                            onChange={lastName.onChange}
                            type="text"
                            className={styles.formInput}
                            placeholder="Hacker"
                        />
                        <Typography gutterTop variant="caption" className={classes.error}>
                            {lastName.error}
                        </Typography>
                        <Divider size={1} />
                        <Typography variant="subtitle2" className={classes.label}>
                            Email
                        </Typography>
                        <input
                            value={email.value}
                            onChange={email.onChange}
                            type="text"
                            className={styles.formInput}
                            placeholder="herbert.hacker@hackjunction.com"
                        />
                        <Typography gutterTop variant="caption" className={classes.error}>
                            {email.error}
                        </Typography>
                        <Divider size={3} />
                        <Typography variant="subtitle2" className={classes.label} paragraph>
                            Privacy policy & terms
                        </Typography>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Checkbox
                                checked={accepted}
                                onChange={() => setAccepted(!accepted)}
                                value="accepted"
                                inputProps={{
                                    'aria-label': 'checkbox'
                                }}
                            />
                            <Box p={1}>
                                <Typography variant="subtitle2" className={classes.label}>
                                    I confirm that I am at least 16 years of age, and I have read and agree to the
                                    Junction{' '}
                                    <a href="https://hackjunction.com/terms" target="_blank" rel="noopener noreferrer">
                                        Terms & Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="https://hackjunction.com/policy" target="_blank" rel="noopener noreferrer">
                                        Privacy Policy
                                    </a>
                                </Typography>
                            </Box>
                        </Box>
                        <Divider size={3} />
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Box width="240px">
                                <Button
                                    onClick={onSubmit}
                                    disabled={buttonDisabled}
                                    color="theme_orange"
                                    variant="contained"
                                    fullWidth
                                >
                                    Let's go
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    idTokenData: AuthSelectors.idTokenData(state)
});

const mapDispatchToProps = dispatch => ({
    setUserProfile: profile => dispatch(UserActions.setUserProfile(profile)),
    pushNextRoute: () => dispatch(AuthActions.pushNextRoute())
});

export default withSnackbar(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginWelcome)
);
