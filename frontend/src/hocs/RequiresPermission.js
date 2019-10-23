import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { difference } from 'lodash-es';
import moment from 'moment';

import { isAuthenticated, isSessionExpired, getPermissions } from 'redux/auth/selectors';
import * as AuthActions from 'redux/auth/actions';
import * as UserSelectors from 'redux/user/selectors';

/** Hide a component if the user doesn't have a given permission, and also redirect to login/error */

export default function(ComposedComponent, requiredPermissions = []) {
    class RequiresPermission extends React.Component {
        static propTypes = {
            isAuthenticated: PropTypes.bool,
            hasProfile: PropTypes.bool,
            permissions: PropTypes.array.isRequired,
            pushLogin: PropTypes.func.isRequired,
            pushError: PropTypes.func.isRequired
        };

        componentDidMount() {
            this._checkAndRedirect();
        }

        componentDidUpdate() {
            this._checkAndRedirect();
        }

        _checkAndRedirect() {
            const { pushLogin, pushError, location, renewSession, isSessionExpired } = this.props;

            if (!this.hasProfile()) {
                pushLogin(location ? location.pathname : '/');
            } else if (isSessionExpired) {
                renewSession();
            } else if (!this.hasRequiredPermissions()) {
                pushError('Access Denied');
            }
        }

        sessionExpired() {
            return moment().isAfter(this.props.sessionExpiresAt);
        }

        hasProfile() {
            const { isAuthenticated, hasProfile } = this.props;
            return isAuthenticated && hasProfile;
        }

        hasRequiredPermissions() {
            const { permissions } = this.props;
            return difference(requiredPermissions, permissions).length === 0;
        }

        render() {
            if (!this.hasProfile()) return null;
            if (!this.hasRequiredPermissions()) return null;
            if (this.sessionExpired()) return null;

            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: isAuthenticated(state),
            isSessionExpired: isSessionExpired(state),
            permissions: getPermissions(state),
            hasProfile: UserSelectors.hasProfile(state)
        };
    };

    const mapDispatchToProps = dispatch => ({
        pushLogin: nextRoute => dispatch(push('/login', { nextRoute })),
        pushError: error => dispatch(push('/error', { error })),
        renewSession: () => dispatch(AuthActions.renewSession())
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(RequiresPermission);
}
