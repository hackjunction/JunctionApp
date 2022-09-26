export const MINT_NFT = `
import NonFungibleToken from 0xNonFungibleTokenTestnet
import MetadataViews from 0xMetadataViewsTestnet
import Junction from 0xJunctionTestnet

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
