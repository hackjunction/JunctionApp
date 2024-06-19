import { Typography } from '@mui/material'
import Button from 'components/generic/Button'

import React from 'react'
import { useDispatch } from 'react-redux'

export default ({ eventData = {}, onCreate }) => {
    const dispatch = useDispatch()
    return (
        <div className="tw-flex tw-flex-col tw-gap-32 tw-py-12">
            <Typography className="tw-text-lg" variant="body1" component="p">
                Your Team will appear here once you create it or get accepted to
                an existing team.
            </Typography>
            <div className="tw-flex tw-gap-4 tw-justify-start">
                <Button
                    onClick={() => {
                        dispatch(
                            push(`/dashboard/event/${eventData.slug}/team`),
                        )
                    }}
                    color="outlined_button"
                    variant="jOutlined"
                >
                    Join a team
                </Button>
                <Button onClick={onCreate} variant="jContained">
                    Create a team
                </Button>
            </div>
        </div>
    )
}
