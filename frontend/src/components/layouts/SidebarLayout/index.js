import React, { useMemo, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { findIndex } from 'lodash-es'
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu'
import LockIcon from '@mui/icons-material/Lock'
import StorageIcon from '@mui/icons-material/Storage'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import PlatformLogo from 'assets/logos/JO_wordmark_white.png'
import Container from 'components/generic/Container/index'
import IconButton from 'components/generic/IconButton'
import EventsPage from 'pages/_dashboard/renderDashboard/default/events'
import ProfilePage from 'pages/_account/profile' //TODO: fix the profile view

import config from 'constants/config'
import { useTranslation } from 'react-i18next'

const SIDEBAR_WIDTH = '300px'

const Logo = styled('img')({
    height: '70px',
    margin: '0 auto',
    padding: '5px',
    backgroundColor: 'black',
})

const RouteList = styled(List)({
    color: 'rgba(255,255,255,0.6)',
    '& .MuiListItem-root': {
        padding: 0,
    },
    '& .MuiListItemButton-root': {
        '&.Mui-selected': {
            color: 'white',
            backgroundColor: 'black',
        },
    },
    '& .MuiListItemIcon-root': {
        color: 'inherit',
    },
})

const MenuButtonBox = styled(Box, {
    // This specifies which props should not get passed down to the DOM, will throw a console error if you do.
    shouldForwardProp: prop => prop !== 'desktopOpen',
})(({ theme, desktopOpen }) => ({
    position: 'fixed',
    top: '0.5rem',
    left: '0.5rem',
    zIndex: 100, // to make sure the text boxes doesn't go over the button
    [theme.breakpoints.up('md')]: {
        top: '0.75rem',
        transition: 'all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        left: desktopOpen ? `calc(${SIDEBAR_WIDTH} + 0.5rem)` : '0.5rem',
        transform: desktopOpen ? 'rotate(-90deg)' : 'rotate(0)',
    },
}))

const LineDivider = styled('hr')({
    margin: '2rem auto',
    width: '80%',
    height: '1px',
})

const Main = styled('main', {
    shouldForwardProp: prop => prop !== 'desktopOpen',
})(({ theme, desktopOpen }) => ({
    [theme.breakpoints.up('md')]: {
        marginLeft: desktopOpen ? SIDEBAR_WIDTH : 0,
    },
    transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
}))

export default React.memo(
    ({
        topContent,
        sidebarTopContent,
        baseRoute,
        location,
        routes: _routes,
    }) => {
        console.log('SidebarLayout')
        console.log('topContent', topContent)
        console.log('sidebarTopContent', sidebarTopContent)
        console.log('baseRoute', baseRoute)
        console.log('location', location)
        console.log('routes', _routes)
        const dispatch = useDispatch()
        const routes = _routes.filter(route => !route.hidden)
        const navigate = useNavigate()

        const { t } = useTranslation()
        const activeIndex = useMemo(() => {
            const relativePath = location.pathname.replace(baseRoute, '')
            let idx = findIndex(routes, item => {
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
                // dispatch(push(`${baseRoute}${path}`))
                navigate(`${baseRoute}${path}`)
            },
            [baseRoute, dispatch],
        )

        // useEffect(() => {
        //     if (activeIndex === -1) {
        //         pushRoute(routes[0].path)
        //     }
        // }, [routes, activeIndex, pushRoute])

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
            <Box>
                <Link to="/home">
                    <Logo
                        src={
                            PlatformLogo /*config.LOGO_LIGHT_URL TODO: switch this to cloudinary*/
                        }
                        alt={config.PLATFORM_OWNER_NAME + ' logo'}
                    />
                </Link>
                <Box sx={{ p: 2 }}>{sidebarTopContent}</Box>
                <RouteList>
                    {routes
                        .filter(route => !route.hidden)
                        .map((route, index) => {
                            return (
                                <ListItem>
                                    <ListItemButton
                                        disabled={route.locked}
                                        key={route?.onClickPath || route.path}
                                        selected={index === safeIndex}
                                        onClick={() =>
                                            pushRoute(
                                                route?.onClickPath ||
                                                    route.path,
                                            )
                                        }
                                    >
                                        <ListItemIcon>
                                            {route.locked ? (
                                                <LockIcon />
                                            ) : (
                                                route.icon
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={route.label}
                                            secondary={
                                                route.locked
                                                    ? route.lockedDescription
                                                    : ''
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    <LineDivider />
                    <ListItem>
                        <ListItemButton
                            key={'/events'}
                            selected={routes.length === safeIndex}
                            onClick={() => {
                                pushRoute('/events')
                            }}
                        >
                            <ListItemIcon>
                                <StorageIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('Events_')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            key={'/profile'}
                            selected={routes.length + 1 === safeIndex}
                            onClick={() => pushRoute('/profile')}
                        >
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('Profile_')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            key={'/logout'}
                            onClick={() => navigate('/logout')}
                        >
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={t('Log_out_')} />
                        </ListItemButton>
                    </ListItem>
                </RouteList>
            </Box>
        )

        return (
            <div>
                {/* Menu button for small screens */}
                <MenuButtonBox sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton
                        variant="roundedBlack"
                        onClick={handleDrawerToggle}
                        sx={{ padding: '10px' }}
                        aria-label="toggle drawer"
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </MenuButtonBox>
                {/* Menu button for bigger screens */}
                <MenuButtonBox
                    desktopOpen={desktopOpen}
                    sx={{ display: { xs: 'none', md: 'block' } }}
                >
                    <IconButton
                        variant="roundedBlack"
                        onClick={handleDrawerToggleDesktop}
                        sx={{ padding: '10px' }}
                        aria-label="toggle drawer desktop"
                    >
                        <MenuIcon />
                    </IconButton>
                </MenuButtonBox>

                {/* Small screen drawer */}
                <Box
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <nav>
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: SIDEBAR_WIDTH,
                                    backgroundColor: 'black',
                                    maxWidth: '80%',
                                },
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawerContent}
                        </Drawer>
                    </nav>
                </Box>
                {/* Bigger screen drawer */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    <nav>
                        <Drawer
                            variant="persistent"
                            anchor="left"
                            open={desktopOpen}
                            onClose={handleDrawerToggleDesktop}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: SIDEBAR_WIDTH,
                                    backgroundColor: 'black',
                                    /* maxWidth: '80%', */
                                },
                            }}
                        >
                            {drawerContent}
                        </Drawer>
                    </nav>
                </Box>

                <Main desktopOpen={desktopOpen}>
                    {topContent}
                    <Container
                        sx={{
                            padding: { xs: '1rem', md: '2rem' },
                            maxWidth: '1440px',
                        }}
                    >
                        <Routes>
                            {routes.map(
                                (
                                    {
                                        key,
                                        path,
                                        hidden,
                                        component: Component,
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
                                                path={`${path}`}
                                                element={<Component />}
                                            />
                                        )
                                    }
                                },
                            )}

                            <Route
                                key={'profile'}
                                path={`profile`}
                                element={<ProfilePage />}
                            />
                            <Route
                                key={'events'}
                                path={`events/*`}
                                element={<EventsPage />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to="events" replace />}
                            />
                        </Routes>
                    </Container>
                </Main>
            </div>
        )
    },
)
