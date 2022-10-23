import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import GradientBox from 'components/generic/GradientBox'
import { Alerts } from '../../../../../components/messaging/alerts'

export default ({ alerts = [] }) => {
    return (
        <Grid
            direction="column"
            alignItems="stretch"
            item
            xs={8}
            style={{ marginLeft: '20px' }}
        >
            <GradientBox
                style={{ height: '0', minHeight: '100%', overflow: 'scroll' }}
                color="theme_white"
                p={3}
            >
                <Typography variant="button" gutterBottom>
                    Announcements
                </Typography>
                <Alerts alerts={alerts} />
            </GradientBox>
        </Grid>
    )
}
