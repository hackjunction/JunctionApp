import React from 'react';

import { connect } from 'react-redux';

import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';
import * as AuthSelectors from 'redux/auth/selectors';
import AccountNavBar from 'components/navbars/AccountNavBar';
import CenteredContainer from 'components/generic/CenteredContainer';
import AccountDashboard from './AccountDashboard';
import AccountEditProfile from './AccountEditProfile';

const AccountPage = ({ match, location }) => {
    return (
        <CenteredContainer>
            <AccountNavBar />
            <MaterialTabsLayout
                transparent
                tabs={[
                    {
                        label: 'Dashboard',
                        content: <AccountDashboard />
                    }
                    // {
                    //     label: 'Profile',
                    //     content: <AccountEditProfile />
                    // }
                ]}
                // baseRoute={match.url}
                // location={location}
                // renderHeader={() => <AccountNavBar />}
                // routes={[
                //     {
                //         path: '',
                //         label: 'Dashboard',
                //         render: routeProps => <AccountDashboard />
                //     },
                //     {
                //         path: '/profile',
                //         label: 'Profile',
                //         render: routeProps => <AccountEditProfile />
                //     }
                // ]}
            />
        </CenteredContainer>
    );
};

const mapStateToProps = state => ({
    session: AuthSelectors.getSession(state)
});

export default connect(mapStateToProps)(AccountPage);
