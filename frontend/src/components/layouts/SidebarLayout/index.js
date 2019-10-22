import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './SidebarLayout.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { findIndex } from 'lodash-es';
import { Switch, Route, Redirect } from 'react-router-dom';
import CenteredContainer from 'components/generic/CenteredContainer/index';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden, IconButton, Box } from '@material-ui/core';
import { push } from 'connected-react-router';

const SIDEBAR_WIDTH = 300;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
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
        background: '#fbfbfb'
    },
    content: {
        flexGrow: 1,
        position: 'relative'
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
    listItemText: {
        color: 'inherit'
    },
    listItemIcon: {
        color: 'inherit'
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

const SidebarLayout = React.memo(({ topContent, sidebarTopContent, baseRoute, location, routes, pushRoute }) => {
    const classes = useStyles();

    const activeIndex = useMemo(() => {
        const relativePath = location.pathname.replace(baseRoute, '');
        const idx = findIndex(routes, item => item.path === relativePath);

        return idx !== -1 ? idx : 0;
    }, [baseRoute, location.pathname, routes]);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <React.Fragment>
            <Box p={2}>{sidebarTopContent}</Box>
            <List>
                {routes.map((route, index) => {
                    return (
                        <ListItem
                            button
                            key={route.path}
                            selected={index === activeIndex}
                            classes={{
                                root: classes.listItem,
                                selected: classes.listItemSelected
                            }}
                            onClick={() => pushRoute(route.path)}
                        >
                            <ListItemIcon className={classes.listItemIcon}>{route.icon}</ListItemIcon>
                            <ListItemText className={classes.listItemText} primary={route.label} />
                        </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
    );

    return (
        <div className={classes.root}>
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
                <Hidden mdUp implementation="css">
                    <IconButton
                        onClick={handleDrawerToggle}
                        className={classes.drawerToggle}
                        aria-label="toggle drawer"
                    >
                        <MenuIcon />
                    </IconButton>
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
                <CenteredContainer className={styles.pageWrapperInner} wrapperClass={styles.pageWrapper}>
                    <Switch>
                        {routes.map(({ key, path, hidden, component }, index) => {
                            if (hidden) {
                                return null;
                            } else {
                                return <Route key={key} exact path={`${baseRoute}${path}`} component={component} />;
                            }
                        })}
                        <Redirect to={baseRoute} />
                    </Switch>
                </CenteredContainer>
            </main>
        </div>
    );
});

SidebarLayout.propTypes = propTypes;

const mapDispatch = (dispatch, ownProps) => ({
    pushRoute: path => dispatch(push(`${ownProps.baseRoute}${path}`))
});

export default connect(
    null,
    mapDispatch
)(SidebarLayout);
