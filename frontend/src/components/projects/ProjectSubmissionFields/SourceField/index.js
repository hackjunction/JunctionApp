import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'
import TextInput from 'components/inputs/TextInput'

const SourceField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="source"
                render={({ field, form }) => (
                    <FormControl
                        label="Source code"
                        hint="A link to the repository containing your source code"
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
                            placeholder="https://..."
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default SourceField
