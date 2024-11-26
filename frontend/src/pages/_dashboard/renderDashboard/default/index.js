import React from 'react'

import { useResolvedPath, useLocation } from 'react-router'
//
import { useDispatch, useSelector } from 'react-redux'
//

import SidebarLayout from 'components/layouts/SidebarLayout' //TODO: make normal sidepar work with default view
import BasicNavBar from 'components/navbars/BasicNavBar'
import PageWrapper from 'components/layouts/PageWrapper'
import defaultImage from 'assets/images/dashboardDefault.jpg'

export default () => {
    // const match = useRouteMatch()
    const url = useResolvedPath('').pathname
    const location = useLocation()

    return (
        <PageWrapper wrapContent={false}>
            <SidebarLayout
                baseRoute={url}
                location={location}
                sidebarTopContent={
                    <img src={defaultImage} width={250} height={250}></img>
                }
                topContent={<BasicNavBar />}
                routes={[]}
            />
        </PageWrapper>
    )
}
