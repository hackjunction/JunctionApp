import React from 'react';
import styles from './CompletePercent.module.scss';

const CompletePercent = ({ values, fieldCount }) => {
    const completedFields = Object.keys(values).length;
    const percentage = Math.floor((completedFields * 100) / fieldCount);
    return (
        <div className={styles.wrapper}>
            <span className={styles.completePercent}>{percentage}% completed</span>
        </div>
    );
};

export default CompletePercent;
