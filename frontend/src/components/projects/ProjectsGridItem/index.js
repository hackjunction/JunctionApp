import React from 'react';

import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { EventHelpers } from '@hackjunction/shared';

import Image from 'components/generic/Image';
import Button from 'components/generic/Button';
import MiscUtils from 'utils/misc';

const useStyles = makeStyles(theme => ({
    wrapper: {
        flex: 1,
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    },
    image: {
        height: '140px',
        width: '100%',
        objectFit: 'cover',
        background: 'black'
    },
    placeholderImage: {
        height: '140px',
        width: '100%',
        objectFit: 'contain',
        background: 'black'
    },
    content: {
        padding: theme.spacing(2),
        flex: 1,
        paddingBottom: 0
    }
}));

const ProjectsGridItem = ({ project, event, showTableLocation, onClickMore }) => {
    const classes = useStyles();

    const previewImage = project.images.length > 0 ? project.images[0].publicId : '';

    return (
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
            <Box className={classes.wrapper}>
                <Image
                    className={previewImage ? classes.image : classes.placeholderImage}
                    publicId={previewImage}
                    defaultImage={event.logo.url}
                    transformation={{
                        width: 600
                    }}
                />
                <Box className={classes.content}>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body1" paragraph>
                        {MiscUtils.ellipsize(project.punchline, 160)}
                    </Typography>
                </Box>
                {showTableLocation && project.location && (
                    <Box pt={2} pl={2} pr={2}>
                        <Typography style={{ fontWeight: 'bold' }} variant="body1">
                            Table location
                        </Typography>
                        <Typography variant="body1">{project.location}</Typography>
                    </Box>
                )}
                <Box p={2}>
                    <Button onClick={onClickMore} fullWidth variant="outlined" color="theme_lightgray">
                        See more
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default ProjectsGridItem;
