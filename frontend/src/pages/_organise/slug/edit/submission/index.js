import React from 'react'

import { Grid } from '@material-ui/core'
import { FastField } from 'formik'

import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'

export default () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="demoLabel"
                    render={({ field, form }) => (
                        <FormControl
                            label="Demo label"
                            hint="Demo label"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="demoLabel"
                                placeholder="Demo URL"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="demoHint"
                    render={({ field, form }) => (
                        <FormControl
                            label="Demo Hint"
                            hint="Hint message you want to have displayed on the submission form"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextAreaInput
                                name="demoHint"
                                placeholder="Add the link of the working version of your project. Depending on the event, this could be a link to an API, a link to file or a presentation. Make sure the link is accessible for humans, as well as machines!"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="demoPlaceholder"
                    render={({ field, form }) => (
                        <FormControl
                            label="Demo Placeholder"
                            hint="Placeholder message you want to have displayed on the submission form"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="demoPlaceholder"
                                placeholder="https://.."
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    )
}
