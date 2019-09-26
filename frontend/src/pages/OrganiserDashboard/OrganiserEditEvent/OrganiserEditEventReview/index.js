import React, { useState } from 'react';

import { PageHeader, Menu, Button as AntButton } from 'antd';
import { connect } from 'react-redux';

import PageWrapper from 'components/PageWrapper';
import Divider from 'components/generic/Divider';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import SearchAttendeesPage from './SearchAttendeesPage';
import AssignAttendeesPage from './AssignAttendeesPage';
import TeamsPage from './TeamsPage';
import AdminPage from './AdminPage';

const OrganiserEditEventReview = ({ event, organisers, registrationsLoading, updateData }) => {
    const [selectedKey, setSelectedKey] = useState('search');

    const renderSelectedKey = () => {
        switch (selectedKey) {
            case 'search':
                return <SearchAttendeesPage />;
            case 'teams':
                return <TeamsPage />;
            case 'assigned':
                return <AssignAttendeesPage />;
            case 'admin':
                return <AdminPage />;
            default:
                return null;
        }
    };

    return (
        <PageWrapper>
            <PageHeader
                title="Participants"
                children={<p>Applications to your event</p>}
                extra={
                    <AntButton type="link" onClick={updateData} loading={registrationsLoading}>
                        Refresh data
                    </AntButton>
                }
                footer={
                    <React.Fragment>
                        <Menu
                            mode="horizontal"
                            selectedKeys={[selectedKey]}
                            onSelect={({ key }) => setSelectedKey(key)}
                        >
                            <Menu.Item key="search">Participants</Menu.Item>
                            <Menu.Item key="teams">Teams</Menu.Item>
                            <Menu.Item key="assigned">Assigned to you</Menu.Item>
                            <Menu.Item key="admin">Admin & Tools</Menu.Item>
                        </Menu>
                        <Divider size={1} />
                        {renderSelectedKey()}
                    </React.Fragment>
                }
            />
        </PageWrapper>
    );
};

const mapState = state => ({
    organisers: OrganiserSelectors.organisers(state),
    event: OrganiserSelectors.event(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state)
});

export default connect(mapState)(OrganiserEditEventReview);
