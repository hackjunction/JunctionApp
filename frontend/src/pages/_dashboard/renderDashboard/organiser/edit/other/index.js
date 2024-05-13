import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { FastField, Field } from 'formik'
import FormControl from 'components/inputs/FormControl'
import EventTagsForm from './EventTagsForm'
import WebhooksForm from './WebhooksForm'
import MetaTagsForm from './MetaTagsForm'

import CertificateForm from './CertificateForm'
import PageScriptsForm from './PageScriptsForm'
import FileInput from '../submission/components/inputs/FileInput'
// import PdfUpload from 'components/inputs/PdfUpload'
import Switch from 'components/generic/Switch'
import { hasSuperAdmin } from 'redux/auth/selectors'

export default () => {
    const isSuperAdmin = useSelector(hasSuperAdmin)
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="tags"
                    render={({ field, form }) => (
                        <FormControl
                            label="Tags"
                            hint="Add tags with which you can mark registrations"
                        >
                            <EventTagsForm
                                value={field.value}
                                fieldName={field.name}
                                setFieldValue={form.setFieldValue}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="map"
                    render={({ field, form }) => {
                        console.log(field)
                        return (
                            <FormControl
                                label="Venue Map"
                                hint="Add a venue map that will be shown on participant and partner dashboards as a .jpg."
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <FileInput
                                    value={field.value}
                                    handleChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    config={{
                                        settings: {
                                            allowedTypes: ['jpg'],
                                        },
                                    }}
                                />

                                {/* <ImageUpload
                                    value={field.value}
                                    onChange={value => {
                                        form.setFieldValue(field.name, value)
                                        form.setFieldTouched(field.name)
                                    }}
                                    uploadUrl={`/api/upload/events/${event.slug}/map`}
                                    resizeMode="cover"
                                /> */}
                            </FormControl>
                        )
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Field
                    name="certificate"
                    render={({ field, form }) => {
                        console.log(field)
                        return (
                            <FormControl
                                label="Certificate"
                                hint="Add a certificate that will be given to the participants. max file size: 10mb"
                                error={form.errors[field.name]}
                                touched={form.touched[field.name]}
                            >
                                <CertificateForm
                                    value={field.value}
                                    fieldName={field.name}
                                    setFieldValue={form.setFieldValue}
                                />
                            </FormControl>
                        )
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="webhooks"
                    render={({ field, form }) => (
                        <FormControl
                            label="Webhooks"
                            hint="Add webhooks that should fire on different events"
                        >
                            <WebhooksForm
                                value={field.value}
                                fieldName={field.name}
                                setFieldValue={form.setFieldValue}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="pageScripts"
                    render={({ field, form }) => (
                        <FormControl
                            label="Custom tracking scripts"
                            hint="You can add tracking scripts that will run on selected pages. This is useful if you want to add custom Google Analytics or Facebook Pixel event tracking. This is an advanced field, use it with extra caution, as a malicious/buggy script could cause the site to crash."
                        >
                            <PageScriptsForm
                                value={field.value}
                                fieldName={field.name}
                                setFieldValue={form.setFieldValue}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="metaDescription"
                    render={({ field, form }) => (
                        <FormControl
                            label="Meta Tags"
                            hint="Add meta tag descriptions. Default one is '<Event Name> is coming up! If you're interested in joining the coolest hackathon on the planet just head straight to ...'"
                        >
                            <MetaTagsForm
                                value={field.value}
                                fieldName={field.name}
                                setFieldValue={form.setFieldValue}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
            {isSuperAdmin && (
                <Grid item xs={12}>
                    <FastField
                        name="experimental"
                        render={({ field, form }) => (
                            <FormControl
                                label="Enable experimental features"
                                hint="CAREFUL! This is only recommended for development and research, and is not recommended for normal event as it could cause unexpected behaviors during your event"
                            >
                                <Switch
                                    checked={field.value ?? false}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    checkedText="Enabled"
                                    uncheckedText="Disabled"
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
            )}
        </Grid>
    )
}
