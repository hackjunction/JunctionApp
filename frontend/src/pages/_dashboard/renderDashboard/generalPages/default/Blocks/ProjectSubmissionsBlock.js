import React, { useState } from 'react'
import { Typography, Box, Grid, Dialog } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import ProjectDetail from 'components/projects/ProjectDetail'

function ProjectSubmissionsBlock({ projects, event }) {
    const [selected, setSelected] = useState(false)
    const showScore = event?.scoreCriteriaSettings?.showScore
    const showFeedback = event?.scoreCriteriaSettings?.showFeedback
    console.log('showScore', showScore)
    console.log('showFeedback', showFeedback)
    return (
        <>
            {projects && event && projects[0]?.event === event?._id ? (
                <>
                    <Grid item xs={12}>
                        <GradientBox color="theme_white" p={3}>
                            <Box pb={2}>
                                <Typography variant="h4">
                                    Your project submissions
                                </Typography>
                            </Box>
                            <ProjectsGrid
                                projects={projects}
                                event={event}
                                onSelect={setSelected}
                                // showScore={true}
                                showTags={true}
                                // showReviewers={true}
                                showScore={showScore}
                                // showTags={showScore}
                                showReviewers={showFeedback}
                            />
                            <Dialog
                                transitionDuration={0}
                                fullScreen
                                open={Boolean(selected)}
                                onClose={() => setSelected()}
                            >
                                <ProjectDetail
                                    project={selected}
                                    event={event}
                                    onBack={() => setSelected()}
                                    showTableLocation={false}
                                />
                            </Dialog>
                        </GradientBox>
                    </Grid>
                </>
            ) : null}
        </>
    )
}

export default ProjectSubmissionsBlock
