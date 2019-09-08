import React, { useState, useEffect, useCallback } from 'react';
import styles from './EventCardSmall.module.scss';

import { Skeleton } from 'antd';
import { isEmpty } from 'lodash-es';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import MiscUtils from 'utils/misc';
import Image from 'components/generic/Image';
import EventsService from 'services/events';

const EventCardSmall = ({ eventId, event, push }) => {
    const [remoteEvent, setRemoteEvent] = useState({});
    const [loading, setLoading] = useState(false);
    const data = event || remoteEvent;

    useEffect(() => {
        if (!event && eventId) {
            setLoading(true);
            EventsService.getPublicEventById(eventId).then(res => {
                setRemoteEvent(res);
                setLoading(false);
            });
        }
    }, [event, eventId]);

    const handleClick = useCallback(() => {
        push(`/dashboard/${data.slug}`);
    }, [data.slug, push]);

    if (!event && !eventId) {
        return null;
    }

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <Image
                className={styles.image}
                publicId={data.coverImage ? data.coverImage.publicId : null}
                transformation={{
                    width: 400,
                    height: 150
                }}
            />
            <div className={styles.content}>
                <Skeleton active loading={loading || isEmpty(data)} paragraph={{ rows: 2 }}>
                    <span className={styles.eventDates}>
                        {MiscUtils.formatDateInterval(data.startTime, data.endTime)}
                    </span>
                    <h4 className={styles.eventName}>{data.name}</h4>
                    <span className={styles.eventLocation}>{data.location}</span>
                </Skeleton>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    push: route => dispatch(push(route))
});

export default connect(
    null,
    mapDispatchToProps
)(EventCardSmall);
