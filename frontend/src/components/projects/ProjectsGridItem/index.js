import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography } from '@material-ui/core'

import Image from 'components/generic/Image'
import Button from 'components/generic/Button'
import Tag from 'components/generic/Tag'
import theme from 'material-ui-theme'

const useStyles = makeStyles(theme => ({
    wrapper: {
        flex: 1,
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    image: {
        height: '140px',
        width: '100%',
        objectFit: 'cover',
        background: 'black',
    },
    placeholderImage: {
        height: '140px',
        width: '100%',
        objectFit: 'contain',
        background: 'black',
    },
    content: {
        padding: theme.spacing(2),
        flex: 1,
    },
    label: ({ labelBackground }) => ({
        background: theme.palette[labelBackground].main,
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        padding: theme.spacing(1),
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }),
}))

const ProjectsGridItem = ({
    project,
    event,
    showTableLocation,
    onClickMore,
    label,
    labelBackground = 'primary',
    score = null,
    message = null,
    showTags = false,
}) => {
    const classes = useStyles({ labelBackground })
    const previewImage =
        project.images.length > 0 ? project.images[0].publicId : ''

    const statusTag = status => {
        switch (status) {
            case 'final':
                return (
                    <Tag
                        label="Final"
                        color={theme.palette.theme_turquoise.main}
                    />
                )
            case 'draft':
                return (
                    <Tag
                        label="Draft"
                        color={theme.palette.theme_lightgray.main}
                    />
                )
            default:
                return null
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
            <Box className={classes.wrapper}>
                {label && (
                    <Typography className={classes.label}>{label}</Typography>
                )}
                <Image
                    className={
                        previewImage ? classes.image : classes.placeholderImage
                    }
                    publicId={
                        previewImage
                            ? previewImage
                            : event?.coverImage?.publicId
                            ? event?.coverImage.publicId
                            : event?.logo?.publicId
                            ? event?.logo.publicId
                            : false
                    }
                    defaultImage={require('assets/images/default_cover_image.png')}
                    transformation={{
                        width: 600,
                    }}
                />
                <Box className={classes.content}>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body1" paragraph>
                        {project.punchline}
                    </Typography>
                </Box>
                <Box pb={2} pl={2} pr={2}>
                    {showTags &&
                        typeof project.status !== 'undefined' &&
                        statusTag(project.status)}
                </Box>
                {showTableLocation && project.location && (
                    <Box pb={2} pl={2} pr={2}>
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body1"
                        >
                            Table Location
                        </Typography>
                        <Typography variant="body1">
                            {project.location}
                        </Typography>
                    </Box>
                )}
                {score !== null && (
                    <Box pb={2} pl={2} pr={2}>
                        <Typography
                            style={{ fontWeight: 'bold' }}
                            variant="body1"
                        >
                            Score
                        </Typography>
                        <Typography variant="body1">{score}</Typography>
                        <Typography variant="body1">{message}</Typography>
                    </Box>
                )}

                {onClickMore && (
                    <Box pl={2} pr={2} pb={2}>
                        <Button
                            onClick={onClickMore}
                            fullWidth
                            variant="outlined"
                            color="theme_lightgray"
                        >
                            See more
                        </Button>
                    </Box>
                )}
            </Box>
        </Grid>
    )
}

export default ProjectsGridItem
