import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useResolvedPath } from 'react-router'
import { Dialog } from '@mui/material'
import PageWrapper from 'components/layouts/PageWrapper'
import UserProfilesService from 'services/userProfiles'
import * as AuthSelectors from 'reducers/auth/selectors'
import Profile from 'components/Participant/Profile'
import RecruitmentFavorites from 'components/Participant/RecruitmentFavorites'

const RecruitmentProfileDialog = () => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const url = useResolvedPath('').pathname

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState(null)

    const { id } = match.params
    useEffect(() => {
        if (id) {
            setLoading(true)

            UserProfilesService.getUserProfileRecruitment(id, idToken)
                .then(data => {
                    setUser(data)
                })
                .catch(() => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
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

export default RecruitmentProfileDialog
