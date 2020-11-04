import React, { useState } from 'react'

import { find, filter } from 'lodash-es'
import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Image from 'components/generic/Image'
import CenteredContainer from 'components/generic/CenteredContainer'
import Markdown from 'components/generic/Markdown'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import config from 'constants/config'
import { Helmet } from 'react-helmet'

import ReactPlayer from 'react-player/youtube'

import ProjectTeam from './ProjectTeam'
import Pagination from './Pagination'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: '100%',
        position: 'relative',
    },
    top: {
        width: '100%',
        paddingTop: '50%',
        position: 'relative',
        overflow: 'hidden',
        background: 'black',
        [theme.breakpoints.up('lg')]: {
            paddingTop: theme.breakpoints.values.lg / 2,
        },
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'black',
        objectFit: 'contain',
    },
    placeholderTop: {
        background: 'black',
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    placeholderImage: {
        width: '100%',
        maxWidth: '600px',
    },
    content: {
        marginTop: theme.spacing(5),
    },
    backButtonWrapper: {
        background: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    sectionTitle: {
        textTransform: 'uppercase',
    },
    pagination: {
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'rgba(0,0,0,0.4)',
        zIndex: 100,
        color: 'white',
        padding: theme.spacing(2),
    },
    paginationText: {
        color: 'white',
    },
    playerWrapper: {
        position: 'relative',
        height: '360px',
    },
    reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
}))

const ProjectDetail = ({
    project,
    event,
    onBack,
    showTableLocation,
    showFullTeam,
}) => {
    const classes = useStyles()
    const [index, setIndex] = useState(0)
    console.log('HELMET IN PROJECT VIEW', Helmet.peek())
    if (!project) return null

    const renderTrack = () => {
        const value = find(event.tracks, t => t.slug === project.track)

        if (!value) {
            return <Typography variant="subtitle1">No track</Typography>
        }
        return <Typography variant="subtitle1">{value.name}</Typography>
    }

    const renderChallenges = challenges => {
        const values = filter(
            event.challenges,
            c => project.challenges.indexOf(c.slug) !== -1,
        )

        if (values.length === 0) {
            return <Typography variant="subtitle1">No challenges</Typography>
        }

        return values.map(challenge => (
            <Typography key={challenge.slug} variant="subtitle1">
                {challenge.name} ({challenge.partner})
            </Typography>
        ))
    }
    return (
        <>
            <Helmet>
                <title>{config.PLATFORM_OWNER_NAME}</title>
                <meta
                    name="keywords"
                    content="Hackathon, hackathon platform, Junction"
                />
                <meta
                    name="title"
                    content={project ? `Junction App || ${project.name}` : ''}
                />
                <meta
                    property="og:title"
                    content={project ? `Junction App || ${project.name}` : ''}
                />
                <meta
                    name="twitter:title"
                    content={project ? `Junction App || ${project.name}` : ''}
                />
                <meta
                    name="description"
                    content={project ? project.punchline : ''}
                />
                <meta
                    property="og:description"
                    content={project ? project.punchline : ''}
                />
                <meta
                    name="twitter:description"
                    content={project ? project.punchline : ''}
                />
                <meta name="og:type" content="website" />
                <meta
                    property="og:image"
                    content={
                        project.images[0]
                            ? project.images[0].url
                            : config.SEO_IMAGE_URL
                    }
                />
                <meta
                    name="twitter:image"
                    content={
                        project.images[0]
                            ? project.images[0].url
                            : config.SEO_IMAGE_URL
                    }
                />{' '}
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={config.SEO_TWITTER_HANDLE} />
                <meta
                    name="twitter:creator"
                    content={config.SEO_TWITTER_HANDLE}
                />
            </Helmet>
            <Box className={classes.wrapper}>
                <Box style={{ position: 'relative' }}>
                    <AutoPlaySwipeableViews
                        enableMouseEvents
                        index={index}
                        onChangeIndex={setIndex}
                    >
                        {project.images.length > 0 ? (
                            project.images.map(image => (
                                <Box
                                    key={image.publicId}
                                    className={classes.top}
                                >
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
                                    publicId={event?.coverImage?.logo}
                                    defaultImage={require('assets/images/default_cover_image.png')}
                                />
                            </Box>
                        )}
                    </AutoPlaySwipeableViews>
                    <Box className={classes.backButtonWrapper}>
                        <Button onClick={onBack} style={{ color: 'white' }}>
                            <ArrowBackIosIcon style={{ fontSize: '14px' }} />
                            Back
                        </Button>
                    </Box>
                </Box>
                <CenteredContainer>
                    <Pagination
                        pages={project.images.length}
                        active={index}
                        onChange={setIndex}
                    />
                    <Box className={classes.content}>
                        <Typography variant="h4" gutterBottom>
                            {project.name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            style={{ fontWeight: 'bold' }}
                        >
                            {project.punchline}
                        </Typography>
                        <Box mt={5} mb={5}>
                            <Markdown source={project.description} />
                        </Box>
                        {showTableLocation && project.location && (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    Location
                                </Typography>
                                <Typography variant="subtitle1">
                                    {project.location}
                                </Typography>
                            </Box>
                        )}
                        {project.video ? (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    video
                                </Typography>
                                <div className={classes.playerWrapper}>
                                    <ReactPlayer
                                        url={project.video}
                                        className={classes.reactPlayer}
                                        width="100%"
                                        height="100%"
                                        controls
                                        light={false}
                                        loop={false}
                                        playbackRate={1.0}
                                        volume={0.8}
                                        muted={false}
                                        onReady={() => console.log('onReady')}
                                        onStart={() => console.log('onStart')}
                                        onBuffer={() => console.log('onBuffer')}
                                        onSeek={e => console.log('onSeek', e)}
                                        onError={e => console.log('onError', e)}
                                    />
                                </div>
                            </Box>
                        ) : (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    video
                                </Typography>
                                <Typography variant="subtitle1">
                                    No video available
                                </Typography>
                            </Box>
                        )}

                        {project.demo ? (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    Demo
                                </Typography>
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {project.demo}
                                </a>
                            </Box>
                        ) : (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    Demo
                                </Typography>
                                <Typography variant="subtitle1">
                                    No demo available
                                </Typography>
                            </Box>
                        )}
                        {!project.sourcePublic ? (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    Source code
                                </Typography>
                                <Typography variant="subtitle1">
                                    Source code not public
                                </Typography>
                            </Box>
                        ) : (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    Source code
                                </Typography>
                                <a
                                    href={project.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {project.source}
                                </a>
                            </Box>
                        )}
                        {event && project.track && (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    Track
                                </Typography>
                                {renderTrack()}
                            </Box>
                        )}
                        {event && project.challenges.length > 0 && (
                            <Box mb={3}>
                                <Typography
                                    variant="h6"
                                    className={classes.sectionTitle}
                                >
                                    Challenges
                                </Typography>
                                {renderChallenges()}
                            </Box>
                        )}
                        <Typography
                            variant="h6"
                            className={classes.sectionTitle}
                        >
                            Team
                        </Typography>
                        <ProjectTeam
                            hiddenUsers={project.hiddenMembers}
                            teamId={project.team}
                            showFullTeam={showFullTeam}
                        />
                    </Box>
                    <Box height={200} />
                </CenteredContainer>
            </Box>
        </>
    )
}

export default ProjectDetail
