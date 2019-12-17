import { lazy } from 'react';

import { Auth as AuthConstants } from '@hackjunction/shared';

import DefaultPage from './pages/index';
import CallbackPage from './pages/callback';
import ErrorPage from './pages/error';
import LogoutPage from './pages/logout';
import LoginPage from './pages/login';

import EventsRouter from './pages/events';
import RequiresPermission from './hocs/RequiresPermission';

/** Lazy-load the access-restricted pages */
const EventDashboardPage = lazy(() => import('./pages/EventDashboard'));
const OrganiserDashboardRouter = lazy(() => import('./pages/OrganiserDashboard/OrganiserDashboardRouter'));
const AccountPage = lazy(() => import('./pages/account'));
const RecruitmentPage = lazy(() => import('./pages/recruitment'));
const ProjectsRouter = lazy(() => import('./pages/projects'));

const routes = [
    {
        path: '/',
        component: DefaultPage,
        exact: true
    },
    {
        path: '/events',
        component: EventsRouter,
        exact: false
    },
    {
        path: '/login',
        component: LoginPage,
        exact: false
    },
    {
        path: '/error',
        component: ErrorPage,
        exact: false
    },
    {
        path: '/callback',
        component: CallbackPage,
        exact: false
    },
    {
        path: '/logout',
        component: LogoutPage,
        exact: false
    },
    {
        path: '/organise',
        component: RequiresPermission(OrganiserDashboardRouter, [AuthConstants.Permissions.MANAGE_EVENT]),
        exact: false
    },
    {
        path: '/dashboard/:slug',
        component: RequiresPermission(EventDashboardPage),
        exact: false
    },
    {
        path: '/account',
        component: RequiresPermission(AccountPage),
        exact: false
    },
    {
        path: '/recruitment',
        component: RequiresPermission(RecruitmentPage, [AuthConstants.Permissions.ACCESS_RECRUITMENT]),
        exact: false
    },
    {
        path: '/projects',
        component: ProjectsRouter,
        exact: false
    }
];

export default {
    routes
};
