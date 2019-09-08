import { lazy } from 'react';

import { Auth as AuthConstants } from '@hackjunction/shared';

import DefaultPage from './pages/Default';
import CallbackPage from './pages/Callback';
import ErrorPage from './pages/Error';
import LogoutPage from './pages/Logout';
import LoginPage from './pages/Login';
import LoginWelcomePage from './pages/LoginWelcome';

import EventDetailRouter from './pages/EventDetail/EventDetailRouter';
import RequiresPermission from './hocs/RequiresPermission';

const EventDashboardPage = lazy(() => import('./pages/EventDashboard'));
const OrganiserDashboardRouter = lazy(() => import('./pages/OrganiserDashboard/OrganiserDashboardRouter'));
const AdminPage = lazy(() => import('./pages/Admin'));
const AccountPage = lazy(() => import('./pages/Account'));

const routes = [
    {
        path: '/',
        component: DefaultPage,
        exact: true
    },
    {
        path: '/events/:slug',
        component: EventDetailRouter,
        exact: false
    },
    {
        path: '/login',
        component: LoginPage,
        exact: true
    },
    {
        path: '/login/welcome',
        component: LoginWelcomePage,
        exact: true
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
        path: '/admin',
        component: RequiresPermission(AdminPage, ['access:admin' /**This does not even exist yet */]),
        exact: false
    }
];

export default {
    routes
};
