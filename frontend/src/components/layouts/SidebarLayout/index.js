import React, { useMemo, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { findIndex } from 'lodash-es'
import { Switch, Route, Redirect } from 'react-router-dom'
import Container from 'components/generic/Container/index'
import MenuIcon from '@material-ui/icons/Menu'
import LockIcon from '@material-ui/icons/Lock'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    IconButton,
    Box,
} from '@material-ui/core'
import { push } from 'connected-react-router'

const SIDEBAR_WIDTH = 300

const useStyles = makeStyles(theme => ({
    drawer: {
        position: 'fixed',
        top: 0,
        left: 0,
        [theme.breakpoints.up('md')]: {
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
        },
    },
    drawerToggle: {
        padding: '10px',
        position: 'fixed',
        top: theme.spacing(1),
        left: theme.spacing(1),
        background: '#fbfbfb',
        zIndex: 100,
    },
    drawerToggleDesktop: {
        padding: '10px',
        position: 'fixed',
        top: theme.spacing(1),
        left: ({ desktopOpen }) =>
            desktopOpen ? SIDEBAR_WIDTH + theme.spacing(1) : theme.spacing(1),
        background: '#fbfbfb',
        zIndex: 100,
        transition: 'left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    },
    content: {
        flexGrow: 1,
        position: 'relative',
        transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        [theme.breakpoints.up('md')]: {
            marginLeft: ({ desktopOpen }) => (desktopOpen ? SIDEBAR_WIDTH : 0),
        },
    },
    drawerPaper: {
        width: SIDEBAR_WIDTH,
        maxWidth: '80%',
        background: 'black',
        zIndex: 998,
    },

    listItem: {
        color: 'rgba(255,255,255,0.6)',
    },
    listItemSelected: {
        color: 'white',
    },
    listItemTextPrimary: {
        color: 'inherit',
    },
    listItemTextSecondary: {
        color: 'inherit',
    },
    listItemIcon: {
        color: 'inherit',
    },
    pageWrapper: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2),
        },
    },
    pageWrapperInner: {
        padding: theme.spacing(2),
        maxWidth: '1400px',
    },
}))

export default React.memo(
    ({
        topContent,
        sidebarTopContent,
        baseRoute,
        location,
        routes: _routes,
    }) => {
        const dispatch = useDispatch()
        const routes = _routes.filter(route => !route.hidden)

        const activeIndex = useMemo(() => {
            const relativePath = location.pathname.replace(baseRoute, '')
            const idx = findIndex(routes, item => {
                if (item.exact) {
                    return relativePath === item.path
                } else {
                    return relativePath.indexOf(item.path) !== -1
                }
            })

            return idx
        }, [baseRoute, location.pathname, routes])

        const pushRoute = useCallback(
            path => {
                dispatch(push(`${baseRoute}${path}`))
            },
            [baseRoute, dispatch],
        )

        useEffect(() => {
            if (activeIndex === -1) {
                pushRoute(routes[0].path)
            }
        }, [routes, activeIndex, pushRoute])

        useEffect(() => {
            setMobileOpen(false)
        }, [activeIndex])

        const safeIndex = activeIndex === -1 ? 0 : activeIndex

        const [mobileOpen, setMobileOpen] = React.useState(false)
        const [desktopOpen, setDesktopOpen] = React.useState(true)

        const classes = useStyles({ desktopOpen })

        const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen)
        }

        const handleDrawerToggleDesktop = () => {
            setDesktopOpen(!desktopOpen)
        }

        const drawerContent = (
            <>
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
                                        selected: classes.listItemSelected,
                                    }}
                                    onClick={() => pushRoute(route.path)}
                                >
                                    <ListItemIcon
                                        className={classes.listItemIcon}
                                    >
                                        {route.locked ? (
                                            <LockIcon />
                                        ) : (
                                            route.icon
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary:
                                                classes.listItemTextPrimary,
                                            secondary:
                                                classes.listItemTextSecondary,
                                        }}
                                        primary={route.label}
                                        secondary={
                                            route.locked
                                                ? route.lockedDescription
                                                : ''
                                        }
                                    />
                                </ListItem>
                            )
                        })}
                </List>
            </>
        )

        return (
            <div className={classes.root}>
                <Hidden mdUp implementation="css">
                    <IconButton
                        onClick={handleDrawerToggle}
                        className={classes.drawerToggle}
                        aria-label="toggle drawer"
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Hidden>
                <Hidden smDown implementation="css">
                    <IconButton
                        onClick={handleDrawerToggleDesktop}
                        className={classes.drawerToggleDesktop}
                        aria-label="toggle drawer desktop"
                    >
                        {desktopOpen ? (
                            <KeyboardBackspaceIcon />
                        ) : (
                            <MenuIcon fontSize="large" />
                        )}
                    </IconButton>
                </Hidden>
                <Hidden mdUp implementation="css">
                    <nav className={classes.drawer}>
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawerContent}
                        </Drawer>
                    </nav>
                </Hidden>
                <Hidden smDown implementation="css">
                    <nav className={classes.drawerDesktop}>
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="persistent"
                            anchor="left"
                            open={desktopOpen}
                            onClose={handleDrawerToggleDesktop}
                        >
                            {drawerContent}
                        </Drawer>
                    </nav>
                </Hidden>
                <main className={classes.content}>
                    {topContent}
                    <Container
                        className={classes.pageWrapperInner}
                        wrapperClass={classes.pageWrapper}
                    >
                        <Switch>
                            {routes.map(
                                (
                                    {
                                        key,
                                        path,
                                        hidden,
                                        component,
                                        exact = false,
                                        locked,
                                    },
                                    index,
                                ) => {
                                    if (hidden || locked) {
                                        return null
                                    } else {
                                        return (
                                            <Route
                                                key={key}
                                                exact={exact}
                                                path={`${baseRoute}${path}`}
                                                component={component}
                                            />
                                        )
                                    }
                                },
                            )}
                            <Redirect to={baseRoute} />
                        </Switch>
                    </Container>
                </main>
            </div>
        )
    },
)
