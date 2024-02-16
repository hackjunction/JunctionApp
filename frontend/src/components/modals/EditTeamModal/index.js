import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import AdminTeamEdit from 'components/Team/AdminTeamEdit'

import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'



import TeamsService from 'services/teams'

export default ({
    teamCode,
    onClose = () => { },
    onEdited = () => { },
}) => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    //const team = useSelector(OrganiserSelectors.teams)
    //console.log("team", team.find(t => t.code === teamCode))



    // const teamsMap = useSelector(OrganiserSelectors.teamsMap)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [team, setTeam] = useState()
    const { slug } = event
    console.log("teamCode", teamCode)
    useEffect(() => {
        if (teamCode) {
            setLoading(true)
            TeamsService.getTeamWithMetaForEventParticipant(
                idToken,
                slug,
                teamCode
            )
                .then(data => {
                    console.log("data", data)
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

    // const participantName = useMemo(() => {
    //     if (!registration) return ''
    //     const { firstName, lastName } = registration.answers
    //     return `${firstName} ${lastName}`
    // }, [registration])

    // const participantSubheading = useMemo(() => {
    //     if (!registration) return ''
    //     const team = teamsMap[registration.user]
    //     const countryText = registration?.answers?.countryOfResidence
    //     const teamText = `Team: ${team?.code ?? 'No team'}`

    //     return [countryText, teamText].filter(value => !!value).join(' // ')
    // }, [registration, teamsMap])

    // const handleEdit = useCallback(
    //     async data => {
    //         setLoading(true)
    //         await MiscUtils.sleep(1000)
    //         dispatch(
    //             OrganiserActions.editRegistration(registrationId, data, slug),
    //         )
    //             .then(data => {
    //                 dispatch(SnackbarActions.success('Changes saved!'))
    //                 onEdited(data)
    //                 onClose()
    //             })
    //             .catch(err => {
    //                 dispatch(SnackbarActions.error('Something went wrong...'))
    //             })
    //             .finally(() => {
    //                 setLoading(false)
    //             })
    //     },
    //     [dispatch, registrationId, slug, onEdited, onClose],
    // )

    return (
        <Dialog open={!!teamCode} onClose={onClose} fullScreen>
            <PageWrapper loading={loading} error={error}>
                <Container center>
                    <AdminTeamEdit
                        teamData={team}
                        onCancel={onClose}
                        slug={slug}
                    />
                    {/* <EditRegistrationContent registration={registration} />
                    <EditRegistrationActions
                        registration={registration}
                        onSubmit={handleEdit}
                        onCancel={onClose}
                    /> */}
                </Container>
            </PageWrapper>
        </Dialog>
    )
}
