import React, { useState, useCallback } from 'react';

import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress
} from '@material-ui/core';

import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import Button from 'components/generic/Button';

import * as RecruitmentActions from 'redux/recruitment/actions';

const RevokeAccessDialog = ({ userId, onClose, onSubmit, enqueueSnackbar }) => {
    const [loading, setLoading] = useState(false);

    const handleRevokeAccess = useCallback(async () => {
        setLoading(true);
        try {
            await onSubmit(userId);
            enqueueSnackbar('Success!', { variant: 'success' });
            onClose();
        } catch (e) {
            enqueueSnackbar('Something went wrong...', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    }, [onSubmit, onClose, userId, enqueueSnackbar]);

    return (
        <Dialog open={typeof userId !== 'undefined'} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Revoke access to recruitment</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This means the selected user will no longer be able to access the recruitment dashboard
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {loading ? (
                    <Box p={1}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <React.Fragment>
                        <Button strong onClick={onClose} color="theme_white" variant="contained">
                            Cancel
                        </Button>
                        <Button strong onClick={handleRevokeAccess} color="secondary">
                            Revoke access
                        </Button>
                    </React.Fragment>
                )}
            </DialogActions>
        </Dialog>
    );
};

const mapDispatch = dispatch => ({
    onSubmit: userId => dispatch(RecruitmentActions.adminRevokeRecruiterAccess(userId))
});

export default withSnackbar(
    connect(
        null,
        mapDispatch
    )(RevokeAccessDialog)
);
