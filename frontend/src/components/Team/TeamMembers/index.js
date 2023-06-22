import { Typography } from '@material-ui/core'
import ParticipantPreview from 'components/Participant/ParticipantPreview'
import React from 'react'

export default ({ listView = false }) => {
    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <Typography
                className="tw-tracking-tight tw-font-medium"
                variant="h5"
                component="h5"
            >
                Team members
            </Typography>
            <ParticipantPreview listView={listView} />
            <ParticipantPreview listView={listView} />
            <ParticipantPreview listView={listView} />
        </div>
    )
}
