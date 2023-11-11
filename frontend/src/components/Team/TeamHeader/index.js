import { Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'

export default ({
    teamName,
    teamChallenge = null,
    teamCode,
    viewMode = 'profile',
}) => {
    const styling = {
        teamNameTypography: '',
        teamChallengeTypography: '',
    }

    let challengeName = null
    let event = useSelector(DashboardSelectors.event)
    if(event === null){
        console.log("from organiser")
        event = useSelector(OrganiserSelectors.event)
    }
    console.log("event",event)
    if (teamChallenge && typeof teamChallenge === 'string') {
        const challengeDetails = event.challenges.find(
            challenge => challenge._id === teamChallenge,
        )
        challengeName = challengeDetails?.name
    }

    switch (viewMode) {
        case 'profile':
            styling.teamChallengeTypography = 'h5'
            styling.teamNameTypography = 'h3'
            break
        case 'gallery':
            styling.teamChallengeTypography = 'h6'
            styling.teamNameTypography = 'h4'
            break
        default:
            break
    }

    return (
        <div className="tw-flex tw-flex-col tw-gap-2">
            <div
                className={`tw-flex ${
                    challengeName?.length > 10 || teamName?.length > 6
                        ? 'tw-flex-col'
                        : 'tw-items-center'
                } tw-gap-4`}
            >
                <Typography
                    className="tw-font-bold tw-tracking-tight tw-break-words-overflow"
                    variant={styling.teamNameTypography}
                    component={styling.teamNameTypography}
                >
                    {teamName}
                </Typography>
                {challengeName && (
                    <Typography
                        className="tw-tracking-tight tw-font-medium"
                        variant={styling.teamChallengeTypography}
                        color="secondary"
                        component={styling.teamChallengeTypography}
                    >
                        #{challengeName}
                    </Typography>
                )}
            </div>
            {teamCode && (
                <Typography
                    className="tw-font-semibold tw-text-gray-600"
                    variant="body1"
                    component="p"
                >
                    Team code {teamCode}
                </Typography>
            )}
        </div>
    )
}
