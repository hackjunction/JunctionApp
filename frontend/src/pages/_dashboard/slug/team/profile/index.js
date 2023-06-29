import { Typography } from '@material-ui/core'
import NoTeam from 'components/Team/NoTeam'
import TeamProfile from 'components/Team/TeamProfile'
import Button from 'components/generic/Button'
import Empty from 'components/generic/Empty'
import React from 'react'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import { useSelector } from 'react-redux'

export default () => {
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const team = useSelector(DashboardSelectors.team)
    return <>{hasTeam ? <TeamProfile teamData={team} /> : <NoTeam />}</>
}
