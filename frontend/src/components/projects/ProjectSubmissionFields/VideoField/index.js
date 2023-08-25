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
                        <TextInput
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            placeholder="https://youtu..."
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default VideoField
