import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import CenteredContainer from 'components/generic/CenteredContainer'

import { useMyEvents } from 'graphql/queries/events'

export default () => {
    const [events, loading] = useMyEvents()

    return (
        <PageWrapper
            loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => <CenteredContainer>memem</CenteredContainer>}
        />
    )
}
