import React, { useCallback, useState } from 'react'

import { goBack } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, lighten } from '@material-ui/core/styles'
import { Button as MuiButton, IconButton, Tooltip } from '@material-ui/core'

import StarIcon from '@material-ui/icons/Star'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import * as UserSelectors from 'redux/user/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'

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
    socialIcon: {
        color: theme.palette.primary.main,
        width: 'auto',
        margin: '1rem',
        cursor: 'pointer',
    },
}))

export default ({ user = {} }) => {
    const dispatch = useDispatch()
    const actionHistory = useSelector(RecruitmentSelectors.actionHistory)
    const isFavorite =
        actionHistory.filter(
            action => action.user === user.userId && action.type === 'favorite',
        ).length !== 0

    // Toggle favorited state locally for instant feedback on favorite action
    const [_isFavorite, setIsFavorite] = useState(isFavorite)
    const classes = useStyles({ isFavorite: _isFavorite })
    const eventId = useSelector(DashboardSelectors.event)._id
    const recEvents = useSelector(UserSelectors.userProfileRecruiterEvents)

    const handleFavorite = useCallback(async () => {
        const organisation = recEvents.find(e => {
            return e.eventId === eventId
        }).organisation
        setIsFavorite(!_isFavorite)
        const { error } = await dispatch(
            RecruitmentActions.toggleFavorite(
                user.userId,
                _isFavorite,
                organisation,
                eventId,
            ),
        )
        if (error) {
            dispatch(SnackbarActions.error('Something went wrong...'))
            setIsFavorite(_isFavorite)
        }
    }, [_isFavorite, dispatch, user.userId])
    return (
        <div className="tw-flex tw-justify-between tw-items-center">
            <MuiButton onClick={() => dispatch(goBack())}>
                <ArrowBackIosIcon style={{ fontSize: '16px' }} />
                Back
            </MuiButton>
            <Tooltip
                title={
                    isFavorite ? 'Remove from favorites' : 'Add to favorites'
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
        </div>
    )
}
