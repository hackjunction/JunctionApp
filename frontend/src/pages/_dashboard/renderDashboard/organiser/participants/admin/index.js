import React, { useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { groupBy, filter } from 'lodash-es'
import { RegistrationStatuses } from '@hackjunction/shared'
import { Grid, Paper, Typography } from '@mui/material'
import StatusBadge from 'components/generic/StatusBadge'
import Statistic from 'components/generic/Statistic'
import PageWrapper from 'components/layouts/PageWrapper'
import * as OrganiserSelectors from 'reducers/organiser/selectors'
import * as AuthSelectors from 'reducers/auth/selectors'
import * as OrganiserActions from 'reducers/organiser/actions'
import * as SnackbarActions from 'reducers/snackbar/actions'
import RegistrationsService from 'services/registrations'
import Button from 'components/generic/Button'

import TextAreaInput from 'components/inputs/TextAreaInput'

const STATUSES = RegistrationStatuses.asObject

export default () => {
    const isSuperAdmin = useSelector(AuthSelectors.hasSuperAdmin)
    const dispatch = useDispatch()

    const registrations = useSelector(OrganiserSelectors.registrations)
    const loading = useSelector(OrganiserSelectors.registrationsLoading)
    const event = useSelector(OrganiserSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)

    const groupedByStatus = useMemo(() => {
        return groupBy(registrations, 'status')
    }, [registrations])

    const getCount = (statuses = []) => {
        return statuses.reduce((res, status) => {
            if (groupedByStatus.hasOwnProperty(status)) {
                return res + groupedByStatus[status].length
            }
            return res
        }, 0)
    }

    const handleBulkAccept = () => {
        return RegistrationsService.bulkAcceptRegistrationsForEvent(
            idToken,
            event.slug,
        )
            .then(data => {
                dispatch(
                    SnackbarActions.success(
                        'Success! All soft accepted registrations have been accepted.',
                    ),
                )
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        `Something went wrong... Are you sure you're connected to the internet ?`,
                    ),
                )
            })
            .finally(() => {
                dispatch(
                    OrganiserActions.updateRegistrationsForEvent(event.slug),
                )
                return
            })
    }

    const handleBulkReject = () => {
        return RegistrationsService.bulkRejectRegistrationsForEvent(
            idToken,
            event.slug,
        )
            .then(data => {
                dispatch(
                    SnackbarActions.success(
                        `Success! All soft rejected registrations have been rejected.`,
                    ),
                )
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        `Something went wrong... Are you sure you're connected to the internet?`,
                    ),
                )
            })
            .finally(() => {
                dispatch(
                    OrganiserActions.updateRegistrationsForEvent(event.slug),
                )
                return
            })
    }

    const total = registrations.length
    const rated = filter(registrations, reg => reg.rating).length

    const [gavelInputs, setGavelInputs] = useState('')
    // let gavelInputs = ''
    const gavelData = str => {
        setGavelInputs(str)
    }

    const submitGavelLoginData = async data => {
        return RegistrationsService.addGavelLoginToRegistrations(
            idToken,
            event.slug,
            data,
        )
            .then(data => {
                dispatch(SnackbarActions.success('Gavel logins added.'))
            })
            .catch(err => {
                dispatch(SnackbarActions.error(`Something went wrong...`))
            })
            .finally(() => {
                dispatch(
                    OrganiserActions.updateRegistrationsForEvent(event.slug),
                )
                return
            })
    }

    return (
        <PageWrapper loading={loading}>
            <Typography variant="h5" paragraph>
                Stats
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper>
                        <Statistic
                            label="Total registrations"
                            value={total}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Statistic
                            label="Rated"
                            value={`${rated} / ${total}`}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge status={STATUSES.confirmed.id} />
                            }
                            value={getCount(['confirmed'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge
                                    status={STATUSES.confirmedToHub.id}
                                />
                            }
                            value={getCount(['confirmedToHub'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge status={STATUSES.accepted.id} />
                            }
                            value={getCount(['accepted'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge
                                    status={STATUSES.acceptedToHub.id}
                                />
                            }
                            value={getCount(['acceptedToHub'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge status={STATUSES.cancelled.id} />
                            }
                            value={getCount(['cancelled'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge status={STATUSES.rejected.id} />
                            }
                            value={getCount(['rejected'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge status={STATUSES.checkedIn.id} />
                            }
                            value={getCount(['checkedIn'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Statistic
                            label={<StatusBadge status={STATUSES.noShow.id} />}
                            value={getCount(['noShow'])}
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge
                                    status={STATUSES.softAccepted.id}
                                />
                            }
                            value={getCount(['softAccepted'])}
                            action={handleBulkAccept}
                            actionText="Accept all"
                        ></Statistic>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <Statistic
                            label={
                                <StatusBadge
                                    status={STATUSES.softRejected.id}
                                />
                            }
                            value={getCount(['softRejected'])}
                            action={handleBulkReject}
                            actionText="Reject all"
                        ></Statistic>
                    </Paper>
                </Grid>
            </Grid>
            {isSuperAdmin && (
                <>
                    <Typography variant="h5" paragraph>
                        Gavel tools
                    </Typography>
                    <TextAreaInput
                        value={gavelInputs}
                        label="Gavel inputs"
                        onChange={gavelData}
                        placeholder="Only stringified JSON accepted"
                    />
                    <Button
                        variant="jContained"
                        onClick={() => {
                            try {
                                const valueTest = JSON.parse(gavelInputs)
                                submitGavelLoginData(valueTest)
                            } catch (e) {
                                dispatch(
                                    SnackbarActions.error(
                                        `Invalid JSON data. Please check your input.`,
                                    ),
                                )
                            }
                        }}
                    >
                        Add gavel logins
                    </Button>
                </>
            )}
        </PageWrapper>
    )
}
