import React from 'react'

import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'

import * as DashboardSelectors from 'redux/dashboard/selectors'


import EventTimeline from 'pages/_events/slug/default/EventTimeline'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    return (
        <Grid item xs={12}>

            <EventTimeline
                event={event}
                accentColor={event.theme.accentColor}
                textColor={event.theme.sidebarTextColor}
            />

        </Grid>
    )
}
//<GradientBox color="theme_white" p={3}></GradientBox>