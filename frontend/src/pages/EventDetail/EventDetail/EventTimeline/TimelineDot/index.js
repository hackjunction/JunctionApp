import React from 'react';
import styles from './TimelineDot.module.scss';

import classNames from 'classnames';

const TimelineDot = ({ active }) => {
    return (
        <div
            className={classNames({
                [styles.dot]: true,
                [styles.active]: active
            })}
        />
    );
};

export default TimelineDot;
