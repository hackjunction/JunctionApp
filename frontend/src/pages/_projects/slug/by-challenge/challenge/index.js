import React, { useMemo, useCallback } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { find } from 'lodash-es'
import { Box } from '@mui/material'

import Container from 'components/generic/Container'
import EventHeroImage from 'components/events/EventHeroImage'
import ProjectsGrid from 'components/projects/ProjectsGrid'

export default ({ event, projects }) => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const onProjectSelected = useCallback(
        project => {
            navigate(`/projects/${event.slug}/view/${project._id}`)
        },
        [dispatch, event.slug],
    )

    const challenge = useMemo(() => {
        if (!event || !event.challenges) return null
        return find(event.challenges, challenge => {
            return challenge.slug === params.challenge
        })
    }, [event])

    const filtered = useMemo(() => {
        if (!challenge || !projects) return []
        const data = projects.filter(project => {
            return project.challenges.indexOf(challenge.slug) !== -1
        })
        const sorted = data.sort(function (a, b) {
            return new Date(b.updatedAt) - new Date(a.updatedAt)
        })
        return sorted
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
