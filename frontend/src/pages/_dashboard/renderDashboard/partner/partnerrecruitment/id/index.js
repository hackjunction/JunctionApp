import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'

import * as AuthSelectors from 'redux/auth/selectors'
import Profile from 'components/Participant/Profile'
import RecruitmentFavorites from 'components/Participant/RecruitmentFavorites'
import RecruitmentService from 'services/recruitment'
import * as DashboardSelectors from 'redux/dashboard/selectors'

export default () => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const match = useRouteMatch()
    const event = useSelector(DashboardSelectors.event)
    const eventId = event._id
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)

    const { id } = match.params
    useEffect(() => {
        if (id) {
            setLoading(true)

            RecruitmentService.getUserProfile(idToken, id, eventId)
                .then(data => {
                    setUser(data)
                })
                .catch(err => {
                    console.error('FROM PROFILE RENDER', err)
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setError(true)
            setLoading(false)
        }
    }, [idToken, id])

    return (
        <Dialog fullScreen open={true} transitionDuration={0}>
            <PageWrapper
                error={error}
                wrapContent={false}
                loading={loading}
                render={() => (
                    <>
                        <RecruitmentFavorites user={user} />
                        <Profile user={user} />
                    </>
                )}
            />
        </Dialog>
    )
}
