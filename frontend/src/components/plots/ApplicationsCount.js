import React from 'react';

import Statistic from 'components/generic/Statistic';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const ApplicationsCount = ({ value }) => {
    return <Statistic label="Applications" value={value} />;
};

const mapState = state => ({
    value: OrganiserSelectors.registrationsCount(state)
});

export default connect(mapState)(ApplicationsCount);
