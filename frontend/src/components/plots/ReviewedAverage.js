import React from 'react';

import Statistic from 'components/generic/Statistic';
import StarIcon from '@material-ui/icons/Star';
import { connect } from 'react-redux';
import * as OrganiserSelectors from 'redux/organiser/selectors';

const ReviewedAverage = ({ value }) => {
    return <Statistic label="Avg. Rating" value={value.toFixed(2)} suffix={<StarIcon />} />;
};

const mapState = state => ({
    value: OrganiserSelectors.averageRating(state)
});

export default connect(mapState)(ReviewedAverage);
