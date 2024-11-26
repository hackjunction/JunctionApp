import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { clearSession } from 'reducers/auth/actions'

import LoadingOverlay from 'components/loaders/LoadingOverlay'
import { useNavigate } from 'react-router-dom'

export default () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearSession())
        // dispatch(navigate('/home'))
        navigate('/home')
    }, [dispatch])

    return <LoadingOverlay text="Logging out" />
}
