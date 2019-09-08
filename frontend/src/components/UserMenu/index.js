import React, { useState } from 'react';
import styles from './UserMenu.module.scss';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Auth as AuthConstants } from '@hackjunction/shared';
import { logout } from 'redux/auth/actions';
import { getCurrentUser, getHasPermission } from 'redux/auth/selectors';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import UserMenuIcon from './UserMenuIcon';

const UserMenu = ({ user, logout, push, hasPermission }) => {
    const [menuActive, setMenuActive] = useState(false);
    if (!user) {
        return (
            <div className={styles.wrapper}>
                <Button link={{ internal: '/login' }} theme="minimal" round text="SIGN IN" />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <UserMenuIcon active={menuActive} onClick={() => setMenuActive(!menuActive)} />
            <Divider size={1} />
            <img className={styles.avatar} src={user.picture} alt="Avatar" />
            <div
                className={classNames({
                    [styles.menuWrapper]: true,
                    [styles.menuWrapperActive]: menuActive
                })}
            >
                <div className={styles.menu}>
                    <Link className={styles.menuItem} to="/account">
                        My Account
                    </Link>
                    <Link className={styles.menuItem} to="/account/preferences">
                        Preferences
                    </Link>
                    <Link className={styles.menuItem} to="/logout">
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: getCurrentUser(state),
    hasPermission: getHasPermission(state)
});

export default connect(
    mapStateToProps,
    { logout, push }
)(UserMenu);
