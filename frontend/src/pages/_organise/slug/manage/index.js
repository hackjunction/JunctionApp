import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { concat } from 'lodash-es'

import {
    ListItemSecondaryAction,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton
} from '@material-ui/core'
import {
    Delete
} from '@material-ui/icons'

import * as OrganiserActions from 'redux/organiser/actions'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import Button from 'components/generic/Button'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import AddOrganiserDrawer from './AddOrganiserDrawer'
import AddRecruiterDrawer from './AddRecruiterDrawer'
import GrantRecruiterAccessDialog from './GrantRecruiterAccessDialog'

export default () => {
    const dispatch = useDispatch()

    const event = useSelector(OrganiserSelectors.event)
    const eventLoading = useSelector(OrganiserSelectors.eventLoading)
    const organiserProfiles = useSelector(OrganiserSelectors.organisers)

    const recruiterProfiles = useSelector(OrganiserSelectors.organisers)
    const events = useSelector(RecruitmentSelectors.events)

    const [grantingUser, setGrantingUser] = useState()
    const [organizerDrawerOpen, setOrganizerDrawerOpen] = useState(false)
    const [recruiterDrawerOpen, setRecruiterDrawerOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { slug } = event

    useEffect(() => {
        dispatch(
            OrganiserActions.updateOrganisersForEvent(
                event.owner,
                event.organisers,
            ),
        ).catch(() => {
            dispatch(
                SnackbarActions.error(
                    'Oops, something went wrong... Unable to load organisers. Please try again.',
                ),
            )
        })
    }, [event.organisers, event.owner, dispatch])

    const handleOrganiserRemoved = useCallback(
        userId => {
            setLoading(true)
            dispatch(OrganiserActions.removeOrganiserFromEvent(slug, userId))
                .then(() => {
                    dispatch(SnackbarActions.success('Organiser removed'))
                })
                .catch(() => {
                    dispatch(
                        SnackbarActions.error(
                            'Oops, something went wrong... Unable to remove organiser',
                        ),
                    )
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, slug],
    )

    const handleRecruiterRemoved = useCallback(
        
        userId => {
            setLoading(true)
            dispatch(RecruitmentActions.adminRevokeRecruiterAccess(userId))
                .then(() => {
                dispatch(SnackbarActions.success('Success!'))
            })
            .catch (() => {
                dispatch(SnackbarActions.error(
                    'Something went wrong... Unable to remove recruiter'
                    ),
                )
            })
            .finally(() => {
                setLoading(false)
            })
        },
        [dispatch, slug],
    )




    const handleOrganiserAdded = useCallback(
        userId => {
            setLoading(true)
            dispatch(OrganiserActions.addOrganiserToEvent(slug, userId))
                .then(() => {
                    dispatch(SnackbarActions.success('Added organiser'))
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Oops, something went wrong... Please try again.',
                        ),
                    )
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, slug],
    )

    const handleRecruiterAdded = useCallback(
        async (userId, organization) => {
            console.log(userId, organization)
            console.log("grantting access...")
            setLoading(true)
            try {
                console.log(userId,
                             events.filter(recruiter_event => recruiter_event._id === event.id),
                             organization.trim(),
                             slug)
                //  await dispatch(
                //     RecruitmentActions.adminGrantRecruiterAccess(
                //         openedItemId,
                //         selectedEvents,
                //         organisation.trim(),
                //     ),
                // )
                dispatch(SnackbarActions.success('Success!'))
                //onClose()
            } catch (e) {
                dispatch(SnackbarActions.error('Something went wrong...'))
            } finally {
                setLoading(false)
            }
         }, [dispatch, slug])





        //  const handleGrantAccess = useCallback(async () => {
        //     setLoading(true)
        //     try {
        //         await dispatch(
        //             RecruitmentActions.adminGrantRecruiterAccess(
        //                 userId,
        //                 selectedEvents,
        //                 organisation.trim(),
        //             ),
        //         )
        //         dispatch(SnackbarActions.success('Success!'))
        //         onClose()
        //     } catch (e) {
        //         dispatch(SnackbarActions.error('Something went wrong...'))
        //     } finally {
        //         setLoading(false)
        //     }
        // }, [dispatch, userId, selectedEvents, organisation, onClose])








    return (
        <PageWrapper
            loading={eventLoading}
            error={!event && !eventLoading}
            render={() => (
                <>
                    <PageHeader
                        heading="Organisers"
                        subheading="Manage who has access to edit this event"
                    />
                    <Button
                        loading={loading}
                        color="primary"
                        variant="contained"
                        onClick={() => setOrganizerDrawerOpen(true)}
                    >
                        Add organisers
                    </Button>
                    <List>
                        {organiserProfiles.map(profile => (
                            <ListItem key={profile.userId} divider>
                                <ListItemText
                                    primary={`${profile.firstName} ${profile.lastName}`}
                                    secondary={profile.email}
                                />
                                <ListItemSecondaryAction>
                                <Button
                                    loading={loading}
                                    color="error"
                                    variant="contained"
                                    onClick={() =>
                                        handleOrganiserRemoved(
                                            profile.userId,
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    <AddOrganiserDrawer
                        isOpen={organizerDrawerOpen}
                        onClose={() => setOrganizerDrawerOpen(false)}
                        onAdded={handleOrganiserAdded}
                        slug={event.slug}
                        organisers={concat(event.owner, event.organisers)}
                    />

                    <Box p={5} />

                    <PageHeader
                        heading="Recruiters"
                        subheading="Manage who has access to recruiter tools"
                    />
                    <Button
                        loading={loading}
                        color="primary"
                        variant="contained"
                        onClick={() => setRecruiterDrawerOpen(true)}
                    >
                        Add recruiters
                    </Button>
                    <List>
                        {recruiterProfiles.map(profile => (
                            <ListItem key={profile.userId} divider>
                                <ListItemText
                                    primary={`${profile.firstName} ${profile.lastName}`}
                                    secondary={profile.email}
                                />
                                <ListItemSecondaryAction>
                                <Button
                                    loading={loading}
                                    color="error"
                                    variant="contained"
                                    onClick={() =>
                                        handleRecruiterRemoved(
                                            profile.userId,
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    <AddRecruiterDrawer
                        isOpen={recruiterDrawerOpen}
                        onClose={() => {
                            setRecruiterDrawerOpen(false)
                        }}
                        onGrant={handleRecruiterAdded}
                        slug={event.slug}
                        recruiters={concat(event.recruiters)}
                    />
                </>
                
            )}
        />
    )
}
