import React from 'react';

import { Statistic, Icon } from 'antd';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const ReviewedAverage = ({ value }) => {
    return <Statistic title="Avg. Rating" value={value} precision={2} suffix={<Icon type="star" theme="filled" />} />;
};

const mapState = state => ({
    value: OrganiserSelectors.averageRating(state)
});

export default connect(mapState)(ReviewedAverage);
