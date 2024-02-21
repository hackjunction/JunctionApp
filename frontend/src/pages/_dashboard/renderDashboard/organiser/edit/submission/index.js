import React, { useEffect, useMemo, useState } from 'react'
import { FastField, useFormikContext } from 'formik'
import { Grid, Typography } from '@material-ui/core'
import FormControl from 'components/inputs/FormControl'
import CustomSectionList from '../questions/CustomSectionList'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import Switch from '../../../../../../components/generic/Switch'
import Button from 'components/generic/Button'

export default () => {
    const { t } = useTranslation()
    const [projectsExist, setProjectsExist] = useState(false)
    const [showDisabled, setShowDisabled] = useState(false)
    const projects = useSelector(OrganiserSelectors.projects)
    const event = useSelector(OrganiserSelectors.event)
    const formikCont = useFormikContext()

    useEffect(() => {
        if (projects && projects.length > 0 && !projectsExist) {
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
    }

    const fieldValue = field => {
        return (
            formikCont.values[`submissionFormDefaultFields`]?.[`${field}`] ??
            false
        )
    }

    return (
        <>
            <Grid container spacing={8}>
                <Grid
                    item
                    xs={12}
                    className="tw-flex tw-gap-4 tw-flex-col lg:tw-flex-row lg:tw-justify-between lg:tw-items-center"
                >
                    <div className="tw-flex tw-flex-col tw-gap-2">
                        <Typography
                            className="tw-font-bold tw-tracking-tight"
                            variant="h4"
                            component="h4"
                        >
                            {t(`submission_form_customization_title`)}
                        </Typography>
                        <Typography variant="p" component="p">
                            {t(`submission_form_customization_subtitle`)}
                        </Typography>
                    </div>
                    <Button
                        color="outlined_button"
                        variant="jOutlined"
                        onClick={() => setShowDisabled(!showDisabled)}
                    >
                        {showDisabled
                            ? 'Hide disabled fields'
                            : 'Show disabled fields'}
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                        {event &&
                            event.submissionFormEnabledFields &&
                            event.submissionFormEnabledFields.length > 0 &&
                            renderDefaultFields &&
                            renderDefaultFields.map((formField, index) => {
                                if (showDisabled || fieldValue(formField)) {
                                    return (
                                        <FastField
                                            key={index}
                                            name={`submissionFormDefaultFields.${formField}`}
                                            render={({ field, form }) => {
                                                return (
                                                    <div className="tw-px-4 tw-gap-4 tw-pb-4 tw-pt-6 tw-rounded-md tw-shadow-md tw-bg-white tw-w-full tw-flex tw-justify-between tw-items-center ">
                                                        <FormControl
                                                            label={formField}
                                                            hint={t(
                                                                `submission_form_${formField}_hint`,
                                                            )}
                                                            touched={true}
                                                            error={
                                                                form.errors[
                                                                    field.name
                                                                ]
                                                            }
                                                        ></FormControl>
                                                        <Switch
                                                            checked={
                                                                field.value ||
                                                                false
                                                            }
                                                            onChange={value =>
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    value,
                                                                )
                                                            }
                                                            checkedText="Enabled"
                                                            uncheckedText="Disabled"
                                                        />
                                                    </div>
                                                )
                                            }}
                                        />
                                    )
                                }
                            })}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <FastField
                        name="submissionFormQuestions"
                        render={({ field, form }) => (
                            <FormControl
                                label="Custom questions for project submission"
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
        </>
    )
}
