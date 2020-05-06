import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import CenteredContainer from 'components/generic/CenteredContainer'

import NewhackerpackForm from './HackerpackForm'
import HackerpackList from './HackerpackList'

import { useHackerpackListing } from 'graphql/queries/hackerpack'

export default () => {
    const [hackerpack, loading] = useHackerpackListing()

    return (
        <PageWrapper
            loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <CenteredContainer>
                    <NewhackerpackForm />
                    <HackerpackList hackerpack={hackerpack} />
                </CenteredContainer>
            )}
        />
    )
}
