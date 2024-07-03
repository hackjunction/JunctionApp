import { useSelector } from 'react-redux'
import React, { useState, useMemo } from 'react'

import * as AuthSelectors from 'reducers/auth/selectors'
import * as OrganiserSelectors from 'reducers/organiser/selectors'
import {
    Dialog,
    List,
    ListItem,
    ListItemText,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Box,
    Checkbox,
} from '@mui/material'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import TeamsTable from 'components/tables/TeamsTable'
import EventsService from 'services/events'
import { projectURLgenerator } from 'utils/dataModifiers'

export default ({ project, onClose = () => {}, onEdited = () => {} }) => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const teams = useSelector(OrganiserSelectors.teams)
    let projectURL
    if (project) {
        projectURL = projectURLgenerator(event.slug, project._id)
    }
    const [finalistChecked, setFinalistChecked] = useState(false)

    const team = useMemo(() => {
        if (teams && project) {
            return [teams.find(team => team._id === project.team)]
        }
        return []
    }, [project, teams])

    const setAsFinalist = () => {
        setFinalistChecked(!finalistChecked)
        EventsService.updateFinalists(idToken, event.slug, project._id)
    }

    return (
        <Dialog open={!!project} onClose={onClose} maxWidth="md" fullWidth>
            <PageWrapper loading={!project}>
                {project && (
                    <Box p={1}>
                        <Container center>
                            <PageHeader
                                heading={project.name}
                                subheading={project.track}
                                link={projectURL}
                            />
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Project Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Name"
                                                secondary={project.name}
                                            ></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Punchline"
                                                secondary={project.punchline}
                                            ></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Description"
                                                secondary={project.description}
                                            ></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Track"
                                                secondary={project.track}
                                            ></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Challenge"
                                                secondary={project.challenges.join(
                                                    ', ',
                                                )}
                                            ></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Demo URL or Coupon code"
                                                secondary={project.demo}
                                            ></ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Source code"
                                                secondary={project.source}
                                            ></ListItemText>
                                        </ListItem>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Team Members</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        style={{ width: '100%' }}
                                    >
                                        <Typography gutterBottom>
                                            Click on the team to view members!
                                        </Typography>
                                        <TeamsTable
                                            teams={team}
                                            loading={!team}
                                            simplifiedView={true}
                                        />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                            {event.overallReviewMethod ===
                            'finalsManualSelection' ? (
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    style={{ width: '100%' }}
                                >
                                    <Typography gutterBottom>
                                        Does this project go to finals!
                                    </Typography>
                                    <Checkbox
                                        onChange={setAsFinalist}
                                        checked={finalistChecked}
                                    />
                                </Box>
                            ) : null}
                        </Container>
                    </Box>
                )}
            </PageWrapper>
        </Dialog>
    )
}
