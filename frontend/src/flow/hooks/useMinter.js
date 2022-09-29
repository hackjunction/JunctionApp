import React, { useEffect, useState } from 'react'
import * as WalletSelectors from 'redux/wallet/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { MINT_NFT } from 'flow/cadence/transactions/mintNFT'
import * as fcl from '@onflow/fcl'
import { serverAuthorization } from 'utils/serverSigner'
import RegistrationsService from 'services/registrations'

const NFT_NAME = 'Junction 2022 Referral Trophy'
const NFT_DESCRIPTION =
    'Junction is the global community behind the world’s best hackathons. For Junction 2022, we created this NFT collection as a prize for our referral program. We created the perfect reward for our hacker community, starting an NFT project which we hope will last through the years!'
const NFT_THUMBNAIL = ''
const NFT_VIDEO_URI =
    'https://ipfs.io/ipfs/bafybeiadm74htav4vygndvws5bgusb4x4bygwu4jacdryq4ggxvexxjpmy'
const NFT_VIDEO_CID =
    'bafybeiadm74htav4vygndvws5bgusb4x4bygwu4jacdryq4ggxvexxjpmy'

export const useMinter = ({ onComplete }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const walletAddress = useSelector(WalletSelectors.address)
    const registration = useSelector(DashboardSelectors.registration)
    const event = useSelector(DashboardSelectors.event)
    const [txStatus, setTxStatus] = useState(null)

    useEffect(() => {
        if (txStatus) {
            fcl.tx(txStatus).subscribe(tx => {
                // TODO - do something with the tx
            })
        }
    }, [txStatus, dispatch])

    const checkEligibility = async () => {
        try {
            const status = await RegistrationsService.getNFTStatus(
                idToken,
                event.slug,
                registration._id,
            )

            return status
        } catch (error) {
            console.log(error)
        }
    }

    const handleMint = async () => {
        try {
            const status = await checkEligibility()
            console.log(status)

            const result = await fcl.mutate({
                cadence: MINT_NFT,
                args: (arg, t) => [
                    arg(walletAddress, t.Address),
                    arg(NFT_NAME, t.String),
                    arg(NFT_DESCRIPTION, t.String),
                    arg(NFT_THUMBNAIL, t.String),
                    arg(NFT_VIDEO_URI, t.String),
                    arg(NFT_VIDEO_CID, t.String),
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

            // await updateRegistration()
            setTxStatus(result)
            onComplete()
        } catch (error) {
            console.log(error)
        }
    }

    return handleMint
}
