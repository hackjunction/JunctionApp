import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageWrapper from 'components/layouts/PageWrapper';
import EventsService from 'services/events';
import ProjectsService from 'services/projects';
import GalleryHome from './GalleryHome';
import GalleryTrack from './GalleryTrack';
import GalleryChallenge from './GalleryChallenge';
import GalleryDetail from './GalleryDetail';

const ProjectGallery = ({ match, push }) => {
    const { slug } = match.params;
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState();
    const [projects, setProjects] = useState([]);

    // const getEvent = useCallback(async () => {
    //     const event = await EventsService.getPublicEventBySlug(slug);
    //     return event;
    // }, [slug]);

    // const getProjects = useCallback(() => {
    //     return Promise.resolve([]);
    // }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [event, projects] = await Promise.all([
                EventsService.getPublicEventBySlug(slug),
                ProjectsService.getProjectsByEvent(slug)
            ]);
            if (!event) {
                push('/');
            }
            setEvent(event);
            setProjects(projects);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [push, slug]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PageWrapper loading={loading} error={error}>
            <Switch>
                <Route
                    path="/projects/:slug/view/:projectId"
                    component={({ match }) => <GalleryDetail event={event} match={match} />}
                />
                <Route
                    path="/projects/:slug/by-track/:track"
                    component={({ match }) => <GalleryTrack projects={projects} event={event} match={match} />}
                />
                <Route
                    path="/projects/:slug/by-challenge/:challenge"
                    component={({ match }) => <GalleryChallenge projects={projects} event={event} match={match} />}
                />
                <Route path="/projects/:slug" component={() => <GalleryHome projects={projects} event={event} />} />
                <Redirect to={`/projects/${slug}`} />
            </Switch>
        </PageWrapper>
    );
};

const mapState = state => ({});

export default connect(mapState, { push })(ProjectGallery);
