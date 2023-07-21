import { Typography } from '@material-ui/core'
import NoTeam from 'components/Team/NoTeam'
import TeamProfile from 'components/Team/TeamProfile'
import Button from 'components/generic/Button'
import Empty from 'components/generic/Empty'
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useDispatch, useSelector } from 'react-redux'
import { FastField, Formik } from 'formik'
import FormControl from 'components/inputs/FormControl'
import Select from 'components/inputs/Select'
import {
    ReviewingMethods,
    OverallReviewingMethods,
    EventTypes,
} from '@hackjunction/shared'
import * as yup from 'yup'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import JobRoleInput from 'components/inputs/JobRoleInput'
import ImageUpload from 'components/inputs/ImageUpload'
import BottomBar from 'components/inputs/BottomBar'
import TeamCreateEditForm from 'components/Team/TeamCreateEditForm'

export default () => {
    const dispatch = useDispatch()
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const team = useSelector(DashboardSelectors.team)
    const event = useSelector(DashboardSelectors.event)
    const { slug, challengesEnabled, challenges } = event
    useEffect(() => {
        dispatch(DashboardActions.updateTeam(slug))
    }, [])
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    // const [editing, setEditing] = useState(false)

    const challengeOptions = useMemo(() => {
        if (!challengesEnabled || !challenges) return null
        return challenges.map(challenge => ({
            label: `${challenge.name} (${challenge.partner})`,
            value: challenge.slug,
        }))
    }, [event])

    const handleLeave = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.leaveTeam(slug, team.code))
            .then(() => {
                dispatch(SnackbarActions.success('Left team ' + team?.code))
            })
            .catch(() => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... please try again.',
                    ),
                )
            })
            .finally(() => {
                setStatus('')
                setLoading(false)
            })
    }, [slug, team?.code, dispatch])

    // const handleDelete = useCallback(() => {
    //     setLoading(true)
    //     dispatch(DashboardActions.deleteTeam(slug))
    //         .then(() => {
    //             dispatch(SnackbarActions.success('Deleted team ' + team?.code))
    //         })
    //         .catch(err => {
    //             dispatch(
    //                 SnackbarActions.error(
    //                     'Something went wrong... please try again.',
    //                 ),
    //             )
    //         })
    //         .finally(() => {
    //             setStatus('')
    //             setLoading(false)
    //         })
    // }, [dispatch, slug, team?.code])

    const handleCreate = useCallback(
        (values, formikBag) => {
            console.log('submitted with:', values)
            console.log('formikBag:', formikBag)
            setLoading(true)
            dispatch(DashboardActions.createNewTeam(slug, values))
                .then(() => {
                    dispatch(SnackbarActions.success('Created new team'))
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... please try again.',
                        ),
                    )
                })
                .finally(() => {
                    setStatus('')
                    setLoading(false)
                })
        },
        [dispatch, slug],
    )

    const handleEdit = useCallback(
        (values, formikBag) => {
            console.log('submitted with:', values)
            console.log('formikBag:', formikBag)
            setLoading(true)
            dispatch(DashboardActions.editTeam(slug, values))
                .then(() => {
                    dispatch(
                        SnackbarActions.success('Successfully edited team'),
                    )
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... please try again.',
                        ),
                    )
                })
                .finally(() => {
                    setStatus('')
                    setLoading(false)
                })
        },
        [dispatch, slug],
    )

    let teamData

    hasTeam ? (teamData = team) : (teamData = {})

    let formikSubmitAction

    switch (status) {
        case 'create':
            formikSubmitAction = handleCreate
            break
        case 'edit':
            formikSubmitAction = handleEdit
            break
        default:
            break
    }

    useEffect(() => {
        console.log('current status:', status)
    }, [status])

    return (
        <>
            {status === '' &&
                (hasTeam ? (
                    <>
                        <TeamProfile
                            teamData={team}
                            onClickLeave={handleLeave}
                            onClickEdit={() => {
                                setStatus('edit')
                            }}
                        />
                    </>
                ) : (
                    <NoTeam
                        eventData={event}
                        onCreate={() => setStatus('create')}
                    />
                ))}
            {((!hasTeam && status === 'create') ||
                (hasTeam && status === 'edit')) && (
                <div className="tw-mb-16">
                    <TeamCreateEditForm
                        initialData={teamData}
                        formikSubmitAction={formikSubmitAction}
                        onBack={() => setStatus('')}
                        challengeOptions={challengeOptions}
                        key={`${status}-team`}
                    />
                </div>
            )}
        </>
    )
}
