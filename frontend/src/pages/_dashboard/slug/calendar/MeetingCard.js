import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { BOOK_MEETING, CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { getMeetingslots } from 'graphql/queries/meetings'

import Button from 'components/generic/Button'
import { Link, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import theme from 'material-ui-theme'

const useStyles = makeStyles(theme => ({
    meetingCard: ({ booked }) => ({
        width: '100%',
        borderRadius: '0.5em',
        padding: '0.75em',
        marginBottom: '0.5em',
        background: booked
            ? theme.palette.primary.main
            : theme.palette.grey[300],
        fontSize: '16px',
        //display: 'flex',
        //flexDirection: 'column',
        cursor: 'pointer',
    }),
    meetingTime: {
        display: 'flex',
        justifyContent: 'space-evenly',
        fontWeight: 'bold',
        fontSize: '1.25em',
        margin: '0.5em 0',
    },
    actionButton: ({ booked }) => ({
        //background: booked ? 'red' : theme.palette.primary.main,
        color: 'white',
        borderRadius: '0.5em',
        width: 'fit-content',
        marginTop: '0.75em',
    }),
    meetingInfo: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    meetsLink: {
        textDecoration: 'none',
    },
    joinButton: {
        borderRadius: '0.5em',
        color: 'theme_primary',
        width: 'fit-content',
        marginTop: '0.75em',
        marginRight: '0.75em',
    },
}))

export default ({
    startTime,
    endTime,
    booked,
    googleMeetLink,
    bookAction,
    cancelAction,
    hasFutureBooking,
}) => {
    const classes = useStyles({ booked })
    const [open, setOpen] = useState(false)
    const start = new Date(startTime)
    const end = new Date(endTime)
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()

    console.log(hasFutureBooking)
    const openContent = () => (
        <>
            {booked ? (
                <div className={classes.meetingInfo}>
                    <a
                        className={classes.meetsLink}
                        href={googleMeetLink}
                        target="blank"
                    >
                        <Button
                            className={classes.joinButton}
                            variant="contained"
                            color="theme_orange"
                        >
                            Join meeting
                        </Button>
                    </a>
                    <Button
                        className={classes.actionButton}
                        variant="contained"
                        color="error"
                        onClick={cancelAction}
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    onClick={bookAction}
                    // styles={{
                    //     cursor: hasFutureBooking ? 'default' : 'pointer',
                    // }}
                >
                    Book this meeting
                </Button>
            )}
        </>
    )

    const isOpenable = start.getTime() > new Date().getTime() || booked

    return (
        <div
            className={classes.meetingCard}
            key={startTime}
            onClick={() => (isOpenable ? setOpen(!open) : {})}
            style={!isOpenable ? { cursor: 'default' } : {}}
        >
            <p className={classes.meetingTime}>
                <span>{`${start.getHours()}:${
                    startMinutes === 0 ? '00' : startMinutes
                }`}</span>
                <span> - </span>
                <span>{`${end.getHours()}:${
                    endMinutes === 0 ? '00' : endMinutes
                }`}</span>
            </p>
            {open && openContent()}
        </div>
    )
}
