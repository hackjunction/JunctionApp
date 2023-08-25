import { Grid } from '@material-ui/core'
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
                        hint="A short and sweet description of what your project is about. Max 300 characters."
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
