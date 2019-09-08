import React, { Component } from 'react';
import styles from './GlobalNavBar.module.scss';

import UserMenu from 'components/UserMenu';

class GlobalNavBar extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <img
                        src={require('assets/logos/wordmark_black.png')}
                        className={styles.wordmark}
                        alt="Junction wordmark"
                    />
                    <UserMenu />
                </div>
            </div>
        );
    }
}

export default GlobalNavBar;
