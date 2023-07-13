import React from 'react'

import { Grid, Typography, Box } from '@material-ui/core'
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
                                <Box mb={1}>
                                    <Typography variant="body1">Sender Email</Typography>
                                </Box>
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
                                <Box mb={1} mt={1}>
                                    <Typography variant="body1">Sender Name</Typography>
                                </Box>
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
            <Grid item xs={12}>
                <FastField
                    name="acceptanceEmail"
                    render={({ field, form }) => (
                        <FormControl
                            label="Acceptance Email"
                            hint="Email sent to the participant when their registration is accepted"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12} md={6}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    // @ts-ignore
                                    name="acceptanceEmailTitle"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box mb={1} mt={1}>
                                    <Typography variant="body1">Subtitle</Typography>
                                </Box>
                                <TextInput
                                    // @ts-ignore
                                    name="acceptanceEmailSubtitle"
                                    placeholder="Email subtitle"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box mb={1} mt={1}>
                                    <Typography variant="body1">Body</Typography>
                                </Box>
                                <TextAreaInput
                                    // @ts-ignore
                                    name="acceptanceEmailBody"
                                    placeholder="Email body"
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
