import React, { useState, useCallback } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
    Drawer,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
    Collapse,
    FormControl,
    InputLabel,
    Input,
    IconButton,
    Typography,
    List,
    ListItemText,
    ListItem,
    ListItemSecondaryAction,
    ListItemIcon,
    ListItemAvatar,
    Avatar,
} from '@material-ui/core'
import {
    Add,
    ExpandLess,
    ExpandMore,
    PersonAdd
} from '@material-ui/icons'

import * as RecruitmentActions from 'redux/recruitment/actions'
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
    const [dialogOpen, setDialogOpen] = useState(false)
    const [openedItemId, setOpenedItemId] = useState("");
    const [organization, setOrganisation] = useState("")

    //const handleDialogOpen = () => setDialogOpen(!dialogOpen)

    const handleDialogOpen = orgEvent => {
        let clickedItemId = orgEvent.currentTarget.id;
        console.log(clickedItemId, orgEvent)
        setOrganisation("")
        if (openedItemId === clickedItemId) {
            setDialogOpen(false)
            setOpenedItemId("")
        } else {
            setOpenedItemId(clickedItemId)
            setDialogOpen(true)
        }
        //setOpen(!open);
      };

    const handleDialogClose = () => setDialogOpen(false)

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
        user => {
            console.log(user, organization)
            onGrant(user.userId, organization)
            setOrganisation("")
            setOpenedItemId("")
            onClose()
        },
        [onGrant, onClose],
    )

    const handleGrant = useCallback(async () => {
        console.log("grantting access...")
        setLoading(true)
        try {
            console.log(openedItemId,
                         //selectedEvents,
                         organization.trim(),
                         slug)
            // await dispatch(
            //     RecruitmentActions.adminGrantRecruiterAccess(
            //         openedItemId,
            //         //selectedEvents,
            //         organisation.trim(),
            //     ),
            // )
            dispatch(SnackbarActions.success('Success!'))
            onClose()
        } catch (e) {
            dispatch(SnackbarActions.error('Something went wrong...'))
        } finally {
            setLoading(false)
        }
     }, [dispatch, openedItemId, /*selectedEvents,*/ organization, onClose])
    
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
                                                <strong>{user.email}</strong>
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
                                {recruiters.indexOf(user.userId) === -1 ? (
                                    <ListItemSecondaryAction id = {user.userId} onClick={handleDialogOpen}>
                                        {dialogOpen ? <ExpandLess /> : <ExpandMore />}
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
                                
                                    <Collapse in={openedItemId === user.userId} unmountOnExit>
                                 
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
                                            label="Organisation"
                                            placeholder="BigCorp Ltd."
                                        />
                                            
                                        </Grid>
                                        <Grid item>
                                            <IconButton  disabled={
                                                    loading || !organization 
                                                    } 
                                                    onClick={() => handleGrantAccess(user)}>
                                                <PersonAdd fontSize="medium"  />
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
