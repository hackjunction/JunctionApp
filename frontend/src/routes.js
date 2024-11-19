import { lazy } from 'react'

// import { Auth as AuthConstants } from '@hackjunction/shared'

import DefaultPage from './pages/_index/index'
import HomePage from './pages/_home/index'
import CallbackPage from './pages/_callback'
import ErrorPage from './pages/_error'
import LogoutPage from './pages/_logout'
import LoginPage from './pages/_login'
// import HackerpackPage from './pages/_hackerpack'
// import PricingPage from './pages/_pricing'
// import EventsRouter from './pages/_events'
import ContactPage from './pages/_contact'
import RequiresPermission from './hocs/RequiresPermission'
// import RequiresRole from 'hocs/RequiresRole'

// /** Lazy-load the access-restricted pages */
const DashboardRouter = lazy(() => import('./pages/_dashboard'))
// const OrganiserRouter = lazy(
//     () => import('./pages/_dashboard/renderDashboard/organiser/router'),
// )
// const AccountRouter = lazy(() => import('./pages/_account'))
// //TODO: switch the recruitment view and router
// const RecruitmentRouter = lazy(
//     () =>
//         import('./pages/_dashboard/renderDashboard/partner/partnerrecruitment'),
// ) //import('./pages/_recruitment'))//
// const ProjectsRouter = lazy(() => import('./pages/_projects'))
// const AdminRouter = lazy(() => import('./pages/_admin'))
// const SandboxRouter = lazy(() => import('./pages/_sandbox'))
// const FilesRouter = lazy(() => import('./pages/_sandbox/files'))

const routes = [
    {
        path: '/',
        element: <DefaultPage />,
    },
    {
        path: '/home',
        element: <HomePage />,
    },
    // {
    //     path: '/events',
    //     element: <EventsRouter />,
    // },
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
    // {
    //     path: '/organise',
    //     component: RequiresPermission(OrganiserRouter),
    //     /*component: RequiresPermission(OrganiserRouter, [
    //         AuthConstants.Permissions.MANAGE_EVENT,
    //         ]),*/
    // },
    {
        //default after login
        path: '/dashboard/*',
        // element: <DashboardRouter />,
        element: <RequiresPermission ComposedComponent={DashboardRouter} />,
    },
    // {
    //     path: '/account',
    //     component: RequiresPermission(AccountRouter),
    // },
    // {
    //     path: '/recruitment',
    //     component: RequiresPermission(RecruitmentRouter, [
    //         AuthConstants.Permissions.ACCESS_RECRUITMENT,
    //     ]),
    // },
    // {
    //     path: '/projects',
    //     component: ProjectsRouter,
    // },
    // {
    //     path: '/hackerpack',
    //     component: HackerpackPage,
    // },

    // {
    //     path: '/pricing',
    //     component: PricingPage,
    // },
    // {
    //     path: '/admin',
    //     component: RequiresRole(AdminRouter, [AuthConstants.Roles.SUPER_ADMIN]),
    // },
    // {
    //     path: '/sandbox',
    //     component: RequiresRole(SandboxRouter, [
    //         AuthConstants.Roles.SUPER_ADMIN,
    //     ]),
    // },
    // {
    //     path: '/files',
    //     component: RequiresRole(SandboxRouter, [
    //         AuthConstants.Roles.SUPER_ADMIN,
    //     ]),
    // },
]

export default {
    routes,
}
