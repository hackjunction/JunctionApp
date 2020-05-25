import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import CenteredContainer from 'components/generic/CenteredContainer'

import NewHackerpackForm from './NewHackerpackForm'
import HackerpackList from './HackerpackList'

export default () => {
    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <CenteredContainer>
                    <NewHackerpackForm />
                    <HackerpackList />
                </CenteredContainer>
            )}
        />
    )
}
