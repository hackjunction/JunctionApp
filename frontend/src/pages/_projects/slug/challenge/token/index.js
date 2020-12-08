import React, { useState, useEffect, useCallback } from 'react'

import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { push } from 'connected-react-router'
import { Box } from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import ProjectsGrid from 'components/projects/ProjectsGrid'

import ProjectsService from 'services/projects'

export default ({ event }) => {
    const match = useRouteMatch()
    const dispatch = useDispatch()
    const { slug } = event
    const { token } = match.params
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchProjects = useCallback(async () => {
        setLoading(true)
        try {
            const data = await ProjectsService.getProjectsWithToken(slug, token)
            setData(data)
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }, [slug, token])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    // TODO seems like a bad practice
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
                    <ProjectsGrid
                        projects={data.projects}
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
