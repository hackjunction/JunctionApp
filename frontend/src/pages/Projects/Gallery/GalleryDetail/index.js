import React, { useState, useEffect, useCallback } from 'react';
import { goBack } from 'connected-react-router';
import { connect } from 'react-redux';
import PageWrapper from 'components/layouts/PageWrapper';
import ProjectDetail from 'components/projects/ProjectDetail';

import ProjectsService from 'services/projects';

const GalleryDetail = ({ event, match, goBack, showFullTeam }) => {
    const { projectId } = match.params;
    const [project, setProject] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchProject = useCallback(async () => {
        setLoading(true);
        try {
            const project = await ProjectsService.getPublicProjectById(projectId);
            setProject(project);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    return (
        <PageWrapper loading={loading} error={error}>
            <ProjectDetail project={project} event={event} onBack={goBack} showFullTeam={showFullTeam} />
        </PageWrapper>
    );
};

const mapDispatch = dispatch => ({
    goBack: () => dispatch(goBack())
});

export default connect(null, mapDispatch)(GalleryDetail);
