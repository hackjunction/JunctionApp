import React, { useState } from 'react'
import { Typography, Box, Grid, Dialog } from '@material-ui/core'
import GradientBox from 'components/generic/GradientBox'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import ProjectDetail from 'components/projects/ProjectDetail'
import { useTranslation } from 'react-i18next'

function ProjectSubmissionsBlock({ projects, event }) {
    const [selected, setSelected] = useState(false)
    const showScore = event?.scoreCriteriaSettings?.showScore
    const showFeedback = event?.scoreCriteriaSettings?.showFeedback
    const { t } = useTranslation()
    return (
        <>
            {projects && event && projects[0]?.event === event?._id ? (
                <>
                    <Grid item xs={12}>
                        <GradientBox color="theme_white" p={3}>
                            <Box pb={2}>
                                <Typography variant="h4">
                                    {t('My_project_submissions_')}
                                </Typography>
                            </Box>
                            <ProjectsGrid
                                projects={projects}
                                event={event}
                                onSelect={setSelected}
                                showTags={true}
                                showScore={showScore}
                                showReviewers={showFeedback}
                            />
                            <Dialog
                                transitionDuration={0}
                                fullScreen
                                open={Boolean(selected)}
                                onClose={() => setSelected(false)}
                            >
                                <ProjectDetail
                                    project={selected}
                                    event={event}
                                    onBack={() => setSelected(false)}
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
