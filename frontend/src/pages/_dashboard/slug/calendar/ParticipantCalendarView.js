import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { BOOK_MEETING, CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useDispatch } from 'react-redux'
import Button from 'components/generic/Button'
import { getMeetingslots } from 'graphql/queries/meetings'

export default () => {
    const dispatch = useDispatch()
    const [meetings, loading, error] = getMeetingslots({
        eventId: '606d8326de289c00431125e7',
        from: '2022-08-04T15:00:00+03:00',
        dayRange: 3,
        challengeId: '62ea30080f273de91bd18ccd',
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
    return (
        <>
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
