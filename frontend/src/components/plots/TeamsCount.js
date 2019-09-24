import React from 'react';

import { Statistic } from 'antd';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const TeamsCount = ({ value }) => {
    return <Statistic title="Teams" value={value} />;
};

const mapState = state => ({
    value: OrganiserSelectors.teamsCount(state)
});

export default connect(mapState)(TeamsCount);
