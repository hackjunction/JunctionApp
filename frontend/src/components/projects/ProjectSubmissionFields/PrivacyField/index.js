import { Box, Grid } from '@material-ui/core'
import BooleanInput from 'components/inputs/BooleanInput'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'

const PrivacyField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <Box
                style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                }}
            >
                <FastField
                    name="privacy"
                    render={({ field, form }) => (
                        <FormControl
                            label="Privacy"
                            hint="I want to be credited for the project."
                            touched={
                                form.touched[field.name] ||
                                props.submitCount > 0
                            }
                            error={form.errors[field.name]}
                        >
                            <BooleanInput
                                value={field.value}
                                onChange={value =>
                                    form.setFieldValue(field.name, value)
                                }
                            />
                        </FormControl>
                    )}
                />
            </Box>
        </Grid>
    )
}

export default PrivacyField
