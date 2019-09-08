import React from 'react';
import styles from './UserMenuIcon.module.scss';

import classNames from 'classnames';

const UserMenuIcon = ({ active, onClick }) => {
    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.active]: active
            })}
            onClick={onClick}
        >
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
            <div className={styles.dot} />
        </div>
    );
};

export default UserMenuIcon;
