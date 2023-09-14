import React, { useCallback, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    Divider,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from 'components/generic/Button'
import StatusBadge from 'components/generic/StatusBadge'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    textHighlight: {
        color: theme.palette.primary.main,
    },
    list: {
        backgroundColor: theme.palette.theme_white.main,
    },
    listItemName: {
        fontWeight: 'bold',
    },
}))

export default () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const team = useSelector(DashboardSelectors.team)
    const idTokenData = useSelector(AuthSelectors.idTokenData)
    const event = useSelector(DashboardSelectors.event)

    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const isTeamOwner = team.owner === idTokenData.sub
    const allTeamMembers = [team.owner].concat(team.members)

    const handleLeave = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.leaveTeam(event.slug, team.code))
            .then(() => {
                dispatch(SnackbarActions.success('Left team ' + team.code))
            })
            .catch(() => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... please try again.',
                    ),
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [event.slug, team.code, dispatch])

    const handleDelete = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.deleteTeam(event.slug))
            .then(() => {
                dispatch(SnackbarActions.success('Deleted team ' + team.code))
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... please try again.',
                    ),
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch, event.slug, team.code])

    const handleRemoveMember = useCallback(
        userId => {
            setLoading(true)
            dispatch(
                DashboardActions.removeMemberFromTeam(
                    event.slug,
                    team.code,
                    userId,
                ),
            )
                .then(() => {
                    dispatch(SnackbarActions.success('Removed team member'))
                })
                .catch(() => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... Please try again.',
                        ),
                    )
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, event.slug, team.code],
    )

    return (
        <Box>
            <Typography variant="h5">
                {t('Team_configure_')}{' '}
                <span className={classes.textHighlight}>{team.code}</span>
            </Typography>
            <Typography variant="body1">{t('Team_join_info_')}</Typography>
            <Box mt={5} />
            <Typography variant="h5" gutterBottom>
                {t('Team_your_')}
            </Typography>
            <List className={classes.list}>
                {allTeamMembers.map((userId, index) => {
                    const { profile, registration } = team.meta[userId]
                    return [
                        index !== 0 ? (
                            <Divider
                                variant="inset"
                                component="li"
                                key={profile.userId + '_divider'}
                            />
                        ) : null,
                        <ListItem key={profile.userId}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`${profile.firstName} ${profile.lastName}`}
                                    src={profile.avatar}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.listItemName}
                                        variant="subtitle1"
                                    >
                                        {`${profile.firstName} ${
                                            profile.lastName
                                        } ${
                                            team.owner === profile.userId
                                                ? '(Owner)'
                                                : ''
                                        }`}
                                    </Typography>
                                }
                                secondary={
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                    >
                                        <Typography variant="body2">
                                            {profile.email}
                                        </Typography>
                                        <Box mt={0.5} />
                                        <StatusBadge
                                            status={registration.status}
                                            hideSoftStatuses
                                        />
                                    </Box>
                                }
                            />
                            {isTeamOwner && profile.userId !== idTokenData.sub && (
                                <ListItemSecondaryAction>
                                    <Tooltip title="Remove from team">
                                        <IconButton
                                            onClick={() =>
                                                handleRemoveMember(
                                                    profile.userId,
                                                )
                                            }
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>,
                    ]
                })}
            </List>
            <Box mt={5} />
            <Typography variant="h5" gutterBottom>
                {t('Actions_')}
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
                {/* TODO: Enable making teams complete 
                
                {isTeamOwner && (
                    <Box mr={1} mb={1}>
                        <Button color="theme_turquoise" variant="contained">
                            Mark team as complete
                        </Button>
                    </Box>
                )} */}
                {isTeamOwner ? (
                    <Box mr={1} mb={1}>
                        <Button
                            loading={loading}
                            onClick={() => setDeleteDialogOpen(true)}
                            color="error"
                            variant="contained"
                        >
                            {t('Team_delete_')}
                        </Button>
                        <Dialog
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Are you sure?
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You won't be able to recover this team after
                                    deleting it (but you can always create a new
                                    one).
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={() => setDeleteDialogOpen(false)}
                                >
                                    I've changed my mind
                                </Button>
                                <Button
                                    onClick={handleDelete}
                                    color="error"
                                    autoFocus
                                >
                                    Yes, delete it
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                ) : (
                    <Box mr={1} mb={1}>
                        <Button
                            loading={loading}
                            onClick={handleLeave}
                            color="error"
                            variant="contained"
                        >
                            Leave team
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
