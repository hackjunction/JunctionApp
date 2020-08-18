import React, { useCallback, useState } from 'react'

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

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

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
        backgroundColor: 'rgba(40,103,178, 0.8)',
        '&:hover': {
            backgroundColor: 'rgba(40,103,178, 1)',
        },
    },
    portfolioIcon: {
        backgroundColor: lighten(theme.palette.secondary.main, 0.2),
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
    icon: {
        color: 'white',
    },
}))

export default ({ user = {} }) => {
    const dispatch = useDispatch()
    const actionHistory = useSelector(RecruitmentSelectors.actionHistory)
    const isFavorite =
        actionHistory.filter(
            action => action.user === user.userId && action.type === 'favorite'
        ).length !== 0

    //Toggle favorited state locally for instant feedback on favorite action
    const [_isFavorite, setIsFavorite] = useState(isFavorite)
    const classes = useStyles({ isFavorite: _isFavorite })
    const { profile = {}, social = {} } = user

    const handleFavorite = useCallback(async () => {
        setIsFavorite(!_isFavorite)
        const { error } = await dispatch(
            RecruitmentActions.toggleFavorite(user.userId, _isFavorite)
        )
        if (error) {
            dispatch(SnackbarActions.error('Something went wrong...'))
            setIsFavorite(_isFavorite)
        }
    }, [_isFavorite, dispatch, user.userId])

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.backButtonWrapper}>
                <MuiButton onClick={() => dispatch(goBack())}>
                    <ArrowBackIosIcon style={{ fontSize: '16px' }} />
                    Back
                </MuiButton>
            </Box>
            <Box className={classes.avatarWrapper}>
                <Avatar
                    style={{ height: '300px', width: '300px' }}
                    alt="Profile Picture"
                    src={profile.profilePicture}
                    imgProps={{
                        onError: e => {
                            e.target.src = emblem_black
                        },
                    }}
                />
                <Box className={classes.favoriteWrapper}>
                    <Tooltip
                        title={
                            isFavorite
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                        }
                        placement="right"
                    >
                        <IconButton
                            onClick={handleFavorite}
                            aria-label="favorite"
                            className={classes.margin}
                        >
                            <StarIcon
                                className={classes.favoriteIcon}
                                fontSize="large"
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box className={classes.nameWrapper}>
                <Typography variant="h6">{`${profile.firstName} ${profile.lastName}`}</Typography>
                <Typography variant="subtitle1">
                    {profile.countryOfResidence}
                </Typography>
                <Typography variant="subtitle1">{profile.headline}</Typography>
            </Box>
            <Box className={classes.linksWrapper}>
                {social.github && (
                    <Tooltip title="GitHub" placement="bottom">
                        <Box p={1}>
                            <IconButton
                                onClick={() =>
                                    window.open(social.github, '_blank')
                                }
                                aria-label="github"
                                className={classes.githubIcon}
                            >
                                <GitHubIcon
                                    className={classes.icon}
                                    fontSize="large"
                                />
                            </IconButton>
                        </Box>
                    </Tooltip>
                )}
                {social.linkedin && (
                    <Tooltip title="LinkedIn" placement="bottom">
                        <Box p={1}>
                            <IconButton
                                onClick={() =>
                                    window.open(social.linkedin, '_blank')
                                }
                                aria-label="linkedin"
                                className={classes.linkedinIcon}
                            >
                                <LinkedInIcon
                                    className={classes.icon}
                                    fontSize="large"
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
                                    window.open(social.portfolio, '_blank')
                                }
                                aria-label="portfolio"
                                className={classes.portfolioIcon}
                            >
                                <BrushIcon
                                    className={classes.icon}
                                    fontSize="large"
                                />
                            </IconButton>
                        </Box>
                    </Tooltip>
                )}
            </Box>
        </Box>
    )
}
