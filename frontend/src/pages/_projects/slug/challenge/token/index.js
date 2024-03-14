import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { push } from 'connected-react-router'
import { Box } from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import ProjectsGrid from 'components/projects/ProjectsGrid'

import ProjectsService from 'services/projects'
import Filter from 'components/Team/Filter'
import _ from 'lodash'

//TODO make this and track one into a component
export default ({ event }) => {
    const baseFilter = { value: 'final', label: 'Final projects' }
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
    const [filter, setFilter] = useState(baseFilter)

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

    const projectsToRender = filter => {
        switch (filter) {
            case 'draft':
                return draftsProjects
            case 'final':
                return finalProjects
            default:
                return projects
        }
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
                            noFilterOption={baseFilter}
                            onChange={onFilterChange}
                            filterArray={[
                                // { label: 'Final projects', value: 'final' },
                                { label: 'Draft projects', value: 'draft' },
                            ]}
                        />
                    </div>

                    <Box height={20} />
                    <ProjectsGrid
                        projects={projectsToRender(filter)}
                        event={data.event}
                        onSelect={project =>
                            dispatch(push(`${match.url}/view/${project._id}`))
                        }
                        showScore={true}
                        showReviewers={true}
                        token={token}
                    />
                    <Box height={200} />
                </Container>
            )}
        ></PageWrapper>
    )
}
