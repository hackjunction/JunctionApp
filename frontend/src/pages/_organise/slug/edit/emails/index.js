import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import { FastField } from 'formik'

import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import TextAreaInput from 'components/inputs/TextAreaInput'

export default () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="sender"
                    render={({ field, form }) => (
                        <FormControl
                            label="Sender"
                            hint="Sender details for emails sent from the platform"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">Sender Email</Typography>
                                <TextInput
                                    // @ts-ignore
                                    name="senderEmail"
                                    placeholder="Sender's email"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="body1">Sender Name</Typography>
                                <TextInput
                                    // @ts-ignore
                                    name="senderName"
                                    placeholder="Sender's name"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                        </FormControl>
                    )}
                />
            </Grid>






        </Grid>
    )
}
