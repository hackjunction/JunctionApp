import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import { popupCenter } from '../../../../../utils/misc'

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
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const ref = registration.ref
    const isRefs = ref >= 3
    const classes = useStyles()
    const isJ22 = event.slug === "junction-2022-1" || event.slug === "code-likeabosch-2022"
    const shareurl = 'https://app.hackjunction.com/events/' + event.slug // TODO: remove hard coded base URL
    const sharetext = `I just applied to ${event.name}!`
    return (
        <Grid item xs={12} lg={12}>
            <Box mt={5} alignItems="center" alignContent="center">
                {isJ22 ? (<Grid
                    container
                        spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="center"
                >
                    <Grid item>
                        <Typography className={classes.doneTitle} variant="h6">
                            Challenge 3 people with this code to join Junction 2022 in order to get a unique Junction NFT: {registration._id }
                        
                        
                        </Typography>
                        {isRefs ? (<Button>click for NFT</Button>) : (<div></div>)}
                    </Grid>
                </Grid>
) : (<div></div>)}
                
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
