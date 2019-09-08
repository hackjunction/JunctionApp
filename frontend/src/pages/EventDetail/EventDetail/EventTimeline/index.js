import React, { useState, useEffect } from 'react';
import styles from './EventTimeline.module.scss';

import { Timeline } from 'antd';
import { sortBy } from 'lodash-es';
import moment from 'moment';
import MiscUtils from 'utils/misc';
import TimelineDot from './TimelineDot';

const EventTimeline = ({ event }) => {
    const [timelineItems, setTimelineItems] = useState([]);

    useEffect(() => {
        const items = [
            {
                date: moment(event.registrationStartTime).format('MMMM D'),
                dateValue: moment(event.registrationStartTime).unix(),
                title: 'Application period begins',
                active: true
            },
            {
                date: moment(event.registrationEndTime).format('MMMM D'),
                dateValue: moment(event.registrationEndTime).unix(),
                title: 'Application period ends',
                active: true
            },
            {
                date: MiscUtils.formatDateInterval(event.startTime, event.endTime),
                dateValue: moment(event.startTime).unix(),
                title: event.name,
                active: true
            }
        ];

        const sorted = sortBy(items, 'dateValue');

        setTimelineItems(sorted);
    }, [event.endTime, event.name, event.registrationEndTime, event.registrationStartTime, event.startTime]);

    return (
        <div className={styles.wrapper}>
            <Timeline>
                {timelineItems.map(item => (
                    <Timeline.Item
                        color={'transparent'}
                        key={item.title + item.dateValue}
                        dot={<TimelineDot active={item.active} />}
                    >
                        <div className={styles.timelineItem}>
                            <span className={styles.timelineDate}>{item.date}</span>
                            <span className={styles.timelineTitle}>{item.title}</span>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    );
};

export default EventTimeline;
