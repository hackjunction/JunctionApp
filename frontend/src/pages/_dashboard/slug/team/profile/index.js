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

export default () => {
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const team = useSelector(DashboardSelectors.team)
    const event = useSelector(DashboardSelectors.event)
    const dispatch = useDispatch()
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    // const [editing, setEditing] = useState(false)

    const challengeOptions = useMemo(() => {
        if (!event.challengesEnabled || !event.challenges) return null
        return event.challenges.map(challenge => ({
            label: `${challenge.name} (${challenge.partner})`,
            value: challenge.slug,
        }))
    }, [event])

    const handleLeave = useCallback(() => {
        setLoading(true)
        setStatus('')
        dispatch(DashboardActions.leaveTeam(event.slug, team.code))
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
                setLoading(false)
            })
    }, [event.slug, team?.code, dispatch])

    const handleDelete = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.deleteTeam(event.slug))
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
    }, [dispatch, event.slug, team?.code])

    const handleCreate = useCallback(
        (values, formikBag) => {
            console.log('submitted with:', values)
            console.log('formikBag:', formikBag)
            setLoading(true)
            dispatch(DashboardActions.createNewTeam(event.slug, values))
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
        [dispatch, event.slug],
    )

    const handleEdit = useCallback(
        (values, formikBag) => {
            console.log('submitted with:', values)
            console.log('formikBag:', formikBag)
            setLoading(true)
            dispatch(DashboardActions.editTeam(event.slug, values))
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
        [dispatch, event.slug],
    )

    const teamData = {}

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

    const createEditForm = initialData => (
        <Formik initialValues={initialData} onSubmit={formikSubmitAction}>
            {formikProps => (
                <div>
                    <div>
                        {challengeOptions && (
                            <FastField name="challenge">
                                {({ field, form }) => (
                                    <FormControl
                                        label="Challenge"
                                        touched={
                                            form.touched[field.name] ||
                                            formikProps.submitCount > 0
                                        }
                                        error={form.errors[field.name]}
                                    >
                                        <Select
                                            label="Select challenge"
                                            options={challengeOptions}
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                            }
                                            onBlur={() =>
                                                form.setFieldTouched(field.name)
                                            }
                                        />
                                    </FormControl>
                                )}
                            </FastField>
                        )}
                    </div>
                    <div>
                        <FastField name="name">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team name"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Awesome team"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="tagline">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team tagline"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Solving problems with code"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="description">
                            {({ field, form }) => (
                                <FormControl
                                    label="Brief description about your team"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextAreaInput
                                        placeholder={`Our team ${form.values.name} is...`}
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="ideaTitle">
                            {({ field, form }) => (
                                <FormControl
                                    label=" Title of the idea explored by your team"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Great idea 1.0"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="ideaDescription">
                            {({ field, form }) => (
                                <FormControl
                                    label="Brief explanation of the idea explored by your team"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextAreaInput
                                        placeholder={`Our team ${form.values.teamName} is working on...`}
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="teamRoles">
                            {({ field, form }) => (
                                <FormControl
                                    label="Avaialble roles in your team"
                                    error={form.errors[field.name]}
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                >
                                    <Select
                                        options="role"
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        isMulti
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="email">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team's contact email"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="team.email@email.com"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <div>
                        <FastField name="telegram">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team's Telegram"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Your team's Telegram"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                        <FastField name="discord">
                            {({ field, form }) => (
                                <FormControl
                                    label="Team's Discord"
                                    touched={
                                        form.touched[field.name] ||
                                        formikProps.submitCount > 0
                                    }
                                    error={form.errors[field.name]}
                                >
                                    <TextInput
                                        value={field.value}
                                        onChange={value =>
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }
                                        onBlur={() =>
                                            form.setFieldTouched(field.name)
                                        }
                                        placeholder="Your team's Discord"
                                    />
                                </FormControl>
                            )}
                        </FastField>
                    </div>
                    <BottomBar
                        onSubmit={formikProps.handleSubmit}
                        errors={formikProps.errors}
                        dirty={formikProps.dirty}
                        loading={formikProps.isSubmitting}
                    />
                </div>
            )}
        </Formik>
    )

    useEffect(() => {
        console.log('current status:', status)
    }, [status])

    return (
        <>
            {hasTeam ? (
                <>
                    <button onClick={handleLeave}>Leave team</button>
                    <button onClick={handleDelete}>Delete team</button>
                    {console.log('team after completed:', team)}
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
            )}
            {!hasTeam && status === 'create' && createEditForm(teamData)}
            {hasTeam && status === 'edit' && createEditForm(team)}
        </>
    )
}
