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

const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '100%',
    },
}))

const meeting = {
    event: '5eb3e94cd227f30043d07d1e',
    startTime: '2022-08-04T15:00:00+03:00',
    endTime: '2022-08-04T17:00:00+03:00',
    challenge: '62efaae114a3ab7c77ce39e9',
}

const meetingz = [meeting, meeting, meeting, meeting]

export default ({ event }) => {
    const challenges = event.challenges
    const [challenge, setChallenge] = React.useState('')
    const dispatch = useDispatch()
    const [meetings, loading, error] = getMeetingslots({
        eventId: event._id,
        from: '2022-08-07T15:00:00+03:00',
        dayRange: 3,
        challengeId: challenge,
    })
    const [bookMeeting, bookMeetingResult] = useMutation(BOOK_MEETING, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to book meeting', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to book meeting'))
            }
        },
        onCompleted: res => {
            if (!res) {
                dispatch(SnackbarActions.error('Failed to book meeting'))
            }
            dispatch(SnackbarActions.success('Meeting booked successfully'))
        },
    })

    const handleChange = event => {
        setChallenge(event.target.value)
        console.log(meetings)
    }
    const classes = useStyles()
    return (
        <>
            <FormControl className={classes.formWrapper}>
                <InputLabel id="challenge-selection-label">
                    Challenge
                </InputLabel>
                <Select
                    labelId="challenge-selection-label"
                    id="challenge-selection"
                    value={challenge}
                    label="Choose a challenge"
                    onChange={handleChange}
                >
                    {challenges.map(c => (
                        <MenuItem value={c._id}>{c.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <h4>This is the PARTICIPANT calendar view</h4>
            {meetings &&
                meetings.map((meeting, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '3em',
                            backgroundColor: '#fafa',
                            padding: '1em',
                        }}
                    >
                        {meeting.title}
                        <br />
                        {meeting.startTime} - {meeting.endTime}
                        <p>Attendees</p>
                        {meeting.attendees.map(attendee => (
                            <p style={{ color: 'darkblue' }}>{attendee}</p>
                        ))}
                        {meeting.googleMeetLink && (
                            <a href={meeting.googleMeetLink}>
                                {meeting.googleMeetLink}
                            </a>
                        )}
                        <br></br>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => {
                                console.log('booking meeting:', meeting._id)
                                bookMeeting({
                                    variables: {
                                        meetingId: meeting._id,
                                        attendees: [
                                            'google-oauth2|106638473938712906703',
                                            // 'google-oauth2|110077535009369622929',
                                        ],
                                    },
                                })
                            }}
                        >
                            Take this wan
                        </Button>
                        <br />
                    </div>
                ))}
        </>
    )
}
