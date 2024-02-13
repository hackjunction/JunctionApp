import NoTeam from 'components/Team/NoTeam'
import TeamProfile from 'components/Team/TeamProfile'
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { useDispatch, useSelector } from 'react-redux'
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

    const challengeOptions = useMemo(() => {
        if (
            challengesEnabled &&
            Array.isArray(challenges) &&
            challenges.length > 0
        ) {
            return challenges.map(challenge => ({
                label: `${challenge.name} (${challenge.partner})`,
                value: challenge._id,
            }))
        }
        return null
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

    const handleDelete = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.deleteTeam(slug))
            .then(() => {
                dispatch(SnackbarActions.success('Deleted team ' + team?.code))
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
    }, [dispatch, slug, team?.code])

    const handleCreate = useCallback(
        (values, formikBag) => {
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
                            onClickDelete={handleDelete}
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
