import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core'

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
                    style={{ width: '100%', height: '500px', border: 'none' }}
                    title="Event Preview"
                />
            </DialogContent>
            <Button onClick={onClose} color="primary" variant="contained">
                Close
            </Button>
        </Dialog>
    )
}