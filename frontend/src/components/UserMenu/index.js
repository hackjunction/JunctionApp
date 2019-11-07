import React, { useState } from 'react';
import styles from './UserMenu.module.scss';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Popover,
    IconButton,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Divider
} from '@material-ui/core';
import { logout } from 'redux/auth/actions';
import * as AuthSelectors from 'redux/auth/selectors';
import * as UserSelectors from 'redux/user/selectors';
import Button from 'components/generic/Button';

const useStyles = makeStyles(theme => ({
    menuDot: {
        width: '8px',
        height: '8px',
        margin: '2px',
        borderRadius: '2px',
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
}));

const UserMenu = ({ userProfile, logout, push, hasPermission }) => {
    const classes = useStyles();
    const [menuActive, setMenuActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    if (!userProfile) {
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
            <IconButton onClick={handleMenuOpen}>
                <Box
                    width="40px"
                    height="40px"
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                >
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                    <Box className={classes.menuDot} />
                </Box>
            </IconButton>
            <Box p={1} />
            <Avatar src={userProfile.avatar} alt="Avatar" style={{ width: '60px', height: '60px' }} />
            <Popover
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Box width="300px">
                    <List>
                        <ListSubheader disableSticky>Your account</ListSubheader>
                        <ListItem button>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <ListSubheader disableSticky>Your events</ListSubheader>
                        <ListItem button>
                            <ListItemText primary="Junction 2019" />
                        </ListItem>
                        <ListSubheader disableSticky>Other</ListSubheader>
                        <ListItem button>
                            <ListItemText primary="Organiser dashboard" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Recruitment dashboard" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Front page" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Log out" />
                        </ListItem>
                    </List>
                </Box>
            </Popover>
            {/* <div
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
            </div> */}
        </div>
    );
};

const mapStateToProps = state => ({
    userProfile: UserSelectors.userProfile(state),
    hasPermission: AuthSelectors.getHasPermission(state)
});

export default connect(
    mapStateToProps,
    { logout, push }
)(UserMenu);
