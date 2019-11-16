import React, { useState, useMemo, useCallback, useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import Select from 'components/inputs/Select';
import Button from 'components/generic/Button';
import ProjectsTable from 'components/tables/ProjectsTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import * as AuthSelectors from 'redux/auth/selectors';

import ProjectsService from 'services/projects';

const ChallengesTab = ({ event, projects, projectsLoading, idToken, enqueueSnackbar }) => {
    const [challenge, setChallenge] = useState(event.challenges[0].slug);
    const [link, setLink] = useState();
    const [linkLoading, setLinkLoading] = useState(false);

    const filtered = useMemo(() => {
        return projects.filter(project => {
            return project.challenges && project.challenges.indexOf(challenge) !== -1;
        });
    }, [projects, challenge]);

    useEffect(() => {
        setLink();
    }, [challenge]);

    const handleGenerateLink = useCallback(async () => {
        setLinkLoading(true);
        try {
            const link = await ProjectsService.generateChallengeLink(idToken, event.slug, challenge);
            setLink(link);
        } catch (err) {
            enqueueSnackbar('Oops, something went wrong...', { variant: 'error' });
        }
        setLinkLoading(false);
    }, [idToken, event, challenge, enqueueSnackbar]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ position: 'relative', zIndex: 500 }}>
                <Select
                    label="Choose challenge"
                    options={event.challenges.map(challenge => ({
                        label: `${challenge.name} (${challenge.partner})`,
                        value: challenge.slug
                    }))}
                    value={challenge}
                    onChange={setChallenge}
                />
            </Grid>
            <Grid item xs={12}>
                <ProjectsTable projects={projects} event={event} loading={projectsLoading} />
            </Grid>
            <Grid item xs={12}>
                {link && link.link ? (
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                        {link.link}
                    </a>
                ) : (
                    <Button
                        onClick={handleGenerateLink}
                        loading={linkLoading}
                        color="theme_turquoise"
                        variant="contained"
                    >
                        Generate partner link
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state),
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(ChallengesTab));
