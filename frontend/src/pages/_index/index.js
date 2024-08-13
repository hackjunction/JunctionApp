import React from 'react'

import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import * as AuthSelectors from '../../redux/auth/selectors'

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state
    const userIsAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const { t } = useTranslation()

    return (
        <>
            {
                userIsAuthenticated ? (
                    <Redirect to="/dashboard/default" />
                ) : (
                    <Redirect to="/home" />
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
