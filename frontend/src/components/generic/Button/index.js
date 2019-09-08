import React from 'react';
import styles from './Button.module.scss';

import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Button = ({ text, button, link, theme, block = false, round = false, size = 'default' }) => {
    const wrapperClass = classNames({
        [styles.button]: true,
        [styles.buttonDisabled]: button && (button.disabled || button.loading),
        [styles.buttonLoading]: button && button.loading,
        [styles.buttonDefault]: true,
        [styles.buttonSmall]: size === 'small',
        [styles.buttonLarge]: size === 'large',
        [styles.buttonRound]: round,
        [styles.buttonBlock]: block,
        [styles.buttonSecondary]: theme === 'secondary',
        [styles.buttonAccent]: theme === 'accent',
        [styles.buttonWarning]: theme === 'warning',
        [styles.buttonDanger]: theme === 'danger',
        [styles.buttonMinimal]: theme === 'minimal',
        [styles.buttonTransparent]: theme === 'transparent'
    });

    if (button) {
        /** Render as button */
        return (
            <button disabled={button.disabled || button.loading} className={wrapperClass} onClick={button.onClick}>
                <span className={styles.button_text}>
                    {text}
                    <Icon type="loading" className={styles.button_spinner} />
                </span>
            </button>
        );
    }

    if (link) {
        const { external, internal } = link;

        if (external) {
            /** Render as external link */
            return (
                <a className={wrapperClass} href={external} target="_blank" rel="noopener noreferrer">
                    <span className={styles.button_text}>{text}</span>
                </a>
            );
        }
        /** Render as internal link */
        return (
            <Link className={wrapperClass} to={internal}>
                <span className={styles.button_text}>{text}</span>
            </Link>
        );
    }

    return null;
};

export default Button;
