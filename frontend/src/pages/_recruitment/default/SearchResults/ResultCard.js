import React, { useCallback, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { findIndex } from 'lodash-es'
import { push } from 'connected-react-router'
import {
    Avatar,
    Paper,
    Typography,
    Box,
    Tooltip,
    IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { KeyboardArrowDown } from '@material-ui/icons/'
import StarIcon from '@material-ui/icons/Star'

import { sortBy } from 'lodash-es'
import SkillRating from './SkillRating'
import emblem_black from 'assets/logos/emblem_black.png'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        backgroundColor: '#FBFBFB',
        display: 'flex',
        flexDirection: 'column',

        '&:hover': {
            boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
            cursor: 'pointer',
        },
    },
    avatar: {
        margin: '15px auto',
        width: 100,
        height: 100,
    },
    name: {
        textAlign: 'center',
        fontSize: '1.15rem',
        lineHeight: 1.2,
    },
    country: {
        textAlign: 'center',
    },
    topWrapper: {
        minHeight: '75px',
    },
    bottomWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        height: '3rem',
    },
    button: {
        marginTop: 'auto',
    },
    iconRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.spacing(2),
    },
    iconLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: theme.spacing(1),
    },
    favoriteIcon: ({ isFavorite }) => ({
        transition: 'color 0.2s ease',
        color: isFavorite
            ? theme.palette.secondary.light
            : theme.palette.text.secondary,
    }),
}))

export default React.memo(
    ({ data }) => {
        console.log("result card data: ",data)
        const dispatch = useDispatch()
        const actionHistoryByUser = useSelector(
            RecruitmentSelectors.actionHistoryByUser,
        )
        const userHistory = actionHistoryByUser[data.userId] ?? []
        const isFavorite =
            findIndex(userHistory, action => action.type === 'favorite') !== -1

        // Toggle the favorited state locally for immediate feedback on favorite action
        const [_isFavorite, setIsFavorite] = useState(isFavorite)
        const classes = useStyles({ isFavorite: _isFavorite })

        useEffect(() => {
            setIsFavorite(isFavorite)
        }, [isFavorite])

        const handleFavorite = useCallback(
            async e => {
                e.stopPropagation()
                setIsFavorite(!_isFavorite)
                dispatch(
                    RecruitmentActions.toggleFavorite(data.userId, _isFavorite),
                ).then(({ error }) => {
                    if (error) {
                        dispatch(
                            SnackbarActions.error('Something went wrong...'),
                        )
                        setIsFavorite(_isFavorite)
                    }
                })
            },
            [_isFavorite, data.userId, dispatch],
        )

        return (
            <Paper
                className={classes.root}
                onClick={() => dispatch(push(`/recruitment/${data.userId}`))}
            >
                <Box className={classes.iconRight}>
                    <Tooltip
                        title={
                            _isFavorite
                                ? 'Remove from favorites'
                                : 'Add to favorites'
                        }
                    >
                        <IconButton onClick={handleFavorite}>
                            <StarIcon className={classes.favoriteIcon} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <div style={{ flex: 1 }}>
                    <Avatar
                        className={classes.avatar}
                        alt="Profile Picture"
                        src={data.profile.profilePicture}
                        imgProps={{
                            onError: e => {
                                e.target.src = emblem_black
                            },
                        }}
                    />
                    <Box className={classes.topWrapper} mb={1}>
                        <Typography className={classes.name} variant="h6">
                            {data.profile.firstName} {data.profile.lastName}
                        </Typography>
                        <Typography
                            className={classes.country}
                            variant="subtitle1"
                            display="block"
                        >
                            {data.profile.countryOfResidence}
                        </Typography>
                    </Box>

                    <Box>
                        {sortBy(data.skills, skill => -1 * skill.level)
                            .map(item => (
                                <SkillRating
                                    data={item}
                                    key={item.skill}
                                    small
                                />
                            ))
                            .slice(0, 3)}
                    </Box>
                </div>
                <Box className={classes.bottomWrapper}>
                    <KeyboardArrowDown
                        className={classes.button}
                        fontSize="large"
                        color="secondary"
                    />
                </Box>
            </Paper>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.isFavorite !== nextProps.isFavorite) {
            return false
        }
        if (prevProps.data.userId !== nextProps.data.userId) {
            return false
        }
        // If the above didn't change, no need to render again
        return true
    },
)
