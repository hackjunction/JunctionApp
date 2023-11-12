import React from 'react'

import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
} from '@material-ui/core'
import ReviewElement from './ReviewElement'

const ProjectScoreModal = ({
    open,
    onClose,
    projectScoreData,
    showScore = false,
}) => {

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
                                showScore={showScore}
                            />
                        )}
                    {projectScoreData?.reviewers?.length > 0 &&
                        projectScoreData.reviewers.map(reviewer => {
                            return (
                                <ReviewElement
                                    reviewer={reviewer}
                                    showScore={showScore}
                                />
                            )
                        })}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectScoreModal
