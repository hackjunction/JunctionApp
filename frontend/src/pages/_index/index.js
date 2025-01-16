import React from 'react'

import { useSelector } from 'react-redux'

import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import * as AuthSelectors from 'reducers/auth/selectors'

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state
    const userIsAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const { t } = useTranslation()

    return (
        <>
            {
                userIsAuthenticated ? (
                    <Navigate to="/dashboard/default" />
                ) : (
                    <Navigate to="/home" />
                )
                // <Route
                //     exact={true}
                //     path={`${match.path}/home`}
                //     component={IndexPage}
                // />
            }
        </>
    )
}
