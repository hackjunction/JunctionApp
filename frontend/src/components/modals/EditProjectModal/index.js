import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useCallback, useMemo } from 'react'

import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import {
    Dialog,
    List,
    ListItem,
    ListItemText,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Box,
} from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'
import PageHeader from 'components/generic/PageHeader'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import TeamsTable from 'components/tables/TeamsTable'

export default ({ project, onClose = () => {}, onEdited = () => {} }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const teams = useSelector(OrganiserSelectors.teams)
    const { slug } = event

    const team = useMemo(() => {
        if (teams && project) {
            return [teams.find(team => team._id === project.team)]
        }
        return []
    }, [project, teams])

    console.log('team', [team])
    return (
        <Dialog open={!!project} onClose={onClose} maxWidth="md" fullWidth>
            <PageWrapper loading={!project}>
                {project && (
                    <Box p={1}>
                        <CenteredContainer>
                            <PageHeader
                                heading={project.name}
                                subheading={project.track}
                            />
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Project Details</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
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
                                                    ', '
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
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Team members</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TeamsTable teams={team} loading={!team} />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </CenteredContainer>
                    </Box>
                )}
            </PageWrapper>
        </Dialog>
    )
}
