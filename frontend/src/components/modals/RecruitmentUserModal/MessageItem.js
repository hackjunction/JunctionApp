import React, { useEffect, useState } from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';

import UserProfilesService from 'services/userProfiles';

export const MessageItem = props => {
  const [profile, setProfile] = useState({
    firstName: 'Loading',
    lastName: 'User',
    avatar: ''
  });

  const { action } = props;

  useEffect(() => {
    UserProfilesService.getPublicUserProfiles(action.recruiter).then(data => {
      setProfile(data[0]);
      console.log(data);
    });
  }, [action]);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          src={profile.avatar}
          alt={profile.firstName + ' ' + profile.lastName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={profile.firstName + ' ' + profile.lastName}
        secondary={action.data.message}
      />
    </ListItem>
  );
};
