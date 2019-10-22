import React, { Component } from 'react';
import './style.scss';

import { connect } from 'react-redux';
import * as AuthSelectors from 'redux/auth/selectors';
import * as AuthActions from 'redux/auth/actions';

import LoadingOverlay from 'components/loaders/LoadingOverlay';
import MiscUtils from 'utils/misc';

class LoginPage extends Component {
    async componentDidMount() {
        const { state } = this.props.location;
        const nextRoute = state ? state.nextRoute : '/';
        await MiscUtils.sleep(1000);
        if (this.props.isAuthenticated) {
            this.props.login({}, nextRoute);
        } else {
            this.props.login({ prompt: 'login' }, nextRoute);
        }
    }

    render() {
        return <LoadingOverlay text="Authenticating" />;
    }
}

const mapStateToProps = state => ({
    isAuthenticated: AuthSelectors.isAuthenticated(state)
});

const mapDispatchToProps = dispatch => ({
    login: (params, nextRoute) => dispatch(AuthActions.login(params, nextRoute))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
