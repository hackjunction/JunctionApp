import React from 'react';
import styles from './AccountNavBar.module.scss';

import { connect } from 'react-redux';

import UserMenu from 'components/UserMenu';
import * as UserSelectors from 'redux/user/selectors';

const AccountNavBar = ({ userProfile }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <span className={styles.userName}>Hi, {userProfile.firstName}</span>
            </div>
            <div className={styles.right}>
                <UserMenu />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    userProfile: UserSelectors.userProfile(state)
});

export default connect(mapStateToProps)(AccountNavBar);
