import React from 'react';

import { connect } from 'react-redux';

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';
import * as AuthSelectors from 'redux/auth/selectors';
import AccountNavBar from 'components/navbars/AccountNavBar';
import CenteredContainer from 'components/generic/CenteredContainer';
import Dashboard from './dashboard';
import Profile from './profile';

const Account = ({ match, location }) => {
    return (
        <CenteredContainer>
            <AccountNavBar />
            <MaterialTabsLayout
                transparent
                tabs={[
                    {
                        label: 'Dashboard',
                        key: 'dashboard',
                        path: '',
                        component: Dashboard
                    },
                    {
                        label: 'Profile',
                        key: 'profile',
                        path: '/profile',
                        content: Profile
                    }
                ]}
                baseRoute={match.url}
                location={location}
            />
        </CenteredContainer>
    );
};

const mapStateToProps = state => ({
    session: AuthSelectors.getSession(state)
});

export default connect(mapStateToProps)(Account);
