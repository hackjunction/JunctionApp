import React, { useMemo, useCallback } from 'react'

import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { find, sortBy } from 'lodash-es'
import { Box } from '@material-ui/core'

import CenteredContainer from 'components/generic/CenteredContainer'
import EventHeroImage from 'components/events/EventHeroImage'
import ProjectsGrid from 'components/projects/ProjectsGrid'

export default ({ event, projects }) => {
    const dispatch = useDispatch()
    const match = useRouteMatch()

    const onProjectSelected = useCallback(
        project => {
            dispatch(push(`/projects/${event.slug}/view/${project._id}`))
        },
        [dispatch, event.slug]
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

        return sortBy(data, item => {
            return -1 * item.description.length
        })
    }, [projects, challenge])

    return (
        <React.Fragment>
            <EventHeroImage
                event={event}
                title={challenge.partner}
                subheading={challenge.name}
            />
            <CenteredContainer>
                <Box mt={3} />
                <ProjectsGrid
                    sortField={null}
                    projects={filtered}
                    event={event}
                    onSelect={onProjectSelected}
                />
                <Box mt={5} />
            </CenteredContainer>
        </React.Fragment>
    )
}
