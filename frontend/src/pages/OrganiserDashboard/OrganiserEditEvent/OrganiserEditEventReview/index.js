import React, { useState, useEffect } from 'react';

import { PageHeader, Menu } from 'antd';
import { connect } from 'react-redux';

import PageWrapper from 'components/PageWrapper';
import Divider from 'components/generic/Divider';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import SearchAttendeesPage from './SearchAttendeesPage';
import AssignAttendeesPage from './AssignAttendeesPage';
import TeamsPage from './TeamsPage';

const OrganiserEditEventReview = ({ event, organisers, updateRegistrations }) => {
    const [selectedKey, setSelectedKey] = useState('search');

    useEffect(() => {
        updateRegistrations(event.slug);
    }, [event.slug, updateRegistrations]);

    const renderSelectedKey = () => {
        switch (selectedKey) {
            case 'search':
                return <SearchAttendeesPage />;
            // case 'teams':
            //     return <TeamsPage />;
            // case 'assigned':
            //     return <AssignAttendeesPage />;
            default:
                return null;
        }
    };

    return (
        <PageWrapper>
            <PageHeader
                title="Participants"
                children={<p>Applications to your event</p>}
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
    event: OrganiserSelectors.event(state)
});

const mapDispatch = dispatch => ({
    updateRegistrations: slug => dispatch(OrganiserActions.updateRegistrationsForEvent(slug))
});

export default connect(
    mapState,
    mapDispatch
)(OrganiserEditEventReview);
