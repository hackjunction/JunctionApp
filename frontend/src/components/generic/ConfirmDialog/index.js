import React, { useCallback } from 'react'

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core'

const ConfirmDialog = ({
    open,
    onClose = () => {},
    onCancel = () => {},
    onOk = () => {},
    title,
    message,
    cancelText = 'Cancel',
    okText = 'OK',
}) => {
    const handleCancel = useCallback(() => {
        onClose()
        onCancel()
    }, [onClose, onCancel])

    const handleOk = useCallback(() => {
        onClose()
        onOk()
    }, [onClose, onOk])

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>{cancelText}</Button>
                <Button onClick={handleOk} color="primary" variant="contained">
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
