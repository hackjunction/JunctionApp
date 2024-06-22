import React, { useMemo, useCallback } from 'react'

import { useDispatch } from 'react-redux'
import { useResolvedPath } from 'react-router'
import { find, sortBy } from 'lodash-es'
import { Box } from '@mui/material'

import Container from 'components/generic/Container'
import EventHeroImage from 'components/events/EventHeroImage'
import ProjectsGrid from 'components/projects/ProjectsGrid'

export default ({ event, projects }) => {
    const dispatch = useDispatch()
    const url = useResolvedPath('').pathname

    const onProjectSelected = useCallback(
        project => {
            dispatch(push(`/projects/${event.slug}/view/${project._id}`))
        },
        [dispatch, event.slug],
    )

    const challenge = useMemo(() => {
        if (!event || !event.challenges) return null
        return find(event.challenges, challenge => {
            return challenge.slug === match.params.challenge
        })
    }, [match, event])

    const filtered = useMemo(() => {
        if (!challenge || !projects) return []
        const data = projects.filter(project => {
            return project.challenges.indexOf(challenge.slug) !== -1
        })
        const sorted = data.sort(function (a, b) {
            return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
        return sorted
        // return sortBy(data, item => {
        //     return -1 * item?.description.length
        // })
    }, [projects, challenge])

    return (
        <>
            <EventHeroImage
                event={event}
                title={challenge.partner}
                subheading={challenge.name}
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
