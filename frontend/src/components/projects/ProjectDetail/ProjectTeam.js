import React, { useState, useEffect, useCallback } from 'react'

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

const ProjectTeam = React.memo(({ hiddenUsers, teamId, showFullTeam }) => {
    const [teamMembers, setTeamMembers] = useState()
    const [loading, setLoading] = useState(false)
    // TODO IMPORTANT hide team members in backend
    const fetchTeamMembers = useCallback(async () => {
        if (!teamId) return
        setLoading(true)
        try {
            const data = await UserProfilesService.getPublicUserProfilesByTeam(
                teamId,
            )
            setTeamMembers(data.filter(i => !hiddenUsers.includes(i.userId)))
        } catch (err) {}
        setLoading(false)
    }, [hiddenUsers, teamId])

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
            member.phoneNumber ? member.phoneNumber.country_code : ''
        } ${member.phoneNumber ? member.phoneNumber.number : ''}`
    }

    return (
        <List>
            {teamMembers.map(member => (
                <ListItem key={member.userId}>
                    <ListItemAvatar>
                        <Avatar src={member.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${member.firstName} ${member.lastName}`}
                        secondary={secondaryText(member)}
                    />
                </ListItem>
            ))}
        </List>
    )
})

export default ProjectTeam
