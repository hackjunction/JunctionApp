import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import * as AuthActions from 'redux/auth/actions'

import LoadingOverlay from 'components/loaders/LoadingOverlay'

export default () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(AuthActions.clearSession())
        dispatch(push('/'))
    }, [dispatch])

    return <LoadingOverlay text="Logging out" />
}
