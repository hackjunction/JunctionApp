import React from 'react'
import { useDispatch } from 'react-redux'
import ExternalLink from 'components/generic/ExternalLink'
import { useTranslation } from 'react-i18next'
import config from 'constants/config'
import { Box, Typography, Button } from '@mui/material'
import Hidden from '@mui/material/Hidden'

const EventFooter = props => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    return (
        <div className="bg-black p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 text-white text-center md:text-left">
                    <Typography variant="h4">
                        {t('Platform_organise_hack_', {
                            owner: config.PLATFORM_OWNER_NAME,
                        })}
                    </Typography>
                    <div className="mt-4">
                        <Button
                            color="theme_lightgrayDark"
                            variant="outlinedNew"
                            strong
                            className="mr-4"
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
                            Pricing
                        </Button>
                    </div>
                </div>
                <Hidden xsDown>
                    <div className="w-full md:w-1/2 text-white text-center md:text-right mt-8 md:mt-0">
                        <Typography variant="h4">
                            {t('Join_hackerpack_')}
                        </Typography>
                        <Button
                            color="theme_lightgrayDark"
                            variant="outlinedNew"
                            strong
                            className="mt-4"
                            onClick={() => dispatch(push('/hackerpack'))}
                        >
                            {t('To_hackerpack_')}
                        </Button>
                    </div>
                </Hidden>
            </div>
            <div className="container mx-auto mt-8">
                <div className="flex flex-col items-center md:flex-row md:justify-between">
                    <div className="flex flex-col items-center md:items-start text-white">
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
                    </div>
                    <div className="mt-8 md:mt-0 text-white text-center">
                        <Typography variant="body2">
                            Designed and developed with ❤️ and ☕ by the
                            Junction team, with the help of:
                        </Typography>
                        <a
                            width="150"
                            height="50"
                            href="https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss"
                            target="_blank"
                            rel="noopener noreferrer"
                            alt="Single Sign On & Token Based Authentication - Auth0"
                            className="block mt-4"
                        >
                            <img
                                width="150"
                                height="50"
                                alt="JWT Auth for open source projects"
                                src="//cdn.auth0.com/oss/badges/a0-badge-light.png"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

EventFooter.defaultProps = {
    hide_contact: false,
}

export default EventFooter
