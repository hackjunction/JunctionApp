import React, { useState } from 'react';

import { PageHeader, Menu } from 'antd';
import { connect } from 'react-redux';

import PageWrapper from 'components/PageWrapper';
import Divider from 'components/generic/Divider';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';

import SearchAttendeesPage from './SearchAttendeesPage';
import AssignAttendeesPage from './AssignAttendeesPage';

const OrganiserEditEventReview = ({ idToken, slug, organisers }) => {
    const [selectedKey, setSelectedKey] = useState('search');

    const renderSelectedKey = () => {
        switch (selectedKey) {
            case 'search':
                return <SearchAttendeesPage idToken={idToken} slug={slug} />;
            case 'assigned':
                return <AssignAttendeesPage idToken={idToken} slug={slug} />;
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
                            <Menu.Item key="search">All</Menu.Item>
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

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    organisers: OrganiserSelectors.organisers(state)
});

export default connect(mapStateToProps)(OrganiserEditEventReview);
