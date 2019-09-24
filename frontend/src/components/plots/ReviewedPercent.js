import React from 'react';

import { Statistic } from 'antd';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const ReviewedPercent = ({ value }) => {
    return <Statistic title="Reviewed" value={value} precision={2} suffix={'%'} />;
};

const mapState = state => ({
    value: OrganiserSelectors.percentReviewed(state)
});

export default connect(mapState)(ReviewedPercent);
