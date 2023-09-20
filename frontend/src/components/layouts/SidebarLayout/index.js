import React, { useMemo, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { findIndex } from 'lodash-es'
import { Switch, Route, Redirect } from 'react-router-dom'
import { push } from 'connected-react-router'

import Container from 'components/generic/Container/index'
import MenuIcon from '@material-ui/icons/Menu'
import LockIcon from '@material-ui/icons/Lock'
import StorageIcon from '@material-ui/icons/Storage'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    Box,
} from '@material-ui/core'

import PlatformLogo from 'assets/logos/JO_wordmark_white.png'
import IconButton from 'components/generic/IconButton'
import EventsPage from 'pages/_dashboard/renderDashboard/default/events'
import ProfilePage from 'pages/_account/profile' //TODO: fix the profile view

import config from 'constants/config'

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
    wordmark: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '5px',
        top: 0,
        height: '70px',
    },
    drawerToggle: {
        padding: '10px',
        position: 'fixed',
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: 100,
    },
    drawerToggleDesktop: {
        padding: '10px',
        position: 'fixed',
        top: theme.spacing(1),
        left: ({ desktopOpen }) =>
            desktopOpen ? SIDEBAR_WIDTH + theme.spacing(1) : theme.spacing(1),
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
        console.log("ROUTES", routes)

        const activeIndex = useMemo(() => {
            const relativePath = location.pathname.replace(baseRoute, '')
            var idx = findIndex(routes, item => {
                if (item.exact) {
                    return relativePath === item.path
                } else {
                    return relativePath.indexOf(item.path) !== -1
                }
            })
            console.log("INDEX", idx)
            console.log(relativePath)
            if (idx === -1) {
                switch (relativePath) {
                    case '/events':
                        idx = routes.length
                        console.log('/events', idx)
                        break
                    case '/events/organize':
                        idx = routes.length
                        console.log('/events', idx)
                        break
                    case '/events/partner':
                        idx = routes.length
                        console.log('/events', idx)
                        break
                    case '/profile':
                        idx = routes.length + 1
                        break
                    case '/logout':
                        idx = routes.length + 2
                        break
                    default: idx = -1
                }
            }
            console.log("IDX", idx)
            return idx
        }, [baseRoute, location.pathname, routes])

        const pushRoute = useCallback(
            path => {
                console.log(`push(${baseRoute}${path})`)
                dispatch(push(`${baseRoute}${path}`))
            },
            [baseRoute, dispatch],
        )

        useEffect(() => {
            if (activeIndex === -1) {
                console.log("PUSHING ", routes, "activeIndex", activeIndex)
                //pushRoute(routes[0].path)
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
                <Box >
                    <a href="/home">
                        <img
                            src={PlatformLogo/*config.LOGO_LIGHT_URL TODO: switch this to cloudinary*/}

                            className={classes.wordmark}
                            alt={config.PLATFORM_OWNER_NAME + ' logo'}
                        />
                    </a>
                </Box>
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
                    <hr className="tw-h-px tw-my-8 tw-w-4/5 tw-bg-gray-500 tw-border-0 tw-dark:bg-gray-900"></hr>
                    <div className='tw-grid tw-place-items-center'>
                        <ListItem

                            button
                            key={'/events'}
                            selected={routes.length === safeIndex}
                            classes={{
                                root: classes.listItem,
                                selected: classes.listItemSelected,
                            }}
                            onClick={() => {
                                console.log("safeIndex", safeIndex)
                                pushRoute('/events')
                            }}
                        >
                            <ListItemIcon
                                className={classes.listItemIcon}
                            >
                                <StorageIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary:
                                        classes.listItemTextPrimary,
                                    secondary:
                                        classes.listItemTextSecondary,
                                }}
                                primary={'Events'}
                            />
                        </ListItem>
                        <ListItem
                            button
                            key={'/profile'}
                            selected={routes.length + 1 === safeIndex}
                            classes={{
                                root: classes.listItem,
                                selected: classes.listItemSelected,
                            }}
                            onClick={() => pushRoute('/profile')}
                        >
                            <ListItemIcon
                                className={classes.listItemIcon}
                            >
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary:
                                        classes.listItemTextPrimary,
                                    secondary:
                                        classes.listItemTextSecondary,
                                }}
                                primary={'Profile'}
                            />
                        </ListItem>
                        <ListItem
                            button
                            key={'/logout'}
                            selected={routes.length + 2 === safeIndex}
                            classes={{
                                root: classes.listItem,
                                selected: classes.listItemSelected,
                            }}
                            onClick={() => dispatch(push('/logout'))}
                        >
                            <ListItemIcon
                                className={classes.listItemIcon}
                            >
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{
                                    primary:
                                        classes.listItemTextPrimary,
                                    secondary:
                                        classes.listItemTextSecondary,
                                }}
                                primary={'Log Out'}
                            />
                        </ListItem>
                        <ListItem>
                            {/*TODO: language menu */}
                            {/* <img src={FlagUK} width="40" height="30" ></img> */}

                        </ListItem>
                    </div>
                </List>
            </>
        )

        return (
            <div className={classes.root}>
                <Hidden mdUp implementation="css">
                    <IconButton
                        variant="roundedBlack"
                        onClick={handleDrawerToggle}
                        className={classes.drawerToggle}
                        aria-label="toggle drawer"
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Hidden>
                <Hidden smDown implementation="css">
                    <IconButton
                        variant="roundedBlack"
                        onClick={handleDrawerToggleDesktop}
                        className={classes.drawerToggleDesktop}
                        aria-label="toggle drawer desktop"
                    >
                        {desktopOpen ? (
                            <KeyboardBackspaceIcon />
                        ) : (
                            <MenuIcon />
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
                                    // console.log("PROPS: ", "key", key,
                                    //     "path", `${baseRoute}${path}`,
                                    //     "hidden", hidden,
                                    //     "component", component,
                                    //     exact = false,
                                    //     "locked", locked,
                                    //     "index", index)
                                    if (hidden || locked) {
                                        return null
                                        // } else if (index === 5) {
                                        //     console.log("ROUTING EVENT_ID")
                                        //     return (< Route
                                        //         key={'eventId2'}
                                        //         exact={false}
                                        //         path={`${baseRoute}/event-id`
                                        //         }
                                        //         component={LogoutPage}
                                        //     />)

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

                            <Route
                                key={'profile'}
                                exact={true}
                                path={`${baseRoute}/profile`}
                                component={ProfilePage}
                            />
                            <Route
                                key={'logout'}
                                exact={true}
                                path={`${baseRoute}/logout`}

                            />
                            <Route
                                key={'events'}
                                exact={false}
                                path={`${baseRoute}/events`}
                                component={EventsPage}
                            />

                            <Redirect to={`${baseRoute}/events`} />
                        </Switch>
                    </Container>
                </main>
            </div>
        )
    },
)
