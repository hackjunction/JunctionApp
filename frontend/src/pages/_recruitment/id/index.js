import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'

import UserProfilesService from 'services/userProfiles'

import * as AuthSelectors from 'redux/auth/selectors'
import Profile from 'components/Participant/Profile'
import RecruitmentFavorites from 'components/Participant/RecruitmentFavorites'

const useStyles = makeStyles(theme => ({
    iconBlue: {
        backgroundColor: theme.palette.theme_turquoise.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    iconPurple: {
        backgroundColor: theme.palette.theme_purple.main,
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        marginRight: '8px',
    },
    bold: {
        fontWeight: 'bold',
    },
}))

export default () => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const match = useRouteMatch()

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
                .catch(err => {
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
