import React, { useState, useMemo, useCallback } from 'react'

import { sortBy } from 'lodash-es'
import { Box } from '@mui/material'
import Container from 'components/generic/Container'
import EventHeroImage from 'components/events/EventHeroImage'
import ProjectsPreview from './ProjectsPreview'
import Filters from './Filters'

import ProjectsGrid from 'components/projects/ProjectsGrid'
import { useNavigate } from 'react-router-dom'

export default ({ event, projects }) => {
    const navigate = useNavigate()
    const [activeFilter, setActiveFilter] = useState('')

    const { byChallenge, byTrack } = useMemo(() => {
        return projects.reduce(
            (res, project) => {
                if (project.track) {
                    if (res.byTrack.hasOwnProperty(project.track)) {
                        res.byTrack[project.track].push(project)
                    } else {
                        res.byTrack[project.track] = [project]
                    }
                }

                if (project.challenges) {
                    project.challenges.forEach(challenge => {
                        if (res.byChallenge.hasOwnProperty(challenge)) {
                            res.byChallenge[challenge].push(project)
                        } else {
                            res.byChallenge[challenge] = [project]
                        }
                    })
                }

                return res
            },
            {
                byChallenge: {},
                byTrack: {},
            },
        )
    }, [projects])

    const renderTrackPreviews = () => {
        if (!event || !event.tracks) return null
        return event.tracks.map(track => {
            const items = byTrack[track.slug]
            if (!items) return null
            const sorted = sortBy(items, item => {
                return -1 * item.description.length
            })
            return (
                <ProjectsPreview
                    key={track.slug}
                    projects={sorted.slice(0, 3)}
                    count={items.length}
                    event={event}
                    label={track.name}
                    moreLink={`/projects/${event.slug}/by-track/${track.slug}`}
                />
            )
        })
    }

    const renderChallengePreviews = () => {
        if (!event || !event.challenges) return null

        return event.challenges.map(challenge => {
            const items = byChallenge[challenge.slug]
            if (!items) return null
            console.log(items)

            const sorted = items.sort(function (a, b) {
                return new Date(b.updatedAt) - new Date(a.updatedAt)
            })
            // sortBy(items, item => {
            //     return -1 * item.updatedAt
            // })
            return (
                <ProjectsPreview
                    key={challenge.slug}
                    projects={sorted.slice(0, 3)}
                    count={items.length}
                    event={event}
                    label={challenge.name}
                    subheading={`By ${challenge.partner}`}
                    moreLink={`/projects/${event.slug}/by-challenge/${challenge.slug}`}
                />
            )
        })
    }

    const renderProjectGrid = () => {
        if (!event) return null
        return (
            <ProjectsGrid
                sortField={null}
                projects={projects}
                event={event}
                onSelect={onProjectSelected}
            />
        )
    }

    const renderContent = () => {
        console.log('activeFilter :>> ', activeFilter)

        switch (activeFilter) {
            case 'by-track':
                return renderTrackPreviews()
            case 'by-challenge':
                return renderChallengePreviews()
            case 'by-finalist':
                return renderProjectGrid()
            default:
                return renderProjectGrid()
        }
    }

    const onProjectSelected = useCallback(
        project => {
            navigate(`/projects/${event.slug}/view/${project._id}`)
        },
        [event.slug],
    )
    return (
        <>
            <EventHeroImage event={event} subheading="Project gallery" />
            <Container center>
                <Box mt={3} />
                <Filters
                    event={event}
                    active={activeFilter}
                    onChange={setActiveFilter}
                />
                {renderContent()}
            </Container>
        </>
    )
}
