import React from 'react'

import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as AuthSelectors from '../../redux/auth/selectors'

export default () => {
    const userIsAuthenticated = useSelector(AuthSelectors.isAuthenticated)

    return (
        <>
            {
                userIsAuthenticated ? (
                    <Redirect to="/dashboard/default" />
                ) : (
                    <Redirect to="/home" />
                )
            }
        </>
    )
}
