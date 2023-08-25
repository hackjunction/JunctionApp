import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'
import TextInput from 'components/inputs/TextInput'

const LocationField = ({ props, settings }) => {
    const { locationEnabled } = settings
    return (
        <>
            {locationEnabled && (
                <Grid item xs={12}>
                    <FastField
                        name="location"
                        render={({ field, form }) => (
                            <FormControl
                                label="Table location"
                                hint="How can people judging the projects contact you during judging? Make sure this info is always up-to-date!"
                                touched={
                                    form.touched[field.name] ||
                                    props.submitCount > 0
                                }
                                error={form.errors[field.name]}
                            >
                                <TextInput
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() =>
                                        form.setFieldTouched(field.name)
                                    }
                                    placeholder="E.g. A3"
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
            )}
        </>
    )
}

export default LocationField
