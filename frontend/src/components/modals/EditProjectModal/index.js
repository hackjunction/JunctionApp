import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useMemo } from 'react'

import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'
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
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
} from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'
import PageHeader from 'components/generic/PageHeader'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import TeamsTable from 'components/tables/TeamsTable'
import ProjectScoresService from 'services/projectScores'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Button from 'components/generic/Button'

export default ({ project, onClose = () => {}, onEdited = () => {} }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(OrganiserSelectors.event)
    const teams = useSelector(OrganiserSelectors.teams)
    const { slug } = event

    const [projectScore, setProjectScore] = useState({
        project: '',
        event: '',
        status: 'submitted',
        score: 0,
        max_score: 10,
        message: '',
    })
    useEffect(() => {
        if (project && event) {
            ProjectScoresService.getScoreByEventSlugAndProjectId(
                idToken,
                event.slug,
                project._id
            ).then(score => {
                if (score) setProjectScore(score)
            })
        }
    }, [event, idToken, project])
    const team = useMemo(() => {
        if (teams && project) {
            return [teams.find(team => team._id === project.team)]
        }
        return []
    }, [project, teams])

    console.log('projectScore', { ...projectScore })
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
                                    <Typography>Team Members</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
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
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography>Project Score</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Formik
                                        initialValues={{
                                            ...projectScore,
                                        }}
                                        enableReinitialize={true}
                                        onSubmit={async (
                                            values,
                                            { setSubmitting }
                                        ) => {
                                            values.project = project._id
                                            values.event = event._id
                                            try {
                                                if (projectScore._id) {
                                                    await ProjectScoresService.updateScoreByEventSlug(
                                                        idToken,
                                                        event.slug,
                                                        values
                                                    )
                                                } else {
                                                    await ProjectScoresService.addScoreByEventSlug(
                                                        idToken,
                                                        event.slug,
                                                        values
                                                    )
                                                }
                                                dispatch(
                                                    SnackbarActions.success(
                                                        'Score saved successfully.'
                                                    )
                                                )
                                            } catch (e) {
                                                dispatch(
                                                    SnackbarActions.error(
                                                        `Score could not be saved. Error: ${e.message}`
                                                    )
                                                )
                                            } finally {
                                                setSubmitting(false)
                                            }
                                        }}
                                    >
                                        {({ isSubmitting }) => (
                                            <Form>
                                                <Field name="status">
                                                    {({ field }) => (
                                                        <FormControl fullWidth>
                                                            <InputLabel>
                                                                Status
                                                            </InputLabel>
                                                            <Select {...field}>
                                                                <MenuItem value="submitted">
                                                                    Submitted
                                                                </MenuItem>
                                                                <MenuItem value="evaluating">
                                                                    Evaluating
                                                                </MenuItem>
                                                                <MenuItem value="evaluated">
                                                                    Evaluated
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    name="status"
                                                    component="div"
                                                />
                                                <Field name="score">
                                                    {({ field }) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Score"
                                                            type="number"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    name="score"
                                                    component="div"
                                                />
                                                <Field name="max_score">
                                                    {({ field }) => (
                                                        <TextField
                                                            fullWidth
                                                            type="number"
                                                            label="Maximum Score"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    name="max_score"
                                                    component="div"
                                                />
                                                <Field name="message">
                                                    {({ field }) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Message"
                                                            {...field}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    name="message"
                                                    component="div"
                                                />
                                                <Box p={2} />
                                                <Button
                                                    color="theme_turquoise"
                                                    variant="contained"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    Save
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </CenteredContainer>
                    </Box>
                )}
            </PageWrapper>
        </Dialog>
    )
}
