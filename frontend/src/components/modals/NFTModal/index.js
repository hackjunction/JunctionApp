import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Modal from 'components/generic/Modal'

const NFTModal = ({ open, onClose }) => {
    return (
        <Modal title="EKEKEK" isOpen={open} handleClose={onClose} size="max">
            <p>hello world</p>
        </Modal>
    )
}

export default NFTModal
