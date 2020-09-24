import React from 'react'

import { Grid } from '@material-ui/core'
import { FastField } from 'formik'
import FormControl from 'components/inputs/FormControl'
import EventTagsForm from './EventTagsForm'
import WebhooksForm from './WebhooksForm'
import MetaTagsForm from './MetaTagsForm'

export default () => {
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
                    name="metaDescription"
                    render={({ field, form }) => (
                        <FormControl
                            label="Meta Tags"
                            hint="Add meta tag descriptions"
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
        </Grid>
    )
}
