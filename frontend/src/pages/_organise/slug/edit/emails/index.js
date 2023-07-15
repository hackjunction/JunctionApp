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
                    name="senderEmail"
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
                                    name="senderEmail"
                                    placeholder="Sender's email"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="senderName"
                                render={({ field, form }) => (
                                    <Grid item xs={12} md={6}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Sender Name</Typography>
                                        </Box>
                                        <TextInput
                                            name="senderName"
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
                    name="acceptanceEmailTitle"
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
                                    name="acceptanceEmailTitle"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="acceptanceEmailSubtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12} md={6}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="acceptanceEmailSubtitle"
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
                                name="acceptanceEmailBody"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="acceptanceEmailBody"
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
                    name="rejectionEmailTitle"
                    render={({ field, form }) => (
                        <FormControl
                            label="Rejection Email"
                            hint="Email sent to the participant when their registration is rejected"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12} md={6}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="rejectionEmailTitle"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="rejectionEmailSubtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12} md={6}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="rejectionEmailSubtitle"
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
                                name="rejectionEmailBody"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="rejectionEmailBody"
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
                    name="registrationEmailTitle"
                    render={({ field, form }) => (
                        <FormControl
                            label="Registration Email"
                            hint="Email sent to the participant when they register for the event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Grid item xs={12} md={6}>
                                <Box mb={1}>
                                    <Typography variant="body1">Title</Typography>
                                </Box>
                                <TextInput
                                    name="registrationEmailTitle"
                                    placeholder="Email title or subject"
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() => form.setFieldTouched(field.name)}
                                />
                            </Grid>
                            <FastField
                                name="registrationEmailSubtitle"
                                render={({ field, form }) => (
                                    <Grid item xs={12} md={6}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Subtitle</Typography>
                                        </Box>
                                        <TextInput
                                            name="registrationEmailSubtitle"
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
                                name="registrationEmailBody"
                                render={({ field, form }) => (
                                    <Grid item xs={12}>
                                        <Box mb={1} mt={1}>
                                            <Typography variant="body1">Body</Typography>
                                        </Box>
                                        <TextAreaInput
                                            name="registrationEmailBody"
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
