import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import Button from 'components/generic/Button'

export default ({ open, onClose, eventSlug }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            open={open}
            onClose={onClose}
            aria-labelledby="preview-modal-title"
        >
            <DialogTitle id="preview-modal-title">Event Preview</DialogTitle>
            <DialogContent>
                <iframe
                    src={`/events/${eventSlug}?preview=true`}
                    style={{ width: '100%', height: '80vh', border: 'none' }}
                    title="Event Preview"
                />
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}