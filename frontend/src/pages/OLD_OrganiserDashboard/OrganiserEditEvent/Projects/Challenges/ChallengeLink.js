import React, { useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import Button from 'components/generic/Button';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as AuthSelectors from 'redux/auth/selectors';

import ProjectsService from 'services/projects';

const ChallengeLink = ({ challenge, enqueueSnackbar, idToken, event }) => {
    const [link, setLink] = useState();
    const [linkLoading, setLinkLoading] = useState(false);
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

    if (link && link.link) {
        return (
            <a href={link.link} target="_blank" rel="noopener noreferrer">
                {link.link}
            </a>
        );
    }
    return (
        <Button onClick={handleGenerateLink} loading={linkLoading} color="theme_turquoise" variant="contained">
            Generate partner link
        </Button>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(ChallengeLink));
