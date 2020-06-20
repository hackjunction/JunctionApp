import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import ExternalLink from 'components/generic/ExternalLink'
import Grid from '@material-ui/core/Grid'
import Divider from 'components/generic/Divider'
import LineDivider from 'components/generic/LineDivider/'
import CenteredContainer from 'components/generic/CenteredContainer'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'
import config from 'constants/config'

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: theme.palette.theme_white.main,
        padding: theme.spacing(2),
    },
    inner: {
        width: '100%',
        maxWidth: '1120px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row-reverse',
        },
    },
    copyright: {
        flex: 1,
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
    },
    links: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            alignItems: 'flex-end',
            textAlign: 'right',
        },
    },
    logos: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start',
        },
    },
}))

const Footer = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    return (
        <div className={classes.wrapper}>
            {props.hide_contact ? null : (
                <CenteredContainer>
                    <LineDivider />
                    <Divider size={1} />
                    <Grid container>
                        <Grid item xs={6}>
                            <h2>
                                {t('Platform_organise_hack_', {
                                    owner: config.PLATFORM_OWNER_NAME,
                                })}
                            </h2>
                            <Button
                                color="theme_white"
                                variant="outlined"
                                strong
                                onClick={() => dispatch(push('/contact'))}
                            >
                                {t('Contact_us_')}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <h2>{t('Join_hackerpack_')}</h2>
                            <Button
                                color="theme_turquoise"
                                variant="contained"
                                strong
                                onClick={() => dispatch(push('/hackerpack'))}
                            >
                                {t('To_hackerpack_')}
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider size={5} />
                </CenteredContainer>
            )}

            <div className={classes.inner}>
                <div className={classes.links}>
                    <Divider size={1} />
                    <ExternalLink theme="dark" href={config.TERMS_URL}>
                        {t('Terms_')}
                    </ExternalLink>
                    <ExternalLink theme="dark" href={config.PRIVACY_URL}>
                        {t('Privacy_')}
                    </ExternalLink>
                    <ExternalLink
                        theme="dark"
                        href={config.PLATFORM_OWNER_WEBSITE}
                    >
                        {t('Website_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </ExternalLink>
                    <Divider size={1} />
                </div>
                <div className={classes.copyright}>
                    <Divider size={1} />
                    <span className={classes.copyright}>
                        {t('Designed_developed_')}
                    </span>
                    <Divider size={1} />
                    <div className={classes.logos}>
                        <a
                            width="150"
                            height="50"
                            href="https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="Single Sign On & Token Based Authentication - Auth0"
                        >
                            <img
                                width="150"
                                height="50"
                                alt="JWT Auth for open source projects"
                                src="//cdn.auth0.com/oss/badges/a0-badge-light.png"
                            />
                        </a>
                        <Divider size={1} />
                        <a
                            href="https://cloudinary.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="Cloudinary - Image and Video Upload, Storage, Optimization and CDN"
                        >
                            <img
                                alt="Cloudinary - Media Upload, Storage, Optimization and CDN"
                                src="https://res.cloudinary.com/cloudinary/image/upload/c_scale,w_150/v1/logo/for_white_bg/cloudinary_logo_for_white_bg.png"
                            />
                        </a>
                    </div>
                    <Divider size={1} />
                </div>
            </div>
        </div>
    )
}
Footer.defaultProps = {
    hide_contact: false,
}
export default Footer
