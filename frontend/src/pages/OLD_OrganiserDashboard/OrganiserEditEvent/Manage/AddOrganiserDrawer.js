import React, { useState, useCallback } from 'react'

import { withSnackbar } from 'notistack'
import { connect } from 'react-redux'
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
import Button from 'components/generic/Button'
import TextInput from 'components/inputs/TextInput'
import UserProfilesService from 'services/userProfiles'

const AddOrganiserDrawer = ({
    isOpen,
    onClose,
    onAdded,
    idToken,
    organisers,
    slug,
    enqueueSnackbar,
}) => {
    const [results, setResults] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = useCallback(() => {
        UserProfilesService.queryUsers(idToken, searchValue)
            .then(users => {
                if (users.length === 0) {
                    enqueueSnackbar('No users found')
                }
                setResults(users)
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong... Please try again.', {
                    variant: 'error',
                })
            })
    }, [searchValue, idToken, enqueueSnackbar])

    const handleAdd = useCallback(
        user => {
            onAdded(user.userId)
            onClose()
        },
        [onAdded, onClose]
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

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
})

export default withSnackbar(connect(mapStateToProps)(AddOrganiserDrawer))
