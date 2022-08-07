import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useDispatch } from 'react-redux'
import Button from 'components/generic/Button'
import { getMeetingslots } from 'graphql/queries/meetings'

export default () => {
    const [meetings, loading, error] = getMeetingslots({
        eventId: '606d8326de289c00431125e7',
        from: '2022-08-04T15:00:00+03:00',
        dayRange: 3,
        challengeId: '62ea30080f273de91bd18ccd',
    })
    return (
        <>
            <h4>This is the PARTICIPANT calendar view</h4>
            {meetings &&
                meetings.map((meeting, index) => (
                    <div key={index} style={{ marginBottom: '1em' }}>
                        {meeting.title}
                        <br />
                        {meeting.startTime} - {meeting.endTime}
                        <br />
                    </div>
                ))}
        </>
    )
}
