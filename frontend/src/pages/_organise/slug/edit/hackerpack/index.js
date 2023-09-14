import React from 'react'

import { Grid, Box } from '@material-ui/core'
import { FastField, Field } from 'formik'

import FormControl from 'components/inputs/FormControl'
import BooleanInput from 'components/inputs/BooleanInput'

import HackerpackForm from './HackerpackForm'

export default () => {
    return (
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <FastField
                    name="hackerpacksEnabled"
                    render={({ field, form }) => (
                        <FormControl
                            label="Does this event have hackerpacks?"
                            hint={
                                'Hackerpacks are software provided by you or your partners, used by your participants. Hackepacks are a great way to showcase the tools companies can offer. This way participants get familiar with the company and their tools, and companies get visibility and users. Hackerpack consists of title, description, logo and link to the tool, which can be e.g. a sandbox environment, API, free trial or anything else!'
                            }
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <BooleanInput
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="hackerpacks"
                    render={({ field, form }) => {
                        if (form.values.hackerpacksEnabled) {
                            return (
                                <FormControl
                                    label="Hackerpacks"
                                    hint="Enter your different hackerpacks here"
                                    error={
                                        Array.isArray(form.errors[field.name])
                                            ? 'One or more invalid hackerpacks'
                                            : form.errors[field.name]
                                    }
                                    touched={form.touched[field.name]}
                                >
                                    <HackerpackForm
                                        value={field.value}
                                        onChange={value => {
                                            form.setFieldValue(
                                                field.name,
                                                value,
                                            )
                                        }}
                                    />
                                </FormControl>
                            )
                        }
                        return null
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <Box height="300px" />
            </Grid>
        </Grid>
    )
}
