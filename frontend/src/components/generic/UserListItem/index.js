import React from 'react'
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from '@material-ui/core'

const UserListItem = ({
    user,
    selectable = false,
    selected = false,
    onSelect = () => {},
}) => {
    const userName = user ? `${user.firstName} ${user.lastName}` : ''
    const userEmail = user ? user.email : ''

    return (
        <ListItem button={selectable} onClick={onSelect} selected={selected}>
            {user ? (
                <>
                    <ListItemAvatar>
                        <Avatar alt={userName} src={user ? user.avatar : ''} />
                    </ListItemAvatar>
                    <ListItemText primary={userName} secondary={userEmail} />
                </>
            ) : (
                <ListItemText primary="No one" />
            )}
        </ListItem>
    )
}

export default UserListItem
