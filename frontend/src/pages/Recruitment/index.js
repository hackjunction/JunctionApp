import React from 'react';

import SidebarLayout from 'components/layouts/SidebarLayout';
import AccountNavBar from 'components/navbars/AccountNavBar';
import SearchPage from './Search';

const RecruitmentPage = ({ location, match }) => {
    return (
        <SidebarLayout
            theme="light"
            baseRoute={match.url}
            location={location}
            renderSidebarTop={collapsed => {
                return null;
            }}
            renderTop={() => <AccountNavBar />}
            routes={[
                {
                    path: '',
                    icon: 'home',
                    label: 'Search',
                    render: () => <SearchPage />
                },
                {
                    path: '/favorites',
                    icon: 'team',
                    label: 'Favorites',
                    render: () => <h1>Other page</h1>
                }
            ]}
        />
    );
};

export default RecruitmentPage;
