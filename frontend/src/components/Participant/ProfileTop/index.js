import React, { useCallback, useState } from 'react'
import _ from 'lodash'

import { goBack } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, lighten } from '@material-ui/core/styles'
import {
    Button as MuiButton,
    Avatar,
    Typography,
    Box,
    IconButton,
    Tooltip,
} from '@material-ui/core'

import StarIcon from '@material-ui/icons/Star'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import BrushIcon from '@material-ui/icons/Brush'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import emblem_black from 'assets/logos/emblem_black.png'
import { Email, LocationOn } from '@material-ui/icons'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import ParticipantPreview from 'components/Participant/ParticipantPreview'
import RecruitmentFavorites from 'components/Participant/RecruitmentFavorites'
import SocialLinks from 'components/generic/SocialLinks'
import Button from 'components/generic/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { popupCenter } from 'utils/misc'

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    backButtonWrapper: {
        alignSelf: 'stretch',
        marginTop: theme.spacing(1),
    },
    favoriteIcon: ({ isFavorite }) => ({
        transition: 'color 0.2s ease',
        color: isFavorite
            ? theme.palette.secondary.light
            : theme.palette.text.secondary,
    }),
    avatarWrapper: {
        padding: theme.spacing(2),
        position: 'relative',
    },
    favoriteWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    nameWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(2),
    },
    linksWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    githubIcon: {
        backgroundColor: 'rgba(33,31,31, 0.8)',
        '&:hover': {
            backgroundColor: 'rgba(33,31,31, 1)',
        },
    },
    linkedinIcon: {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.contrastText,
        },
    },
    portfolioIcon: {
        backgroundColor: lighten(theme.palette.secondary.main, 0.2),
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    icon: {
        color: theme.palette.primary.main,
        width: 'auto',
        margin: '1rem',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    },
}))

export default ({ user = {} }) => {
    const classes = useStyles()
    const { profile = {}, social = {} } = user
    return (
        <div className="tw-flex tw-flex-col tw-gap-2">
            <div className="tw-flex tw-flex-col tw-rounded-lg tw-shadow-md tw-bg-white">
                <div className="tw-w-full tw-h-32 tw-rounded-lg tw-bg-gradient-to-r tw-from-teal-400 tw-to-blue-500"></div>
                <div className="tw-px-8 tw-pt-0 tw-pb-8 tw-flex tw-flex-col tw-gap-2 tw-rounded-lg">
                    <ParticipantPreview viewMode="profile" userData={user} />
                    {/* {user.profile.countryOfResidence && (
                        <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                            <LocationOn />
                            <Typography
                                className="tw-text-lg"
                                variant="body1"
                                component="p"
                            >
                                {user.profile.countryOfResidence}
                            </Typography>
                        </div>
                    )} */}

                    {/* {!_.isEmpty(social) && ( */}
                    <div className="tw-flex tw-content-center tw-justify-start">
                        {social.github && (
                            <Tooltip title="GitHub" placement="bottom">
                                <Box p={1}>
                                    <IconButton
                                        onClick={() =>
                                            window.open(social.github, '_blank')
                                        }
                                        aria-label="github"
                                    >
                                        <GitHubIcon className={classes.icon} />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                        )}
                        {social.linkedin && (
                            <Tooltip title="LinkedIn" placement="bottom">
                                <Box p={1}>
                                    <IconButton
                                        onClick={() =>
                                            window.open(
                                                social.linkedin,
                                                '_blank',
                                            )
                                        }
                                        aria-label="linkedin"
                                    >
                                        <LinkedInIcon
                                            className={classes.icon}
                                        />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                        )}
                        {social.portfolio && (
                            <Tooltip title="Portfolio" placement="bottom">
                                <Box p={1}>
                                    <IconButton
                                        onClick={() =>
                                            window.open(
                                                social.portfolio,
                                                '_blank',
                                            )
                                        }
                                        aria-label="portfolio"
                                    >
                                        <BrushIcon className={classes.icon} />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                        )}
                        {/* {profile.email && (
                            <IconButton
                                aria-label="Email"
                                onClick={() =>
                                    popupCenter({
                                        url: `mailto:${profile.email}`,
                                        title: 'email',
                                    })
                                }
                            >
                                <Email className={classes.icon} />
                            </IconButton>
                        )} */}
                    </div>
                    {/* )} */}
                </div>
            </div>
        </div>
    )
}
