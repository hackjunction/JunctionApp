import React, { useState, useEffect, useCallback } from 'react';

import { PageHeader, Menu, Button as AntButton } from 'antd';
import { connect } from 'react-redux';

import PageWrapper from 'components/PageWrapper';
import Divider from 'components/generic/Divider';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import SearchAttendeesPage from './SearchAttendeesPage';
import AssignAttendeesPage from './AssignAttendeesPage';
import TeamsPage from './TeamsPage';

const OrganiserEditEventReview = ({ event, organisers, updateRegistrations, updateTeams, registrationsLoading }) => {
    const [selectedKey, setSelectedKey] = useState('search');

    const updateData = useCallback(() => {
        updateRegistrations(event.slug);
        updateTeams(event.slug);
    }, [event.slug, updateTeams, updateRegistrations]);

    useEffect(() => {
        updateData();
    }, [event.slug, updateData]);

    const renderSelectedKey = () => {
        switch (selectedKey) {
            case 'search':
                return <SearchAttendeesPage />;
            case 'teams':
                return <TeamsPage />;
            case 'assigned':
                return <AssignAttendeesPage />;
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

const mapDispatch = dispatch => ({
    updateRegistrations: slug => dispatch(OrganiserActions.updateRegistrationsForEvent(slug)),
    updateTeams: slug => dispatch(OrganiserActions.updateTeamsForEvent(slug))
});

export default connect(
    mapState,
    mapDispatch
)(OrganiserEditEventReview);
