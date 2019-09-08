import React from 'react';
import styles from './EventNavBar.module.scss';
import UserMenu from 'components/UserMenu';

const EventNavBar = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <span className={styles.eventName}>Junction 2019</span>
            </div>
            <div className={styles.right}>
                <UserMenu />
            </div>
        </div>
    );
};

export default EventNavBar;
