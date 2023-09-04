import React from 'react'

import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import PageWrapper from 'components/layouts/PageWrapper'
import TeamsTable from 'components/tables/TeamsTable'

export default () => {
    const teams = useSelector(OrganiserSelectors.teams)
    const registrationsLoading = useSelector(
        OrganiserSelectors.registrationsLoading,
    )
    const teamsLoading = useSelector(OrganiserSelectors.teamsLoading)

    return (
        <PageWrapper>
            <TeamsTable
                loading={registrationsLoading || teamsLoading}
                teams={teams}
            />
        </PageWrapper>
    )
}
