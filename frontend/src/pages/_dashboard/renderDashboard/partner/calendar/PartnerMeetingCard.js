import React, { useEffect, useState } from 'react'

import Button from 'components/generic/Button'
import { makeStyles, IconButton, Box } from '@material-ui/core'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'

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
    description,
    changeSlotAvailability,
    _id,
    location,
}) => {
    const [available, setAvailable] = useState(initiallyAvailable)
    const [expand, setExpand] = useState(false)
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
        <>
            {
                (description?.length > 70 && !expand) ? (
                    <div
                        className={classes.meetingCard}
                        key={startMin + startHour}
                        onClick={booked && available ? () => { } : cardOnClick}
                    >
                        <p className={classes.meetingTime}>
                            <span>{`${startHour}:${startMin === 0 ? '00' : startMin
                                }`}</span>
                            <span> - </span>
                            <span>{`${endHour}:${endMin === 0 ? '00' : endMin}`}</span>
                        </p>
                        {available && booked && (
                            <>
                                <p className={classes.locationText}>{location}</p>
                                {<p className={classes.locationText}>{description.slice(0, 70) + "..."}</p>}
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
                                <Box textAlign='center'>
                                    <IconButton onClick={() => setExpand(true)}>
                                        <KeyboardArrowDown
                                            fontSize="large"
                                            color="primary"
                                        />
                                    </IconButton>
                                </Box>

                            </>
                        )}
                        {!available && booked && (
                            <p className={classes.cancelWarning}>
                                You are about to cancel this booked meeting
                            </p>
                        )}
                    </div >
                ) : (

                    <div
                        className={classes.meetingCard}
                        key={startMin + startHour}
                        onClick={booked && available ? () => { } : cardOnClick}
                    >
                        <p className={classes.meetingTime}>
                            <span>{`${startHour}:${startMin === 0 ? '00' : startMin
                                }`}</span>
                            <span> - </span>
                            <span>{`${endHour}:${endMin === 0 ? '00' : endMin}`}</span>
                        </p>
                        {available && booked && (
                            <>
                                <p className={classes.locationText}>{location}</p>
                                {<p className={classes.locationText}>{description}</p>}
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
                                <Box textAlign='center'>
                                    <IconButton onClick={() => setExpand(false)}>
                                        <KeyboardArrowUp
                                            fontSize="large"
                                            color="primary"
                                        />
                                    </IconButton>
                                </Box>
                            </>
                        )}
                        {!available && booked && (
                            <p className={classes.cancelWarning}>
                                You are about to cancel this booked meeting
                            </p>
                        )}
                    </div >

                )}
        </>
    )
}
