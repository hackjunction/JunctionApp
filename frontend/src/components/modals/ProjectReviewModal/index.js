import React from 'react'

import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
} from '@material-ui/core'

const ProjectScoreModal = ({ open, onClose, projectScoreData }) => {
    console.log('Score data object from review modal', projectScoreData)

    const ReviewElement = ({ reviewer }) => {
        console.log('Reviewer from component', reviewer)
        return (
            <div className="tw-flex tw-gap-2">
                {reviewer?.avatar ? (
                    <Avatar src={reviewer.avatar} />
                ) : (
                    <Avatar>
                        {reviewer?.firstname
                            ? reviewer?.firstname.charAt(0)
                            : 'R'}
                    </Avatar>
                )}
                <div className="tw-flex tw-flex-col tw-gap-4 tw-bg-gray-100 tw-rounded-md tw-w-full tw-p-4">
                    <Typography variant="h6">
                        {reviewer?.firstname ? reviewer.firstname : 'Anonymous'}
                    </Typography>
                    <Typography variant="body1">{reviewer.message}</Typography>
                    <Typography className="tw-text-bold">
                        Score received: {reviewer.score}
                    </Typography>
                </div>
            </div>
        )
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Feedback received</DialogTitle>
            <DialogContent>
                <div className="tw-flex tw-flex-col tw-gap-4 tw-min-w-360px md:tw-min-w-540px">
                    {(projectScoreData?.averageScore ||
                        projectScoreData?.score) &&
                        projectScoreData?.message && (
                            <ReviewElement
                                reviewer={{
                                    firstname: 'Organizer',
                                    message: projectScoreData?.message,
                                    score:
                                        projectScoreData?.averageScore ||
                                        projectScoreData?.score,
                                }}
                            />
                        )}
                    {projectScoreData?.reviewers?.length > 0 &&
                        projectScoreData.reviewers.map(reviewer => {
                            return <ReviewElement reviewer={reviewer} />
                        })}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectScoreModal
