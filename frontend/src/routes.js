import { lazy } from 'react'

import { Auth as AuthConstants } from '@hackjunction/shared'

import DefaultPage from './pages/_index/index'
import HomePage from './pages/_home/index'
import CallbackPage from './pages/_callback'
import ErrorPage from './pages/_error'
import LogoutPage from './pages/_logout'
import LoginPage from './pages/_login'
import HackerpackPage from './pages/_hackerpack'
import PricingPage from './pages/_pricing'
import EventsRouter from './pages/_events'
import ContactPage from './pages/_contact'
import RequiresPermission from './hocs/RequiresPermission'
import RequiresRole from 'hocs/RequiresRole'
// import RequiresRole from 'hocs/RequiresRole'
import config from 'constants/config'
import DevTools from 'pages/_devtools'

// /** Lazy-load the access-restricted pages */
const DashboardRouter = lazy(() => import('./pages/_dashboard'))
const OrganiserRouter = lazy(
    () => import('./pages/_dashboard/renderDashboard/organiser/router'),
)
const AccountRouter = lazy(() => import('./pages/_account'))
const RecruitmentEvents = lazy(
    () => import('./pages/_dashboard/renderDashboard/default/events/Partner'),
)
const ProjectsRouter = lazy(() => import('./pages/_projects'))
const AdminRouter = lazy(() => import('./pages/_admin'))

const routes = [
    {
        path: '/',
        element: <DefaultPage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    {
        path: '/events/*',
        element: <EventsRouter />,
    },
    {
        path: '/login/*',
        element: <LoginPage />,
    },
    {
        path: '/contact',
        element: <ContactPage />,
    },
    {
        path: '/error',
        element: <ErrorPage />,
    },
    {
        path: '/callback',
        element: <CallbackPage />,
    },
    {
        path: '/logout',
        element: <LogoutPage />,
    },
    {
        path: '/organise/*',
        element: (
            <RequiresPermission
                ComposedComponent={OrganiserRouter}
                requiredPermissions={[AuthConstants.Permissions.MANAGE_EVENT]}
            />
        ),
    },
    {
        //default after login
        path: '/dashboard/*',
        element: <RequiresPermission ComposedComponent={DashboardRouter} />,
    },
    {
        path: '/account/*',
        element: <RequiresPermission ComposedComponent={AccountRouter} />,
    },
    {
        path: '/recruitment',
        element: (
            <RequiresPermission
                ComposedComponent={RecruitmentEvents}
                requiredPermissions={[
                    AuthConstants.Permissions.ACCESS_RECRUITMENT,
                ]}
            />
        ),
    },
    {
        path: '/projects/*',
        element: <ProjectsRouter />,
    },
    {
        path: '/hackerpack',
        element: <HackerpackPage />,
    },

    {
        path: '/pricing',
        element: <PricingPage />,
    },
    {
        path: '/admin/*',
        element: (
            <RequiresRole
                ComposedComponent={AdminRouter}
                requiredRoles={[AuthConstants.Roles.SUPER_ADMIN]}
            />
        ),
    },
]

if (config.IS_DEBUG) {
    routes.push({
        path: '/devtools',
        element: (
            <RequiresRole
                ComposedComponent={DevTools}
                requiredRoles={[AuthConstants.Roles.SUPER_ADMIN]}
            />
        ),
    })
}

export default {
    routes,
}
