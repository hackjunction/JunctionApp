import React from 'react'
import ExternalLink from 'components/generic/ExternalLink'
import Divider from 'components/generic/Divider'
import { useTranslation } from 'react-i18next'
import config from 'constants/config'

const Footer = () => {
    const { t } = useTranslation()
    return (
        <div className="bg-black p-4">
            <div className="max-w-6xl mx-auto flex flex-col items-center md:flex-row-reverse">
                <div className="flex-1 flex flex-col items-center md:items-end text-right">
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
                <div className="flex-1 text-center md:text-left text-white">
                    <Divider size={1} />
                    <span>
                        Designed and developed with ❤️ and ☕ by the Junction
                        team, with the help of:
                    </span>
                    <Divider size={1} />
                    <div className="flex flex-wrap items-center justify-center md:justify-start">
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

Footer.defaultProps = {
    hide_contact: false,
}

export default Footer
