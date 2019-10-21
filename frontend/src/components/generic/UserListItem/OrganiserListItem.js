import React from 'react';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import UserListItem from './index';

const OrganiserListItem = ({ userId, organisersMap = {} }) => {
    return <UserListItem user={organisersMap[userId]} />;
};

const mapState = state => ({
    organisersMap: OrganiserSelectors.organisersMap(state)
});

export default connect(mapState)(OrganiserListItem);
