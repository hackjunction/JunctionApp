import React from 'react'
import moment from 'moment-timezone'
import { Typography } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'

export function Alerts({ alerts = [] }) {
    const sortedAlerts = alerts.sort(
        (a, b) => +new Date(b.sentAt) - +new Date(a.sentAt),
    )
    console.log('alerts', alerts)
    return (
        <div
            className={'tw-flex tw-flex-col tw-gap-2 tw-overflow-auto tw-h-64'}
        >
            {sortedAlerts.map((a, index) => (
                <GradientBox
                    key={`${a.sender}-${index}`}
                    color="theme_purple"
                    p={2}
                >
                    <Typography
                        variant="subtitle1"
                        className="tw-whitespace-pre"
                    >
                        {a.content}
                    </Typography>
                    <Typography variant="subtitle2" align="right">
                        {moment(a.sentAt).format('ddd HH:mm')}
                    </Typography>
                </GradientBox>
                // </Grid>
            ))}
        </div>
    )
}

export default Alerts
