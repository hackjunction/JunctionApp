import React, { useCallback, useState } from 'react';

import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Typography,
    CircularProgress,
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
    DialogActions
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from 'components/generic/Button';

import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';
import * as AuthSelectors from 'redux/auth/selectors';

const useStyles = makeStyles(theme => ({
    textHighlight: {
        color: theme.palette.primary.main
    },
    list: {
        backgroundColor: theme.palette.theme_white.main
    },
    listItemName: {
        fontWeight: 'bold'
    }
}));

const EditTeam = ({
    team,
    user,
    event,
    teamMemberProfiles,
    teamMemberProfilesLoading,
    enqueueSnackbar,
    leaveTeam,
    deleteTeam,
    removeMemberFromTeam
}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const isTeamOwner = team.owner === user.sub;

    const handleLeave = useCallback(() => {
        setLoading(true);
        leaveTeam(event.slug, team.code)
            .then(() => {
                enqueueSnackbar('Left team ' + team.code, { variant: 'success' });
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong... please try again.', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [event.slug, leaveTeam, team.code, enqueueSnackbar]);

    const handleDelete = useCallback(() => {
        setLoading(true);
        deleteTeam(event.slug)
            .then(() => {
                enqueueSnackbar('Deleted team ' + team.code, { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong... please try again.', { variant: 'error' });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [deleteTeam, event.slug, team.code, enqueueSnackbar]);

    const handleRemoveMember = useCallback(
        userId => {
            setLoading(true);
            removeMemberFromTeam(event.slug, team.code, userId)
                .then(() => {
                    enqueueSnackbar('Removed team member', { variant: 'success' });
                })
                .catch(() => {
                    enqueueSnackbar('Something went wrong... please try again.', { variant: 'error' });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [event.slug, removeMemberFromTeam, team.code, enqueueSnackbar]
    );

    return (
        <Box>
            <Typography variant="h5">
                Your team code is <span className={classes.textHighlight}>{team.code}</span>
            </Typography>
            <Typography variant="body1">
                Share this code with people you want to invite, and they'll be able to join your team.
            </Typography>
            <Box mt={5} />
            <Typography variant="h5" gutterBottom>
                Your team
            </Typography>
            <List className={classes.list}>
                {teamMemberProfiles.map((profile, index) => [
                    index !== 0 ? <Divider variant="inset" component="li" key={profile.userId + '_divider'} /> : null,
                    <ListItem key={profile.userId}>
                        <ListItemAvatar>
                            <Avatar alt={`${profile.firstName} ${profile.lastName}`} src={profile.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography className={classes.listItemName} variant="subtitle1">{`${
                                    profile.firstName
                                } ${profile.lastName} ${team.owner === profile.userId ? '(Owner)' : ''}`}</Typography>
                            }
                            secondary={<Typography variant="body2">{profile.email}</Typography>}
                        />
                        {isTeamOwner && profile.userId !== user.sub && (
                            <ListItemSecondaryAction>
                                <Tooltip title="Remove from team">
                                    <IconButton
                                        onClick={() => handleRemoveMember(profile.userId)}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        )}
                    </ListItem>
                ])}
            </List>
            <Box mt={5} />
            <Typography variant="h5" gutterBottom>
                Actions
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
                            Delete team
                        </Button>
                        <Dialog
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    You won't be able to recover this team after deleting it (but you can always create
                                    a new one).
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDeleteDialogOpen(false)}>I've changed my mind</Button>
                                <Button onClick={handleDelete} color="error" autoFocus>
                                    Yes, delete it
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                ) : (
                    <Box mr={1} mb={1}>
                        <Button loading={loading} onClick={handleLeave} color="error" variant="contained">
                            Leave team
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const mapState = state => ({
    team: DashboardSelectors.team(state),
    user: AuthSelectors.getCurrentUser(state),
    event: DashboardSelectors.event(state),
    teamMemberProfiles: DashboardSelectors.profiles(state),
    teamMemberProfilesLoading: DashboardSelectors.profilesLoading(state)
});

const mapDispatch = dispatch => ({
    deleteTeam: (slug, code) => dispatch(DashboardActions.deleteTeam(slug, code)),
    lockTeam: (slug, code) => dispatch(DashboardActions.lockTeam(slug, code)),
    leaveTeam: (slug, code) => dispatch(DashboardActions.leaveTeam(slug, code)),
    removeMemberFromTeam: (slug, code, userId) => dispatch(DashboardActions.removeMemberFromTeam(slug, code, userId))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(EditTeam)
);
