import React, { useMemo, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { findIndex } from 'lodash-es'
import { Routes, Route, Navigate } from 'react-router-dom'

import Container from 'components/generic/Container/index'
import MenuIcon from '@mui/icons-material/Menu'
import LockIcon from '@mui/icons-material/Lock'
import StorageIcon from '@mui/icons-material/Storage'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Hidden,
    Box,
} from '@mui/material'

import PlatformLogo from 'assets/logos/JO_wordmark_white.png'
import IconButton from 'components/generic/IconButton'
import EventsPage from 'pages/_dashboard/renderDashboard/default/events'
import ProfilePage from 'pages/_account/profile' //TODO: fix the profile view

import config from 'constants/config'

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
            var idx = findIndex(routes, item => {
                if (item.exact) {
                    return relativePath === item.path
                } else {
                    return relativePath.indexOf(item.path) !== -1
                }
            })
            if (idx === -1) {
                switch (relativePath) {
                    case '/events':
                        idx = routes.length
                        break
                    case '/events/organize':
                        idx = routes.length
                        break
                    case '/events/partner':
                        idx = routes.length
                        break
                    case '/profile':
                        idx = routes.length + 1
                        break
                    case '/logout':
                        idx = routes.length + 2
                        break
                    default:
                        idx = -1
                }
            }
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
                //pushRoute(routes[0].path)
            }
        }, [routes, activeIndex, pushRoute])

        useEffect(() => {
            setMobileOpen(false)
        }, [activeIndex])

        const safeIndex = activeIndex === -1 ? 0 : activeIndex

        const [mobileOpen, setMobileOpen] = React.useState(false)
        const [desktopOpen, setDesktopOpen] = React.useState(true)

        const handleDrawerToggle = () => {
            setMobileOpen(!mobileOpen)
        }

        const handleDrawerToggleDesktop = () => {
            setDesktopOpen(!desktopOpen)
        }

        const drawerContent = (
            <>
                <Box>
                    <a href="/home">
                        <img
                            src={
                                PlatformLogo /*config.LOGO_LIGHT_URL TODO: switch this to cloudinary*/
                            }
                            className="block mx-auto p-1.5 h-18"
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
                                    className={`${
                                        index === safeIndex
                                            ? 'text-white'
                                            : 'text-gray-400'
                                    }`}
                                    onClick={() => pushRoute(route.path)}
                                >
                                    <ListItemIcon className="text-inherit">
                                        {route.locked ? (
                                            <LockIcon />
                                        ) : (
                                            route.icon
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        className="text-inherit"
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
                    <hr className="h-px my-8 w-4/5 bg-gray-500 border-0 dark:bg-gray-900"></hr>
                    <div className="grid place-items-center">
                        <ListItem
                            button
                            key={'/events'}
                            selected={routes.length === safeIndex}
                            className={`${
                                routes.length === safeIndex
                                    ? 'text-white'
                                    : 'text-gray-400'
                            }`}
                            onClick={() => {
                                pushRoute('/events')
                            }}
                        >
                            <ListItemIcon className="text-inherit">
                                <StorageIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="text-inherit"
                                primary={'Events'}
                            />
                        </ListItem>
                        <ListItem
                            button
                            key={'/profile'}
                            selected={routes.length + 1 === safeIndex}
                            className={`${
                                routes.length + 1 === safeIndex
                                    ? 'text-white'
                                    : 'text-gray-400'
                            }`}
                            onClick={() => pushRoute('/profile')}
                        >
                            <ListItemIcon className="text-inherit">
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="text-inherit"
                                primary={'Profile'}
                            />
                        </ListItem>
                        <ListItem
                            button
                            key={'/logout'}
                            selected={routes.length + 2 === safeIndex}
                            className={`${
                                routes.length + 2 === safeIndex
                                    ? 'text-white'
                                    : 'text-gray-400'
                            }`}
                            onClick={() => dispatch(push('/logout'))}
                        >
                            <ListItemIcon className="text-inherit">
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText
                                className="text-inherit"
                                primary={'Log Out'}
                            />
                        </ListItem>
                    </div>
                </List>
            </>
        )

        return (
            <div>
                <Hidden mdUp implementation="css">
                    <IconButton
                        variant="roundedBlack"
                        onClick={handleDrawerToggle}
                        className="p-2 fixed top-2 left-2 z-50"
                        aria-label="toggle drawer"
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Hidden>
                <Hidden smDown implementation="css">
                    <IconButton
                        variant="roundedBlack"
                        onClick={handleDrawerToggleDesktop}
                        className={`p-2 fixed top-2 z-50 transition-all ${
                            desktopOpen ? 'left-[calc(300px+0.5rem)]' : 'left-2'
                        }`}
                        aria-label="toggle drawer desktop"
                    >
                        <MenuIcon
                            className={`transition-transform ${
                                desktopOpen ? 'rotate-[-90deg]' : 'rotate-0'
                            }`}
                        />
                    </IconButton>
                </Hidden>
                <Hidden mdUp implementation="css">
                    <nav className="fixed top-0 left-0 md:w-[300px] md:flex-shrink-0">
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: 'w-[300px] max-w-[80%] bg-black z-[998]',
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
                    <nav className="fixed top-0 left-0 md:w-[300px] md:flex-shrink-0">
                        <Drawer
                            classes={{
                                paper: 'w-[300px] max-w-[80%] bg-black z-[998]',
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
                <main
                    className={`flex-grow relative transition-all ${
                        desktopOpen ? 'ml-[300px]' : 'ml-0'
                    }`}
                >
                    {topContent}
                    <Container className="p-0 md:p-8">
                        <div className="p-8 max-w-[1400px]">
                            <Routes>
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

                                <Navigate to={`${baseRoute}/events`} />
                            </Routes>
                        </div>
                    </Container>
                </main>
            </div>
        )
    },
)
