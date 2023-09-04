import React from 'react'

import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import GradientBox from 'components/generic/GradientBox'

import { useTranslation } from 'react-i18next'
import EventTimeline from 'pages/_events/slug/default/EventTimeline'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    return (
        <Grid item xs={4}>
            <GradientBox color="theme_white" p={3}>
                <Typography variant="button" gutterBottom>
                    Event Timeline
                </Typography>
                <EventTimeline
                    event={event}
                    accentColor={event.theme.accentColor}
                    textColor={event.theme.sidebarTextColor}
                />
            </GradientBox>
        </Grid>
    )
}
