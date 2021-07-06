import React from 'react'

import Divider from 'components/generic/Divider'
import EventFooter from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import EventHighlight from '../../_index/EventHighlight'
import EventsGrid from '../../_index/EventsGrid'
import Container from 'components/generic/Container'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import { usePastEvents } from 'graphql/queries/events'

import { useTranslation } from 'react-i18next'

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state

    const [pastEvents] = usePastEvents({ limit: 100 })

    const { t } = useTranslation()
    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <EventFooter />}
            render={() => (
                <>
                    <Divider size={1} />
                    <EventHighlight />
                    <Divider size={4} />
                    <Container center>
                        <Divider size={2} />
                        <EventsGrid
                            title={t('Past_events_')}
                            events={pastEvents}
                        />
                    </Container>
                    <Divider size={20} />
                </>
            )}
        />
    )
}
