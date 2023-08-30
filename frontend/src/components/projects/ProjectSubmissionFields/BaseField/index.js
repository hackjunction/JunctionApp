import { Grid } from '@material-ui/core'
import Select from 'components/inputs/Select'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'

// TODO make field components DRY using a generic field component

const BaseField = ({ fieldName, props }) => {
    const { t } = useTranslation()
    let optionsIdentifier = ''
    return (
        <Grid item xs={12}>
            <FastField
                name={fieldName}
                render={({ field, form }) => (
                    <FormControl
                        label={t(`submission_${fieldName}_field_label`)}
                        hint="Add up to 5 technologies or tools you used to build this project"
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-border-gray-300 tw-border-solid tw-transition-all tw-duration-400 tw-border-2 hover:tw-bg-gray-300">
                            <Select
                                label={t(`submission_${fieldName}_field_label`)}
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

export default BaseField
