import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import ProjectStatusInput from 'components/inputs/ProjectStatusInput'
import { FastField } from 'formik'
import React from 'react'

const StatusField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="status"
                render={({ field, form }) => (
                    <FormControl
                        label="Final or draft"
                        hint="If you're done with your project, you can mark it as final. If you're still working on it, you can mark it as draft."
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <ProjectStatusInput
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default StatusField
