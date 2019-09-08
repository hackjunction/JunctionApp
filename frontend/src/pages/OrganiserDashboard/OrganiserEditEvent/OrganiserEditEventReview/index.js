import React, { useState } from 'react';
import styles from './OrganiserEditEventReview.module.scss';

import { PageHeader, Menu, Button } from 'antd';
import { connect } from 'react-redux';

import PageWrapper from 'components/PageWrapper';
import Divider from 'components/generic/Divider';

import * as AuthSelectors from 'redux/auth/selectors';

import SearchAttendeesPage from './SearchAttendeesPage';
import AssignAttendeesPage from './AssignAttendeesPage';
import RatingModal from 'components/modals/RatingModal';
import AssignModal from 'components/modals/AssignModal/index';

const OrganiserEditEventReview = ({ idToken, slug }) => {
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
                        <RatingModal render={showModal => <Button onClick={showModal}>Change rating</Button>} />
                        <AssignModal
                            render={showModal => (
                                <Button type="link" onClick={showModal}>
                                    Assign
                                </Button>
                            )}
                        />
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
    idToken: AuthSelectors.getIdToken(state)
});

export default connect(mapStateToProps)(OrganiserEditEventReview);
