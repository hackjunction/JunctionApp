import React from 'react';
import styles from './CustomCheckbox.module.scss';

import classNames from 'classnames';

const CustomCheckbox = ({ selected, onToggle, children, inverted = false }) => {
    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.selected]: selected,
                [styles.inverted]: inverted
            })}
            onClick={() => onToggle(!selected)}
        >
            <span className={styles.content}>{children}</span>
        </div>
    );
};

export default CustomCheckbox;
