import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import ExternalLink from 'components/generic/ExternalLink'
import Divider from 'components/generic/Divider'
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

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.wrapper}>
            <div className={classes.inner}>
                <div className={classes.links}>
                    <Divider size={1} />
                    <ExternalLink theme="dark" href={config.TERMS_URL}>
                        Terms And Conditions
                    </ExternalLink>
                    <ExternalLink theme="dark" href={config.PRIVACY_URL}>
                        Privacy Policy
                    </ExternalLink>
                    <ExternalLink
                        theme="dark"
                        href={config.PLATFORM_OWNER_WEBSITE}
                    >
                        {config.PLATFORM_OWNER_NAME} website
                    </ExternalLink>
                    <Divider size={1} />
                </div>
                <div className={classes.copyright}>
                    <Divider size={1} />
                    <span className={classes.copyright}>
                        Designed and developed with love and coffee by the
                        Junction team, with the help of:
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

export default Footer
