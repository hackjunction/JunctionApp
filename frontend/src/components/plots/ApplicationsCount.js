import React from 'react';

import { Statistic } from 'antd';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const ApplicationsCount = ({ value }) => {
    return <Statistic title="Applications" value={value} />;
};

const mapState = state => ({
    value: OrganiserSelectors.registrationsCount(state)
});

export default connect(mapState)(ApplicationsCount);
