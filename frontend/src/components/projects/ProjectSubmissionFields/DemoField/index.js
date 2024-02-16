import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'

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
                        <input
                            onBlur={() => form.setFieldTouched(field.name)}
                            onChange={e =>
                                form.setFieldValue(field.name, e.target.value)
                            }
                            placeholder={
                                event.demoPlaceholder
                                    ? event.demoPlaceholder
                                    : 'https://..'
                            }
                            value={field.value}
                            className={`tw-rounded-md tw-w-full tw-max-h-full tw-bg-gray-100 tw-border-gray-300 tw-px-2 tw-py-4 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300`}
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default DemoField
