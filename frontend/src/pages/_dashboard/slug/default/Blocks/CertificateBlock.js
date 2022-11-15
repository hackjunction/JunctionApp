import React from 'react'

import { useSelector } from 'react-redux'
import moment from 'moment-timezone'
import { Grid, CircularProgress } from '@material-ui/core'

import GradientBox from 'components/generic/GradientBox'
import { Typography } from '@material-ui/core'
import { RegistrationStatuses, EventHelpers } from '@hackjunction/shared'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as UserSelectors from 'redux/user/selectors'

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
    if (event.slug == "junction-2022-1" || ('certificate' in event && event.certificate.url !== '')) {
        return (
            <Grid item xs={12}>
                <GradientBox p={3} color="theme_turquoise">
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
                                    'https://res.cloudinary.com/hackjunction/image/upload/v1668518422/junctionapp/events/certificates/11112022_CertificatesTemplate_Participants_3.pdf',
                                    0,
                                    0,
                                    `${userProfile.firstName} ${userProfile.lastName}`,
                                    event.slug,
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
