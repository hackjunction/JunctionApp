import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Avatar,
    Box,
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
import Tag from 'components/generic/Tag'
import theme from 'material-ui-theme'
import Filter from 'components/Team/Filter'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
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
    score = null,
    message = null,
    showTags = false,
    showReviewers = false,
}) => {
    const [openReviewModal, setOpenReviewModal] = useState(false)
    const isVotingPast = EventHelpers.isVotingPast(event, moment)
    const isVotingOpen = EventHelpers.isVotingOpen(event, moment)
    const isEventOver = EventHelpers.isEventOver(event, moment)
    const classes = useStyles({ labelBackground })
    const previewImage =
        project.images.length > 0 ? project.images[0].publicId : ''

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
        if (score && score > 0 && (isVotingPast || isEventOver)) {
            return <Chip color="primary" label="Reviewed" />
        } else if (isVotingOpen) {
            return <Chip color="secondary" label="Open for review" />
        } else if (score && score === 0 && isEventOver) {
            return <Chip color="secondary" label="Not reviewed" />
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
                                        label={challenge.replaceAll('-', ' ')}
                                    />
                                ))}
                            </div>
                            <Typography variant="body1" component="p">
                                {_.truncate(project.punchline, { length: 30 })}
                            </Typography>
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
                        <div className="tw-flex tw-gap-2">
                            <Typography
                                style={{ fontWeight: 'bold' }}
                                variant="body1"
                            >
                                Table Location:
                            </Typography>
                            <Typography variant="body1">
                                Wathever is this
                            </Typography>
                        </div>
                        {score && (
                            <div className="tw-flex tw-flex-col tw-gap-2">
                                <div className="tw-flex tw-gap-2">
                                    <Typography
                                        className="tw-font-semibold"
                                        variant="body1"
                                        component="p"
                                    >
                                        Score
                                    </Typography>
                                    <Typography variant="body1">
                                        {score}
                                    </Typography>
                                </div>
                                <Typography variant="body1">
                                    {_.truncate(message, { length: 20 })}
                                </Typography>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardActions className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-4 tw-pb-4 tw-pt-0 tw-gap-4">
                    <div className="tw-flex tw-gap-2">
                        {onClickMore && (
                            <Button
                                onClick={onClickMore}
                                color="outlined_button"
                                variant="jOutlined"
                            >
                                Show more
                            </Button>
                        )}
                        {showReviewers && (
                            <Button
                                onClick={() => setOpenReviewModal(true)}
                                color="outlined_button"
                                variant="jOutlined"
                            >
                                Read reviews
                            </Button>
                        )}
                    </div>
                    {showReviewers && project?.reviewers?.length > 0 && (
                        <div className="tw-flex tw-gap-1 tw-w-full">
                            {project?.score && project.score > 0 && (
                                <Tooltip title="Reviewed by Organizer">
                                    <Avatar>O</Avatar>
                                </Tooltip>
                            )}
                            {project.reviewers.map((reviewer, index) => {
                                if (index === reviewIndexLimit) {
                                    return (
                                        <Tooltip
                                            key={index}
                                            title={`Reviewed by ${
                                                project.reviewers.length - 1
                                            } more ${
                                                project.reviewers.length - 1 > 1
                                                    ? 'people'
                                                    : 'person'
                                            }`}
                                        >
                                            <Avatar>
                                                +{project.reviewers.length - 1}
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
                            })}
                        </div>
                    )}
                </CardActions>
            </Card>
            {showReviewers && (
                <ProjectReviewModal
                    open={openReviewModal}
                    onClose={() => setOpenReviewModal(false)}
                    projectScoreData={project}
                />
            )}
        </Grid>
    )
}

export default ProjectsGridItem
