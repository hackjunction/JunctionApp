import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { difference } from 'lodash-es';

import { isAuthenticated, getPermissions } from 'redux/auth/selectors';
import * as UserSelectors from 'redux/user/selectors';

/** Hide a component if the user doesn't have a given permission, but don't redirect to login/error */

export default function(ComposedComponent, requiredPermissions = []) {
    class RequiresPermission extends React.Component {
        static propTypes = {
            isAuthenticated: PropTypes.bool,
            hasProfile: PropTypes.bool,
            permissions: PropTypes.array.isRequired
        };

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

            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: isAuthenticated(state),
            permissions: getPermissions(state),
            hasProfile: UserSelectors.hasProfile(state)
        };
    };

    return connect(mapStateToProps)(RequiresPermission);
}
