import React from 'react';
import styles from './EventHeroImage.module.scss';

import { Icon } from 'antd';

import Image from 'components/generic/Image';
import FadeInWrapper from 'components/animated/FadeInWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import MiscUtils from 'utils/misc';

const EventHeroImage = ({ event }) => {
    return (
        <div className={styles.wrapper}>
            <Image
                className={styles.coverImage}
                publicId={event && event.coverImage ? event.coverImage.publicId : null}
                defaultImage={require('assets/images/default_cover_image.png')}
                transformation={{
                    width: 1440,
                    height: 600
                }}
            />
            <div className={styles.logoWrapper}>
                <FadeInWrapper enterDelay={0.3} verticalOffset={50}>
                    <div className={styles.logoInner}>
                        <span className={styles.eventDate}>
                            {MiscUtils.formatDateInterval(event.startTime, event.endTime)}
                        </span>
                        <h1 className={styles.eventName}>{event.name}</h1>
                        <span className={styles.eventLocation}>{event.location}</span>
                    </div>
                </FadeInWrapper>
            </div>
            <CenteredContainer className={styles.backButton}>
                <a href="/" className={styles.backButtonText}>
                    <Icon type="left" />
                    Back
                </a>
            </CenteredContainer>
        </div>
    );
};

export default EventHeroImage;
