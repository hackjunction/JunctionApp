import { Box, Grid, Link, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import RegistrationService from 'services/registrations'
import * as AuthSelectors from 'redux/auth/selectors'
import * as fcl from '@onflow/fcl'
import { serverAuthorization } from '../../../../../utils/serverSigner'
import { currentUser } from '@onflow/fcl'
import useMetadata from 'flow/hooks/use-metadata'
import { MINT_NFT } from 'flow/cadence/transactions/mintNFT'
import GradientBox from 'components/generic/GradientBox'
import Button from 'components/generic/Button'
import NFTModal from 'components/modals/NFTModal'

const NFTBlock = () => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const ses = useSelector(AuthSelectors.getSession)
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const ref = registration.ref
    console.log(registration)
    const isRefs = ref >= 0
    const hasMinted = registration.minted !== ''
    const isJ22 = event.slug === 'junction-2022'

    const { getMetadata } = useMetadata()
    const loggedInUser = currentUser().addr
    const [open, setOpen] = useState(false)

    // TODO useNavigation hook to switch between the blocks
    // TODO user/wallet state to Redux

    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }

    const handleOpenFlowscan = async () => {
        const status = await RegistrationService.getNFTStatus(
            idToken,
            event.slug,
            registration._id,
        )
        console.log(status)

        window.open(`https://flowscan.org/tx/${registration.txId}`, '_blank')
    }

    const handleNFTClick = async () => {
        try {
            const result = await fcl.mutate({
                cadence: MINT_NFT,
                args: (arg, t) => [
                    arg(loggedInUser.addr, t.Address),
                    arg('Junction 2022', t.String),
                    arg('', t.String),
                    arg('', t.String),
                    arg('', t.String),
                    arg('', t.String),
                ],
                proposer: fcl.authz,
                payer: fcl.authz,
                authorizations: [
                    async account =>
                        await serverAuthorization(account, idToken),
                    fcl.authz,
                ],
                limit: 999,
            })
        } catch (error) {
            console.log(error)
        }
    }

    if (!isJ22) return null

    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple" radius={8}>
                <Typography variant="button">Mint NFT</Typography>
                {/* <ConnectWallet onConnect={handleConnect} /> */}
                {/* <MintNFT
                    walletAddress={loggedInUser?.addr}
                    onMint={handleNFTClick}
                /> */}
                {/* <TransactionStatus txStatus="" /> */}
                {/* <ShowNFT
                    transactionId="123"
                    onShow={openModal}
                    onLinkClick={handleOpenFlowscan}
                /> */}
            </GradientBox>
        </Grid>
    )
}

const ConnectWallet = ({ onConnect: handleConnect }) => {
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
                <Box mr={2}>
                    <CTAButton label="Connect Wallet" onClick={handleConnect} />
                </Box>
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

const MintNFT = ({ walletAddress, onMint: handleMint }) => {
    return (
        <>
            <Typography variant="h4">Mint your NFT</Typography>
            <Typography variant="body1">
                You've connected the wallet, and can start minting the NFT.
            </Typography>
            <Typography variant="body1">Address: {walletAddress}</Typography>
            <Box mt={2}>
                <CTAButton label="Mint NFT" onClick={handleMint} />
            </Box>
        </>
    )
}

const TransactionStatus = ({ txStatus }) => {
    return (
        <Box my={5}>
            <Typography variant="h4">
                Waiting for transaction to finish...
            </Typography>
            <Typography variant="body1">Status: {txStatus}</Typography>
        </Box>
    )
}

const ShowNFT = ({
    show,
    onShowModal: handleShowModal,
    onCloseModal: handleCloseModal,
    transactionId,
    onLinkClick,
}) => {
    return (
        <>
            <Typography variant="h4">Congratulations! 🎉</Typography>
            <Typography variant="h6">You've minted your NFT</Typography>
            <Typography variant="body1">
                Here you can view it and see the transaction details:
            </Typography>
            <Box display="flex" mt={2} alignItems="center">
                <Box mr={2}>
                    <CTAButton label="View NFT" onClick={handleShowModal} />
                </Box>
                <Box>
                    <CTAButton label="View Transaction" onClick={onLinkClick} />
                </Box>
            </Box>
            <NFTModal open={show} onClose={handleCloseModal} />
        </>
    )
}

const CTAButton = ({ label, onClick, ...rest }) => {
    return (
        <>
            <Button
                variant="contained"
                color="theme_white"
                onClick={onClick}
                {...rest}
            >
                {label}
            </Button>
        </>
    )
}

export default NFTBlock
