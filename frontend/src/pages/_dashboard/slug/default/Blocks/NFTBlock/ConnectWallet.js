import React, { useEffect } from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import { CTAButton } from './CTAButton'
import { currentUser, logIn } from '@onflow/fcl'
import { useDispatch } from 'react-redux'
import * as WalletActions from 'redux/wallet/actions'

const ConnectWallet = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        currentUser().subscribe(user => {
            if (user.loggedIn) {
                dispatch(WalletActions.connect(user.addr))
            }
        })
    }, [dispatch])

    const handleConnect = () => {
        logIn()
    }

    return (
        <>
            <Typography variant="h4">Mission complete!</Typography>
            <Typography variant="h6" gutterBottom>
                Congratulations you've successfully completed Junction 2022
                Referral Program 🎉
            </Typography>
            <Typography variant="body1">
                Start the minting process by connecting your FLOW Wallet
            </Typography>
            <Box display="flex" mt={2} alignItems="center">
                <CTAButton label="Connect Wallet" onClick={handleConnect} />
                <Typography variant="body1" align="center">
                    Not sure what this means?{' '}
                    <Link
                        href="https://developers.flow.com/flow/flow-token/available-wallets"
                        referrerPolicy="no-referrer"
                        target="_blank"
                    >
                        <Typography component="span">Read more</Typography>
                    </Link>
                </Typography>
            </Box>
        </>
    )
}

export default ConnectWallet
