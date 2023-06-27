import { Typography } from '@material-ui/core'
import Button from 'components/generic/Button'
import React from 'react'

export default () => {
    return (
        <div className="tw-flex tw-flex-col tw-gap-32 tw-py-12">
            <Typography className="tw-text-lg" variant="body1" component="p">
                Your Team will appear here once you create it or get accepted to
                an existing team.
            </Typography>
            <div className="tw-flex tw-gap-4 tw-justify-start">
                <Button color="outlined_button" variant="jOutlined">
                    Join a team
                </Button>
                <Button variant="jContained">Create a team</Button>
            </div>
        </div>
    )
}
