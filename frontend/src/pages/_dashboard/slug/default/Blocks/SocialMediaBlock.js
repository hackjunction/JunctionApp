import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import { popupCenter } from '../../../../../utils/misc'
import RegistrationService from 'services/registrations'
import * as AuthSelectors from 'redux/auth/selectors'
import * as fcl from '@onflow/fcl'

const useStyles = makeStyles(theme => ({
    doneTitle: {
        color: 'black',
        textAlign: 'center',
    },
    socialIcon: {
        color: 'black',
        width: 'auto',
        margin: '1rem',
        cursor: 'pointer',
    },
}))

const SocialMediaBlock = () => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const ses = useSelector(AuthSelectors.getSession)
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const ref = registration.ref
    const isRefs = true // EDITED
    const hasMinted = registration.minted !== ''
    const classes = useStyles()
    const isJ22 =
        event.slug === 'junction-2022' || // EDITED
        event.slug === 'einotepa' ||
        event.slug === 'hack4fi-hack-your-heritage'
    const shareurl = 'https://app.hackjunction.com/events/' + event.slug // TODO: remove hard coded base URL
    const sharetext = `I just applied to ${event.name}!`

    const handleNFTClick = async () => {
        try {
            const status = await RegistrationService.getNFTStatus(
                idToken,
                event.slug,
                registration._id,
            )

            const result = await fcl.mutate({
                cadence: `
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
              `,
                args: (arg, t) => [
                    arg('0x3232019a9ae71520', t.Address),
                    arg('Junction 2022', t.String),
                    arg('', t.String),
                    arg('', t.String),
                    arg('', t.String),
                    arg('', t.String),
                ],
                proposer: fcl.authz,
                payer: fcl.authz,
                authorizations: [serverAuthorization, fcl.authz],
                limit: 999,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Grid item xs={12} lg={12}>
            <Box mt={5} alignItems="center" alignContent="center">
                {isJ22 ? (
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                className={classes.doneTitle}
                                variant="h6"
                            >
                                Challenge 3 people with this code to join
                                Junction 2022 in order to get a unique Junction
                                NFT: {registration._id}
                            </Typography>
                            {isRefs && !hasMinted ? (
                                <Button
                                    onClick={handleNFTClick}
                                    color="theme_white"
                                    variant="contained"
                                >
                                    Mint NFT
                                </Button>
                            ) : (
                                <div></div>
                            )}
                            {hasMinted ? (
                                <Button
                                    onClick={handleNFTClick}
                                    color="theme_white"
                                    variant="contained"
                                >
                                    Show NFT
                                </Button>
                            ) : (
                                <div></div>
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <div></div>
                )}

                <Typography className={classes.doneTitle} variant="h4">
                    Share with friends!
                </Typography>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <FontAwesomeIcon
                            icon={['fab', 'twitter-square']}
                            onClick={() =>
                                popupCenter({
                                    url: `https://twitter.com/intent/tweet?text=${sharetext}&url=${shareurl}`,
                                    title: 'Twitter',
                                })
                            }
                            className={classes.socialIcon}
                            size="3x"
                        />
                    </Grid>
                    <Grid item>
                        <FontAwesomeIcon
                            icon={['fab', 'facebook-square']}
                            onClick={() =>
                                popupCenter({
                                    url: `https://www.facebook.com/sharer/sharer.php?u=${shareurl}&quote=${sharetext}`,
                                    title: 'Facebook',
                                })
                            }
                            className={classes.socialIcon}
                            size="3x"
                        />
                    </Grid>
                    <Grid item>
                        <FontAwesomeIcon
                            icon={['fab', 'linkedin']}
                            onClick={() =>
                                popupCenter({
                                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareurl}`,
                                    title: 'Linkedin',
                                })
                            }
                            className={classes.socialIcon}
                            size="3x"
                        />
                    </Grid>
                    <Grid item>
                        <FontAwesomeIcon
                            icon={['fab', 'vk']}
                            onClick={() =>
                                popupCenter({
                                    url: `https://vkontakte.ru/share.php?url=${shareurl}&`,
                                    title: 'VKOntakte',
                                })
                            }
                            className={classes.socialIcon}
                            size="3x"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}
export default SocialMediaBlock
