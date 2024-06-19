import React from 'react'

import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material'

import Button from 'components/generic/Button'
import { useDispatch } from 'react-redux'
import * as DashboardActions from 'redux/dashboard/actions'

const ProjectScoreModal = ({ open, onClose, score }) => {
    const dispatch = useDispatch()

    const handleRefresh = () => {
        dispatch(DashboardActions.updateProjectScores(score.event.slug))
    }
    const NoScoreYet = props => {
        return (
            <Typography variant="h6" align="center">
                You do not have a score for this project yet. Hold tight while
                our robots do the work!
            </Typography>
        )
    }
    const EvaluatingScore = props => {
        return (
            <>
                <Typography variant="h6" align="center">
                    Great work so far! Your project is being evaluated right
                    now.
                </Typography>
                <Box p={2} />
                <Button
                    onClick={() => handleRefresh()}
                    variant="contained"
                    color="secondary"
                >
                    Refresh Score
                </Button>
            </>
        )
    }

    const EvaluationSuccessful = props => {
        const projectScore = score?.averageScore
            ? score.averageScore
            : score?.score
        let projectMessage
        if (score?.message) {
            projectMessage = score.message
        } else if (score?.reviewers?.length > 0) {
            projectMessage = score.reviewers[0].message
        }
        return (
            <>
                <Typography variant="h6" gutterBottom align="center">
                    Awesome, the result for your project is:
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {projectScore}/{score.maxScore}
                </Typography>
                <Typography variant="body1">{projectMessage}</Typography>
            </>
        )
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Project Score</DialogTitle>
            <DialogContent>
                <Box
                    p={5}
                    display="flex"
                    height="100%"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    {!score && <NoScoreYet />}
                    {score && score.status === 'evaluating' && (
                        <EvaluatingScore />
                    )}
                    {score && score.status === 'evaluated' && (
                        <EvaluationSuccessful />
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectScoreModal
