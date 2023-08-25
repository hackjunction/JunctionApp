import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import TextInput from 'components/inputs/TextInput'
import { FastField } from 'formik'
import React from 'react'

const NameField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="name"
                render={({ field, form }) => (
                    <FormControl
                        label="Name"
                        hint="A catchy name for your project"
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <TextInput
                            placeholder="Awesome-o 3000"
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

export default NameField
