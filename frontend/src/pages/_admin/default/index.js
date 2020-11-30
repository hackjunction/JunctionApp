import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import CenteredContainer from 'components/generic/CenteredContainer'

import NewHackerpackForm from './NewHackerpackForm'
import HackerpackList from './HackerpackList'

import NewOrganizationForm from './NewOrganizationForm'
import OrganizationList from './OrganizationList'
import NewAdForm from './NewAdForm'
import AdList from './AdList'

export default () => {
    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <CenteredContainer>
                    <NewHackerpackForm />
                    <HackerpackList />

                    <NewOrganizationForm />
                    <OrganizationList />

                    <NewAdForm />
                    <AdList />
                </CenteredContainer>
            )}
        />
    )
}
