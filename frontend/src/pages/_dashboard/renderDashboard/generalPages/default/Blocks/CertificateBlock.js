import React from 'react'

import { useSelector } from 'react-redux'
import moment from 'moment-timezone'
import { Grid, CircularProgress } from '@mui/material'

import GradientBox from 'components/generic/GradientBox'
import { Typography } from '@mui/material'
import { RegistrationStatuses, EventHelpers } from '@hackjunction/shared'

import * as DashboardSelectors from 'reducers/dashboard/selectors'
import * as UserSelectors from 'reducers/user/selectors'

import Button from 'components/generic/Button'
//import ParticipationCertificate from 'components/pdfs/ParticipationCertificate'
import modifyPdf from 'utils/modifyPdf'
import config from 'constants/config'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const userProfile = useSelector(UserSelectors.userProfile)
    const eventLoading = useSelector(DashboardSelectors.eventLoading)
    const projectLoading = useSelector(DashboardSelectors.projectsLoading)
    if (!EventHelpers.isEventOver(event, moment)) return null
    if (registration?.status !== RegistrationStatuses.asObject.checkedIn.id)
        return null
    if ('certificate' in event && event.certificate.url !== '') {
        //TODO: fix certificate upload
        return (
            <Grid item xs={12}>
                <GradientBox p={3} color="secondary">
                    <Typography variant="h4" gutterBottom>
                        Participation certificate
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Thanks for being a part of {event.name}! While waiting
                        for the next {config.PLATFORM_OWNER_NAME} event to take
                        part in, go ahead and download your personal certificate
                        of participation by clicking the button below!
                    </Typography>
                    {eventLoading || projectLoading ? (
                        <CircularProgress size={24} />
                    ) : (
                        <Button
                            onClick={() => {
                                modifyPdf(
                                    event.certificate.url,
                                    event.certificate.x,
                                    event.certificate.y,
                                    `${userProfile.firstName} ${userProfile.lastName}`,
                                    event.slug,
                                    event.certificate?.color,
                                    event.certificate?.enableRegistrationId,
                                    event.certificate?.registrationIdX,
                                    event.certificate?.registrationIdY,
                                    event.certificate?.registrationIdColor,
                                    registration._id,
                                )
                            }}
                            color="theme_white"
                            variant="contained"
                        >
                            Download certificate
                        </Button>
                    )}
                </GradientBox>
            </Grid>
        )
    } else return null
}
