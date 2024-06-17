import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Tooltip,
    Typography,
} from '@material-ui/core'

import Image from 'components/generic/Image'
import Button from 'components/generic/Button'
import _ from 'lodash'
import { EventHelpers } from '@hackjunction/shared'
import moment from 'moment-timezone'

import ProjectReviewModal from 'components/modals/ProjectReviewModal'

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

const reviewIndexLimit = 2

const ProjectsGridItem = ({
    project,
    event,
    showTableLocation,
    onClickMore,
    label,
    labelBackground = 'primary',
    showTags = false,
    showReviewers = false,
    showScore = false,
    votingResults = null,
}) => {
    const [openReviewModal, setOpenReviewModal] = useState(false)
    const isReviewingOpen = EventHelpers.isReviewingOpen(event, moment)
    const isEventOver = EventHelpers.isEventOver(event, moment)
    const classes = useStyles({ labelBackground })
    const previewImage =
        project.images.length > 0 ? project.images[0].publicId : ''

    let score
    let message
    let messageCount = 0

    if (project?.scoreData) {
        score = project.scoreData?.averageScore
            ? project.scoreData?.averageScore
            : project.scoreData?.score

        if (project?.scoreData?.reviewers?.length > 0) {
            const findReviewMessages = () => {
                const returnArray = []
                const reviewMap = project?.scoreData?.reviewers?.map(
                    reviewer => {
                        if (reviewer?.message?.length > 0) {
                            returnArray.push(reviewer.message)
                        }
                    },
                )
                return returnArray
            }
            const feedbackMessages = findReviewMessages()
            if (feedbackMessages?.length > 0) {
                messageCount = feedbackMessages.length
                message = _.last(feedbackMessages)
            }
        }
    }

    const statusTag = status => {
        switch (status) {
            case 'final':
                return <Chip color="primary" label="Final" />
            case 'draft':
                return <Chip color="secondary" label="Draft" />
            default:
                return null
        }
    }

    const scoreTag = score => {
        if (score && score > 0) {
            return <Chip color="primary" label="Reviewed" />
        } else if (isReviewingOpen) {
            return <Chip color="secondary" label="Open for review" />
        } else if (score && score === 0 && isEventOver) {
            return <Chip color="secondary" label="Score unavailable" />
        }
    }

    const renderTags = () => {
        if (showTags && typeof project.status !== 'undefined') {
            return (
                <>
                    {statusTag(project.status)}
                    {scoreTag(score)}
                </>
            )
        }
    }

    const styling = {
        punchlineMaxLength: 150,
        challengeMaxLength: 30,
    }

    const stylingModifiers = styleRules => {
        if (showTableLocation) {
            styleRules.punchlineMaxLength = styleRules.punchlineMaxLength - 25
        }
        if (showScore) {
            styleRules.punchlineMaxLength = styleRules.punchlineMaxLength - 25
        }
        if (showReviewers) {
            styleRules.punchlineMaxLength = styleRules.punchlineMaxLength - 50
        }
    }

    stylingModifiers(styling)

    return (
        <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
            <Card
                className={`tw-bg-white tw-w-full tw-m-4 tw-text-left tw-rounded-lg tw-shadow-md tw-h-576px tw-flex tw-flex-col tw-justify-between`}
            >
                <CardContent className="tw-flex tw-flex-col tw-p-0">
                    <div className="tw-relative tw-w-full tw- tw-h-40 tw-rounded-lg tw-flex tw-justify-end tw-items-start">
                        <div className="tw-absolute tw-w-full">
                            <Image
                                className={
                                    previewImage
                                        ? classes.image
                                        : classes.placeholderImage
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
                            />
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-2 tw-p-4 tw-z-10">
                            {renderTags()}
                        </div>
                    </div>
                    <div className="tw-p-4 tw-flex tw-flex-col tw-gap-4">
                        <div className="tw-flex tw-flex-col tw-gap-2">
                            <Typography
                                className="tw-font-semibold"
                                variant="body1"
                                component="p"
                            >
                                {_.truncate(project.name, { length: 20 })}
                            </Typography>
                            <div className="tw-flex tw-gap-1">
                                {project.challenges.map((challenge, index) => (
                                    <Chip
                                        key={index}
                                        label={_.truncate(
                                            challenge.replaceAll('-', ' '),
                                            {
                                                length: styling.challengeMaxLength,
                                            },
                                        )}
                                    />
                                ))}
                            </div>
                            {project?.punchline && (
                                <Typography variant="body1" component="p">
                                    {_.truncate(project.punchline, {
                                        length: styling.punchlineMaxLength,
                                    })}
                                </Typography>
                            )}
                        </div>
                        {showTableLocation && project.location && (
                            <div className="tw-flex tw-gap-2">
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="body1"
                                >
                                    Table Location:
                                </Typography>
                                <Typography variant="body1">
                                    {project.location}
                                </Typography>
                            </div>
                        )}
                        {showScore && score && (
                            <div className="tw-flex tw-flex-col tw-gap-2">
                                <div className="tw-flex tw-gap-2">
                                    <Typography variant="body1">
                                        <strong>Score</strong> {score}
                                    </Typography>
                                </div>
                                {showReviewers && message && (
                                    <Typography variant="body1">
                                        <strong>Latest feedback</strong>{' '}
                                        {_.truncate(message, { length: 20 })}
                                    </Typography>
                                )}
                            </div>
                        )}
                        {votingResults && <>{votingResults}</>}
                    </div>
                </CardContent>
                <CardActions className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-4 tw-pb-4 tw-pt-0 tw-gap-4">
                    <div className="tw-flex tw-gap-2 tw-flex-col md:tw-flex-row ">
                        {onClickMore && (
                            <Button
                                onClick={onClickMore}
                                color="outlined_button"
                                variant="jOutlined"
                            >
                                Show more
                            </Button>
                        )}
                        {showReviewers && messageCount > 0 && (
                            <Button
                                onClick={() => setOpenReviewModal(true)}
                                color="outlined_button"
                                variant="jOutlined"
                            >
                                Read reviews {`(${messageCount})`}
                            </Button>
                        )}
                    </div>
                    {showReviewers && (
                        <div className="tw-flex tw-gap-1 tw-w-full">
                            {project?.scoreData?.reviewers?.map(
                                (reviewer, index) => {
                                    if (index === reviewIndexLimit) {
                                        return (
                                            <Tooltip
                                                key={index}
                                                title={`Reviewed by ${
                                                    project?.scoreData
                                                        ?.reviewers?.length - 1
                                                } more ${
                                                    project?.scoreData
                                                        ?.reviewers?.length -
                                                        1 >
                                                    1
                                                        ? 'people'
                                                        : 'person'
                                                }`}
                                            >
                                                <Avatar>
                                                    +
                                                    {project?.scoreData
                                                        ?.reviewers?.length - 1}
                                                </Avatar>
                                            </Tooltip>
                                        )
                                    } else if (index > reviewIndexLimit) {
                                        return null
                                    }
                                    return (
                                        <Tooltip
                                            key={index}
                                            title={`Reviewed by ${
                                                reviewer?.userFirstname
                                                    ? reviewer.userFirstname
                                                    : 'judge'
                                            }`}
                                        >
                                            {reviewer?.avatar ? (
                                                <Avatar src={reviewer.avatar} />
                                            ) : (
                                                <Avatar>
                                                    {reviewer?.userFirstname
                                                        ? reviewer?.userFirstname.charAt(
                                                              0,
                                                          )
                                                        : 'R'}
                                                </Avatar>
                                            )}
                                        </Tooltip>
                                    )
                                },
                            )}
                        </div>
                    )}
                </CardActions>
            </Card>
            {showReviewers && (
                <ProjectReviewModal
                    open={openReviewModal}
                    onClose={() => setOpenReviewModal(false)}
                    projectScoreData={project?.scoreData}
                />
            )}
        </Grid>
    )
}

export default ProjectsGridItem
