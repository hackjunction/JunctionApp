import React, { useMemo } from 'react';

import { List, Avatar } from 'antd';
import { map, sortBy } from 'lodash-es';

const ReviewersList = ({ data, userProfilesMap = {} }) => {
    const formattedData = useMemo(() => {
        const asArray = map(Object.keys(data), userId => ({
            user: userProfilesMap[userId] || {},
            ratings: data[userId]
        }));

        return sortBy(asArray, 'ratings');
    }, [data, userProfilesMap]);

    return (
        <List
            itemLayout="horizontal"
            dataSource={formattedData}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item.user.avatar} />}
                        title={`${item.user.firstName} ${item.user.lastName}`}
                        description={`${item.ratings} applications reviewed`}
                    />
                </List.Item>
            )}
        />
    );
};

export default ReviewersList;
