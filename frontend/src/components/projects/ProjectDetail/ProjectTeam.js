import React, { useState, useEffect, useCallback } from 'react';

import { CircularProgress, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

import UserProfilesService from 'services/userProfiles';

const ProjectTeam = React.memo(({ teamId }) => {
    const [teamMembers, setTeamMembers] = useState();
    const [loading, setLoading] = useState(false);

    const fetchTeamMembers = useCallback(async () => {
        if (!teamId) return;
        setLoading(true);
        try {
            const data = await UserProfilesService.getPublicUserProfilesByTeam(teamId);
            setTeamMembers(data);
        } catch (err) {}
        setLoading(false);
    }, [teamId]);

    useEffect(() => {
        fetchTeamMembers();
    }, [fetchTeamMembers]);

    if (loading) {
        return (
            <Box p={2}>
                <CircularProgress />
            </Box>
        );
    }

    if (!teamMembers) {
        return null;
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
                        secondary={`${member.email} // ${member.phoneNumber ? member.phoneNumber.country_code : ''} ${
                            member.phoneNumber ? member.phoneNumber.number : ''
                        }`}
                    />
                </ListItem>
            ))}
        </List>
    );
});

export default ProjectTeam;
