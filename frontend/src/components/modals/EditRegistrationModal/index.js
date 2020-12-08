import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Dialog } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'

import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

import RegistrationsService from 'services/registrations'
import MiscUtils from 'utils/misc'

import EditRegistrationActions from './EditRegistrationActions'
import EditRegistrationContent from './EditRegistrationContent'

export default ({
    registrationId,
    onClose = () => {},
    onEdited = () => {},
}) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const teamsMap = useSelector(OrganiserSelectors.teamsMap)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [registration, setRegistration] = useState()
    const { slug } = event

    useEffect(() => {
        if (registrationId) {
            setLoading(true)
            RegistrationsService.getFullRegistration(
                idToken,
                slug,
                registrationId,
            )
                .then(data => {
                    setRegistration(data)
                })
                .catch(err => {
                    setError(true)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [idToken, registrationId, slug])

    const participantName = useMemo(() => {
        if (!registration) return ''
        const { firstName, lastName } = registration.answers
        return `${firstName} ${lastName}`
    }, [registration])

    const participantSubheading = useMemo(() => {
        if (!registration) return ''
        const team = teamsMap[registration.user]
        const countryText = registration?.answers?.countryOfResidence
        const teamText = `Team: ${team?.code ?? 'No team'}`

        return [countryText, teamText].filter(value => !!value).join(' // ')
    }, [registration, teamsMap])

    const handleEdit = useCallback(
        async data => {
            setLoading(true)
            await MiscUtils.sleep(1000)
            dispatch(
                OrganiserActions.editRegistration(registrationId, data, slug),
            )
                .then(data => {
                    dispatch(SnackbarActions.success('Changes saved!'))
                    onEdited(data)
                    onClose()
                })
                .catch(err => {
                    dispatch(SnackbarActions.error('Something went wrong...'))
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, registrationId, slug, onEdited, onClose],
    )

    return (
        <Dialog open={!!registrationId} onClose={onClose} fullScreen>
            <PageWrapper loading={loading || !registration} error={error}>
                <Container center>
                    <PageHeader
                        heading={participantName}
                        subheading={participantSubheading}
                    />
                    <EditRegistrationContent registration={registration} />
                    <EditRegistrationActions
                        registration={registration}
                        onSubmit={handleEdit}
                        onCancel={onClose}
                    />
                </Container>
            </PageWrapper>
        </Dialog>
    )
}
