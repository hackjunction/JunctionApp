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
                        Designed and developed with love and coffee by the Junction team, with the help of:
                    </span>
                    <Divider size={1} />
                    <div className={styles.logos}>
                        <a
                            width="150"
                            height="50"
                            href="https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="Single Sign On & Token Based Authentication - Auth0"
                        >
                            <img
                                width="150"
                                height="50"
                                alt="JWT Auth for open source projects"
                                src="//cdn.auth0.com/oss/badges/a0-badge-light.png"
                            />
                        </a>
                        <Divider size={1} />
                        <a
                            href="https://cloudinary.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="Cloudinary - Image and Video Upload, Storage, Optimization and CDN"
                        >
                            <img
                                alt="Cloudinary - Media Upload, Storage, Optimization and CDN"
                                src="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_150/v1/logo/for_white_bg/cloudinary_logo_for_white_bg.png"
                            />
                        </a>
                    </div>
                    <Divider size={1} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
