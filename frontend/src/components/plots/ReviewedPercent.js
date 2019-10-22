import React from 'react';

import Statistic from 'components/generic/Statistic';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const ReviewedPercent = ({ value = 0 }) => {
    return <Statistic label="Reviewed" value={value.toFixed(2)} suffix={'%'} />;
};

const mapState = state => ({
    value: OrganiserSelectors.percentReviewed(state)
});

export default connect(mapState)(ReviewedPercent);
