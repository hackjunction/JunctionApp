import React from 'react';
import ReactJson from 'react-json-view';

import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const OrganiserEditEventDebug = ({ slug, getEventBySlug }) => {
    const event = getEventBySlug(slug);

    return <ReactJson src={event} />;
};

const mapStateToProps = state => ({
    getEventBySlug: OrganiserSelectors.getEventBySlug(state)
});

export default connect(mapStateToProps)(OrganiserEditEventDebug);
