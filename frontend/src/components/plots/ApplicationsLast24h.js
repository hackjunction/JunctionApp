import React from 'react';

import { Statistic } from 'antd';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const ApplicationsLast24h = ({ value }) => {
    return <Statistic title="Applications in the last 24h" value={value} />;
};

const mapState = state => ({
    value: OrganiserSelectors.registrationsLast24h(state)
});

export default connect(mapState)(ApplicationsLast24h);
