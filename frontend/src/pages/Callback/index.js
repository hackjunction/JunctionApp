import React, { Component } from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as AuthActions from 'redux/auth/actions';
import * as AuthSelectors from 'redux/auth/selectors';
import * as UserActions from 'redux/user/actions';

import UserProfilesService from 'services/userProfiles';
import LoadingOverlay from 'components/loaders/LoadingOverlay';
import MiscUtils from 'utils/misc';
import AnalyticsService from 'services/analytics';

class CallbackPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            failed: false
        };
    }

    async componentDidMount() {
        const { location, handleAuthentication, pushError } = this.props;

        await MiscUtils.sleep(1000);

        if (/access_token|id_token|error/.test(location.hash)) {
            handleAuthentication()
                .then(idToken => {
                    AnalyticsService.events.LOG_IN();
                    this.getOrCreateProfile(idToken);
                })
                .catch(err => {
                    pushError({ error: err.message });
                });
        } else {
            pushError();
        }
    }

    getOrCreateProfile(idToken) {
        UserProfilesService.getUserProfile(idToken)
            .then(userProfile => {
                if (!userProfile) {
                    this.props.pushAccountCreate();
                } else {
                    this.props.setUserProfile(userProfile);
                    this.props.pushNextRoute();
                }
            })
            .catch(err => {
                if (err.response.status === 404) {
                    this.props.pushAccountCreate();
                } else {
                    this.props.pushError({ error: 'Login failed' });
                }
            });
    }

    render() {
        return <LoadingOverlay text="Signing in" />;
    }
}

const mapStateToProps = state => ({
    session: AuthSelectors.getSession(state),
    idToken: AuthSelectors.getIdToken(state)
});

const mapDispatchToProps = dispatch => ({
    handleAuthentication: () => dispatch(AuthActions.handleAuthentication()),
    pushError: state => dispatch(push('/error', state)),
    pushNextRoute: () => dispatch(AuthActions.pushNextRoute()),
    pushAccountCreate: () => dispatch(push('/login/welcome')),
    setUserProfile: profile => dispatch(UserActions.setUserProfile(profile))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CallbackPage);
