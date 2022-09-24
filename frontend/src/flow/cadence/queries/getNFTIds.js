export const GET_NFT_IDS = `
  import MetadataViews from 0xMetadataViewsTestnet
  import Junction from 0xJunctionTestnet
  import NonFungibleToken from 0xNonFungibleTokenTestnet

  pub fun main(address: Address): [UInt64] {
      
    let account = getAccount(address)
    if account
      .getCapability(Junction.CollectionPublicPath)
      .borrow<&{NonFungibleToken.CollectionPublic}>() == nil {
        return []
      }

    let collection = account
      .getCapability(Junction.CollectionPublicPath)
      .borrow<&{MetadataViews.ResolverCollection}>()
        ?? panic("Could not borrow a reference to the collection")

    let IDs = collection.getIDs()
    return IDs;
  }
`
