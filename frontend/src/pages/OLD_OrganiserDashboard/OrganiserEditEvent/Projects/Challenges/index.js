import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { sortBy } from 'lodash-es'
import {
    Box,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ListItemText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ProjectsTable from '../ProjectsTable'
import ChallengeLink from './ChallengeLink'

import * as OrganiserSelectors from 'redux/organiser/selectors'

const ChallengesTab = ({ event, projects, projectsLoading }) => {
    const getProjectsForChallenge = slug => {
        return projects.filter(project => {
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
                    <ExpansionPanel key={challenge.slug}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemText
                                primary={challenge.name}
                                secondary={`${challenge.partner} // ${projects.length} projects`}
                            ></ListItemText>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Box display="flex" flexDirection="column">
                                <Box p={1}>
                                    <ChallengeLink challenge={challenge.slug} />
                                </Box>
                                <ProjectsTable projects={projects} />
                            </Box>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
        </Box>
    )
}

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state),
})

export default connect(mapState)(ChallengesTab)
