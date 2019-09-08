import React from 'react';
import styles from './AccountNavBar.module.scss';

import { connect } from 'react-redux';

import UserMenu from 'components/UserMenu';
import * as AuthSelectors from 'redux/auth/selectors';

const AccountNavBar = ({ user }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <span className={styles.userName}>Hi, {user.given_name}</span>
            </div>
            <div className={styles.right}>
                <UserMenu />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: AuthSelectors.getCurrentUser(state)
});

export default connect(mapStateToProps)(AccountNavBar);
