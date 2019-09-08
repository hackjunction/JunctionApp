import { createSelector } from 'reselect';
import { reduce, difference } from 'lodash-es';
const namespace = 'https://app.hackjunction.com/';

export const getAccessToken = state => state.auth.session.accessToken || null;
export const getIdToken = state => state.auth.session.idToken || null;
export const getIdTokenPayload = state => state.auth.session.idTokenPayload || null;
export const getSession = state => state.auth.session;
export const getSessionExpiresAt = state => (state.auth.session ? state.auth.session.expiresAt : 0);
export const getNextRoute = state => state.auth.nextRoute;
export const isAuthenticated = state => getIdToken(state) !== null;
export const isSessionExpired = state => new Date().getTime() > state.auth.session.expiresAt;

export const getRoles = state =>
    state.auth.session.idTokenPayload ? state.auth.session.idTokenPayload[namespace + 'roles'] : [];

export const getPermissions = state =>
    state.auth.session.idTokenPayload ? state.auth.session.idTokenPayload[namespace + 'permissions'] : [];

export const getHasPermission = state => {
    const permissions = getPermissions(state);
    return requiredPermissions => {
        return difference(requiredPermissions, permissions).length === 0;
    };
};

export const getCurrentUser = createSelector(
    getIdTokenPayload,
    data => {
        if (!data) {
            return null;
        }
        return reduce(
            Object.keys(data),
            (result, field) => {
                result[field.replace(namespace, '')] = data[field];
                return result;
            },
            {}
        );
    }
);
