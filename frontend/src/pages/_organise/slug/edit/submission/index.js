import React, { useState } from 'react'
import {
    ErrorMessage,
    FastField,
    Field,
    FieldArray,
    Form,
    Formik,
    useFormikContext,
} from 'formik'
import { Grid } from '@material-ui/core'

import FormControl from 'components/inputs/FormControl'
import CustomSectionList from '../questions/CustomSectionList'

import CustomSectionListItem from '../questions/CustomSectionList/CustomSectionListItem'
import TempFieldBuilder from './components/TempFieldBuilder'
import Section from './section'

export default () => {
    const formikCont = useFormikContext()
    const { values } = formikCont

    console.log('Formik context from submission page', formikCont)
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FastField
                        name="submissionFormQuestions"
                        render={({ field, form }) => (
                            <FormControl
                                label="Submission form builder"
                                hint="Add custom questions to the project submission form. These questions will be asked to the user when they submit a project."
                            >
                                <CustomSectionList
                                    sections={field.value}
                                    onChange={value =>
                                        form.setFieldValue(field.name, value)
                                    }
                                />
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>
            {/* DELETE AFTER testing area  */}
            <button onClick={() => console.log(values)}>Test</button>
        </>
    )
}
