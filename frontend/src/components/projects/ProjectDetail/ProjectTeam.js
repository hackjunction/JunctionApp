import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ShowIfPermission from 'hocs/ShowIfPermission'
import { Auth as AuthConstants } from '@hackjunction/shared'
import ExternalLink from 'components/generic/ExternalLink'
import { useSelector } from 'react-redux'
import * as AuthSelectors from 'redux/auth/selectors'

import {
    CircularProgress,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from '@material-ui/core'

import UserProfilesService from 'services/userProfiles'

const RecruitmentLink = ({ memberId }) => {
    return (
        <ExternalLink
            href={`${process.env.REACT_APP_BASE_URL}/recruitment/${memberId}`}
        >
            <ListItemText>Interested in recruitment</ListItemText>
        </ExternalLink>
    )
}

const IfRecruiter = ShowIfPermission(RecruitmentLink, [
    AuthConstants.Permissions.ACCESS_RECRUITMENT,
])

const ProjectTeam = React.memo(({ hiddenUsers, teamId, showFullTeam }) => {
    const [teamMembers, setTeamMembers] = useState()
    const [loading, setLoading] = useState(false)
    const idToken = useSelector(AuthSelectors.getIdToken)
    const hasRecruiterAccess = useSelector(AuthSelectors.hasRecruiterAccess)
    // TODO IMPORTANT hide team members in backend
    const fetchTeamMembers = useCallback(async () => {
        if (!teamId) return
        setLoading(true)
        try {
            if (hasRecruiterAccess) {
                console.log('has recruiter access')
                const data = await UserProfilesService.getUserProfilesByTeamId(
                    teamId,
                    idToken,
                )
                console.log('data', data)
                setTeamMembers(
                    data.filter(i => !hiddenUsers.includes(i.userId)),
                )
            } else {
                const data =
                    await UserProfilesService.getPublicUserProfilesByTeam(
                        teamId,
                    )
                setTeamMembers(
                    data.filter(i => !hiddenUsers.includes(i.userId)),
                )
            }
        } catch (err) {}
        setLoading(false)
    }, [hasRecruiterAccess, hiddenUsers, idToken, teamId])

    useEffect(() => {
        fetchTeamMembers()
    }, [fetchTeamMembers])

    if (loading) {
        return (
            <Box p={2}>
                <CircularProgress />
            </Box>
        )
    }

    if (!teamMembers) {
        return null
    }

    const secondaryText = member => {
        if (!showFullTeam) return null
        return `${member.email} // ${
            member.phoneNumber ? member.phoneNumber.countryCode : ''
        } ${member.phoneNumber ? member.phoneNumber.number : ''}`
    }
    return (
        <List>
            {teamMembers.map(member => {
                return (
                    <ListItem key={member.userId}>
                        <ListItemAvatar>
                            <Avatar src={member.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${member.firstName} ${member.lastName}`}
                            secondary={secondaryText(member)}
                        />
                        {typeof member.recruitmentOptions !== 'undefined' &&
                            member.recruitmentOptions.consent && (
                                <IfRecruiter memberId={member.userId} />
                            )}
                    </ListItem>
                )
            })}
        </List>
    )
})

export default ProjectTeam
