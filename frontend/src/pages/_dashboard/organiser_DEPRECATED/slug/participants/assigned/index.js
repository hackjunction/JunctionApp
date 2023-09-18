import React, { useState, useMemo, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Switch, Button, Typography, Grid, Box } from '@material-ui/core'

import AttendeeTable from 'components/tables/AttendeeTable'
import ConfirmDialog from 'components/generic/ConfirmDialog'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useToggle } from 'hooks/customHooks'

import RegistrationsService from 'services/registrations'

export default () => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const registrations = useSelector(OrganiserSelectors.registrations)
    const registrationsLoading = useSelector(
        OrganiserSelectors.registrationsLoading,
    )
    const { slug } = event

    const [hideRated, setHideRated] = useState(false)
    const [confirmModal, toggleConfirmModal] = useToggle(false)
    const [assignLoading, setAssignLoading] = useState(false)

    const handleSelfAssign = useCallback(() => {
        setAssignLoading(true)
        RegistrationsService.assignRandomRegistrations(idToken, slug)
            .then(data => {
                if (data === 0) {
                    dispatch(
                        SnackbarActions.show(
                            'No available registrations left to assign!',
                        ),
                    )
                } else {
                    dispatch(
                        SnackbarActions.success(
                            `Assigned ${data} registrations to you`,
                        ),
                    )
                }
            })
            .catch(() => {
                dispatch(SnackbarActions.error('Something went wrong...'))
            })
            .finally(() => {
                setAssignLoading(false)
                dispatch(OrganiserActions.updateRegistrationsForEvent(slug))
            })
    }, [dispatch, idToken, slug])

    const filtered = useMemo(() => {
        return registrations.filter(registration => {
            if (hideRated) {
                if (registration.rating) return false
            }
            return true
        })
    }, [registrations, hideRated])

    return (
        <Grid container spacing={2}>
            <ConfirmDialog
                open={confirmModal}
                title="Assign random registrations"
                message="This means 10 random, not rated registrations will be assigned to you, and will be your responsibility to review. Please make sure you review all of these applications."
                onOk={handleSelfAssign}
                onClose={toggleConfirmModal}
            />
            <Grid item xs={12}>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Typography variant="subtitle1">
                        Hide rated registrations
                    </Typography>
                    <Switch
                        color="primary"
                        checked={hideRated}
                        onChange={e => setHideRated(e.target.checked)}
                    />
                    <Button
                        color="primary"
                        onClick={toggleConfirmModal}
                        disabled={registrationsLoading || assignLoading}
                    >
                        Assign random registrations
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <AttendeeTable
                    attendees={filtered}
                    loading={registrationsLoading}
                />
            </Grid>
        </Grid>
    )
}
