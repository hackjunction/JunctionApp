import { Typography } from '@material-ui/core'
import NoTeam from 'components/Team/NoTeam'
import TeamProfile from 'components/Team/TeamProfile'
import Button from 'components/generic/Button'
import Empty from 'components/generic/Empty'
import React from 'react'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import { useSelector } from 'react-redux'
import { FastField } from 'formik'
import FormControl from 'components/inputs/FormControl'
import Select from 'components/inputs/Select'
import {
    ReviewingMethods,
    OverallReviewingMethods,
    EventTypes,
} from '@hackjunction/shared'

export default () => {
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const team = useSelector(DashboardSelectors.team)
    return (
        <>
            {hasTeam ? <TeamProfile teamData={team} /> : <NoTeam />}
            <div>
                <div>
                    <div>Challenge</div>
                    <div>challenge note</div>
                    <div>Select challenge</div>
                    {/* <FastField
                        name="eventType"
                        render={({ field, form }) => (
                            <FormControl
                                label="Event type"
                                hint="Is this a physical or online event?"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <Select
                                    value={field.value}
                                    onChange={async value => {
                                        if (value === 'online') {
                                            await form.setFieldValue(
                                                'eventLocation',
                                                null,
                                            )
                                        }
                                        if (value === 'physical') {
                                            await form.setFieldValue(
                                                'eventLocation',
                                                form.values.eventLocation ?? {}, //checks whether the eventLocation is null || undefined => if true, set it to an empty object
                                            )
                                        }
                                        form.setFieldValue(field.name, value)
                                    }}
                                    options={Object.keys(EventTypes).map(
                                        key => ({
                                            label: EventTypes[key].label,
                                            value: key,
                                        }),
                                    )}
                                />
                            </FormControl>
                        )}
                    /> */}
                </div>
                <div>
                    <div>Team name</div>
                    <div>Input team name</div>
                </div>
                <div>
                    <div>Title of the idea explored bu your team</div>
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
        </>
    )
}
