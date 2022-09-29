import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import NFTModal from 'components/modals/NFTModal'
import { CTAButton } from './CTAButton'

const Showcase = ({ transactionId }) => {
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const openFlowscan = async () => {
        window.open(
            `https://testnet.flowscan.org/tx/${transactionId}`,
            '_blank',
        )
    }

    return (
        <>
            <Typography variant="h4">Congratulations! 🎉</Typography>
            <Typography variant="h6">You've minted your NFT</Typography>
            <Typography variant="body1">
                Here you can view it and see the transaction details:
            </Typography>
            <Box display="flex" mt={2} alignItems="center">
                <CTAButton label="View NFT" onClick={openModal} />
                <CTAButton label="View Transaction" onClick={openFlowscan} />
            </Box>
            <NFTModal open={open} onClose={closeModal} />
        </>
    )
}

export default Showcase
