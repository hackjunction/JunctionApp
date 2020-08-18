import React from 'react'

import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'

import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import JoinTeam from './JoinTeam'
import EditTeam from './EditTeam'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const teamLoading = useSelector(DashboardSelectors.teamLoading)
    const eventLoading = useSelector(DashboardSelectors.eventLoading)
    const loading = teamLoading || eventLoading

    return (
        <Box>
            <PageHeader
                heading="Team"
                subheading={
                    loading ? '' : `Configure your team for ${event.name}`
                }
            />
            <Box mt={2} />
            <PageWrapper loading={loading}>
                {hasTeam ? <EditTeam /> : <JoinTeam />}
            </PageWrapper>
        </Box>
    )
}
