import React from 'react'

import { useRouteMatch, useLocation } from 'react-router'

import SidebarLayout from 'components/layouts/SidebarLayout' //TODO: make normal sidepar work with default view
import BasicNavBar from 'components/navbars/BasicNavBar'
import PageWrapper from 'components/layouts/PageWrapper'

export default () => {
    const match = useRouteMatch()
    const location = useLocation()

    return (
        <PageWrapper wrapContent={false}>
            <SidebarLayout
                baseRoute={match.url}
                location={location}
                sidebarTopContent={null}
                topContent={<BasicNavBar />}
                routes={[]}
            />
        </PageWrapper>
    )
}
