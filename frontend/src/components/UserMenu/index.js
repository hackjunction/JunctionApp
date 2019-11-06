import React, { useState } from 'react';
import styles from './UserMenu.module.scss';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { logout } from 'redux/auth/actions';
import * as AuthSelectors from 'redux/auth/selectors';
import * as UserSelectors from 'redux/user/selectors';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import UserMenuIcon from './UserMenuIcon';

const UserMenu = ({ user, logout, push, hasPermission }) => {
    const [menuActive, setMenuActive] = useState(false);
    if (!user) {
        return (
            <div className={styles.wrapper}>
                <Button color="theme_white" variant="outlined" strong onClick={() => push('/login')}>
                    Sign in
                </Button>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <UserMenuIcon active={menuActive} onClick={() => setMenuActive(!menuActive)} />
            <Divider size={1} />
            <img className={styles.avatar} src={user.avatar} alt="Avatar" />
            <div
                className={classNames({
                    [styles.menuWrapper]: true,
                    [styles.menuWrapperActive]: menuActive
                })}
            >
                <div className={styles.menu}>
                    <Link className={styles.menuItem} to="/account">
                        <Typography variant="button">My Account</Typography>
                    </Link>
                    <Link className={styles.menuItem} to="/account/preferences">
                        <Typography variant="button">Preferences</Typography>
                    </Link>
                    <Link className={styles.menuItem} to="/logout">
                        <Typography variant="button">Log out</Typography>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: UserSelectors.userProfile(state),
    hasPermission: AuthSelectors.getHasPermission(state)
});

export default connect(
    mapStateToProps,
    { logout, push }
)(UserMenu);
