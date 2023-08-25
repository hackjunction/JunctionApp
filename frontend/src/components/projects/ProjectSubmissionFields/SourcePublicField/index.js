import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'
import BooleanInput from 'components/inputs/BooleanInput'

const SourcePublicField = () => {
    return (
        <Grid item xs={12}>
            <FastField
                name="sourcePublic"
                render={({ field, form }) => {
                    return (
                        <FormControl
                            label="Source code public?"
                            hint="We encourage everyone to show their source code to the public, so others can see how your awesome project was built. In case you don't want to, however, or your source code contains something sensitive, you can choose to show it only to the event organisers and the partners whose challenges you're participating in"
                            touched={true}
                            error={form.errors[field.name]}
                        >
                            <BooleanInput
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                            />
                        </FormControl>
                    )
                }}
            />
        </Grid>
    )
}

export default SourcePublicField
