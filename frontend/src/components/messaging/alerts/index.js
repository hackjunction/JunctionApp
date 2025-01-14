import React from 'react'
import moment from 'moment-timezone'
import { Grid, Typography } from '@mui/material'
import GradientBox from 'components/generic/GradientBox'

// const useStyles = makeStyles(theme => ({
//     root: {
//         height: '90%',

//         overflow: 'auto',
//     },
// }))

export function Alerts({ alerts = [] }) {
    const sortedAlerts = alerts.sort(
        (a, b) => +new Date(b.sentAt) - +new Date(a.sentAt),
    )
    // const classes = useStyles()
    console.log('ALERTS>>>>>>')
    console.log(sortedAlerts)
    return (
        // <div className={classes.root}>
        <Grid>
            {sortedAlerts.map(a => (
                <Grid item key={a.sentAt} style={{ paddingTop: '10px' }}>
                    <GradientBox color="secondary" p={2}>
                        <Typography variant="subtitle1">{a.content}</Typography>
                        <Typography variant="subtitle2" align="right">
                            {moment(a.sentAt).format('ddd HH:mm')}
                        </Typography>
                    </GradientBox>
                </Grid>
            ))}
        </Grid>
    )
}

export default Alerts
