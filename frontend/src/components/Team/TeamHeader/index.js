import { Typography } from '@material-ui/core'
import React from 'react'

export default ({
    teamName = 'Test',
    teamChallenge = 'Test',
    teamCode = '',
    viewMode = 'profile',
}) => {
    const styling = {
        teamNameTypography: '',
        teamChallengeTypography: '',
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
            <div className="tw-flex tw-justify-between tw-items-center tw-gap-4">
                <Typography
                    className="tw-font-bold tw-tracking-tight tw-break-words-overflow"
                    variant={styling.teamNameTypography}
                    component={styling.teamNameTypography}
                >
                    {teamName}
                </Typography>
                <Typography
                    className="tw-tracking-tight tw-font-medium"
                    variant={styling.teamChallengeTypography}
                    color="secondary"
                    component={styling.teamChallengeTypography}
                >
                    #{teamChallenge}
                </Typography>
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
