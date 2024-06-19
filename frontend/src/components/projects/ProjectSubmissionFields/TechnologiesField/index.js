import { Grid } from '@mui/material'
import Select from 'components/inputs/Select'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'

const TechnologiesField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="technologies"
                render={({ field, form }) => (
                    <FormControl
                        label="Technologies & Tools"
                        hint="Add up to 5 technologies or tools you used to build this project"
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-border-gray-300 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300">
                            <Select
                                label="Technologies & Tools"
                                options="technology"
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                                onBlur={() => form.setFieldTouched(field.name)}
                                isMulti
                            />
                        </div>
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default TechnologiesField
