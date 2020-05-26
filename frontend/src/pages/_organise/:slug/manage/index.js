import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { concat } from 'lodash-es'

import {
    ListItemSecondaryAction,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'

import * as OrganiserActions from 'redux/organiser/actions'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import Button from 'components/generic/Button'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import AddOrganiserDrawer from './AddOrganiserDrawer'

export default () => {
    const dispatch = useDispatch()

    const event = useSelector(OrganiserSelectors.event)
    const eventLoading = useSelector(OrganiserSelectors.eventLoading)
    const organiserProfiles = useSelector(OrganiserSelectors.organisers)

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { slug } = event

    useEffect(() => {
        dispatch(
            OrganiserActions.updateOrganisersForEvent(
                event.owner,
                event.organisers
            )
        ).catch(() => {
            dispatch(
                SnackbarActions.error(
                    'Oops, something went wrong... Unable to load organisers. Please try again.'
                )
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
                            'Oops, something went wrong... Unable to remove organiser'
                        )
                    )
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, slug]
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
                            'Oops, something went wrong... Please try again.'
                        )
                    )
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, slug]
    )

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
                        onClick={() => setDrawerOpen(true)}
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
                                        onClick={() =>
                                            handleOrganiserRemoved(
                                                profile.userId
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    <AddOrganiserDrawer
                        isOpen={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        onAdded={handleOrganiserAdded}
                        slug={event.slug}
                        organisers={concat(event.owner, event.organisers)}
                    />
                </>
            )}
        />
    )
}
