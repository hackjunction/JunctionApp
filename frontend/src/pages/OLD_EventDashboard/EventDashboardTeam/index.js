import React from 'react'

import { connect } from 'react-redux'
import { Box } from '@material-ui/core'

import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import JoinTeam from './JoinTeam'
import EditTeam from './EditTeam'

const TeamPage = ({ event, hasTeam, loading }) => {
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

const mapState = state => ({
    loading:
        DashboardSelectors.teamLoading(state) ||
        DashboardSelectors.eventLoading(state),
    event: DashboardSelectors.event(state),
    hasTeam: DashboardSelectors.hasTeam(state),
})

export default connect(mapState)(TeamPage)
