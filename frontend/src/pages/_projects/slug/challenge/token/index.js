import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { push } from 'connected-react-router'
import { Box, Grid, Divider, Typography } from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import Button from 'components/generic/Button'
import { makeStyles } from '@material-ui/core/styles'

import ProjectsService from 'services/projects'
import Filter from 'components/Team/Filter'
import _ from 'lodash'

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
    const allFilterLabel = 'All projects'
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
    const [filter, setFilter] = useState(allFilterLabel)

    const onFilterChange = filter => {
        setFilter(filter)
    }

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
                    <div className="tw-flex tw-justify-between tw-items-end">
                        <PageHeader
                            heading={data?.challenge.name}
                            subheading={`By ${data?.challenge.partner}`}
                            alignment="left"
                            details={`${data?.projects.length} project${
                                data?.projects.length > 1 ||
                                data?.projects.length < 1
                                    ? 's'
                                    : ''
                            }`}
                        />
                        <Filter
                            noFilterOption={allFilterLabel}
                            onChange={onFilterChange}
                            filterArray={data?.event.challenges.map(c => {
                                return { label: c.name, value: c.slug }
                            })}
                        />
                    </div>

                    <Box height={20} />
                    <ProjectsGrid
                        projects={
                            filter === allFilterLabel
                                ? projects
                                : _.filter(projects, project =>
                                      _.includes(project.challenges, filter),
                                  )
                        }
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
