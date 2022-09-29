import React, { useEffect, useState } from 'react'
import * as WalletSelectors from 'redux/wallet/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as WalletActions from 'redux/wallet/actions'
import { useDispatch, useSelector } from 'react-redux'
import { unauthenticate } from '@onflow/fcl'
import ConnectWallet from 'pages/_dashboard/slug/default/Blocks/NFTBlock/ConnectWallet'
import MintNFT from 'pages/_dashboard/slug/default/Blocks/NFTBlock/MintNFT'
import Sealing from 'pages/_dashboard/slug/default/Blocks/NFTBlock/Sealing'
import Showcase from 'pages/_dashboard/slug/default/Blocks/NFTBlock/Showcase'
import RegistrationsService from 'services/registrations'

export const useNavigation = () => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const [stage, setStage] = useState('connect-wallet')
    const [hasMinted, setHasMinted] = useState(false)
    const [transactionId, setTransactionId] = useState(null)

    const walletAddress = useSelector(WalletSelectors.address)

    useEffect(() => {
        const checkMinted = async () => {
            const response = await RegistrationsService.getNFTStatus(
                idToken,
                event.slug,
                registration._id,
            )

            const { hasMinted, txId } = JSON.parse(response)

            setTransactionId(txId)
            setHasMinted(hasMinted)
        }

        checkMinted()
    }, [event.slug, idToken, registration._id])

    useEffect(() => {
        if (hasMinted) {
            setStage('showcase')
            return
        }

        if (walletAddress && stage !== 'sealing' && stage !== 'showcase') {
            setStage('mint-nft')
        }
    }, [hasMinted, stage, walletAddress])

    const getContent = () => {
        if (stage === 'connect-wallet') {
            return <ConnectWallet />
        }
        if (stage === 'mint-nft') {
            return (
                <MintNFT
                    handleLogout={handleLogout}
                    onComplete={() => setStage('sealing')}
                    onFinalized={txStatus => {
                        setTransactionId(txStatus)
                        setStage('showcase')
                    }}
                />
            )
        }
        if (stage === 'sealing') {
            return <Sealing />
        }
        if (stage === 'showcase') {
            return <Showcase transactionId={transactionId} />
        }
    }

    const handleLogout = () => {
        unauthenticate()
        dispatch(WalletActions.disconnect())
        setStage('connect-wallet')
    }

    return {
        stage,
        content: getContent(),
        handleLogout,
    }
}
