import React from 'react';

import Statistic from 'components/generic/Statistic';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const TeamsCount = ({ value }) => {
    return <Statistic label="Teams" value={value} />;
};

const mapState = state => ({
    value: OrganiserSelectors.teamsCount(state)
});

export default connect(mapState)(TeamsCount);
