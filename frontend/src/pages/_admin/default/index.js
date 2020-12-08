import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import Container from 'components/generic/Container'

import NewHackerpackForm from './NewHackerpackForm'
import HackerpackList from './HackerpackList'

import NewOrganizationForm from './NewOrganizationForm'
import OrganizationList from './OrganizationList'
import NewBannerForm from './NewBannerForm'
import BannerList from './BannerList'

import UnapprovedEvents from './UnapprovedEvents'
import EventPriority from './EventPriority'

export default () => {
    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container center>
                    <NewHackerpackForm />
                    <HackerpackList />

                    <NewOrganizationForm />
                    <OrganizationList />

                    <UnapprovedEvents />
                    <NewBannerForm />
                    <BannerList />

                    <EventPriority />
                </Container>
            )}
        />
    )
}
