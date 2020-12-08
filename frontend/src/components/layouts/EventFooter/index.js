import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import Hidden from '@material-ui/core/Hidden'
import { push } from 'connected-react-router'

import ExternalLink from 'components/generic/ExternalLink'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from 'components/generic/Divider'
import LineDivider from 'components/generic/LineDivider/'
import Container from 'components/generic/Container'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'
import config from 'constants/config'

const useStyles = makeStyles(theme => ({
    wrapper: {
        background: theme.palette.theme_black.main,
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
    innerSecond: {
        width: '100%',
        maxWidth: '1120px',
        margin: '48px auto 24px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    copyright: {
        flex: 1,
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
        },
        color: 'white',
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
    white: {
        color: 'white',
    },
    align: {
        '& button': {
            marginLeft: 0,
        },
    },
    innest: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
        '& button': {
            alignSelf: 'flex-end',
            marginRight: 0,
        },
    },
}))

const EventFooter = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    return (
        <div className={classes.wrapper}>
            <Grid container className={classes.innerSecond}>
                <Grid item xs={12} md={6} xl={6} className={classes.align}>
                    <Typography variant="h4" className={classes.white}>
                        {t('Platform_organise_hack_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </Typography>
                    <Button
                        color="theme_lightgrayDark"
                        variant="outlinedNew"
                        strong
                        onClick={() => dispatch(push('/contact'))}
                    >
                        {t('Contact_us_')}
                    </Button>
                    <Button
                        color="theme_lightgrayDark"
                        variant="outlinedNew"
                        strong
                        onClick={() => dispatch(push('/pricing'))}
                    >
                        {/* {t('Contact_us_')} */}
                        Pricing
                    </Button>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs={6} md={6} x={6} className={classes.innest}>
                        <Typography variant="h4" className={classes.white}>
                            {t('Join_hackerpack_')}
                        </Typography>
                        <Button
                            color="theme_lightgrayDark"
                            variant="outlinedNew"
                            strong
                            onClick={() => dispatch(push('/hackerpack'))}
                            className={classes.align}
                        >
                            {t('To_hackerpack_')}
                        </Button>
                    </Grid>
                </Hidden>
            </Grid>
            <Divider size={5} />

            <div className={classes.inner}>
                <div className={classes.links}>
                    <Divider size={1} />
                    <ExternalLink theme="footer" href={config.TERMS_URL}>
                        {t('Terms_')}
                    </ExternalLink>
                    <ExternalLink theme="footer" href={config.PRIVACY_URL}>
                        {t('Privacy_')}
                    </ExternalLink>
                    <ExternalLink
                        theme="footer"
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
                        Designed and developed with ❤️ and ☕ by the Junction
                        team, with the help of:
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
                    </div>
                    <Divider size={1} />
                </div>
            </div>
        </div>
    )
}
EventFooter.defaultProps = {
    hide_contact: false,
}
export default EventFooter
