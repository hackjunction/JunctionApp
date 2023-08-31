import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import MarkdownInput from 'components/inputs/MarkdownInput'
import { FastField } from 'formik'
import React from 'react'

const DescriptionField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="description"
                render={({ field, form }) => (
                    <FormControl
                        label="Description"
                        hint="All the juicy details about what you've made. Max 3000 characters."
                        touched={
                            form.touched[field.name] || props.submitCount > 0
                        }
                        error={form.errors[field.name]}
                    >
                        <MarkdownInput
                            value={field.value}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                            onBlur={() => form.setFieldTouched(field.name)}
                            placeholder={
                                "Here's a few ideas:\n\n" +
                                '- Describe the problem it solves\n' +
                                '- What real-world impact it has\n' +
                                '- What technologies you used to make it\n' +
                                '- Future plans regarding the project\n\n' +
                                'Go wild!'
                            }
                        />
                    </FormControl>
                )}
            />
        </Grid>
    )
}

export default DescriptionField
