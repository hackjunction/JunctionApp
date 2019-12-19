import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core'
import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'

import * as RecruitmentActions from 'redux/recruitment/actions'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'

export default ({ onGrant, onRevoke }) => {
    const dispatch = useDispatch()
    const searchResults = useSelector(RecruitmentSelectors.adminSearchResults)
    const [searchQuery, setSearchQuery] = useState('')
    return (
        <Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="flex-end"
                mb={1}
            >
                <TextInput
                    label="Search users by name or email"
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
                <Box p={1} />
                <Button
                    disabled={searchQuery.length === 0}
                    color="primary"
                    variant="contained"
                    onClick={() =>
                        dispatch(
                            RecruitmentActions.updateAdminSearchResults(
                                searchQuery
                            )
                        )
                    }
                >
                    Search
                </Button>
            </Box>
            <List>
                {searchResults.map(user => (
                    <ListItem key={user.userId}>
                        <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            secondary={user.email}
                        />
                        <ListItemSecondaryAction>
                            {user.recruiterEvents &&
                            user.recruiterEvents.length > 0 ? (
                                <Button
                                    color="secondary"
                                    onClick={() => onRevoke(user.userId)}
                                >
                                    Revoke access
                                </Button>
                            ) : (
                                <Button
                                    color="primary"
                                    onClick={() => onGrant(user.userId)}
                                >
                                    Grant access
                                </Button>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
