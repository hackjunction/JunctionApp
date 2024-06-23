import React, { useState } from 'react'
import { find, filter } from 'lodash-es'
import { Box, Typography, Button, Tooltip } from '@mui/material'
import { SwipeableViews } from 'components/animated/SwipeableViews'
import Image from 'components/generic/Image'
import Container from 'components/generic/Container'
import Markdown from 'components/generic/Markdown'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import config from 'constants/config'
import { Helmet } from 'react-helmet'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import * as DashboardActions from 'reducers/dashboard/actions'
import ProjectTeam from './ProjectTeam'
import Pagination from './Pagination'
import Tag from 'components/generic/Tag'

const ProjectDetail = ({
    project,
    event,
    onBack,
    showTableLocation,
    showFullTeam,
}) => {
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
                return null
            })

            submissionFormAnswersArray.push(sectionGroup)
            return null
        })
    }

    const statusTag = status => {
        switch (status) {
            case 'final':
                return <Tag label="Final" color="bg-primary-main" />
            case 'draft':
                return <Tag label="Draft" color="bg-secondary-main" />
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

            <Box className="w-full relative">
                <Tooltip title={pause ? 'Click to pause' : 'Click to play'}>
                    <Box className="relative" onClick={() => setPause(!pause)}>
                        <SwipeableViews
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
                                        className="w-full pt-1/2 relative overflow-hidden bg-black lg:pt-[calc(100%*2)]"
                                    >
                                        <Image
                                            className="absolute top-0 left-0 w-full h-full bg-black object-contain"
                                            publicId={image.publicId}
                                            defaultImage={require('assets/images/default_cover_image.png')}
                                        />
                                    </Box>
                                ))
                            ) : (
                                <Box className="bg-black p-2 flex flex-col items-center hover:opacity-60">
                                    <Image
                                        className="w-full max-w-lg"
                                        publicId={event?.coverImage?.logo}
                                        defaultImage={require('assets/images/default_cover_image.png')}
                                    />
                                </Box>
                            )}
                        </SwipeableViews>
                        <Box className="bg-black absolute top-0 left-0">
                            <Button onClick={onBack} className="text-white">
                                <ArrowBackIosIcon className="text-xs" />
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
                    <Box className="mt-5">
                        <div className="flex flex-col gap-8 p-8">
                            <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                <div className="flex gap-6 items-center">
                                    <Typography variant="h4" gutterBottom>
                                        {project.name}
                                    </Typography>
                                    {typeof project.status !== 'undefined' &&
                                        statusTag(project.status)}
                                </div>
                                <Typography
                                    variant="subtitle1"
                                    className="font-bold"
                                >
                                    {project.punchline}
                                </Typography>
                            </div>
                            <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                <Markdown source={project.description} />
                            </div>
                            {submissionFormAnswersArray?.length > 0 &&
                                submissionFormAnswersArray.map(
                                    (section, index) => {
                                        if (section.answers?.length > 0) {
                                            return (
                                                <div
                                                    className="flex flex-col gap-6 p-4 bg-white rounded-md shadow-md"
                                                    key={index}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        className="font-bold uppercase"
                                                    >
                                                        {section.section}
                                                    </Typography>
                                                    {section.answers.length >
                                                        0 &&
                                                        section.answers.map(
                                                            (answer, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex flex-col gap-2"
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
                                                                                className="p-2 rounded-sm bg-white border border-gray-300"
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
                                                                        <Typography variant="subtitle1">
                                                                            {
                                                                                answer.value
                                                                            }
                                                                        </Typography>
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
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
                                    >
                                        Location
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {project.location}
                                    </Typography>
                                </div>
                            )}
                            {project.video ? (
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
                                    >
                                        Video
                                    </Typography>
                                    <a
                                        href={project.video}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {project.video}
                                    </a>
                                    <div className="relative h-90">
                                        <ReactPlayer
                                            url={project.video}
                                            className="absolute top-0 left-0"
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
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
                                    >
                                        Video
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        No video available
                                    </Typography>
                                </div>
                            )}

                            {project.demo ? (
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
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
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
                                    >
                                        Demo
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        No demo available
                                    </Typography>
                                </div>
                            )}
                            {!project.sourcePublic ? (
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
                                    >
                                        Source code
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Source code not public
                                    </Typography>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
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
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
                                    >
                                        Track
                                    </Typography>
                                    {renderTrack()}
                                </div>
                            )}
                            {event && project.challenges.length > 0 && (
                                <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                    <Typography
                                        variant="h6"
                                        className="uppercase"
                                    >
                                        Challenges
                                    </Typography>
                                    {renderChallenges()}
                                </div>
                            )}
                            <div className="flex flex-col gap-2 p-4 bg-white rounded-md shadow-md">
                                <Typography variant="h6" className="uppercase">
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
