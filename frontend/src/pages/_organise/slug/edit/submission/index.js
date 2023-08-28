import React, { useEffect, useState } from 'react'
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
import * as OrganiserSelectors from 'redux/organiser/selectors'
import { useSelector } from 'react-redux'
import BooleanInput from 'components/inputs/BooleanInput'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import EditableText from './components/section/EditableText'

export default () => {
    const { t } = useTranslation()
    const formikCont = useFormikContext()
    const { values } = formikCont
    const [projectsExist, setProjectsExist] = useState(false)

    const projects = useSelector(OrganiserSelectors.projects)
    const event = useSelector(OrganiserSelectors.event)

    useEffect(() => {
        if (projects && projects.length > 0 && !projectsExist) {
            console.log('projects exist')
            setProjectsExist(true)
        }
    }, [projects])

    let renderDefaultFields = []

    if (
        event.submissionFormDefaultFields &&
        event.submissionFormEnabledFields
    ) {
        renderDefaultFields = _.intersection(
            Object.keys(event.submissionFormDefaultFields),
            event.submissionFormEnabledFields,
        )
        console.log('renderDefaultFields', renderDefaultFields)
    }

    return (
        <>
            <FastField name="test">
                {({ field, form }) => {
                    return (
                        <EditableText
                            value={field.value || 'this'}
                            save={value =>
                                form.setFieldValue(field.name, value)
                            }
                            className="tw-text-xl tw-font-bold tw-text-gray-800 tw-my-1"
                            type="heading"
                        />
                    )
                }}
            </FastField>
            <div>
                {event &&
                    event.submissionFormEnabledFields &&
                    event.submissionFormEnabledFields.length > 0 &&
                    renderDefaultFields &&
                    renderDefaultFields.map((formField, index) => (
                        <div key={index}>
                            <FastField
                                name={`submissionFormDefaultFields.${formField}`}
                                render={({ field, form }) => {
                                    return (
                                        <FormControl
                                            label={formField}
                                            hint={t(
                                                `submission_form_${formField}_hint`,
                                            )}
                                            touched={true}
                                            error={form.errors[field.name]}
                                        >
                                            <BooleanInput
                                                value={field.value}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        value,
                                                    )
                                                }
                                            />
                                        </FormControl>
                                    )
                                }}
                            />
                        </div>
                    ))}
            </div>
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
                                    projectsExist={projectsExist}
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
