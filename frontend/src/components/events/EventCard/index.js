import React from 'react';
import styles from './EventCard.module.scss';

import Image from 'components/generic/Image';
import Divider from 'components/generic/Divider';

import MiscUtils from 'utils/misc';

const EventsGridItem = ({ event, buttons = [] }) => {
    if (!event) return null;
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <Image
                    className={styles.eventImage}
                    defaultImage={require('assets/images/default_cover_image.png')}
                    publicId={event.coverImage ? event.coverImage.publicId : null}
                    transformation={{
                        width: 400
                    }}
                />
            </div>
            <div className={styles.bottom}>
                <span className={styles.eventDate}>{MiscUtils.formatDateInterval(event.startTime, event.endTime)}</span>
                <h3 className={styles.eventName}>{event.name}</h3>
                <span className={styles.eventLocation}>{event.location}</span>
                <div className={styles.buttons}>
                    {buttons.map(btn => (
                        <React.Fragment key={btn.key}>
                            {btn}
                            <div className="hide-if-last-child">
                                <Divider size={1} />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventsGridItem;
