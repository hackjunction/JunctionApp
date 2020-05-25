import { lazy } from 'react'

import { Auth as AuthConstants } from '@hackjunction/shared'

import DefaultPage from './pages/_index/index'
import CallbackPage from './pages/_callback'
import ErrorPage from './pages/_error'
import LogoutPage from './pages/_logout'
import LoginPage from './pages/_login'
import HackerpackPage from './pages/_hackerpack'
import EventsRouter from './pages/_events'
import ContactPage from './pages/_contact'

import RequiresPermission from './hocs/RequiresPermission'

/** Lazy-load the access-restricted pages */
const DashboardRouter = lazy(() => import('./pages/_dashboard'))
const OrganiserRouter = lazy(() => import('./pages/_organise'))
const AccountRouter = lazy(() => import('./pages/_account'))
const RecruitmentRouter = lazy(() => import('./pages/_recruitment'))
const ProjectsRouter = lazy(() => import('./pages/_projects'))
const AdminRouter = lazy(() => import('./pages/_admin'))

const routes = [
    {
        path: '/',
        component: DefaultPage,
        exact: true,
    },
    {
        path: '/events',
        component: EventsRouter,
        exact: false,
    },
    {
        path: '/login',
        component: LoginPage,
        exact: false,
    },
    {
        path: '/contact',
        component: ContactPage,
        exact: false,
    },
    {
        path: '/error',
        component: ErrorPage,
        exact: false,
    },
    {
        path: '/callback',
        component: CallbackPage,
        exact: false,
    },
    {
        path: '/logout',
        component: LogoutPage,
        exact: false,
    },
    {
        path: '/organise',
        component: RequiresPermission(OrganiserRouter, [
            AuthConstants.Permissions.MANAGE_EVENT,
        ]),
        exact: false,
    },
    {
        path: '/dashboard',
        component: RequiresPermission(DashboardRouter),
        exact: false,
    },
    {
        path: '/account',
        component: RequiresPermission(AccountRouter),
        exact: false,
    },
    {
        path: '/recruitment',
        component: RequiresPermission(RecruitmentRouter, [
            AuthConstants.Permissions.ACCESS_RECRUITMENT,
        ]),
        exact: false,
    },
    {
        path: '/projects',
        component: ProjectsRouter,
        exact: false,
    },
    {
        path: '/hackerpack',
        component: HackerpackPage,
        exact: false,
    },
    {
        //TODO require superadmin
        path: '/admin',
        component: AdminRouter,
        exact: false,
    },
]

export default {
    routes,
}
