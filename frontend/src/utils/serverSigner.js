import * as fcl from '@onflow/fcl'
import SigningService from 'services/sign'

const getSignature = async (signable, idToken) => {
    const signed = await SigningService.signTransaction(idToken, signable)

    return signed.signature
}

export const serverAuthorization = async (account, idToken) => {
    const addr = process.env.REACT_APP_SERVICE_ACCOUNT_ADDRESS
    const keyId = 0

    return {
        ...account,
        tempId: `${addr}-${keyId}`,
        addr: fcl.sansPrefix(addr),
        keyId: Number(keyId),
        signingFunction: async signable => {
            const signature = await getSignature(signable, idToken)

            return {
                addr: fcl.withPrefix(addr),
                keyId: Number(keyId),
                signature,
            }
        },
    }
}
