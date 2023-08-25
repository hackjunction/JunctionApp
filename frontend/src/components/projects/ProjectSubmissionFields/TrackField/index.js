import { Grid, Select } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'

const TrackField = ({ props, settings }) => {
    const { trackOptions } = settings
    return (
        <>
            {trackOptions && (
                <Grid item xs={12}>
                    <FastField
                        name="track"
                        render={({ field, form }) => (
                            <FormControl
                                label="Track"
                                hint="Choose the track you are participating with this project in. If you've completed multiple challenges from different tracks, choose the one that best matches this project."
                                touched={
                                    form.touched[field.name] ||
                                    props.submitCount > 0
                                }
                                error={form.errors[field.name]}
                            >
                                <Select
                                    label="Track"
                                    options={trackOptions}
                                    value={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                    onBlur={() =>
                                        form.setFieldTouched(field.name)
                                    }
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
            )}
        </>
    )
}

export default TrackField
