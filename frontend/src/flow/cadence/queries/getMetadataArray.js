export const GET_METADATA_ARRAY = `
  import MetadataViews from 0xMetadataViewsTestnet
  import Junction from 0xJunctionTestnet

  pub fun main(address: Address, id: UInt64): NFTResult {
    
    let account = getAccount(address)
    
    let collection = account
      .getCapability(Junction.CollectionPublicPath)
      .borrow<&{MetadataViews.ResolverCollection}>()
      ?? panic("Could not borrow a reference to the collection")
    let nft = collection.borrowViewResolver(id: id)

    var data = NFTResult()
    if let view = nft.resolveView(Type<Junction.JunctionDisplay>()) {
      let display = view as! Junction.JunctionDisplay

      data.name = display.name
      data.description = display.description
      data.thumbnail = display.thumbnail
      data.videoURI = display.videoURI
      data.ipfsVideo = display.ipfsVideo
    }

    return data
  }

  pub struct NFTResult {
    pub(set) var name: String
    pub(set) var description: String
    pub(set) var thumbnail: AnyStruct{MetadataViews.File}
    pub(set) var videoURI: String
    pub(set) var ipfsVideo: MetadataViews.IPFSFile

    init() {
      self.name = ""
      self.description = ""
      self.thumbnail = MetadataViews.HTTPFile(url: "")
      self.videoURI = ""
      self.ipfsVideo = MetadataViews.IPFSFile(cid: "", path: nil)
    }
  }
`
