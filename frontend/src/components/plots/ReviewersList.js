import React, { useMemo } from 'react';

import { List, Avatar } from 'antd';
import { sortBy } from 'lodash-es';
import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';

const ReviewersList = ({ data, userProfilesMap = {}, averagesMap = {} }) => {
    const formattedData = useMemo(() => {
        const arr = [];
        Object.keys(data).forEach(userId => {
            const user = userProfilesMap[userId];
            if (user) {
                arr.push({
                    user,
                    ratings: data[userId],
                    average: averagesMap[userId]
                });
            }
        });

        return sortBy(arr, item => item.ratings * -1);
    }, [data, userProfilesMap, averagesMap]);

    return (
        <List
            itemLayout="horizontal"
            dataSource={formattedData}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item.user.avatar} />}
                        title={`${item.user.firstName} ${item.user.lastName}`}
                        description={`${item.ratings} reviews / ${item.average.toFixed(2)} average rating`}
                    />
                </List.Item>
            )}
        />
    );
};

const mapState = state => ({
    data: OrganiserSelectors.registrationsByReviewer(state),
    userProfilesMap: OrganiserSelectors.organisersMap(state),
    averagesMap: OrganiserSelectors.reviewAverageByReviewer(state)
});

export default connect(mapState)(ReviewersList);
