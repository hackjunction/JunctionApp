import React from 'react'

import { useSelector } from 'react-redux'

import moment from 'moment-timezone'
import { EventHelpers } from '@hackjunction/shared'
import { Typography, Grid } from '@mui/material'
import GradientBox from 'components/generic/GradientBox'
import Button from 'components/generic/Button'
import * as DashboardSelectors from 'reducers/dashboard/selectors'
import config from 'constants/config'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const event = useSelector(DashboardSelectors.event)
    const { t } = useTranslation()
    if (!EventHelpers.isEventOver(event, moment)) return null
    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="primary">
                <Typography variant="h4" gutterBottom>
                    {t('Event_over_')}
                </Typography>
                {event.galleryOpen ? (
                    <>
                        <Typography variant="body1" paragraph>
                            {t('Event_over_message_gallery_open_', {
                                event: event.name,
                                organizer: config.PLATFORM_OWNER_NAME,
                            })}
                        </Typography>
                        <Button
                            onClick={() => navigate(`/projects/${event.slug}`)}
                            color="theme_white"
                            variant="contained"
                        >
                            {t('Open_project_gallery_')}
                        </Button>
                    </>
                ) : (
                    <Typography variant="body1" paragraph>
                        {t('Event_over_message_gallery_closed_', {
                            event: event.name,
                            organizer: config.PLATFORM_OWNER_NAME,
                        })}
                    </Typography>
                )}
            </GradientBox>
        </Grid>
    )
}
