import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useResolvedPath } from 'react-router'

import { Routes, Route, Navigate } from 'react-router-dom'
import PageWrapper from 'components/layouts/PageWrapper'
import EventsService from 'services/events'
import ProjectsService from 'services/projects'
import GalleryHome from './default'
import GalleryTrack from './by-track/track'
import GalleryChallenge from './by-challenge/challenge'
import GalleryDetail from './view/projectId'
import GalleryChallengeAdmin from './challenge/token'
import GalleryTrackAdmin from './track/token'

export default () => {
    const url = useResolvedPath("").pathname;
    const dispatch = useDispatch()
    const { slug } = match.params
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState()
    const [projects, setProjects] = useState([])
    // TODO use Graphql here to get event
    // useEventPreview(eventId) but with slug
    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const [event, projects] = await Promise.all([
                EventsService.getPublicEventBySlug(slug),
                ProjectsService.getProjectsByEvent(slug),
            ])
            if (!event) {
                dispatch(push('/'))
            }
            setEvent(event)
            setProjects(projects)
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [dispatch, slug])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    //First two routes are for challenge link cases
    // TODO make this more modulary
    return (
        <PageWrapper loading={loading} error={error}>
            <Routes>
                <Route
                    path={`${match.url}/challenge/:token/view/:projectId`}
                    component={({ match }) => (
                        <GalleryDetail
                            event={event}
                            match={match}
                            showFullTeam={true}
                        />
                    )}
                />
                <Route
                    path={`${match.url}/challenge/:token`}
                    component={({ match }) => (
                        <GalleryChallengeAdmin
                            projects={projects}
                            event={event}
                            match={match}
                        />
                    )}
                />
                <Route
                    path={`${match.url}/tracks/:token/view/:projectId`}
                    component={({ match }) => (
                        <GalleryDetail
                            event={event}
                            match={match}
                            showFullTeam={true}
                        />
                    )}
                />
                <Route
                    path={`${match.url}/tracks/:token`}
                    component={({ match }) => (
                        <GalleryTrackAdmin
                            projects={projects}
                            event={event}
                            match={match}
                        />
                    )}
                />
                <Route
                    path={`${match.url}/view/:projectId`}
                    component={({ match }) => (
                        <GalleryDetail event={event} match={match} />
                    )}
                />
                {/** Hide the rest of these routes if the gallery isn't open */}
                {event?.galleryOpen && (
                    <>
                        <Route
                            path={`${match.url}/by-track/:track`}
                            component={({ match }) => (
                                <GalleryTrack
                                    projects={projects}
                                    event={event}
                                    match={match}
                                />
                            )}
                        />
                        <Route
                            path={`${match.url}/by-challenge/:challenge`}
                            component={({ match }) => (
                                <GalleryChallenge
                                    projects={projects}
                                    event={event}
                                    match={match}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={match.url}
                            component={() => (
                                <GalleryHome
                                    projects={projects}
                                    event={event}
                                />
                            )}
                        />
                    </>
                )}
                <Navigate to="/" />
            </Routes>
        </PageWrapper>
    )
}
