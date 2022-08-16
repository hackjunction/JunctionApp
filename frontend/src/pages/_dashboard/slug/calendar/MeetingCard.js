import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { BOOK_MEETING, CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { getMeetingslots } from 'graphql/queries/meetings'

import Button from 'components/generic/Button'
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from '@material-ui/core'
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
    }),
    meetingInfo: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'column',
    },
    meetsLink: {
        marginBottom: '0.5em',
        color: 'black',
        wordBreak: 'break-all',
    },
}))

export default ({
    startTime,
    endTime,
    booked,
    googleMeetLink,
    bookAction,
    cancelAction,
}) => {
    const classes = useStyles({ booked })
    const [open, setOpen] = useState(false)
    const start = new Date(startTime)
    const end = new Date(endTime)
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()

    const openContent = () => (
        <>
            {booked ? (
                <div className={classes.meetingInfo}>
                    <a
                        href={googleMeetLink}
                        target="blank"
                        className={classes.meetsLink}
                    >
                        {googleMeetLink}
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
                >
                    Book this meeting
                </Button>
            )}
        </>
    )

    return (
        <div
            className={classes.meetingCard}
            key={startTime}
            onClick={() => setOpen(!open)}
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
