import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { push } from 'connected-react-router'
import { Box, Grid, Divider } from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import Button from 'components/generic/Button'
import { makeStyles } from '@material-ui/core/styles'

import ProjectsService from 'services/projects'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: theme.spacing(2),
    },
}))

//TODO make this and track one into a component
export default ({ event }) => {
    const classes = useStyles()
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const { slug } = event
    const { token } = match.params
    const [data, setData] = useState({})
    const [projects, setProjects] = useState([])
    const [draftsProjects, setDraftsProjects] = useState([])
    const [finalProjects, setFinalProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchProjects = useCallback(async () => {
        setLoading(true)
        try {
            const data = await ProjectsService.getChallengeProjectsWithToken(
                slug,
                token,
            )
            setData(data)
            setDraftsProjects(
                data.projects.filter(project => project.status === 'draft'),
            )
            setFinalProjects(
                data.projects.filter(project => project.status === 'final'),
            )
            setProjects(data.projects)
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }, [slug, token])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    if (!data) {
        return null
    }

    return (
        <PageWrapper
            loading={loading || !data}
            error={error}
            render={() => (
                <Container center>
                    <PageHeader
                        heading={data.challenge.name}
                        subheading={data.projects.length + ' projects'}
                    />
                    <Box>FILTER</Box>
                    <Divider />
                    <Grid className={classes.wrapper} container spacing={1}>
                        <Grid item xs={4}>
                            <Button
                                onClick={() => {
                                    setProjects(finalProjects)
                                }}
                                variant="outlined"
                                color="theme_lightgray"
                            >
                                Final
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                onClick={() => {
                                    setProjects(draftsProjects)
                                }}
                                variant="outlined"
                                color="theme_lightgray"
                            >
                                Draft
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                onClick={() => {
                                    setProjects(data.projects)
                                }}
                                variant="outlined"
                                color="theme_lightgray"
                            >
                                All
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Box height={20} />
                    <ProjectsGrid
                        projects={projects}
                        event={data.event}
                        onSelect={project =>
                            dispatch(push(`${match.url}/view/${project._id}`))
                        }
                        showScore={true}
                        token={token}
                    />
                    <Box height={200} />
                </Container>
            )}
        ></PageWrapper>
    )
}
