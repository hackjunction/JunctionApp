import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';

import * as AuthActions from 'redux/auth/actions';

class ErrorPage extends Component {
    componentDidMount() {
        this.props.clearSession();
    }

    render() {
        const error = this.props.location.state ? this.props.location.state.error : null;
        return (
            <div className="ErrorPage">
                <img className="ErrorPage_Logo" src={require('../../assets/logos/emblem_white.png')} alt="logo" />
                <h3 className="ErrorPage_Title">Oh-oh, something went wrong</h3>
                {error ? <p className="ErrorPage_Detail">{error}</p> : null}
                <p className="ErrorPage_Desc">Please log in again and you should be good to go!</p>
                <a href="/">Back to home page</a>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    clearSession: () => dispatch(AuthActions.clearSession())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorPage);
