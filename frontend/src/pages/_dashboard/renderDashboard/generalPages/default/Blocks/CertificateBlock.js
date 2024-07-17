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
import { useTranslation } from 'react-i18next'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const userProfile = useSelector(UserSelectors.userProfile)
    const eventLoading = useSelector(DashboardSelectors.eventLoading)
    const projectLoading = useSelector(DashboardSelectors.projectsLoading)
    const { t } = useTranslation()
    if (!EventHelpers.isEventOver(event, moment)) return null
    if (registration?.status !== RegistrationStatuses.asObject.checkedIn.id)
        return null
    if ('certificate' in event && event.certificate.url !== '') {
        return (
            <Grid item xs={12}>
                <GradientBox p={3} color="secondary">
                    <Typography variant="h4" gutterBottom>
                        {t('Participation_certificate_')}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {t('Participation_certificate_message_', {
                            event: event.name,
                            organizer: config.PLATFORM_OWNER_NAME,
                        })}
                        {/* Thanks for being a part of {event.name}! While waiting
                        for the next {config.PLATFORM_OWNER_NAME} event to take
                        part in, go ahead and download your personal certificate
                        of participation by clicking the button below! */}
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
                            {t('Participation_certificate_download_')}
                        </Button>
                    )}
                </GradientBox>
            </Grid>
        )
    } else return null
}
