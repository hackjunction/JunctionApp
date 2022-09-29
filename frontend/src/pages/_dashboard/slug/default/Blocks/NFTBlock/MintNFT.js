import React from 'react'
import * as WalletSelectors from 'redux/wallet/selectors'
import { Box, Button, Typography } from '@material-ui/core'
import { CTAButton } from './CTAButton'
import { useMinter } from 'flow/hooks/useMinter'
import { useSelector } from 'react-redux'

const MintNFT = ({ handleLogout, onComplete, onFinalized }) => {
    const { handleMint } = useMinter({ onComplete, onFinalized })
    const walletAddress = useSelector(WalletSelectors.address)

    return (
        <>
            <Typography variant="h4">Mint your NFT</Typography>
            <Typography variant="h6">
                You've connected the wallet, and can start minting the NFT.
            </Typography>
            <Typography variant="body1">Address: {walletAddress}</Typography>
            <Box mt={2} display="flex" alignItems="center">
                <CTAButton label="Mint NFT" onClick={handleMint} />
                <Button
                    variant="text"
                    onClick={handleLogout}
                    color="primary"
                    size="small"
                >
                    Disconnect
                </Button>
            </Box>
        </>
    )
}

export default MintNFT
