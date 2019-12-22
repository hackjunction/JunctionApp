import React from 'react'
import QRCode from 'qrcode.react'

import { Box, Typography } from '@material-ui/core'

import Modal from 'components/generic/Modal'

const QRCodeModal = ({ open, onClose, value, title, message }) => {
    return (
        <Modal isOpen={open} handleClose={onClose} size="max">
            <Box
                p={5}
                display="flex"
                height="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4" paragraph>
                    {title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    {message}
                </Typography>
                <QRCode value={value} size={300} />
            </Box>
        </Modal>
    )
}

export default QRCodeModal
