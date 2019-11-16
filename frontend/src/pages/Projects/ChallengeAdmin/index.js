import React, { useState, useEffect, useCallback } from 'react';

import PageWrapper from 'components/layouts/PageWrapper';
import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';

import ProjectsService from 'services/projects';

const ProjectsChallengeAdmin = ({ match }) => {
    const { slug, token } = match.params;
    const [data, setData] = useState([]);
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
    console.log('PROJECTS', data);
    return (
        <PageWrapper
            loading={loading || !data}
            error={error}
            render={() => (
                <CenteredContainer>
                    <PageHeader heading={data.challenge.name} subheading={data.projects.length + ' projects'} />
                </CenteredContainer>
            )}
        ></PageWrapper>
    );
};

export default ProjectsChallengeAdmin;
