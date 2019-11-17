import React, { useCallback, useEffect, useState } from 'react';

import { Grid, Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';

import PageHeader from 'components/generic/PageHeader';
import PageWrapper from 'components/layouts/PageWrapper';
import Select from 'components/inputs/Select';
import ProjectsGridItem from 'components/projects/ProjectsGridItem';

import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import EventsService from 'services/events';

const EventDashboardFinals = ({ event, idToken }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [projects, setProjects] = useState([]);
    const updateProjects = useCallback(() => {
        EventsService.getWinnerProjects(idToken, event.slug)
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
            });
    }, [idToken, event]);

    useEffect(() => {
        updateProjects();
    }, []);

    return (
        <PageWrapper loading={loading}>
            <PageHeader heading="Finalist voting" subheading="Vote for your favorite project of the finalists" />
            <Box mt={5} mb={3} display="flex" flexDirection="row" alignItems="flex-end">
                <Box mb={2} flex="1">
                    <Select
                        label="Choose your favorite"
                        options={projects.map(project => ({
                            label: project.name,
                            value: project._id
                        }))}
                    />
                </Box>
                <Box ml={2} mb={2}>
                    <Button color="primary" variant="contained">
                        Submit vote
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {projects.map(project => (
                    <ProjectsGridItem project={project} event={event} />
                ))}
            </Grid>
            <Box height="200px" />
        </PageWrapper>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state)
});

export default connect(mapState)(EventDashboardFinals);
