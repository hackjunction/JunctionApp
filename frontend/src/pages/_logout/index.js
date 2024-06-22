import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import * as AuthActions from 'reducers/auth/actions'

import LoadingOverlay from 'components/loaders/LoadingOverlay'

export default () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(AuthActions.clearSession())
        dispatch(push('/'))
    }, [dispatch])

    return <LoadingOverlay text="Logging out" />
}
