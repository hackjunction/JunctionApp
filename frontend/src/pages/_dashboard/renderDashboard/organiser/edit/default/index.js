import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, Typography } from '@material-ui/core'
import { FastField } from 'formik'

import MarkdownInput from 'components/inputs/MarkdownInput'
import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import ImageUpload from 'components/inputs/ImageUpload'
import Select from 'components/inputs/Select'
import Timeline from '../timeline'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import { useAllOrganizations } from 'graphql/queries/organization'
import ColorSelect from 'components/inputs/Color'
import Button from 'components/generic/Button'
import { push } from 'connected-react-router'
import { defaultEventStyles } from './const'

const themeFields = [
    {
        field: 'headerBackgroundColor',
        label: 'Header background',
        hint: 'Background color of the header section',
    },
    {
        field: 'headerTextColor',
        label: 'Header text',
        hint: 'Text color of the header section',
    },
    {
        field: 'bodyBackgroundColor',
        label: 'Page background',
        hint: 'Background color of the main body of the page (visible on wide screens)',
    },
    {
        field: 'detailsBackgroundColor',
        label: 'Event details background',
        hint: 'Background color of the event details section',
    },
    {
        field: 'detailsTextColor',
        label: 'Event details text',
        hint: 'Text color of the event details section',
    },
    {
        field: 'sidebarBackgroundColor',
        label: 'Sidebar background',
        hint: 'Background color of the sidebar section',
    },
    {
        field: 'sidebarTextColor',
        label: 'Sidebar text',
        hint: 'Text color of the sidebar section',
    },
    {
        field: 'accentColor',
        label: 'Accent color',
        hint: 'Accent color used on buttons and timeline',
    },
    {
        field: 'linkColor',
        label: 'Link color',
        hint: 'Text color of links in the event details',
    },
]

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const [organizations] = useAllOrganizations()
    const dispatch = useDispatch()

    return (
        <Grid container spacing={3}>
            <Grid key="coverImage" item xs={12}>
                <Grid container spacing={3}>
                    <Grid key="eventLogo" item sm={4} xs={12}>
                        <FastField name="logo">
                            {({ field, form }) => (
                                <FormControl
                                    label="Event logo"
                                    hint="A logo for your event. Max 640x640 (2MB)."
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <Box
                                        className="tw-h-40 tw-w-40 lg:tw-h-270px lg:tw-w-270px tw-mx-auto"
                                        position="relative"
                                    >
                                        <ImageUpload
                                            value={field.value}
                                            onChange={value => {
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                                form.setFieldTouched(field.name)
                                            }}
                                            uploadUrl={`/api/upload/events/${event.slug}/logo`}
                                            resizeMode="contain"
                                        />
                                    </Box>
                                </FormControl>
                            )}
                        </FastField>
                    </Grid>
                    <Grid key="coverImage" item sm={8} xs={12}>
                        <FastField name="coverImage">
                            {({ field, form }) => (
                                <FormControl
                                    label="Cover image"
                                    hint="A cool cover image for your event. Max 1920x1080 (2MB)."
                                    error={form.errors[field.name]}
                                    touched={form.touched[field.name]}
                                >
                                    <Box
                                        className="lg:tw-h-270px lg:tw-w-480px tw-h-40 tw-w-64 tw-mx-auto"
                                        position="relative"
                                    >
                                        <ImageUpload
                                            value={field.value}
                                            onChange={value => {
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                                form.setFieldTouched(field.name)
                                            }}
                                            uploadUrl={`/api/upload/events/${event.slug}/cover-image`}
                                            resizeMode="cover"
                                        />
                                    </Box>
                                </FormControl>
                            )}
                        </FastField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <FastField name="name">
                    {({ field, form }) => (
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
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField name="description">
                    {({ field, form }) => (
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
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField name="organizations">
                    {({ field, form }) => (
                        <FormControl
                            label={'Organizations organizing the event'}
                            hint={'Specify the parties behind this event'}
                            touched={form.touched[field.name]}
                            error={form.errors[field.name]}
                        >
                            <Select
                                label="Specify the parties behind this event?"
                                value={field.value}
                                onChange={items => {
                                    if (items === null) {
                                        form.setFieldValue(field.name, [])
                                    } else {
                                        form.setFieldValue(field.name, items)
                                    }
                                }}
                                onBlur={() => form.setFieldTouched(field.name)}
                                options={organizations?.map(org => {
                                    return {
                                        label: org.name,
                                        value: org._id,
                                        icon: org.icon,
                                    }
                                })}
                                isMulti={true}
                            />
                        </FormControl>
                    )}
                </FastField>
            </Grid>
            <Timeline />
            <Grid item xs={12}>
                <FastField name="challenge_instructions">
                    {({ field, form }) => (
                        <FormControl
                            label="Link to challenge descriptions"
                            hint="If you have challenge descriptions elsewhere, link them here"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="challenge_instructions"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                placeholder="https://www.hackjunction.com/challenges"
                            />
                        </FormControl>
                    )}
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField name="faq">
                    {({ field, form }) => (
                        <FormControl
                            label="FAQ link"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                            hint="If you have a separate faq page, link it here"
                        >
                            <TextInput
                                name="faq"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                placeholder="https://www.hackjunction.com/faq"
                            />
                        </FormControl>
                    )}
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField name="demoInstructions">
                    {({ field, form }) => (
                        <FormControl
                            label="Demo instruction link"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                            hint="If you have a separate demo instruction page, link it here"
                        >
                            <TextInput
                                name="demoInstructions"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                placeholder="https://www.hackjunction.com/demos"
                            />
                        </FormControl>
                    )}
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField name="eventPrivacy">
                    {({ field, form }) => (
                        <FormControl
                            label="Privacy Policy for this event"
                            hint="Link your privacy policy here. This will be shown to participants when they register to your event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="eventPrivacy"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                placeholder="https://www.hackjunction.com/privacy"
                            />
                        </FormControl>
                    )}
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField name="eventTerms">
                    {({ field, form }) => (
                        <FormControl
                            label="Terms and Conditions for this event"
                            hint="Link your T&C here. This will be shown to participants when they register to your event"
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="eventTerms"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                placeholder="https://www.hackjunction.com/terms"
                            />
                        </FormControl>
                    )}
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <FastField name="eventNewsletter">
                    {({ field, form }) => (
                        <FormControl
                            label="Newsletter subscription link"
                            hint="Set this if you want a subscription button to appear when people register. It will appear after the Junction newsletter and should link to an external subscription form."
                            error={form.errors[field.name]}
                            touched={form.touched[field.name]}
                        >
                            <TextInput
                                name="eventNewsletter"
                                placeholder="Signup form URL from Mailchimp, Sendgrid etc."
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                            />
                        </FormControl>
                    )}
                </FastField>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">Event page customization</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={5}>
                    {themeFields.map(themeField => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            key={themeField.field}
                            id={themeField.field}
                        >
                            <FastField name={`theme.${themeField.field}`}>
                                {({ field, form }) => (
                                    <FormControl
                                        label={themeField.label}
                                        hint={themeField.hint}
                                        error={form.errors[field.name]}
                                        touched={form.touched[field.name]}
                                    >
                                        <ColorSelect
                                            value={field.value}
                                            onChange={value =>
                                                form.setFieldValue(
                                                    field.name,
                                                    value,
                                                )
                                            }
                                        />
                                    </FormControl>
                                )}
                            </FastField>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={() =>
                                dispatch(push('/events/' + event.slug))
                            }
                        >
                            Preview
                        </Button>
                        <FastField name="theme">
                            {({ form }) => (
                                <Button
                                    onClick={() =>
                                        form.setFieldValue(
                                            'theme',
                                            defaultEventStyles,
                                        )
                                    }
                                >
                                    Reset defaults
                                </Button>
                            )}
                        </FastField>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
