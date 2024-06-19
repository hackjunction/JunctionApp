import { Grid } from '@mui/material'
import FormControl from 'components/inputs/FormControl'
import TextAreaInput from 'components/inputs/TextAreaInput'
import { FastField } from 'formik'
import React from 'react'

const PunchlineField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="punchline"
                render={({ field, form }) => (
                    <FormControl
                        label="Punchline"
                        hint="What's the most important thing about your project?"
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <TextAreaInput
                            placeholder="What problem does your project solve? How would you describe it in two sentences?"
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
    )
}

export default PunchlineField
