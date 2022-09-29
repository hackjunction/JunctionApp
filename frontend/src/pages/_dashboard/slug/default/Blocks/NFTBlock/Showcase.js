import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import NFTModal from 'components/modals/NFTModal'
import { CTAButton } from './CTAButton'
import { useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'

const Showcase = () => {
    const registration = useSelector(DashboardSelectors.registration)
    const [open, setOpen] = useState(false)

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const openFlowscan = async () => {
        /* window.open(`https://flowscan.org/tx/${registration.txId}`, '_blank') */
        window.open(
            `https://testnet.flowscan.org/tx/c7d66bf3994802b57257c6425f3f434c4eb00b6f9c69028ecfcda891d1536a32`,
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
