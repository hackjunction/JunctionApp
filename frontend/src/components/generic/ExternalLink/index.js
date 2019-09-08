import React from 'react';
import styles from './ExternalLink.module.scss';
import classNames from 'classnames';

const ExternalLink = ({ href, children, theme }) => {
    return (
        <a
            className={classNames({
                [styles.link]: true,
                [styles.dark]: theme === 'dark'
            })}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
};

export default ExternalLink;
