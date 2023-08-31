import { Typography } from '@material-ui/core'
import React from 'react'

export default ({
    teamTagline = 'No tagline',
    teamDescription = 'No description',
}) => {
    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <Typography
                className="tw-font-semibold"
                variant="h6"
                component="h6"
            >
                {teamTagline}
            </Typography>
            <Typography className="tw-text-lg" variant="body1" component="p">
                {teamDescription}
            </Typography>
        </div>
    )
}
