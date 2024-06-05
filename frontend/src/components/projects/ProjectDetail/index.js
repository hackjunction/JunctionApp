import React, { useState } from 'react'

import { find, filter } from 'lodash-es'
import { Box, Typography, Button, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Image from 'components/generic/Image'
import Container from 'components/generic/Container'
import Markdown from 'components/generic/Markdown'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import config from 'constants/config'
import { Helmet } from 'react-helmet'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import * as DashboardActions from 'redux/dashboard/actions'
import ProjectTeam from './ProjectTeam'
import Pagination from './Pagination'
import theme from 'material-ui-theme'
import Tag from 'components/generic/Tag'

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
        '&:hover': {
            opacity: 0.6,
        },
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
    doneTitle: {
        color: 'black',
        textAlign: 'center',
    },
    socialIcon: {
        color: 'black',
        width: 'auto',
        margin: '0.10rem',
        cursor: 'pointer',
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
    const [pause, setPause] = useState(true)
    const dispatch = useDispatch()

    if (!project) return null
    const downloadFile = async fileDataString => {
        const parsedValue = JSON.parse(fileDataString)
        await dispatch(
            DashboardActions.getFileForProject(
                parsedValue.id,
                parsedValue.filename,
            ),
        )
    }

    const extractFileDetails = (fileDataString, toExtract) => {
        const parsedValue = JSON.parse(fileDataString)
        switch (toExtract) {
            case 'filename':
                return parsedValue.filename
            case 'id':
                return parsedValue.id
            default:
                return parsedValue.filename
        }
    }

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

    const submissionFormAnswersArray = []

    if (project.submissionFormAnswers && event.submissionFormQuestions) {
        event.submissionFormQuestions.map(section => {
            const sectionGroup = {
                section: section.label,
                answers: [],
            }
            section.questions.map(question => {
                const questionAnswer = project.submissionFormAnswers.find(
                    answer =>
                        answer.key === question.name &&
                        answer.section === section.name &&
                        answer.value,
                )

                if (questionAnswer) {
                    sectionGroup.answers.push({
                        question: question.label,
                        value: questionAnswer.value,
                        fieldType: question.fieldType,
                    })
                }
                return
            })

            submissionFormAnswersArray.push(sectionGroup)
        })
    }

    const statusTag = status => {
        switch (status) {
            case 'final':
                return <Tag label="Final" color={theme.palette.primary.main} />
            case 'draft':
                return (
                    <Tag label="Draft" color={theme.palette.secondary.main} />
                )
            default:
                return null
        }
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
                    content={
                        project ? `${project.name} - Junction Platform` : ''
                    }
                />
                <meta
                    property="og:title"
                    content={
                        project ? `${project.name} - Junction Platform` : ''
                    }
                />
                <meta
                    name="twitter:title"
                    content={
                        project ? `${project.name} - Junction Platform` : ''
                    }
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
                <Tooltip title={pause ? 'Click to pause' : 'Click to play'}>
                    <Box
                        style={{ position: 'relative' }}
                        onClick={e => setPause(!pause)}
                    >
                        <AutoPlaySwipeableViews
                            enableMouseEvents
                            index={index}
                            onChangeIndex={setIndex}
                            interval={5000}
                            autoplay={pause}
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
                                <ArrowBackIosIcon
                                    style={{ fontSize: '14px' }}
                                />
                                Back
                            </Button>
                        </Box>
                    </Box>
                </Tooltip>
                <Container>
                    <Pagination
                        pages={project.images.length}
                        active={index}
                        onChange={setIndex}
                    />
                    <Box className={classes.content}>
                        <div className="tw-flex tw-flex-col tw-gap-8 tw-p-8">
                            <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                <div className="tw-flex tw-gap-6 tw-items-center">
                                    <Typography variant="h4" gutterBottom>
                                        {project.name}
                                    </Typography>
                                    {typeof project.status !== 'undefined' &&
                                        statusTag(project.status)}
                                </div>
                                <Typography
                                    variant="subtitle1"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    {project.punchline}
                                </Typography>
                            </div>
                            <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                <Markdown source={project.description} />
                            </div>
                            {submissionFormAnswersArray?.length > 0 &&
                                submissionFormAnswersArray.map(
                                    (section, index) => {
                                        if (section.answers?.length > 0) {
                                            return (
                                                <div
                                                    className="tw-flex tw-flex-col tw-gap-6 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md"
                                                    key={index}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                        className={
                                                            classes.sectionTitle
                                                        }
                                                    >
                                                        {section.section}
                                                    </Typography>
                                                    {section.answers.length >
                                                        0 &&
                                                        section.answers.map(
                                                            (answer, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="tw-flex tw-flex-col tw-gap-2"
                                                                >
                                                                    <Typography variant="h6">
                                                                        {
                                                                            answer.question
                                                                        }
                                                                    </Typography>
                                                                    {answer.fieldType ===
                                                                    'attachment' ? (
                                                                        <div>
                                                                            <button
                                                                                className="tw-p-2 tw-rounded-sm tw-bg-white tw-border-solid tw-border tw-border-gray-300"
                                                                                onClick={() =>
                                                                                    downloadFile(
                                                                                        answer.value,
                                                                                    )
                                                                                }
                                                                            >
                                                                                Download{' '}
                                                                                {extractFileDetails(
                                                                                    answer.value,
                                                                                    'filename',
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            {answer.fieldType ===
                                                                            'link' ? (
                                                                                <a
                                                                                    href={
                                                                                        answer.value
                                                                                    }
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    {
                                                                                        answer.value
                                                                                    }
                                                                                </a>
                                                                            ) : (
                                                                                <Typography variant="subtitle1">
                                                                                    {
                                                                                        answer.value
                                                                                    }
                                                                                </Typography>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            ),
                                                        )}
                                                </div>
                                            )
                                        }
                                    },
                                )}
                            {showTableLocation && project.location && (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                    <Typography
                                        variant="h6"
                                        className={classes.sectionTitle}
                                    >
                                        Location
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {project.location}
                                    </Typography>
                                </div>
                            )}
                            {project.video ? (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                    <Typography
                                        variant="h6"
                                        className={classes.sectionTitle}
                                    >
                                        video
                                    </Typography>
                                    <a
                                        href={project.video}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {project.video}
                                    </a>
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
                                            onReady={() =>
                                                console.log('onReady')
                                            }
                                            onStart={() =>
                                                console.log('onStart')
                                            }
                                            onBuffer={() =>
                                                console.log('onBuffer')
                                            }
                                            onSeek={e =>
                                                console.log('onSeek', e)
                                            }
                                            onError={e =>
                                                console.log('onError', e)
                                            }
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                    <Typography
                                        variant="h6"
                                        className={classes.sectionTitle}
                                    >
                                        video
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        No video available
                                    </Typography>
                                </div>
                            )}

                            {project.demo ? (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
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
                                </div>
                            ) : (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                    <Typography
                                        variant="h6"
                                        className={classes.sectionTitle}
                                    >
                                        Demo
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        No demo available
                                    </Typography>
                                </div>
                            )}
                            {!project.sourcePublic ? (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                    <Typography
                                        variant="h6"
                                        className={classes.sectionTitle}
                                    >
                                        Source code
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Source code not public
                                    </Typography>
                                </div>
                            ) : (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
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
                                </div>
                            )}
                            {event && project.track && (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                    <Typography
                                        variant="h6"
                                        className={classes.sectionTitle}
                                    >
                                        Track
                                    </Typography>
                                    {renderTrack()}
                                </div>
                            )}
                            {event && project.challenges.length > 0 && (
                                <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
                                    <Typography
                                        variant="h6"
                                        className={classes.sectionTitle}
                                    >
                                        Challenges
                                    </Typography>
                                    {renderChallenges()}
                                </div>
                            )}
                            <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-bg-white tw-rounded-md tw-shadow-md">
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
                            </div>
                        </div>
                    </Box>
                    <Box height={200} />
                </Container>
            </Box>
        </>
    )
}

export default ProjectDetail
