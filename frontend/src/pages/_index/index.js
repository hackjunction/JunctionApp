import React from 'react'

import Divider from 'components/generic/Divider'
import LineDivider from 'components/generic/LineDivider/'
import ExternalLink from 'components/generic/ExternalLink'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import EventHighlight from './EventHighlight'
import EventsGrid from './EventsGrid'
import CenteredContainer from 'components/generic/CenteredContainer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import config from 'constants/config'

import { useActiveEvents, usePastEvents } from 'graphql/queries/events'
import { useAllOrganizations } from 'graphql/queries/organization'
import { Helmet } from 'react-helmet'

import { useTranslation } from 'react-i18next'

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state
    const [activeEvents] = useActiveEvents({ limit: 3 })
    const [pastEvents] = usePastEvents({ limit: 3 })
    const [organizations] = useAllOrganizations()

    console.log('ororo', organizations)
    console.log('ararr', activeEvents)

    const { t } = useTranslation()
    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <>
                    <Helmet>
                        <meta name="title" content={config.SEO_PAGE_TITLE} />
                        <meta
                            property="og:title"
                            content={config.SEO_PAGE_TITLE}
                        />
                        <meta
                            name="twitter:title"
                            content={config.SEO_PAGE_TITLE}
                        />
                        <meta
                            name="description"
                            content={config.SEO_PAGE_DESCRIPTION}
                        />
                        <meta
                            property="og:description"
                            content={config.SEO_PAGE_DESCRIPTION}
                        />
                        <meta
                            name="twitter:description"
                            content={config.SEO_PAGE_DESCRIPTION}
                        />

                        <meta name="og:type" content="website" />
                        <meta
                            property="og:image"
                            content={config.SEO_IMAGE_URL}
                        />
                        <meta
                            name="twitter:image"
                            content={config.SEO_IMAGE_URL}
                        />
                        <meta property="og:image:width" content="1200" />
                        <meta property="og:image:height" content="630" />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            name="twitter:site"
                            content={config.SEO_TWITTER_HANDLE}
                        />
                        <meta
                            name="twitter:creator"
                            content={config.SEO_TWITTER_HANDLE}
                        />
                    </Helmet>
                    <Divider size={1} />
                    <EventHighlight />
                    <Divider size={2} />
                    <CenteredContainer>
                        <EventsGrid
                            title={t('Upcoming_')}
                            events={activeEvents}
                            organizations={organizations}
                        />
                        <EventsGrid
                            title={t('Past_')}
                            events={pastEvents}
                            organizations={organizations}
                        />
                    </CenteredContainer>
                    <Divider size={2} />
                    <CenteredContainer>
                        <LineDivider />
                        <Divider size={1} />
                        <h2>
                            {t('New_to_', {
                                platform: config.PLATFORM_OWNER_NAME,
                            })}
                        </h2>
                        <p>
                            {t('More_info_', {
                                owner: config.PLATFORM_OWNER_NAME,
                            })}
                            <ExternalLink href={config.PLATFORM_OWNER_WEBSITE}>
                                {t('More_info_link_')}
                            </ExternalLink>
                        </p>
                        <Divider size={5} />
                    </CenteredContainer>
                </>
            )}
        />
    )
}
