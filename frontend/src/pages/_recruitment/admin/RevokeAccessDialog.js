import React, { useState, useCallback } from 'react'

import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
} from '@material-ui/core'

import { useDispatch } from 'react-redux'

import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'

import * as RecruitmentActions from 'redux/recruitment/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

export default ({ userId, onClose }) => {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleRevokeAccess = useCallback(async () => {
        setLoading(true)
        try {
            await dispatch(
                RecruitmentActions.adminRevokeRecruiterAccess(userId)
            )
            dispatch(SnackbarActions.success('Success!'))
            onClose()
        } catch (e) {
            dispatch(SnackbarActions.error('Something went wrong...'))
        } finally {
            setLoading(false)
        }
    }, [dispatch, userId, onClose])

    return (
        <Dialog
            open={typeof userId !== 'undefined'}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {t('Revoke_access_recruitment_')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('Revoke_access_desc_')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {loading ? (
                    <Box p={1}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <>
                        <Button
                            strong
                            onClick={onClose}
                            color="theme_white"
                            variant="contained"
                        >
                            {t('Cancel_')}
                        </Button>
                        <Button
                            strong
                            onClick={handleRevokeAccess}
                            color="secondary"
                        >
                            {t('Revoke_access_')}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    )
}
