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
                    name="emailConfig.senderEmail"
                    render={({ field, form }) => (
                        <FormControl
                            label="Sender"
                            hint="Sender details for emails sent from the platform"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Sender Email</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.senderEmail"
                                    placeholder="Sender's email"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.senderName"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Sender Name</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.senderName"
                                            placeholder="Sender's name"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="emailConfig.acceptanceEmail.title"
                    render={({ field, form }) => (
                        <FormControl
                            label="Acceptance Email"
                            hint="Email sent to the participant when their registration is accepted"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.acceptanceEmail.title"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.acceptanceEmail.subtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.acceptanceEmail.subtitle"
                                            placeholder="Email subtitle"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                            <FastField
                                name="emailConfig.acceptanceEmail.body"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="emailConfig.acceptanceEmail.body"
                                            placeholder="Email body"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="emailConfig.rejectionEmail.title"
                    render={({ field, form }) => (
                        <FormControl
                            label="Rejection Email"
                            hint="Email sent to the participant when their registration is rejected"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.rejectionEmail.title"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.rejectionEmail.subtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.rejectionEmail.subtitle"
                                            placeholder="Email subtitle"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                            <FastField
                                name="emailConfig.rejectionEmail.body"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="emailConfig.rejectionEmail.body"
                                            placeholder="Email body"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="emailConfig.registrationEmail.title"
                    render={({ field, form }) => (
                        <FormControl
                            label="Registration Email"
                            hint="Email sent to the participant when they register for the event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="emailConfig.registrationEmail.title"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="emailConfig.registrationEmail.subtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="emailConfig.registrationEmail.subtitle"
                                            placeholder="Email subtitle"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                            <FastField
                                name="emailConfig.registrationEmail.body"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="emailConfig.registrationEmail.body"
                                            placeholder="Email body"
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(field.name, value)
                                            }
                                            onBlur={() => form.setFieldTouched(field.name)}
                                        />
                                    </Grid>
                                )}
                            />
                        </FormControl>
                    )}
                />
            </Grid>

        </Grid >
    )
}
