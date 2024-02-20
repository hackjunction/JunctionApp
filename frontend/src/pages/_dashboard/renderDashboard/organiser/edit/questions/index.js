import React from 'react'

import { Grid } from '@material-ui/core'
import { FastField } from 'formik'
import CustomSectionList from './CustomSectionList'
import FormControl from 'components/inputs/FormControl'

import QuestionSelect from './QuestionSelect'

export default () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="registrationConfig"
                    render={({ field, form }) => (
                        <QuestionSelect
                            optionalFields={field?.value?.optionalFields}
                            requiredFields={field?.value?.requiredFields}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="customQuestions"
                    render={({ field, form }) => (
                        <FormControl
                            label="Custom questions"
                            hint="Add custom registration questions"
                        >
                            <CustomSectionList
                                sections={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    )
}
