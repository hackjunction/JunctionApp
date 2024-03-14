import React from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { popupCenter } from '../../../utils/misc'
import { makeStyles } from '@material-ui/core/styles'
import Container from 'components/generic/Container'
import { projectURLgenerator } from 'utils/dataModifiers'

const useStyles = makeStyles(theme => ({
    socialIcon: {
        color: 'black',
        width: 'auto',
        margin: '0.10rem',
        cursor: 'pointer',
    },
}))

const ShareProject = (event, project) => {
    const shareurl = projectURLgenerator(event.slug, project._id)
    const sharetext = `I just applied to ${event.name}!`

    const classes = useStyles()

    return (
        <Container center>
            <Grid item xs={12} lg={12}>
                <Box mt={5} alignItems="center" alignContent="center">
                    <Typography className={classes.doneTitle} variant="h5">
                        Share this project with friends!
                    </Typography>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justifyContent="center"
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
        </Container>
    )
}

export default ShareProject
