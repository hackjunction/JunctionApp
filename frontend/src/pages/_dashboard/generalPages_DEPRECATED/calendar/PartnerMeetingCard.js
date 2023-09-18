import React, { useEffect, useState } from 'react'

import Button from 'components/generic/Button'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    meetingCard: ({ available, booked }) => ({
        width: '100%',
        borderRadius: '0.5em',
        padding: '0.5em',
        marginBottom: '0.25em',
        background: available
            ? booked
                ? theme.palette.secondary.light
                : theme.palette.primary.main
            : booked
            ? theme.palette.error.light
            : theme.palette.grey[300],
        fontSize: '12px',
        cursor: booked && available ? 'initial' : 'pointer',
    }),
    meetingTime: {
        display: 'flex',
        justifyContent: 'space-evenly',
        fontWeight: 'bold',
        fontSize: '1.25em',
        margin: '0.5em 0',
    },
    actionButton: {
        color: 'black',
        borderRadius: '0.5em',
        width: 'fit-content',
        padding: '0.5em',
        margin: '0.25em',
    },
    meetingInfo: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cancelWarning: {
        padding: '0.5em',
        fontWeight: 'bold',
    },
    locationText: {
        textAlign: 'center',
        fontSize: '1.25em',
        margin: '0 0.5em',
    },
}))

export default ({
    startHour,
    startMin,
    endHour,
    endMin,
    attendees,
    googleMeetLink,
    initiallyAvailable,
    meetingInput,
    changeSlotAvailability,
    _id,
    location,
}) => {
    const [available, setAvailable] = useState(initiallyAvailable)
    const booked = attendees.length > 0
    const classes = useStyles({ available, booked })
    useEffect(() => {
        setAvailable(initiallyAvailable)
    }, [initiallyAvailable])

    const cardOnClick = () => {
        const currentAvailability = available
        setAvailable(!currentAvailability)
        changeSlotAvailability(
            initiallyAvailable,
            meetingInput,
            !currentAvailability,
            _id,
        )
    }

    return (
        <div
            className={classes.meetingCard}
            key={startMin + startHour}
            onClick={booked && available ? () => {} : cardOnClick}
        >
            <p className={classes.meetingTime}>
                <span>{`${startHour}:${
                    startMin === 0 ? '00' : startMin
                }`}</span>
                <span> - </span>
                <span>{`${endHour}:${endMin === 0 ? '00' : endMin}`}</span>
            </p>
            {available && booked && (
                <>
                    <p className={classes.locationText}>{location}</p>
                    <div className={classes.meetingInfo}>
                        {googleMeetLink && (
                            <a
                                href={googleMeetLink}
                                target="blank"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    className={classes.actionButton}
                                    variant="contained"
                                    color="theme_lightgray"
                                >
                                    Join meeting
                                </Button>
                            </a>
                        )}
                        <Button
                            className={classes.actionButton}
                            variant="contained"
                            color="error"
                            onClick={cardOnClick}
                        >
                            Cancel
                        </Button>
                    </div>
                </>
            )}
            {!available && booked && (
                <p className={classes.cancelWarning}>
                    You are about to cancel this booked meeting
                </p>
            )}
        </div>
    )
}
