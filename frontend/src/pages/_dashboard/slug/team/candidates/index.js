import CandidateCard from 'components/cards/CandidateCard'
import { Formik, useFormik } from 'formik'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { forOwn } from 'lodash-es'
import NoTeam from 'components/Team/NoTeam'
import { set } from 'react-ga'
import Profile from 'components/Participant/Profile'
import Button from 'components/generic/Button'
import Filter from 'components/Team/Filter'
import {
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import junctionStyle from 'utils/styles'

export default () => {
    const classes = junctionStyle()
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const { slug } = event
    useEffect(() => {
        dispatch(DashboardActions.updateTeam(slug))
    }, [])
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const team = useSelector(DashboardSelectors.team)
    const [selected, setSelected] = useState(false)
    const [loadingCandidate, setLoadingCandidate] = useState(false)
    const [candidateId, setCandidateId] = useState('')
    const [candidateSelectedData, setCandidateSelectedData] = useState({})

    // const candidateList = team.candidates || []
    // if (team.candidates?.length > 0) {
    //     const userIds = team.candidates.map(candidate => candidate.userId)
    // }

    // let candidateSelectedData

    const fetchCandidateData = async CandidateUserId => {
        return await dispatch(
            DashboardActions.getCandidateProfileById(CandidateUserId),
        )
    }

    useEffect(() => {
        if (candidateId) {
            const getApplication = team.candidates.find(
                candidate => candidate.userId === candidateId,
            )
            const candidateApplication = {
                rolesApplied: getApplication.roles,
                motivation: getApplication.motivation,
            }
            setLoadingCandidate(true)
            fetchCandidateData(candidateId)
                .then(data =>
                    setCandidateSelectedData({
                        ...data,
                        ...candidateApplication,
                    }),
                )
                .catch(err => console.log(err))
                .finally(() => {
                    setLoadingCandidate(false)
                })
        }
    }, [candidateId])

    useEffect(() => {
        console.log('candidateSelectedData', candidateSelectedData)
    }, [candidateSelectedData])

    const onBack = () => {
        setSelected(false)
        setCandidateId('')
        setCandidateSelectedData({})
    }

    const onViewApplication = userId => {
        setSelected(true)
        setCandidateId(userId)
    }

    // TODO make all filter related stuff into a component for teams page and this page
    const [roleFilter, setRoleFilter] = useState('All roles')

    const onFilterChange = filter => {
        console.log('filter from page', filter)
        setRoleFilter(filter)
    }
    // team.candidates
    let candidateCards = []
    if (roleFilter !== 'All roles') {
        candidateCards = team.candidates.filter(candidate =>
            _.includes(
                candidate.roles.map(role => role.role),
                roleFilter,
            ),
        )
    } else {
        candidateCards = team?.candidates || []
    }

    const handleAccept = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true)
            dispatch(
                DashboardActions.acceptCandidateToTeam(
                    slug,
                    team.code,
                    candidateSelectedData.userId,
                ),
            )
                .then(() => {
                    dispatch(
                        SnackbarActions.success('Accepted new team member'),
                    )
                    onBack()
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... please try again.',
                        ),
                    )
                })
                .finally(() => {
                    formikBag.setSubmitting(false)
                })
        },
        [dispatch, candidateSelectedData],
    )

    const handleDecline = () => {
        dispatch(
            DashboardActions.declineCandidateToTeam(
                slug,
                team.code,
                candidateSelectedData.userId,
            ),
        )
            .then(() => {
                dispatch(SnackbarActions.success('Candidate declined'))
                onBack()
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... please try again.',
                    ),
                )
            })
    }

    const formik = useFormik({
        initialValues: {
            roles: candidateSelectedData.rolesApplied || [],
        },
        onSubmit: handleAccept,
    })

    return (
        <>
            {!selected &&
                (hasTeam && team.candidates?.length > 0 ? (
                    // TODO Make into component
                    <>
                        <div className="tw-mb-4">
                            <Filter
                                noFilterOption="All roles"
                                filterArray={team.teamRoles.map(
                                    role => role.role,
                                )}
                                onChange={onFilterChange}
                            />
                        </div>
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{
                                350: 1,
                                750: 2,
                                1440: 3,
                            }}
                        >
                            <Masonry>
                                {candidateCards.map(candidate => (
                                    <CandidateCard
                                        candidateData={candidate}
                                        onViewApplication={() => {
                                            onViewApplication(candidate.userId)
                                        }}
                                    />
                                ))}
                            </Masonry>
                        </ResponsiveMasonry>
                    </>
                ) : (
                    // TODO make prop to show different message when there are no candidates or teams to join
                    <div>No applications yet</div>
                ))}
            {selected &&
                !loadingCandidate &&
                !_.isEmpty(candidateSelectedData) && (
                    <>
                        <div className="tw-mb-4">
                            <Button
                                color="outlined_button"
                                variant="jOutlined"
                                onClick={onBack}
                            >
                                Back
                            </Button>
                        </div>
                        <Profile user={candidateSelectedData}>
                            <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-12 tw-mb-4">
                                <Typography
                                    className="tw-tracking-tight tw-font-medium"
                                    variant="h5"
                                    component="h5"
                                >
                                    Motivation
                                </Typography>
                                <Typography
                                    className="tw-text-lg tw-p-2"
                                    variant="body1"
                                    component="p"
                                >
                                    {candidateSelectedData.motivation}
                                </Typography>
                            </div>
                            <div className="tw-rounded-lg tw-shadow-md tw-bg-white tw-p-8 tw-flex tw-flex-col tw-gap-12 tw-mb-4">
                                {candidateSelectedData.rolesApplied?.length >
                                    0 && (
                                    <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full">
                                        <form onSubmit={formik.handleSubmit}>
                                            <FormControl
                                                component="fieldset"
                                                className="tw-w-full"
                                            >
                                                <FormLabel
                                                    component="legend"
                                                    className="tw-mb-4 tw-tracking-tight tw-font-medium tw-text-black tw-text-2xl"
                                                >
                                                    Applied for
                                                </FormLabel>

                                                <RadioGroup
                                                    aria-label="roles"
                                                    name="roles"
                                                    value={formik.values.roles}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    className="tw-flex tw-flex-col tw-gap-4"
                                                >
                                                    {candidateSelectedData.rolesApplied.map(
                                                        role => (
                                                            <FormControlLabel
                                                                value={
                                                                    role.role
                                                                }
                                                                control={
                                                                    <Radio
                                                                        className="tw-p-0"
                                                                        checkedIcon={
                                                                            <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                                                                <span
                                                                                    className={`tw-w-5 tw-h-5 tw-rounded-full ${classes.bgPrimary}`}
                                                                                ></span>
                                                                            </div>
                                                                        }
                                                                        icon={
                                                                            <span
                                                                                className={
                                                                                    classes.icon
                                                                                }
                                                                            />
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    role.role
                                                                }
                                                                className="tw-m-0 tw-border tw-border-gray-300 tw-border-solid tw-rounded-lg hover:tw-bg-gray-100 tw-p-4 tw-flex tw-items-center tw-gap-x-4"
                                                            />
                                                        ),
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                        </form>
                                        <Button
                                            variant="jContained"
                                            onClick={formik.submitForm}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={handleDecline}
                                            color="outlined_button"
                                            variant="jOutlined"
                                        >
                                            Decline
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Profile>
                    </>
                )}
        </>
    )
}
