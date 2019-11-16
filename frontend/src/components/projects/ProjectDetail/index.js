import React from 'react';

import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Image from 'components/generic/Image';
import CenteredContainer from 'components/generic/CenteredContainer';
import Markdown from 'components/generic/Markdown';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

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
    content: {
        marginTop: theme.spacing(5)
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 100
    }
}));

const ProjectDetail = ({ project, onBack }) => {
    const classes = useStyles();

    if (!project) return null;
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
                    <Box className={classes.top}>
                        <Image
                            className={classes.image}
                            defaultImage={require('assets/images/default_cover_image.png')}
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
                    <Markdown source={project.description} />
                </Box>
            </CenteredContainer>
        </Box>
    );
};

export default ProjectDetail;
