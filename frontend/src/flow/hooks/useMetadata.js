import * as fcl from '@onflow/fcl'
import { GET_METADATA_ARRAY } from 'flow/cadence/queries/getMetadataArray'
import { GET_NFT_IDS } from 'flow/cadence/queries/getNFTIds'

export default function useMetadata() {
    const getMetadata = async userAddr => {
        let ids = []

        try {
            ids = await fcl.query({
                cadence: GET_NFT_IDS,
                args: (arg, t) => [arg(userAddr, t.Address)],
            })
        } catch (error) {
            console.log(error)
        }

        try {
            const metadataArr = ids.map(async id => {
                const result = await fcl.query({
                    cadence: GET_METADATA_ARRAY,
                    args: (arg, t) => [
                        arg(userAddr, t.Address),
                        arg(id, t.UInt64),
                    ],
                })

                return result
            })

            return await Promise.all(metadataArr)
        } catch (error) {
            console.log(error)
        }
    }

    return getMetadata
}
