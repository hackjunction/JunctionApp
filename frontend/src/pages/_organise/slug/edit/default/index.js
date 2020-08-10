import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { FastField } from 'formik'

import MarkdownInput from 'components/inputs/MarkdownInput'
import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import ImageUpload from 'components/inputs/ImageUpload'
import Select from 'components/inputs/Select'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import OrganizationService from 'services/organization'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const [organizations, setOrganizations] = useState([])

    // TODO organization should be in redux
    useEffect(() => {
        OrganizationService.getOrganizations().then(orgs => {
            if (orgs) setOrganizations(orgs)
        })
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="coverImage"
                    render={({ field, form }) => (
                        <FormControl
                            label="Cover image"
                            hint="A cool cover image for your event. Max dimensions 1920x1080 (2MB), will be scaled down if larger."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Box width="100%" pt="56.25%" position="relative">
                                <ImageUpload
                                    value={field.value}
                                    onChange={value => {
                                        form.setFieldValue(field.name, value)
                                        form.setFieldTouched(field.name)
                                    }}
                                    uploadUrl={`/api/upload/events/${event.slug}/cover-image`}
                                    resizeMode="cover"
                                />
                            </Box>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="logo"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event logo"
                            hint="A logo for your event. Max dimensions 640x640 (2MB), will be scaled down if larger."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <Box width="100%" pt="33.33%" position="relative">
                                <ImageUpload
                                    value={field.value}
                                    onChange={value => {
                                        form.setFieldValue(field.name, value)
                                        form.setFieldTouched(field.name)
                                    }}
                                    uploadUrl={`/api/upload/events/${event.slug}/logo`}
                                    resizeMode="contain"
                                />
                            </Box>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="name"
                    render={({ field, form }) => (
                        <FormControl
                            label="Event name"
                            hint="The name of your event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="name"
                                placeholder="Big Hackathon 2020"
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
                    name="description"
                    render={({ field, form }) => (
                        <FormControl
                            label="Description"
                            hint="A hype description for your event."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <MarkdownInput
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                placeholder="Description goes here"
                            />
                        </FormControl>
                    )}
                />
            </Grid>

            <Grid item xs={12}>
                <FastField
                    name="organizations"
                    render={({ field, form }) => (
                        <FormControl
                            label={'Organizations organizing the event'}
                            hint={'Specify the parties behind this event'}
                            touched={form.touched[field.name]}
                            error={form.errors[field.name]}
                        >
                            <Select
                                label="Specify the parties behind this event?"
                                value={field.value}
                                onChange={items =>
                                    form.setFieldValue(field.name, items)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                options={organizations.map(org => {
                                    return { label: org.name, value: org.slug }
                                })}
                                isMulti={true}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="challenge_instructions"
                    render={({ field, form }) => (
                        <FormControl
                            label="Link to challenge descriptions"
                            hint="https://hackjunction.com/challenges"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="challenge_instructions"
                                placeholder="https://hackjunction.com/challenges"
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
                    name="faq"
                    render={({ field, form }) => (
                        <FormControl
                            label="FAQ link"
                            hint="https://hackjunction.com/faq"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="faq"
                                placeholder="https://hackjunction.com/faq"
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
                    name="demoInstructions"
                    render={({ field, form }) => (
                        <FormControl
                            label="Demo instruction link"
                            hint="https://hackjunction.com/demo"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="demoInstructions"
                                placeholder="https://hackjunction.com/demo"
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
                    name="eventPrivacy"
                    render={({ field, form }) => (
                        <FormControl
                            label="Privacy Policy for this event"
                            hint="https://www.hackjunction.com/policy"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="eventPrivacy"
                                placeholder="https://www.hackjunction.com/policy"
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
                    name="eventTerms"
                    render={({ field, form }) => (
                        <FormControl
                            label="Terms and Conditions for this event"
                            hint="https://www.hackjunction.com/terms"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="eventTerms"
                                placeholder="https://www.hackjunction.com/terms"
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
