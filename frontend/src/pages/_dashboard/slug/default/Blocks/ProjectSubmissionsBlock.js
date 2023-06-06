import React, {useState} from 'react'
import { Typography, Box, Grid, Dialog } from '@material-ui/core'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import ProjectDetail from 'components/projects/ProjectDetail'

function ProjectSubmissionsBlock({ projects, event }) {
  const [selected, setSelected] = useState(false)
  return (
    <>
      {projects[0].event === event._id ? (
          <>
            <Typography variant="h4">
                Your project submissions
            </Typography>
            <ProjectsGrid
                    projects={projects}
                    event={event}
                    onSelect={setSelected}
                    showScore={false}
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
          </>
      ) : null}
    </>
  )
}

export default ProjectSubmissionsBlock