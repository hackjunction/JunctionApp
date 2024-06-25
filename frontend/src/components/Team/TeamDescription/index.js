import { Typography } from '@mui/material'
import React from 'react'

export default ({
    teamSubtitle = '',
    teamDescription = '',
    teamIdea,
    teamIdeaDescription,
}) => {
    return (
        <div className="tw-flex tw-flex-col tw-gap-8">
            <div className="tw-flex tw-flex-col tw-gap-4">
                {teamSubtitle && (
                    <Typography
                        className="tw-font-semibold"
                        variant="h6"
                        component="h6"
                    >
                        {teamSubtitle}
                    </Typography>
                )}
                {teamDescription && (
                    <Typography
                        className="tw-text-lg"
                        variant="body1"
                        component="p"
                    >
                        {teamDescription}
                    </Typography>
                )}
            </div>
            {teamIdea && teamIdeaDescription && (
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <Typography
                        className="tw-font-semibold"
                        variant="h6"
                        component="h6"
                    >
                        {teamIdea}
                    </Typography>
                    <Typography
                        className="tw-text-lg"
                        variant="body1"
                        component="p"
                    >
                        {teamIdeaDescription}
                    </Typography>
                </div>
            )}
        </div>
    )
}
