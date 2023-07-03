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
    return (
        <>
            {hasTeam ? <TeamProfile teamData={team} /> : <NoTeam />}
            <div>
                <div>
                    <div>Challenge</div>
                    <div>challenge note</div>
                    <div>Select challenge</div>
                </div>
                <div>
                    <div>Team name</div>
                    <div>Input team name</div>
                </div>
                <div>
                    <div>Title of the idea explored bu your team</div>
                    <div>Input title</div>
                </div>
                <div>
                    <div>Brief explanation of the idea</div>
                    <div>Input brief explanation</div>
                </div>
                <div>
                    <div>List current members of your team</div>
                    <div>Input members</div>
                </div>
                <div>
                    <div>Avaialble roles in your team</div>
                    <div>Input roles</div>
                </div>
                <div>
                    <div>Upload team's background picture</div>
                    <div>Input background picture</div>
                </div>
                <div>
                    <div>Team's contact email</div>
                    <div>Input contact email</div>
                </div>
                <div>
                    <div>Team's Telegram/Discord link</div>
                    <div>Input link</div>
                </div>
                <div>
                    <button>Create team</button>
                </div>
            </div>
        </>
    )
}
