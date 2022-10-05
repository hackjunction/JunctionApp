const { decode } = require('rlp')

const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')

const { SHA3 } = require('sha3')
const EC = require('elliptic').ec

const ec = new EC('p256')

const { PRIVATE_KEY } = process.env
const NonFungibleToken = process.env.NON_FUNGIBLE_TOKEN
const MetadataViews = process.env.METADATA_VIEWS
const Junction = process.env.JUNCTION_CONTRACT

const mintTransactionCode = `
    import NonFungibleToken from ${NonFungibleToken}
    import MetadataViews from ${MetadataViews}
    import Junction from ${Junction}

    /// This script uses the NFTMinter resource to mint a new NFT
    /// It must be run with the account that has the minter resource
    /// stored in /storage/NFTMinter
    transaction(
        recipient: Address,
        name: String,
        description: String,
        thumbnail: String,
        videoURI: String,
        videoCID: String
    ) {

    /// local variable for storing the minter reference
    let minter: &Junction.NFTMinter

    prepare(admin: AuthAccount, user: AuthAccount) {
        if user.address != recipient {
            panic("Recipient address must be same as signer's")
        }

        // borrow a reference to the NFTMinter resource in storage
        self.minter = admin.borrow<&Junction.NFTMinter>(from: Junction.MinterStoragePath)
            ?? panic("Account does not store an object at the specified path")

        if user.borrow<&Junction.Collection>(from: Junction.CollectionStoragePath) != nil {
            return
        }

        // Create a new empty collection
        let collection <- Junction.createEmptyCollection()

        // save it to the account
        user.save(<-collection, to: Junction.CollectionStoragePath)

        // create a public capability for the collection
        user.link<&{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(
            Junction.CollectionPublicPath,
            target: Junction.CollectionStoragePath
        )
    }

    execute {
        let recipientCollection = getAccount(recipient)
            .getCapability(Junction.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // Mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(
            recipient: recipientCollection,
            name: name,
            description: description,
            thumbnail: thumbnail,
            videoURI: videoURI,
            videoCID: videoCID
        )
      }
    }
`

const hash = message => {
    const sha = new SHA3(256)
    sha.update(Buffer.from(message, 'hex'))
    return sha.digest()
}

const sign = message => {
    const key = ec.keyFromPrivate(Buffer.from(PRIVATE_KEY, 'hex'))
    const sig = key.sign(hash(message)) // hashMsgHex -> hash
    const n = 32
    const r = sig.r.toArrayLike(Buffer, 'be', n)
    const s = sig.s.toArrayLike(Buffer, 'be', n)
    return Buffer.concat([r, s]).toString('hex')
}

const signTransaction = asyncHandler(async (req, res) => {
    const signable = req.body
    const { message } = signable

    // Parse the hashed message to get the relevant information
    const decoded = decode(Buffer.from(message.slice(64), 'hex'))

    // First index in the parsed array is the Cadence code
    const tx = decoded[0].toString()

    const parsedTx = tx.replace(/\s/g, '')
    const parsedMintTx = mintTransactionCode.replace(/\s/g, '')

    // TODO: Maybe some graceful error handling here?
    // This checks that the transaction being proposed is exactly the one we've defined.
    if (parsedTx !== parsedMintTx) {
        return res.status(400).json({
            error: 'Possibly malicious transaction!',
        })
    }

    if (parsedTx === parsedMintTx) {
        const signature = sign(signable.message)

        return res.json({
            signature: `${signature}`,
        })
    }
})

router.route('/').post(signTransaction)

module.exports = router
