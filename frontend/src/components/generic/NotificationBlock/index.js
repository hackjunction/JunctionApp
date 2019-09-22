import React from 'react';
import styles from './NotificationBlock.module.scss';

import { Icon } from 'antd';
import classNames from 'classnames';

import Divider from 'components/generic/Divider';

const NotificationBlock = ({ title, titleExtra, body, bottom, type }) => {
    const renderTypeIcon = () => {
        if (!type) return null;
        switch (type) {
            case 'success':
                return <Icon className={styles.icon} type="check-circle" />;
            case 'error':
                return <Icon className={styles.icon} type="exclamation-circle" />;
            case 'warning':
                return <Icon className={styles.icon} type="exclamation-circle" />;
            case 'info':
                return <Icon className={styles.icon} type="info-circle" />;
            default:
                return null;
        }
    };

    const iconWrapperClass = classNames(styles.iconWrapper, {
        [styles.iconWrapperSuccess]: type === 'success',
        [styles.iconWrapperInfo]: type === 'info',
        [styles.iconWrapperWarning]: type === 'warning',
        [styles.iconWrapperError]: type === 'error'
    });

    return (
        <div className={styles.wrapper}>
            <div className={iconWrapperClass}>
                <div className={styles.iconBubble}>{renderTypeIcon()}</div>
            </div>
            <div className={styles.contentWrapper}>
                <span className={styles.title}>
                    {title}
                    {titleExtra && <strong className={styles.titleExtra}>{titleExtra}</strong>}
                </span>
                <Divider size={1} />
                <p className={styles.body}>{body}</p>
                <div className={styles.bottom}>{bottom}</div>
            </div>
        </div>
    );
};

export default NotificationBlock;
