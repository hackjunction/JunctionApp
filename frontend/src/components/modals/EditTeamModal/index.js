import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Dialog } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import AdminTeamEdit from 'components/Team/AdminTeamEdit'

import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'

import TeamsService from 'services/teams'

export default ({ teamCode, onClose = () => {}, onEdited = () => {} }) => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [team, setTeam] = useState()
    const { slug } = event
    useEffect(() => {
        if (teamCode) {
            setLoading(true)
            TeamsService.getTeamWithMetaForEventParticipant(
                idToken,
                slug,
                teamCode,
            )
                .then(data => {
                    setTeam(data)
                })
                .catch(err => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [idToken, teamCode, slug])

    return (
        <Dialog open={!!teamCode} onClose={onClose} fullScreen>
            <PageWrapper loading={loading} error={error}>
                <Container center>
                    <AdminTeamEdit
                        teamData={team}
                        onCancel={onClose}
                        slug={slug}
                    />
                </Container>
            </PageWrapper>
        </Dialog>
    )
}
