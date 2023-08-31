import { Grid } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import { FastField } from 'formik'
import ProjectImages from 'pages/_dashboard/slug/project/ProjectImages'
import React from 'react'

const ImagesField = ({ props }) => {
    return (
        <Grid item xs={12}>
            <FastField
                name="images"
                render={({ field, form }) => (
                    <FormControl
                        label="Images"
                        hint="Upload up to 5 images of your project! Uploaded images will be cropped to 1200x600, resize them as close as possible before upload for best results. Maximum size per image: 2MB, allowed formats: .png/.jpg."
                        touched={true}
                        error={form.errors[field.name]}
                    >
                        <ProjectImages
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

export default ImagesField
