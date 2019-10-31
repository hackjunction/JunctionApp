import React, { useState, useCallback } from 'react';

import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Box,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import TextInput from 'components/inputs/TextInput';
import Select from 'components/inputs/Select';
import Button from 'components/generic/Button';

import * as AuthSelectors from 'redux/auth/selectors';
import UserProfilesService from 'services/userProfiles';

const useStyles = makeStyles(theme => ({
    wrapper: {
        padding: theme.spacing(2),
        background: 'white'
    },
    dialogContent: {
        minHeight: '300px'
    }
}));

const SearchResults = ({ events, results, loading, idToken, enqueueSnackbar }) => {
    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState();
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [selectedOrganisation, setSelectedOrganisation] = useState();
    const [editLoading, setEditLoading] = useState(false);
    const [revokingUser, setRevokingUser] = useState();

    const handleGrantAccess = useCallback(() => {
        setEditLoading(true);
        UserProfilesService.updateRecruiter(idToken, selectedUser.userId, selectedEvents, selectedOrganisation)
            .then(() => {
                enqueueSnackbar('Success!', { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong...', { variant: 'error' });
            })
            .finally(() => {
                setSelectedUser();
                setEditLoading(false);
            });
    }, [idToken, selectedUser, selectedEvents, selectedOrganisation, enqueueSnackbar]);

    const handleRevokeAccess = useCallback(() => {
        setEditLoading(true);
        UserProfilesService.updateRecruiter(idToken, revokingUser.userId, [], '')
            .then(() => {
                enqueueSnackbar('Success!', { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong...', { variant: 'error' });
            })
            .finally(() => {
                setRevokingUser();
                setEditLoading(false);
            });
    }, [idToken, revokingUser, enqueueSnackbar]);

    if (loading) {
        return (
            <Box padding={2} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size={24} />
            </Box>
        );
    }
    if (results) {
        if (results.length === 0) {
            return (
                <Box padding={2} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="subtitle1">No results</Typography>
                </Box>
            );
        }

        return (
            <Box className={classes.wrapper}>
                <Dialog
                    open={typeof selectedUser !== 'undefined'}
                    onClose={() => setSelectedUser(undefined)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Grant access to recruitment</DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <DialogContentText>Which events should this recruiter have access to?</DialogContentText>
                        <Select
                            label="Choose events"
                            value={selectedEvents}
                            onChange={setSelectedEvents}
                            isMulti={true}
                            options={[
                                {
                                    label: 'Junction 2019',
                                    value: 'junction-2019'
                                },
                                {
                                    label: 'Junction 2019 Community Challenge',
                                    value: 'junction-2019-cc'
                                }
                            ]}
                        />
                        <Box mt={3} />
                        <DialogContentText>Which organisation does this recruiter belong to?</DialogContentText>
                        <TextInput
                            value={selectedOrganisation}
                            onChange={setSelectedOrganisation}
                            label="Organisation"
                            placeholder="BigCorp Ltd."
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setSelectedUser(undefined)}
                            strong
                            color="theme_white"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Box p={1} />
                        <Button
                            disabled={editLoading || !selectedOrganisation || selectedEvents.length === 0}
                            strong
                            onClick={handleGrantAccess}
                            color="primary"
                        >
                            Grant access
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={typeof revokingUser !== 'undefined'}
                    onClose={() => setSelectedUser(undefined)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Revoke access to recruitment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This means the selected user will no longer be able to access the recruitment dashboard
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            strong
                            onClick={() => setRevokingUser(undefined)}
                            color="theme_white"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button strong onClick={handleRevokeAccess} color="secondary">
                            Revoke access
                        </Button>
                    </DialogActions>
                </Dialog>
                <List>
                    {results.map(user => (
                        <ListItem>
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
                            <ListItemSecondaryAction>
                                {user.recruiterEvents && user.recruiterEvents.length > 0 ? (
                                    <Button color="secondary" onClick={() => setRevokingUser(user)}>
                                        Revoke access
                                    </Button>
                                ) : (
                                    <Button color="primary" onClick={() => setSelectedUser(user)}>
                                        Grant access
                                    </Button>
                                )}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }

    return null;
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state)
});

export default withSnackbar(connect(mapState)(SearchResults));
