import React from 'react'

import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
} from '@material-ui/core'

const ReviewElement = ({ reviewer, showScore }) => {
    console.log('Reviewer from component', reviewer)
    return (
        <div className="tw-flex tw-gap-2">
            {reviewer?.avatar ? (
                <Avatar src={reviewer.avatar} />
            ) : (
                <Avatar>
                    {reviewer?.firstname ? reviewer?.firstname.charAt(0) : 'R'}
                </Avatar>
            )}
            <div className="tw-flex tw-flex-col tw-gap-4 tw-bg-gray-100 tw-rounded-md tw-w-full tw-p-4">
                <Typography variant="h6">
                    {reviewer?.firstname ? reviewer.firstname : 'Anonymous'}
                </Typography>
                <Typography variant="body1">{reviewer.message}</Typography>
                {showScore && (
                    <Typography className="tw-text-bold">
                        Score received: {reviewer.score}
                    </Typography>
                )}
            </div>
        </div>
    )
}

export default ReviewElement
