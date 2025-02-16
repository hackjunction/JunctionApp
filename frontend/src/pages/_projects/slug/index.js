import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams, useResolvedPath } from 'react-router'

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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const { slug } = params
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState()
    const [projects, setProjects] = useState([])
    const fetchData = async () => {
        setLoading(true)
        try {
            const [event, projects] = await Promise.all([
                EventsService.getPublicEventBySlug(slug),
                ProjectsService.getProjectsByEvent(slug),
            ])
            if (!event) {
                navigate('/')
            }
            setEvent(event)
            setProjects(projects)
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    //First two routes are for challenge link cases
    // TODO fetch data directly on the route that requires it
    return (
        <PageWrapper loading={loading} error={error}>
            <Routes>
                <Route
                    path={`challenge/:token/view/:projectId`}
                    element={
                        <GalleryDetail event={event} showFullTeam={true} />
                    }
                />
                <Route
                    path={`challenge/:token`}
                    element={<GalleryChallengeAdmin event={event} />}
                />
                <Route
                    path={`tracks/:token/view/:projectId`}
                    element={
                        <GalleryDetail event={event} showFullTeam={true} />
                    }
                />
                <Route
                    path={`tracks/:token`}
                    element={
                        <GalleryTrackAdmin projects={projects} event={event} />
                    }
                />
                <Route
                    path={`view/:projectId`}
                    element={<GalleryDetail event={event} />}
                />
                {/** Hide the rest of these routes if the gallery isn't open */}
                {event && event?.galleryOpen && (
                    <>
                        <Route
                            path={`by-track/:track`}
                            element={
                                <GalleryTrack
                                    projects={projects}
                                    event={event}
                                />
                            }
                        />
                        <Route
                            path={`by-challenge/:challenge`}
                            element={
                                <GalleryChallenge
                                    projects={projects}
                                    event={event}
                                />
                            }
                        />
                        <Route
                            index
                            element={
                                <GalleryHome
                                    projects={projects}
                                    event={event}
                                />
                            }
                        />
                    </>
                )}
                <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
        </PageWrapper>
    )
}
