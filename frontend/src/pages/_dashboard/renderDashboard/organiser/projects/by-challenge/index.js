import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { sortBy } from 'lodash-es'
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItemText,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ProjectsTable from 'components/tables/ProjectsTable'
import ChallengeLink from './ChallengeLink'

import * as OrganiserSelectors from 'reducers/organiser/selectors'
import { addTeamCodeToProjectAndFilterNoTeam } from 'utils/dataModifiers'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const teams = useSelector(OrganiserSelectors.teams)

    const getProjectsForChallenge = slug => {
        const projectsWithTeam = addTeamCodeToProjectAndFilterNoTeam(
            projects,
            teams,
        )
        return projectsWithTeam.filter(project => {
            return project.challenges && project.challenges.indexOf(slug) !== -1
        })
    }

    const challenges = useMemo(() => {
        return sortBy(event.challenges, 'name')
    }, [event.challenges])
    return (
        <Box>
            {challenges.map(challenge => {
                const projects = getProjectsForChallenge(challenge.slug)
                return (
                    <Accordion key={challenge.slug}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemText
                                primary={challenge.name}
                                secondary={`${challenge.partner} // ${projects.length} projects`}
                            ></ListItemText>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                display="flex"
                                flexDirection="column"
                                style={{ width: '100%' }}
                            >
                                <Box p={1}>
                                    <ChallengeLink challenge={challenge.slug} />
                                </Box>
                                <ProjectsTable projects={projects} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Box>
    )
}
