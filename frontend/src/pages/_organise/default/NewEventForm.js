import React, { useState, useCallback, useEffect } from 'react'

import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Box, Typography } from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'

import EventsService from 'services/events'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useTranslation } from 'react-i18next'
export default () => {
    const { t, i18n } = useTranslation() // eslint-disable-line
    const [name, setName] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const hasError = Boolean(error)

    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)

    useEffect(() => {
        if (hasError) {
            if (name.length < 5) {
                setError(t('Name_must_five_'))
            } else if (name.length >= 50) {
                setError(t('Name_must_under_'))
            } else {
                setError()
            }
        }
    }, [name, hasError, t])

    const checkName = useCallback(() => {
        if (name.length < 5) {
            setError(t('Name_must_five_'))
            return false
        } else if (name.length >= 50) {
            setError(t('Name_must_under_'))
            return false
        }
        return true
    }, [name.length, t])

    const handleCreate = useCallback(() => {
        if (!checkName()) return
        setLoading(true)
        EventsService.createEvent(idToken, { name })
            .then(data => {
                dispatch(push(`/organise/${data.slug}`))
                dispatch(SnackbarActions.success(`Created ${data.name}`))
            })
            .catch(e => {
                dispatch(SnackbarActions.error(t('Unable_to_create_')))
            })
            .finally(() => {
                setLoading(false)
            })
    }, [checkName, idToken, name, dispatch, t])

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Create_new_event_')}
            </Typography>
            <Grid container spacing={2} direction="row" alignItems="flex-end">
                <Grid item xs={12}>
                    <Typography variant="caption" color="error">
                        {error}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextInput
                        label={t('Event_name_')}
                        placeholder={t('Enter_event_name_')}
                        value={name}
                        onChange={setName}
                        disabled={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        disabled={hasError}
                        onClick={handleCreate}
                        loading={loading}
                        fullWidth
                        color="primary"
                        variant="contained"
                    >
                        {t('Create_')}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
