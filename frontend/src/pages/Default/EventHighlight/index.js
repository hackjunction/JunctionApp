import React from 'react';
import styles from './EventHighlight.module.scss';

import { Typography, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Image from 'components/generic/Image';
import Button from 'components/generic/Button';
import MiscUtils from 'utils/misc';

import * as EventsSelectors from 'redux/events/selectors';

const EventHighlight = ({ event, push }) => {
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
                <Typography variant="button">{MiscUtils.formatDateInterval(event.startTime, event.endTime)}</Typography>
                <Typography variant="h4">{event.name}</Typography>
                <Typography variant="subtitle1">
                    {event.eventType === 'physical'
                        ? `${event.eventLocation.city}, ${event.eventLocation.country}`
                        : 'Online'}
                </Typography>
                <div className={styles.buttons}>
                    <Box mr={1} mb={1}>
                        <Button
                            color="theme_lightgray"
                            variant="outlined"
                            onClick={() => push('/events/' + event.slug)}
                        >
                            See more
                        </Button>
                    </Box>
                    <Box mr={1} mb={1}>
                        <Button
                            color="theme_turquoise"
                            variant="contained"
                            onClick={() => push('/events/' + event.slug)}
                        >
                            View projects
                        </Button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    event: EventsSelectors.highlightedEvent(state)
});

export default connect(mapStateToProps, { push })(EventHighlight);
