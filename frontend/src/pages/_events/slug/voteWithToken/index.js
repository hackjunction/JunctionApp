import { Box, Dialog, Grid, makeStyles, Paper } from '@material-ui/core'
import Button from 'components/generic/Button'
import Select from 'components/inputs/Select'
import ProjectDetail from 'components/projects/ProjectDetail'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import { useQueryParams } from 'hooks/customHooks'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import EventsService from 'services/events'
import VotingTokenService from 'services/votingToken'
import EventDetailContext from '../context'
import * as SnackbarActions from 'redux/snackbar/actions'
import { EventHelpers } from '@hackjunction/shared'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
    header: {
        background: theme.palette.theme_black.main,
        color: 'white',
        padding: 40,
    },
    projects: {
        background: theme.palette.theme_lightgrayDark.main,
    },
}))
export default () => {
    const dispatch = useDispatch()
    const { slug, event } = useContext(EventDetailContext)
    const [selectedProject, setSelectedProject] = useState(undefined)
    const [finalistProjects, setFinalistProjects] = useState([])
    const [isVotingOpen, setIsVotingOpen] = useState(undefined)
    const [votingToken, setVotingToken] = useState(undefined)
    const [vote, setVote] = useState()

    const classes = useStyles()

    const queryParams = useQueryParams()
    const votingTokenFromParams = queryParams.get('votingToken')

    useEffect(() => {
        EventsService.getFinalistsWithVotingToken(slug, votingTokenFromParams)
            .then(finalists => {
                setFinalistProjects(finalists)
            })
            .catch(error => {
                if (error.response.status === 404) {
                    setIsVotingOpen(false)
                }
                console.error(error.response)
            })

        updateVote()
    }, [])

    const updateVote = () => {
        VotingTokenService.getVotingTokenPublic(votingTokenFromParams)
            .then(_votingToken => {
                setVotingToken(_votingToken)
                if (_votingToken?.project) {
                    setVote(_votingToken.project)
                }
            })
            .catch(error => {
                console.error(error.response)
                setVotingToken(null)
            })
    }

    const handleSubmit = async () => {
        try {
            await VotingTokenService.voteWithToken(votingTokenFromParams, vote)
            dispatch(SnackbarActions.success('Vote submitted!'))
        } catch {
            dispatch(
                SnackbarActions.error(
                    'Something went wrong, please get in touch with the organisers.',
                ),
            )
        }
    }

    const isTokenInValid =
        !votingTokenFromParams || votingToken === null || votingToken?.isRevoked

    if (isTokenInValid) {
        return (
            <Box className={classes.header}>
                <h2>You'll need a valid voting token to access this page.</h2>
            </Box>
        )
    }

    if (isVotingOpen === false) {
        return (
            <Box className={classes.header}>
                <h2>
                    Finalist voting has not yet started or it has been closed
                    already. Please ask the organisers if this is unexpected.
                </h2>
            </Box>
        )
    }

    return (
        <>
            <Box className={classes.header}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <h3>
                            Finalist voting is now open. As a judge or partner,
                            you are able to cast your vote on one of the
                            finalist projects in this hackathon.
                        </h3>
                        <p>
                            Look through the projects below and decide which one
                            deserves your vote. Remember, you can only vote on
                            one project, so choose the best one!
                        </p>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper>
                            <Box
                                p={2}
                                my={2}
                                display="flex"
                                flexDirection="row"
                                alignItems="flex-end"
                            >
                                <Box mb={2} flex="1">
                                    <Select
                                        value={vote}
                                        onChange={setVote}
                                        label="Vote on a project"
                                        options={finalistProjects.map(
                                            project => ({
                                                label: project.name,
                                                value: project._id,
                                            }),
                                        )}
                                    />
                                </Box>
                                <Box ml={2} mb={2}>
                                    <Button
                                        onClick={handleSubmit}
                                        color="primary"
                                        variant="contained"
                                    >
                                        {votingToken?.project
                                            ? 'Change vote'
                                            : 'Submit vote'}
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Box className={classes.projects} p={3}>
                <ProjectsGrid
                    sortField={null}
                    projects={finalistProjects}
                    event={event}
                    onSelect={project => setSelectedProject(project)}
                />
            </Box>
            <Dialog
                transitionDuration={0}
                fullScreen
                open={Boolean(selectedProject)}
                onClose={() => setSelectedProject(undefined)}
            >
                <ProjectDetail
                    project={selectedProject}
                    event={event}
                    onBack={() => setSelectedProject(undefined)}
                    showTableLocation={false}
                />
            </Dialog>
        </>
    )
}
