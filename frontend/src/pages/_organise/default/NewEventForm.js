import React, { useState, useCallback, useEffect } from 'react'

import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Box, Typography } from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'

import EventsService from 'services/events'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

export default () => {
    const [name, setName] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const hasError = Boolean(error)

    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)

    useEffect(() => {
        if (hasError) {
            if (name.length < 5) {
                setError('Name must be at least 5 characters')
            } else if (name.length >= 50) {
                setError('Name must be under 50 characters')
            } else {
                setError()
            }
        }
    }, [name, hasError])

    const checkName = useCallback(() => {
        if (name.length < 5) {
            setError('Name must be at least 5 characters')
            return false
        } else if (name.length >= 50) {
            setError('Name must be under 50 characters')
            return false
        }
        return true
    }, [name])

    const handleCreate = useCallback(() => {
        if (!checkName()) return
        setLoading(true)
        EventsService.createEvent(idToken, { name })
            .then(data => {
                dispatch(push(`/organise/${data.slug}`))
                dispatch(SnackbarActions.success(`Created ${data.name}`))
            })
            .catch(e => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... Unable to create event'
                    )
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [checkName, name, idToken, dispatch])

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                Create a new event
            </Typography>
            <Grid container spacing={2} direction="row" alignItems="flex-end">
                <Grid item xs={12}>
                    <Typography variant="caption" color="error">
                        {error}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextInput
                        label="Event name"
                        placeholder="Enter the name of your event"
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
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
