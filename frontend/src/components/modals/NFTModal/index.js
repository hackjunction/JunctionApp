import React from 'react'
import { Box, Typography } from '@material-ui/core'
import Modal from 'components/generic/Modal'

const NFT = require('assets/junction-nft.mp4')

const NFTModal = ({ open, onClose }) => {
    return (
        <Modal isOpen={open} handleClose={onClose} size="max">
            <Box p={3} display="flex" alignItems="center">
                <video
                    autoPlay
                    playsInline
                    muted
                    loop
                    id="video"
                    preload="auto"
                    style={{ height: '80vh' }}
                    src={NFT}
                >
                    <source src={NFT} type="video/mp4"></source>
                </video>
            </Box>
        </Modal>
    )
}

export default NFTModal
