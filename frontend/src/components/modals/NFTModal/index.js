import React from 'react'
import { Box } from '@material-ui/core'
import Modal from 'components/generic/Modal'

const NFT = require('assets/junction-nft.mp4')

const NFTModal = ({ open, onClose }) => {
    return (
        <Modal isOpen={open} handleClose={onClose} size="max">
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
        </Modal>
    )
}

export default NFTModal
