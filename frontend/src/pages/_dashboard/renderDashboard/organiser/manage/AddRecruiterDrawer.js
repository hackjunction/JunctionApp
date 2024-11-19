import React, { useState, useCallback, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
    Drawer,
    Box,
    Grid,
    Collapse,
    IconButton,
    Typography,
    List,
    ListItemText,
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core'
import { ExpandLess, ExpandMore, PersonAdd } from '@material-ui/icons'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import Button from 'components/generic/Button'
import TextInput from 'components/inputs/TextInput'
import UserProfilesService from 'services/userProfiles'

export default ({ isOpen, onClose, onGrant, recruiters, slug }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [results, setResults] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [organizationDialogOpen, setOrganizationDialogOpen] = useState(false)
    const [openedItemId, setOpenedItemId] = useState('')
    const [organization, setOrganisation] = useState('')

    useEffect(() => {
        setOrganisation('')
        setOrganizationDialogOpen(false)
        setOpenedItemId('')
    }, [onClose])

    const handleOrganizationDialogOpen = orgEvent => {
        let clickedItemId = orgEvent.currentTarget.id
        setOrganisation('')
        if (openedItemId === clickedItemId) {
            setOrganizationDialogOpen(false)
            setOpenedItemId('')
        } else {
            setOpenedItemId(clickedItemId)
            setOrganizationDialogOpen(true)
        }
    }

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

    const handleGrantAccess = useCallback(
        (user, organization) => {
            onGrant(user.userId, organization)
            setOrganisation('')
            setOpenedItemId('')
            onClose()
        },
        [onGrant, onClose],
    )

    return (
        <Drawer anchor="right" onClose={onClose} open={isOpen}>
            <Box width="500px" p={3}>
                <Typography variant="h6" gutterBottom>
                    Search for users
                </Typography>
                <TextInput
                    placeholder="Search by first name, last name or e-mail address"
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
                            <Grid
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <Grid item>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={'User avatar image'}
                                            src={user ? user.avatar : ''}
                                        />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={`${user.firstName} ${user.lastName}`}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="p"
                                                    variant="body2"
                                                >
                                                    E-mail:{' '}
                                                    <strong>
                                                        {user.email}
                                                    </strong>
                                                </Typography>
                                                <Typography
                                                    component="p"
                                                    variant="body2"
                                                >
                                                    Account created:{' '}
                                                    <strong>
                                                        {new Date(
                                                            user.createdAt,
                                                        ).toLocaleString()}
                                                    </strong>
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    {recruiters
                                        .map(x => x.recruiterId)
                                        .indexOf(user.userId) === -1 ? (
                                        <ListItemSecondaryAction
                                            id={user.userId}
                                            onClick={
                                                handleOrganizationDialogOpen
                                            }
                                        >
                                            {organizationDialogOpen ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItemSecondaryAction>
                                    ) : (
                                        <ListItemSecondaryAction>
                                            <Typography variant="button">
                                                Added
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    )}
                                </Grid>
                                <Grid item>
                                    <Collapse
                                        in={openedItemId === user.userId}
                                        unmountOnExit
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Grid item>
                                                <TextInput
                                                    value={organization}
                                                    onChange={setOrganisation}
                                                    placeholder="BigCorp Ltd."
                                                />
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    disabled={
                                                        loading || !organization
                                                    }
                                                    onClick={() =>
                                                        handleGrantAccess(
                                                            user,
                                                            organization,
                                                        )
                                                    }
                                                >
                                                    <PersonAdd fontSize="medium" />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
