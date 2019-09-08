import React, { useState } from 'react';
import styles from './LoginWelcome.module.scss';

import { connect } from 'react-redux';
import { Icon, notification } from 'antd';

import * as AuthSelectors from 'redux/auth/selectors';
import * as UserActions from 'redux/user/actions';
import * as AuthActions from 'redux/auth/actions';

import Divider from 'components/generic/Divider';
import UserProfilesService from 'services/userProfiles';
import MiscUtils from 'utils/misc';
import { useFormField } from 'hooks/formHooks';
import { String, Email } from 'services/validation';

const LoginWelcome = ({ user, idToken, setUserProfile, pushNextRoute }) => {
    const firstName = useFormField(user.given_name || '', String({ min: 0, max: 100, required: true }), null);
    const lastName = useFormField(user.family_name || '', String({ min: 0, max: 100, required: true }), null);
    const email = useFormField(user.email || '', Email({ required: true }), null);
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
            avatar: user.picture
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
                notification.error({
                    message: 'Something went wrong',
                    description:
                        "Well, that didn't work... Make sure you're connected to the internet, and try again. If the problem persists, it's probably on our end and we're working hard to fix it."
                });
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
                        <h1 className={styles.formTitle}>Welcome</h1>
                        <p className={styles.formDesc}>
                            Looks like you're new here! Let's make sure we have your basic information correct before
                            moving on.
                        </p>
                        <Divider size={3} />
                        <label className={styles.formLabel}>First name</label>
                        <input
                            value={firstName.value}
                            onChange={firstName.onChange}
                            type="text"
                            className={styles.formInput}
                            placeholder="Herbert"
                        />
                        <span className={styles.formError}>{firstName.error}</span>
                        <Divider size={1} />
                        <label className={styles.formLabel}>Last name</label>
                        <input
                            value={lastName.value}
                            onChange={lastName.onChange}
                            type="text"
                            className={styles.formInput}
                            placeholder="Hacker"
                        />
                        <span className={styles.formError}>{lastName.error}</span>
                        <Divider size={1} />
                        <label className={styles.formLabel}>Email</label>
                        <input
                            value={email.value}
                            onChange={email.onChange}
                            type="text"
                            className={styles.formInput}
                            placeholder="herbert.hacker@hackjunction.com"
                        />
                        <span className={styles.formError}>{email.error}</span>
                        <Divider size={3} />
                        <label className={styles.formLabel}>Privacy policy & terms</label>
                        <div className={styles.checkboxWrapper}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                value={true}
                                onChange={() => setAccepted(!accepted)}
                            />
                            <span className={styles.checkboxText}>
                                I confirm that I am at least 16 years of age, and I have read and agree to the Junction{' '}
                                <a href="https://hackjunction.com/terms" target="_blank" rel="noopener noreferrer">
                                    Terms & Conditions
                                </a>{' '}
                                and{' '}
                                <a href="https://hackjunction.com/policy" target="_blank" rel="noopener noreferrer">
                                    Privacy Policy
                                </a>
                            </span>
                        </div>
                        <Divider size={3} />
                        <button
                            onClick={onSubmit}
                            disabled={buttonDisabled}
                            className={`${styles.submitButton} ${loading &&
                                styles.submitButtonLoading} ${buttonDisabled && styles.submitButtonDisabled}`}
                        >
                            <span className={styles.submitButtonText}>Let's go</span>
                            <Icon className={styles.submitButtonSpinner} type="loading" />
                        </button>
                        <Divider size={3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    user: AuthSelectors.getCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
    setUserProfile: profile => dispatch(UserActions.setUserProfile(profile)),
    pushNextRoute: () => dispatch(AuthActions.pushNextRoute())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginWelcome);
