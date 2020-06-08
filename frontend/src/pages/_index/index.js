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
import { useTranslation } from 'react-i18next'

export default () => {
    const [activeEvents] = useActiveEvents({ limit: 3 })
    const [pastEvents] = usePastEvents({ limit: 3 })
    const { t, i18n } = useTranslation() // eslint-disable-line

    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <>
                    <Divider size={1} />
                    <EventHighlight />
                    <Divider size={2} />
                    <CenteredContainer>
                        <EventsGrid
                            title={t('Upcoming_')}
                            events={activeEvents}
                        />
                        <EventsGrid title={t('Past_')} events={pastEvents} />
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
                                {t('More_info_link')}
                            </ExternalLink>
                        </p>
                        <Divider size={5} />
                    </CenteredContainer>
                </>
            )}
        />
    )
}
