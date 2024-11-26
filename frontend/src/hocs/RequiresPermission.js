import React, { useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

import * as AuthSelectors from 'reducers/auth/selectors'
import * as AuthActions from 'reducers/auth/actions'
import * as UserSelectors from 'reducers/user/selectors'

/** Hide a component if the user doesn't have a given permission, and also redirect to login/error */

export default ({ ComposedComponent, requiredPermissions = [] }) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const isSessionExpired = useSelector(AuthSelectors.isSessionExpired)
    const permissions = useSelector(AuthSelectors.getPermissions)
    const hasProfile = useSelector(UserSelectors.hasProfile)

    const hasRequiredPermissions = useMemo(() => {
        return (
            requiredPermissions.filter(x => !permissions?.includes(x))
                .length === 0
        )
    }, [permissions])

    const checkAndRedirect = useCallback(() => {
        if (!hasProfile || !isAuthenticated) {
            const nextRoute = location?.pathname ?? '/'
            // dispatch(push('/login', { nextRoute }))
            navigate('/login', { state: { nextRoute } })
        } else if (isSessionExpired) {
            dispatch(AuthActions.renewSession())
        } else if (!hasRequiredPermissions) {
            const error = 'Access denied'
            // dispatch(push('/error', { error }))
            navigate('/error', { state: { error } })
        }
    }, [
        dispatch,
        hasProfile,
        hasRequiredPermissions,
        isAuthenticated,
        isSessionExpired,
        location,
    ])

    useEffect(() => {
        checkAndRedirect()
    }, [checkAndRedirect])

    if (!isAuthenticated) return null
    if (!hasProfile) return null
    if (!hasRequiredPermissions) return null
    if (isSessionExpired) return null

    return <ComposedComponent />
}
