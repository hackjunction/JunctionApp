import React from 'react'

import Divider from 'components/generic/Divider'
import ExternalLink from 'components/generic/ExternalLink'
import Button from 'components/generic/Button'
import Footer from 'components/layouts/Footer'
import EventFooter from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import EventHighlight from '../../_index/EventHighlight'
import EventsGrid from '../../_index/EventsGrid'
import CenteredContainer from 'components/generic/CenteredContainer'
import CenteredContainerSmall from 'components/generic/CenteredContainerSmall'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Image from 'components/generic/Image'
import config from 'constants/config'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useActiveEvents, usePastEvents } from 'graphql/queries/events'
import { useAllOrganizations } from 'graphql/queries/organization'
import { Helmet } from 'react-helmet'

import { useTranslation } from 'react-i18next'

import emblem_black from 'assets/logos/emblem_black.png'

import { Typography, Grid, Avatar, Box } from '@material-ui/core'

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state

    const [pastEvents] = usePastEvents({ limit: 100 })

    const [organizations] = useAllOrganizations()
    const dispatch = useDispatch()
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
                    <CenteredContainer spacing={3}>
                        <Divider size={2} />
                        <EventsGrid
                            title={t('Past_events')}
                            events={pastEvents}
                            organizations={organizations}
                        />
                    </CenteredContainer>
                    <Divider size={20} />
                </>
            )}
        />
    )
}
