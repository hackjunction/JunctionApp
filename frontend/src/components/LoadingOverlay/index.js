import React from 'react';
import styles from './LoadingOverlay.module.scss';

import GlitchLoader from 'components/GlitchLoader';

const LoadingOverlay = ({ text }) => {
    return (
        <div className={styles.wrapper}>
            <img
                className={styles.backgroundImage}
                src={require('assets/images/default_cover_image.png')}
                alt="background"
            />
            <GlitchLoader title={text} size={200} />
        </div>
    );
};

export default LoadingOverlay;
