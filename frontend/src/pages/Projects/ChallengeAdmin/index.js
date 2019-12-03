import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import PageWrapper from 'components/layouts/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';
import ProjectsGrid from 'components/projects/ProjectsGrid';
import GalleryDetail from '../Gallery/GalleryDetail';

import ProjectsService from 'services/projects';

const ProjectsChallengeAdmin = ({ match, push }) => {
    const { slug, token } = match.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const data = await ProjectsService.getProjectsWithToken(slug, token);
            setData(data);
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    }, [slug, token]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const route = match.url;
    console.log('ROUTE', route);

    return (
        <Switch>
            <Route
                path={`${match.url}/:projectId`}
                component={({ match }) => <GalleryDetail event={data.event} match={match} showFullTeam={true} />}
            />
            <Route
                path={match.url}
                component={() => (
                    <PageWrapper
                        loading={loading || !data}
                        error={error}
                        render={() => (
                            <CenteredContainer>
                                <PageHeader
                                    heading={data.challenge.name}
                                    subheading={data.projects.length + ' projects'}
                                />
                                <ProjectsGrid
                                    projects={data.projects}
                                    event={data.event}
                                    onSelect={project => push(match.url + '/' + project._id)}
                                />
                                <Box height={200} />
                            </CenteredContainer>
                        )}
                    ></PageWrapper>
                )}
            />
        </Switch>
    );
};

export default connect(null, { push })(ProjectsChallengeAdmin);
