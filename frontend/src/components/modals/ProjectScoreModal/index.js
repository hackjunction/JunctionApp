import React from 'react'

import { Box, Typography } from '@material-ui/core'

import Modal from 'components/generic/Modal'
import Button from 'components/generic/Button'
import { useDispatch } from 'react-redux'

const ProjectScoreModal = ({ open, onClose, score }) => {
    const dispatch = useDispatch()

    const handleRefresh = () => {}
    const NoScoreYet = props => {
        return (
            <Typography variant="h4">
                You do not have a score for this project yet. Hold tight while
                our robots do the work!
            </Typography>
        )
    }
    const EvaluatingScore = props => {
        return (
            <>
                <Typography variant="h4">
                    Great work. Your project is being evaluated. You can hit
                    refresh to load-test our servers!
                </Typography>
                <Button onClick="() => handleRefresh">Refresh Score</Button>
            </>
        )
    }

    const EvaluationSuccessful = props => {
        return (
            <>
                <Typography variant="h3">
                    Your result is: <br />
                    {score.score}/{score.max_score}
                </Typography>
                <Typography variant="h4">{score.message}</Typography>
            </>
        )
    }
    return (
        <Modal isOpen={open} handleClose={onClose} size="max">
            <Box
                p={5}
                display="flex"
                height="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                {!score && <NoScoreYet />}
                {(score && score.status) === 'evaluating' && (
                    <EvaluatingScore />
                )}
                {(score && score.status) === 'evaluated' && (
                    <EvaluationSuccessful />
                )}
            </Box>
        </Modal>
    )
}

export default ProjectScoreModal
