import React, { Component } from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as AuthActions from 'redux/auth/actions';

import LoadingOverlay from 'components/LoadingOverlay';

class LogoutPage extends Component {
    componentDidMount() {
        this.props.clearSession();
        this.props.push('/');
    }

    render() {
        return <LoadingOverlay text="Logging out" />;
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    clearSession: () => dispatch(AuthActions.clearSession()),
    push: params => dispatch(push(params))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutPage);
