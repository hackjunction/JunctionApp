import React, { useMemo, useEffect, useCallback } from 'react'

import { push } from 'connected-react-router'
import { useRouteMatch } from 'react-router'
import { useDispatch } from 'react-redux'
import { find, sortBy } from 'lodash-es'
import { Box } from '@material-ui/core'

import Container from 'components/generic/Container'
import EventHeroImage from 'components/events/EventHeroImage'
import ProjectsGrid from 'components/projects/ProjectsGrid'

export default ({ event, projects }) => {
    const dispatch = useDispatch()
    const match = useRouteMatch()

    const onProjectSelected = useCallback(
        project => {
            dispatch(push(`/projects/${event.slug}/view/${project._id}`))
        },
        [dispatch, event.slug],
    )

    const track = useMemo(() => {
        if (!event || !event.tracks) return null
        return find(event.tracks, track => {
            return track.slug === match.params.track
        })
    }, [match, event])

    const filtered = useMemo(() => {
        if (!track || !projects) return []
        const data = projects.filter(project => {
            return project.track === track.slug
        })
        return sortBy(data, project => {
            return -1 * project.description.length
        })
    }, [projects, track])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <EventHeroImage
                event={event}
                title={track.name}
                subheading={`${filtered.length} projects`}
            />
            <Container center>
                <Box mt={3} />
                <ProjectsGrid
                    sortField={null}
                    projects={filtered}
                    event={event}
                    onSelect={onProjectSelected}
                />
                <Box mt={5} />
            </Container>
        </>
    )
}
