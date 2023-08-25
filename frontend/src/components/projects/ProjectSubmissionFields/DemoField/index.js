import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'
import TextInput from 'components/inputs/TextInput'

const DemoField = ({ props, settings }) => {
    const { event } = settings
    return (
        <Grid item xs={12}>
            <FastField
                name="demo"
                render={({ field, form }) => (
                    <FormControl
                        label={
                            event.demoLabel
                                ? event.demoLabel
                                : 'Demo URL or Coupon Code'
                        }
                        hint={
                            event.demoHint
                                ? event.demoHint
                                : 'Add the link of the working version of your project. Depending on the event, this could be a link to an API, a link to file or a presentation. Make sure the link is accessible for humans, as well as machines!'
                        }
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <TextInput
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            placeholder={
                                event.demoPlaceholder
                                    ? event.demoPlaceholder
                                    : 'https://..'
                            }
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default DemoField
