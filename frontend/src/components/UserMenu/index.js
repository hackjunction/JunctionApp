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
import { hasRecruiterAccess } from '../../redux/auth/selectors';

const useStyles = makeStyles(theme => ({
    menuDot: {
        width: '8px',
        height: '8px',
        margin: '2px',
        borderRadius: '2px',
        backgroundColor: 'rgba(0,0,0,0.3)'
    }
}));

const UserMenu = ({
    userProfile,
    idTokenData,
    logout,
    push,
    hasPermission,
    hasOrganiserAccess,
    hasRecruiterAccess
}) => {
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

    const renderEventItems = () => {
        //const items = [];
        //TODO: Add links to event dashboard here for ongoing events
        return null;
    };

    const renderOtherItems = () => {
        const items = [];

        if (hasOrganiserAccess) {
            items.push({
                label: 'Organiser dashboard',
                onClick: () => push('/organise')
            });
        }

        if (hasRecruiterAccess) {
            items.push({
                label: 'Recruitment dashboard',
                onClick: () => push('/recruitment')
            });
        }

        if (items.length > 0) {
            return (
                <React.Fragment>
                    <ListSubheader disableSticky>Other</ListSubheader>
                    {items.map(({ label, onClick }) => (
                        <ListItem key={label} button onClick={onClick}>
                            <ListItemText primary={label} />
                        </ListItem>
                    ))}
                </React.Fragment>
            );
        }

        return null;
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
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
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Box width="300px">
                    <List onClick={handleMenuClose}>
                        <ListSubheader disableSticky>Your account</ListSubheader>
                        <ListItem button>
                            <ListItemText primary="Dashboard" onClick={() => push('/account')} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Settings" onClick={() => push('/account/preferences')} />
                        </ListItem>
                        {renderEventItems()}
                        {renderOtherItems()}
                        <Divider />
                        <ListItem button onClick={() => push('/')}>
                            <ListItemText primary="Front page" />
                        </ListItem>
                        <ListItem button onClick={() => push('/logout')}>
                            <ListItemText primary="Log out" />
                        </ListItem>
                    </List>
                </Box>
            </Popover>
        </Box>
    );
};

const mapStateToProps = state => ({
    userProfile: UserSelectors.userProfile(state),
    idTokenData: AuthSelectors.idTokenData(state),
    hasPermission: AuthSelectors.getHasPermission(state),
    hasOrganiserAccess: AuthSelectors.hasOrganiserAccess(state),
    hasRecruiterAccess: AuthSelectors.hasRecruiterAccess(state)
});

export default connect(
    mapStateToProps,
    { logout, push }
)(UserMenu);
