import { Typography } from '@material-ui/core'
import NoTeam from 'components/Team/NoTeam'
import TeamProfile from 'components/Team/TeamProfile'
import Button from 'components/generic/Button'
import Empty from 'components/generic/Empty'
import React, { useMemo, useState } from 'react'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import { useSelector } from 'react-redux'
import { FastField, Formik } from 'formik'
import FormControl from 'components/inputs/FormControl'
import Select from 'components/inputs/Select'
import {
    ReviewingMethods,
    OverallReviewingMethods,
    EventTypes,
} from '@hackjunction/shared'
import * as yup from 'yup'

export default () => {
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const team = useSelector(DashboardSelectors.team)
    const event = useSelector(DashboardSelectors.event)
    const [status, setStatus] = useState('')

    const challengeOptions = useMemo(() => {
        if (!event.challengesEnabled || !event.challenges) return null
        return event.challenges.map(challenge => ({
            label: `${challenge.name} (${challenge.partner})`,
            value: challenge.slug,
        }))
    }, [event])

    return (
        <>
            {hasTeam ? (
                <TeamProfile teamData={team} />
            ) : (
                <NoTeam
                    eventData={event}
                    onCreate={() => setStatus('create')}
                />
            )}
            {status === 'create' && (
                <Formik
                    initialValues={{
                        name: '',
                        challenges: challengeOptions,
                        teamMembers: [],
                    }}
                    onSubmit={() => console.log('submitted')}
                >
                    {formikProps => (
                        <div>
                            <div>
                                <div>Challenge</div>
                                <div>challenge note</div>
                                <div>Select challenge</div>
                                {challengeOptions && (
                                    <FastField
                                        name="challenges"
                                        render={({ field, form }) => (
                                            <FormControl
                                                label="Challenges"
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
                                                        form.setFieldTouched(
                                                            field.name,
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                        )}
                                    />
                                )}
                            </div>
                            <div>
                                <div>Team name</div>
                                <div>Input team name</div>
                            </div>
                            <div>
                                <div>
                                    Title of the idea explored bu your team
                                </div>
                                <div>Input title</div>
                            </div>
                            <div>
                                <div>Brief explanation of the idea</div>
                                <div>Input brief explanation</div>
                            </div>
                            <div>
                                <div>List current members of your team</div>
                                <div>Input members</div>
                            </div>
                            <div>
                                <div>Avaialble roles in your team</div>
                                <div>Input roles</div>
                            </div>
                            <div>
                                <div>Upload team's background picture</div>
                                <div>Input background picture</div>
                            </div>
                            <div>
                                <div>Team's contact email</div>
                                <div>Input contact email</div>
                            </div>
                            <div>
                                <div>Team's Telegram/Discord link</div>
                                <div>Input link</div>
                            </div>
                            <div>
                                <button>Create team</button>
                            </div>
                        </div>
                    )}
                </Formik>
            )}
        </>
    )
}
