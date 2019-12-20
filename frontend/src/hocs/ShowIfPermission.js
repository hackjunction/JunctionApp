import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { difference } from 'lodash-es'

import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'

/** Hide a component if the user doesn't have a given permission, but don't redirect to login/error */

export default (ComposedComponent, requiredPermissions = []) => {
    return props => {
        const hasProfile = useSelector(UserSelectors.hasProfile)
        const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
        const permissions = useSelector(AuthSelectors.getPermissions)

        const hasRequiredPermissions = useMemo(() => {
            return difference(requiredPermissions, permissions).length === 0
        }, [permissions])

        if (!isAuthenticated) return null
        if (!hasProfile) return null
        if (!hasRequiredPermissions) return null

        return <ComposedComponent {...props} />
    }
}
