import React from 'react';
import styles from './Footer.module.scss';

import ExternalLink from 'components/generic/ExternalLink';
import Divider from 'components/generic/Divider';

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.links}>
                    <Divider size={1} />
                    <ExternalLink theme="dark" href="https://hackjunction.com/terms">
                        Terms And Conditions
                    </ExternalLink>
                    <ExternalLink theme="dark" href="https://hackjunction.com/privacy">
                        Privacy Policy
                    </ExternalLink>
                    <ExternalLink theme="dark" href="https://hackjunction.com">
                        Junction website
                    </ExternalLink>
                    <Divider size={1} />
                </div>
                <div className={styles.copyright}>
                    <Divider size={1} />
                    <span className={styles.copyright}>
                        Designed and developed with love and coffee by the Junction team
                    </span>
                    <Divider size={1} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
