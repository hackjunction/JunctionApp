import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { concat } from 'lodash-es'

import {
    ListItemSecondaryAction,
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material'

import * as OrganiserActions from 'reducers/organiser/actions'
import * as OrganiserSelectors from 'reducers/organiser/selectors'
import * as RecruitmentActions from 'reducers/recruitment/actions'
import * as SnackbarActions from 'reducers/snackbar/actions'
import * as DashboardActions from 'reducers/dashboard/actions'

import Button from 'components/generic/Button'
import PageWrapper from 'components/layouts/PageWrapper'

import AddOrganiserDrawer from './AddOrganiserDrawer'
import AddRecruiterDrawer from './AddRecruiterDrawer'

export default () => {
    const dispatch = useDispatch()

    const event = useSelector(OrganiserSelectors.event)
    const eventLoading = useSelector(OrganiserSelectors.eventLoading)
    const organiserProfiles = useSelector(OrganiserSelectors.organisers)

    const recruiterProfilesMap = useSelector(
        OrganiserSelectors.eventRecruitersMap,
    )
    const eventRecruiterProfiles = event.recruiters

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

    // useEffect(() => {
    //     console.log("updating recuiters....", event)
    //     dispatch(
    //         RecruitmentActions.updateRecruitersForEvent(
    //             event.recruiters,
    //         ),
    //     ).catch(() => {
    //         dispatch(
    //             SnackbarActions.error(
    //                 'Oops, something went wrong... Unable to load partners. Please try again.',
    //             ),
    //         )
    //     })
    // }, [event.recruiters, dispatch])

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
        async userId => {
            setLoading(true)
            await dispatch(
                RecruitmentActions.deleteRecruiterEvent(userId, event._id),
            )
                .then(async () => {
                    await dispatch(
                        OrganiserActions.removeRecruiterFromEvent(slug, userId),
                    )
                })
                .then(() => {
                    dispatch(SnackbarActions.success('Success!'))
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... Unable to remove recruiter',
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
            setLoading(true)
            await dispatch(
                RecruitmentActions.addRecruiterEvent(
                    userId,
                    event._id,
                    organization.trim(),
                ),
            )
                .then(async () => {
                    await dispatch(
                        OrganiserActions.addRecruiterToEvent(
                            slug,
                            userId,
                            organization.trim(),
                        ),
                    )
                })
                .then(() => {
                    dispatch(
                        DashboardActions.createPartnerRegistration(
                            userId,
                            slug,
                        ),
                    )
                })
                .then(() => {
                    dispatch(SnackbarActions.success('Success!'))
                    //onClose()
                })
                .catch(err => {
                    dispatch(SnackbarActions.error('Something went wrong...'))
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [dispatch, slug],
    )

    return (
        <PageWrapper
            loading={eventLoading}
            error={!event && !eventLoading}
            render={() => (
                <>
                    <div className="tw-flex-column tw-items-center tw-mb-8 ">
                        <Typography
                            className="tw-font-bold tw-tracking-tight"
                            variant="h4"
                            component="h3"
                        >
                            Organisers
                        </Typography>
                        <Typography
                            className="tw-font-normal tw-tracking-tight "
                            variant="subtitle1"
                        >
                            Manage who has access to edit this event
                        </Typography>
                    </div>
                    <div className="tw-flex-column tw-items-center  tw-mb-6 tw-rounded-sm">
                        <Button
                            loading={loading}
                            color="primary"
                            variant="jContained"
                            onClick={() => setOrganizerDrawerOpen(true)}
                        >
                            Add organisers
                        </Button>
                    </div>

                    <List>
                        {organiserProfiles.map(profile => (
                            <div className="tw-flex-column tw-items-center  tw-m-2 tw-rounded-md tw-shadow ">
                                <ListItem key={profile.userId} divider>
                                    <ListItemText
                                        primary={`${profile.firstName} ${profile.lastName}`}
                                        secondary={profile.email}
                                    />
                                    <ListItemSecondaryAction>
                                        <Button
                                            loading={loading}
                                            color="error"
                                            variant="jContained"
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
                            </div>
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
                    <div className="tw-flex-column tw-items-center tw-mb-8 ">
                        <Typography
                            className="tw-font-bold tw-tracking-tight"
                            variant="h4"
                            component="h4"
                        >
                            Partners
                        </Typography>
                        <Typography
                            className="tw-font-normal tw-tracking-tight "
                            variant="subtitle1"
                        >
                            Manage who has access to partner tools
                        </Typography>
                    </div>
                    <Button
                        loading={loading}
                        color="primary"
                        variant="jContained"
                        onClick={() => setRecruiterDrawerOpen(true)}
                    >
                        Add partners
                    </Button>
                    <List>
                        {eventRecruiterProfiles?.map(rec => (
                            <div className="tw-flex-column tw-items-center  tw-m-2 tw-rounded-md tw-shadow ">
                                <ListItem key={rec.recruiterId} divider>
                                    <ListItemText
                                        primary={`${
                                            recruiterProfilesMap[
                                                rec.recruiterId
                                            ]?.firstName
                                        } ${
                                            recruiterProfilesMap[
                                                rec.recruiterId
                                            ]?.lastName
                                        }             |               ${
                                            rec.organization
                                        }`}
                                        secondary={
                                            recruiterProfilesMap[
                                                rec.recruiterId
                                            ]?.email
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Button
                                            loading={loading}
                                            color="error"
                                            variant="jContained"
                                            onClick={() =>
                                                handleRecruiterRemoved(
                                                    rec.recruiterId,
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </div>
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
