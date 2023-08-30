import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'
import TextInput from 'components/inputs/TextInput'

const VideoField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="video"
                render={({ field, form }) => (
                    <FormControl
                        label="Video link"
                        hint="YouTube link for embedded video"
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
                            placeholder="https://youtu..."
                            value={field.value}
                            className={`tw-rounded-md tw-w-full tw-max-h-full tw-bg-gray-100 tw-border-gray-300 tw-px-2 tw-py-4 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300`}
                        />
                        {/* <TextInput
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            placeholder="https://youtu..."
                        /> */}
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default VideoField
