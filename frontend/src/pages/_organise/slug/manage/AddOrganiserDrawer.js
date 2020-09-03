import React, { useState, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItemText,
    ListItem,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import Button from 'components/generic/Button'
import TextInput from 'components/inputs/TextInput'
import UserProfilesService from 'services/userProfiles'

export default ({ isOpen, onClose, onAdded, organisers, slug }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [results, setResults] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = useCallback(() => {
        UserProfilesService.queryUsers(idToken, searchValue)
            .then(users => {
                if (users.length === 0) {
                    dispatch(SnackbarActions.show('No users found'))
                }
                setResults(users)
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... Please try again.',
                    ),
                )
            })
    }, [searchValue, idToken, dispatch])

    const handleAdd = useCallback(
        user => {
            onAdded(user.userId)
            onClose()
        },
        [onAdded, onClose],
    )

    return (
        <Drawer anchor="right" onClose={onClose} open={isOpen}>
            <Box width="500px" p={3}>
                <Typography variant="h6" gutterBottom>
                    Search for users
                </Typography>
                <TextInput
                    placeholder="Name / email"
                    value={searchValue}
                    onChange={setSearchValue}
                />
                <Box p={1} />
                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={handleSearch}
                >
                    Search
                </Button>
                <Box p={1} />
                <List>
                    {results.map(user => (
                        <ListItem key={user.userId}>
                            <ListItemText
                                primary={`${user.firstName} ${user.lastName}`}
                                secondary={user.userId}
                            />
                            {organisers.indexOf(user.userId) === -1 ? (
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => handleAdd(user)}>
                                        <AddIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            ) : (
                                <ListItemSecondaryAction>
                                    <Typography variant="button">
                                        Added
                                    </Typography>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
