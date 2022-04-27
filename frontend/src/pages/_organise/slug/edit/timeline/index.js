import React from 'react'

import { Grid } from '@material-ui/core'
import { FastField, FieldArray, Field } from 'formik'

import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'
import DateInput from 'components/inputs/DateInput'
import { Button } from 'antd'
import moment from 'moment'

export default () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="eventTimeline"
                    render={({ field, form }) => (
                        <FormControl
                            label="Timeline"
                            hint="timeline items"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <FieldArray
                                name="eventTimeline"
                                render={arrayHelpers => (
                                    <div>
                                        {field && field.value.length > 0 ? (
                                            field.value.map((item, index) => (
                                                <div key={index}>
                                                    <Field
                                                        name={`eventTimeline.${index}.title`}
                                                    />
                                                    <DateInput
                                                        name={`eventTimeline.${index}.startTime`}
                                                    />
                                                    <Button
                                                        onClick={() =>
                                                            arrayHelpers.remove(
                                                                index,
                                                            )
                                                        } // remove a friend from the list
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            arrayHelpers.push({
                                                                title: 'hello',
                                                                startTime:
                                                                    new Date(),
                                                            })
                                                        } // insert an empty string at a position
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.push({
                                                        title: 'test',
                                                        startTime: new Date(),
                                                    })
                                                }
                                            >
                                                {/* show this when user has removed all friends from the list */}
                                                Add an item
                                            </button>
                                        )}
                                        <div>
                                            <button type="submit">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    )
}
