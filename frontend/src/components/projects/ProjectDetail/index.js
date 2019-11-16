import React, { useState, useCallback, useEffect } from 'react';

import { find, filter } from 'lodash-es';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Image from 'components/generic/Image';
import CenteredContainer from 'components/generic/CenteredContainer';
import Markdown from 'components/generic/Markdown';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import UserProfilesService from 'services/userProfiles';

import ProjectTeam from './ProjectTeam';

const useStyles = makeStyles(theme => ({
    top: {
        width: '100%',
        paddingTop: '50%',
        position: 'relative',
        overflow: 'hidden',
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.breakpoints.values.lg / 2
        }
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        objectFit: 'cover'
    },
    placeholderTop: {
        background: 'black',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    placeholderImage: {
        width: '100%',
        maxWidth: '600px'
    },
    content: {
        marginTop: theme.spacing(5)
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100
    },
    sectionTitle: {
        textTransform: 'uppercase'
    }
}));

const ProjectDetail = ({ project, event, onBack, showTableLocation }) => {
    const classes = useStyles();

    if (!project) return null;

    const renderTrack = () => {
        const value = find(event.tracks, t => t.slug === project.track);

        if (!value) {
            return <Typography variant="subtitle1">No track</Typography>;
        }
        return <Typography variant="subtitle1">{value.name}</Typography>;
    };

    const renderChallenges = challenges => {
        const values = filter(event.challenges, c => project.challenges.indexOf(c.slug) !== -1);

        if (values.length === 0) {
            return <Typography variant="subtitle1">No challenges</Typography>;
        }

        return values.map(challenge => (
            <Typography key={challenge.slug} variant="subtitle1">
                {challenge.name} ({challenge.partner})
            </Typography>
        ));
    };

    return (
        <Box width="100%">
            <Box p={2} className={classes.backButton}>
                <Button onClick={onBack} style={{ color: 'white' }}>
                    <ArrowBackIosIcon />
                    Back
                </Button>
            </Box>
            <SwipeableViews enableMouseEvents>
                {project.images.length > 0 ? (
                    project.images.map(image => (
                        <Box key={image.publicId} className={classes.top}>
                            <Image
                                className={classes.image}
                                publicId={image.publicId}
                                defaultImage={require('assets/images/default_cover_image.png')}
                            />
                        </Box>
                    ))
                ) : (
                    <Box className={classes.placeholderTop}>
                        <Image
                            className={classes.placeholderImage}
                            publicId={event.logo.publicId}
                            // defaultImage={require('assets/images/default_cover_image.png')}
                        />
                    </Box>
                )}
            </SwipeableViews>
            <CenteredContainer>
                <Box className={classes.content}>
                    <Typography variant="h4" gutterBottom>
                        {project.name}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        {project.punchline}
                    </Typography>
                    <Box mt={5} mb={5}>
                        <Markdown source={project.description} />
                    </Box>
                    {showTableLocation && project.location && (
                        <Box mb={3}>
                            <Typography variant="h6" className={classes.sectionTitle}>
                                Location
                            </Typography>
                            <Typography variant="subtitle1">{project.location}</Typography>
                        </Box>
                    )}
                    {event && project.track && (
                        <Box mb={3}>
                            <Typography variant="h6" className={classes.sectionTitle}>
                                Track
                            </Typography>
                            {renderTrack()}
                        </Box>
                    )}
                    {event && project.challenges.length > 0 && (
                        <Box mb={3}>
                            <Typography variant="h6" className={classes.sectionTitle}>
                                Challenges
                            </Typography>
                            {renderChallenges()}
                        </Box>
                    )}
                    <Typography variant="h6" className={classes.sectionTitle}>
                        Team
                    </Typography>
                    <ProjectTeam teamId={project.team} />
                </Box>
                <Box height={200} />
            </CenteredContainer>
        </Box>
    );
};

export default ProjectDetail;
