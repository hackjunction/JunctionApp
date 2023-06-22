import { Typography } from '@material-ui/core'
import React from 'react'

export default () => {
    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <Typography
                className="tw-font-semibold"
                variant="h6"
                component="h6"
            >
                Subtitle
            </Typography>
            <Typography className="tw-text-lg" variant="body1" component="p">
                This team is for people who want to do something cool. We are a
                multidiciplinary team that is looking for people who are
                passionate about what they do. Join us!
            </Typography>
        </div>
    )
}
