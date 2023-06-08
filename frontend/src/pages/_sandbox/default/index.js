import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import Container from 'components/generic/Container'

// import { useMyEvents } from 'graphql/queries/events'

export default () => {
    // const [events, loading] = useMyEvents()

    return (
        <PageWrapper
            // loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container center>
                    <p>Some test area</p>
                </Container>
            )}
        />
    )
}
