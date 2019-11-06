import React from 'react';

import { Typography, Box } from '@material-ui/core';
import { connect } from 'react-redux';

import TabsLayout from 'components/layouts/TabsLayout';
import * as AuthSelectors from 'redux/auth/selectors';
import AccountNavBar from 'components/navbars/AccountNavBar';

import AccountDashboard from './AccountDashboard';
import AccountEditProfile from './AccountEditProfile';

const AccountPage = ({ match, location }) => {
    return (
        <TabsLayout
            baseRoute={match.url}
            location={location}
            renderHeader={() => <AccountNavBar />}
            routes={[
                {
                    path: '',
                    label: 'Dashboard',
                    render: routeProps => <AccountDashboard />
                },
                {
                    path: '/preferences',
                    label: 'Preferences',
                    render: routeProps => <AccountEditProfile />
                },
                {
                    path: '/achievements',
                    label: 'Achievements',
                    render: routeProps => (
                        <Box maxWidth="600px">
                            <Typography variant="body1">
                                Coming soon! Here you'll be able to see your past performances, submitted projects and
                                other achievements in Junction events.
                            </Typography>
                        </Box>
                    )
                }
            ]}
        />
    );
};

const mapStateToProps = state => ({
    session: AuthSelectors.getSession(state)
});

export default connect(mapStateToProps)(AccountPage);
