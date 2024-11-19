import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'

const NameField = ({ id = 'name-field', props }) => {
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
                        <input
                            id={id}
                            onBlur={() => form.setFieldTouched(field.name)}
                            onChange={e =>
                                form.setFieldValue(field.name, e.target.value)
                            }
                            placeholder="Awesome-o 3000"
                            value={field.value}
                            className={`tw-rounded-md tw-w-full tw-max-h-full tw-bg-gray-100 tw-border-gray-300 tw-px-2 tw-py-4 tw-items-start tw-justify-start tw-text-gray-800 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300`}
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default NameField
