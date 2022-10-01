import React from 'react'
import moment from 'moment-timezone'
import { Grid, Typography } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'

export function Alerts({ alerts = [] }) {
    const sortedAlerts = alerts.sort(
        (a, b) => +new Date(b.sentAt) - +new Date(a.sentAt),
    )

    return (
        <div>
            {sortedAlerts.map(a => (
                <Grid style={{ paddingTop: '10px' }}>
                    <GradientBox color="theme_purple" p={2}>
                        <Typography variant="subtitle1">{a.content}</Typography>
                        <Typography variant="subtitle2" align="right">
                            {moment(a.sentAt).format('ddd HH:mm')}
                        </Typography>
                    </GradientBox>
                </Grid>
            ))}
        </div>
    )
}

export default Alerts
