import React, { useState, useMemo, useCallback } from 'react'

import { connect } from 'react-redux'
import { Switch, Button, Typography, Grid, Box } from '@material-ui/core'
import { withSnackbar } from 'notistack'

import AttendeeTable from 'components/tables/AttendeeTable'
import ConfirmDialog from 'components/generic/ConfirmDialog'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserActions from 'redux/organiser/actions'

import { useToggle } from 'hooks/customHooks'

import RegistrationsService from 'services/registrations'

const SearchAttendeesPage = ({
    idToken,
    event,
    registrations = [],
    registrationsLoading,
    updateRegistrations,
    enqueueSnackbar,
}) => {
    const [hideRated, setHideRated] = useState(false)
    const [confirmModal, toggleConfirmModal] = useToggle(false)
    const [assignLoading, setAssignLoading] = useState(false)
    const { slug } = event
    const handleSelfAssign = useCallback(() => {
        setAssignLoading(true)
        RegistrationsService.assignRandomRegistrations(idToken, slug)
            .then(data => {
                if (data === 0) {
                    enqueueSnackbar('No available registrations to assign!', {
                        variant: 'success',
                    })
                } else {
                    enqueueSnackbar(
                        'Assigned ' + data + ' registrations to you',
                        { variant: 'success' }
                    )
                }
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong...')
            })
            .finally(() => {
                setAssignLoading(false)
                updateRegistrations(slug)
            })
    }, [enqueueSnackbar, updateRegistrations, idToken, slug])

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

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrationsAssigned(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state),
})

const mapDispatch = dispatch => ({
    updateRegistrations: slug =>
        dispatch(OrganiserActions.updateRegistrationsForEvent(slug)),
})

export default withSnackbar(connect(mapState, mapDispatch)(SearchAttendeesPage))
