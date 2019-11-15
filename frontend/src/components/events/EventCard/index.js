import React from 'react';
import styles from './EventCard.module.scss';

import { Grid, Box, Typography } from '@material-ui/core';
import Image from 'components/generic/Image';

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
                <Typography variant="button">{MiscUtils.formatDateInterval(event.startTime, event.endTime)}</Typography>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body1">
                    {event.eventType === 'physical'
                        ? `${event.eventLocation.city}, ${event.eventLocation.country}`
                        : 'Online'}
                </Typography>
                <Box mt={1} />
                <Grid container spacing={1}>
                    {buttons.map(btn => (
                        <Grid item xs={12}>
                            {btn}
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default EventsGridItem;
