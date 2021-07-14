import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import EventButtons from '../EventButtons'

const useStyles = makeStyles(theme => ({
    root: {
        color: '#19DDEA',
        padding: '25px 0 0 0',
        textTransform: 'uppercase',
        fontSize: '18px',
    },

    date: {
        fontWeight: 'bold',
        paddingTop: '2px',
        fontSize: '18px',
        textTransform: 'uppercase',
    },
    marginUpper: {
        marginTop: theme.spacing(2),
    },
}))

const EventInformation = ({ event, registration }) => {
    const classes = useStyles()
    return (
        <>
            <Grid item xs={9} md={9} className={classes.marginUpper}>
                <Typography variant="body1" className={classes.date}>
                    {moment(event.startTime).format('MMM D, YYYY')}
                </Typography>
                <Typography variant="body1" className={classes.date}>
                    {event._eventLocationFormatted}
                </Typography>
                <Box pb={2}>
                    <EventButtons event={event} registration={registration} />
                </Box>
            </Grid>
            <Grid item xs={3} md={3}>
                <Typography variant="body1" className={classes.date}>
                    {event.name}
                </Typography>
            </Grid>
        </>
    )
}

export default EventInformation
