import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { findIndex } from 'lodash-es';
import { Switch, Route, Redirect } from 'react-router-dom';
import CenteredContainer from 'components/generic/CenteredContainer/index';
import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, IconButton, Box } from '@material-ui/core';
import { push } from 'connected-react-router';

const SIDEBAR_WIDTH = 300;

const useStyles = makeStyles(theme => ({
    drawer: {
        position: 'fixed',
        top: 0,
        left: 0,
        [theme.breakpoints.up('md')]: {
            width: SIDEBAR_WIDTH,
            flexShrink: 0
        }
    },
    drawerToggle: {
        padding: '10px',
        position: 'fixed',
        top: theme.spacing(1),
        left: theme.spacing(1),
        background: '#fbfbfb',
        zIndex: 100
    },
    content: {
        flexGrow: 1,
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            marginLeft: SIDEBAR_WIDTH
        }
    },
    drawerPaper: {
        width: SIDEBAR_WIDTH,
        maxWidth: '80%',
        background: 'black'
    },

    listItem: {
        color: 'rgba(255,255,255,0.6)'
    },
    listItemSelected: {
        color: 'white'
    },
    listItemTextPrimary: {
        color: 'inherit'
    },
    listItemTextSecondary: {
        color: 'inherit'
    },
    listItemIcon: {
        color: 'inherit'
    },
    pageWrapper: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2)
        }
    },
    pageWrapperInner: {
        padding: theme.spacing(2)
    }
}));

const propTypes = {
    topContent: PropTypes.node,
    sidebarTopContent: PropTypes.node,
    baseRoute: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
            icon: PropTypes.node.isRequired,
            label: PropTypes.string.isRequired,
            component: PropTypes.node.isRequired,
            hidden: PropTypes.bool
        })
    ),
    location: PropTypes.object.isRequired
};

const SidebarLayout = React.memo(
    ({ topContent, sidebarTopContent, baseRoute, location, routes: _routes, pushRoute }) => {
        const classes = useStyles();
        const routes = _routes.filter(route => !route.hidden);

        const activeIndex = useMemo(() => {
            const relativePath = location.pathname.replace(baseRoute, '');
            const idx = findIndex(routes, item => {
                if (item.exact) {
                    return relativePath === item.path;
                } else {
                    return relativePath.indexOf(item.path) !== -1;
                }
            });

            return idx;
        }, [baseRoute, location.pathname, routes]);

        useEffect(() => {
            if (activeIndex === -1) {
                pushRoute(routes[0].path);
            }
        }, [routes, activeIndex, pushRoute]);

        const safeIndex = activeIndex === -1 ? 0 : activeIndex;

        const [mobileOpen, setMobileOpen] = React.useState(false);

        const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen);
        };

        const drawerContent = (
            <React.Fragment>
                <Box p={2}>{sidebarTopContent}</Box>
                <List>
                    {routes
                        .filter(route => !route.hidden)
                        .map((route, index) => {
                            return (
                                <ListItem
                                    disabled={route.locked}
                                    button
                                    key={route.path}
                                    selected={index === safeIndex}
                                    classes={{
                                        root: classes.listItem,
                                        selected: classes.listItemSelected
                                    }}
                                    onClick={() => pushRoute(route.path)}
                                >
                                    <ListItemIcon className={classes.listItemIcon}>
                                        {route.locked ? <LockIcon /> : route.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.listItemTextPrimary,
                                            secondary: classes.listItemTextSecondary
                                        }}
                                        primary={route.label}
                                        secondary={route.locked ? route.lockedDescription : ''}
                                    />
                                </ListItem>
                            );
                        })}
                </List>
            </React.Fragment>
        );

        return (
            <div className={classes.root}>
                <Hidden mdUp implementation="css">
                    <IconButton
                        onClick={handleDrawerToggle}
                        className={classes.drawerToggle}
                        aria-label="toggle drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <nav className={classes.drawer}>
                    <Hidden mdUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            {drawerContent}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            anchor="left"
                            open
                        >
                            {drawerContent}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    {topContent}
                    <CenteredContainer className={classes.pageWrapperInner} wrapperClass={classes.pageWrapper}>
                        <Switch>
                            {routes.map(({ key, path, hidden, component, exact = false, locked }, index) => {
                                if (hidden || locked) {
                                    return null;
                                } else {
                                    return (
                                        <Route
                                            key={key}
                                            exact={exact}
                                            path={`${baseRoute}${path}`}
                                            component={component}
                                        />
                                    );
                                }
                            })}
                            <Redirect to={baseRoute} />
                        </Switch>
                    </CenteredContainer>
                </main>
            </div>
        );
    }
);

SidebarLayout.propTypes = propTypes;

const mapDispatch = (dispatch, ownProps) => ({
    pushRoute: path => dispatch(push(`${ownProps.baseRoute}${path}`))
});

export default connect(null, mapDispatch)(SidebarLayout);
