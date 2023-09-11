import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
    const classes = useStyles()
    const shareurl = 'https://app.hackjunction.com/events/' + event.slug // TODO: remove hard coded base URL
    const sharetext = `I just applied to ${event.name}!`
    return (
        <Grid item xs={12} lg={12}>
            <Box mt={5} alignItems="center" alignContent="center">
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
