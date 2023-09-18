import React, { Suspense } from 'react'

import { useSelector } from 'react-redux'
import { CircularProgress, Typography, Grid } from '@material-ui/core'

import { RegistrationStatuses, EventTypes } from '@hackjunction/shared'
import GradientBox from 'components/generic/GradientBox'

import * as DashboardSelectors from 'redux/dashboard/selectors'

const STATUSES = RegistrationStatuses.asObject
const VisaInvitationDrawer = React.lazy(() =>
    import('components/modals/VisaInvitationDrawer'),
)

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    if (event?.eventType !== EventTypes.physical.id) return null

    const statuses = [STATUSES.accepted.id, STATUSES.confirmed.id]

    if (statuses.indexOf(registration?.status) === -1) {
        return null
    }

    return (
        <Grid item xs={12} md={6}>
            <GradientBox p={3} color="theme_purple">
                <Typography key="overline" variant="button" color="inherit">
                    Visa invitation letter
                </Typography>
                <Typography variant="h4" paragraph>
                    Need a visa?
                </Typography>
                <Typography variant="body1" paragraph>
                    If you need a visa to travel to the event, we've got you
                    sorted. Click the button below and you'll be able to
                    download a personalised visa invitation letter, which you
                    can attach to your visa application. It should make it a bit
                    easier for your visa application to get accepted.
                </Typography>
                <Suspense
                    fallback={<CircularProgress style={{ color: 'white' }} />}
                >
                    <VisaInvitationDrawer />
                </Suspense>
            </GradientBox>
        </Grid>
    )
}
