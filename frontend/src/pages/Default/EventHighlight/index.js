import React from 'react';
import styles from './EventHighlight.module.scss';

import { connect } from 'react-redux';

import Image from 'components/generic/Image';
import Button from 'components/generic/Button';
import MiscUtils from 'utils/misc';

import * as EventsSelectors from 'redux/events/selectors';

const EventHighlight = ({ event }) => {
    if (!event) return null;
    return (
        <div className={styles.wrapper}>
            <span className={styles.highlightLabel + ' ' + styles.mobileOnly}>Highlight</span>
            <div className={styles.left}>
                <Image
                    className={styles.eventImage}
                    publicId={event.coverImage ? event.coverImage.publicId : ''}
                    defaultImage={require('assets/images/default_cover_image.png')}
                />
            </div>
            <div className={styles.right}>
                <span className={styles.highlightLabel + ' ' + styles.desktopOnly}>Highlight</span>
                <span className={styles.eventDate}>{MiscUtils.formatDateInterval(event.startTime, event.endTime)}</span>
                <h3 className={styles.eventName}>{event.name}</h3>
                <span className={styles.eventLocation}>{event.location}</span>
                <div className={styles.buttons}>
                    <Button theme="secondary" text="See more" link={{ internal: '/events/' + event.slug }} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    event: EventsSelectors.highlightedEvent(state)
});

export default connect(mapStateToProps)(EventHighlight);
