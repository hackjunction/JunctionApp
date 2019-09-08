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
                return <Icon className={classNames(styles.typeIcon, styles.typeIconSuccess)} type="check-circle" />;
            case 'error':
                return <Icon className={classNames(styles.typeIcon, styles.typeIconError)} type="exclamation-circle" />;
            case 'warning':
                return (
                    <Icon className={classNames(styles.typeIcon, styles.typeIconWarning)} type="exclamation-circle" />
                );
            case 'info':
                return <Icon className={classNames(styles.typeIcon, styles.typeIconInfo)} type="info-circle" />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>
                {renderTypeIcon()}
                {title}
                {titleExtra && <strong className={styles.titleExtra}>{titleExtra}</strong>}
            </span>
            <Divider size={1} />
            <p className={styles.body}>{body}</p>
            <div className={styles.bottom}>{bottom}</div>
        </div>
    );
};

export default NotificationBlock;
