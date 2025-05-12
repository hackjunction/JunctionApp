import React from 'react'
import ExternalLink from 'components/generic/ExternalLink'
import { useTranslation } from 'react-i18next'
import config from 'constants/config'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const FooterWrapper = styled(Box)(({ theme }) => ({
    background: theme.palette.theme_black.main,
    padding: theme.spacing(2),
}))

const InnerWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1120px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row-reverse',
    },
    fontSize: '0.875rem',
    color: 'white',
}))

const Links = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-end',
        textAlign: 'right',
    },
    margin: '0.5rem 0',
}))

const Credits = styled(Box)(({ theme }) => ({
    flex: 1,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        textAlign: 'left',
    },
    margin: '0.5rem 0',
}))

const Logos = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
    },
    marginTop: '0.5rem',
}))

const Footer = () => {
    const { t } = useTranslation()
    return (
        <FooterWrapper>
            <InnerWrapper>
                <Links>
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
                </Links>
                <Credits>
                    <span>
                        Designed and developed with ❤️ and ☕ by the Junction
                        team, with the help of:
                    </span>
                    <Logos>
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
                    </Logos>
                </Credits>
            </InnerWrapper>
        </FooterWrapper>
    )
}

export default Footer
