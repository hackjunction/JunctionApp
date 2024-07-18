import { Typography } from '@material-ui/core'
import ParticipantPreview from 'components/Participant/ParticipantPreview'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default ({
    viewModeStyle = 'list',
    teamMembers = [],
    enabledTeamMemberView = false,
}) => {
    const { t } = useTranslation()
    return (
        <div className="tw-flex tw-flex-col tw-gap-4">
            <Typography
                className="tw-tracking-tight tw-font-medium"
                variant="h5"
                component="h5"
            >
                {t('Team_members_')}
                {/* Team members */}
            </Typography>
            {teamMembers?.map((member, index) => {
                return (
                    <ParticipantPreview
                        key={index}
                        viewMode={viewModeStyle}
                        userData={member}
                        enabledView={enabledTeamMemberView}
                    />
                )
            })}
        </div>
    )
}
