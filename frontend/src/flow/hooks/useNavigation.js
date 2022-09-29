import React, { useEffect, useState } from 'react'
import * as WalletSelectors from 'redux/wallet/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as WalletActions from 'redux/wallet/actions'
import { useDispatch, useSelector } from 'react-redux'
import { unauthenticate } from '@onflow/fcl'
import ConnectWallet from 'pages/_dashboard/slug/default/Blocks/NFTBlock/ConnectWallet'
import MintNFT from 'pages/_dashboard/slug/default/Blocks/NFTBlock/MintNFT'
import Sealing from 'pages/_dashboard/slug/default/Blocks/NFTBlock/Sealing'
import Showcase from 'pages/_dashboard/slug/default/Blocks/NFTBlock/Showcase'

export const useNavigation = () => {
    const dispatch = useDispatch()
    const registration = useSelector(DashboardSelectors.registration)
    const [stage, setStage] = useState('connect-wallet')
    /* const hasMinted = registration.hasMinted */
    const hasMinted = false

    const walletAddress = useSelector(WalletSelectors.address)

    useEffect(() => {
        if (hasMinted) {
            setStage('showcase')
            return
        }

        if (walletAddress) {
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
                />
            )
        }
        if (stage === 'sealing') {
            return <Sealing />
        }
        if (stage === 'showcase') {
            return <Showcase />
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
