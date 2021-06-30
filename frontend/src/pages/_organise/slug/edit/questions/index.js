import React from 'react'

import { Grid } from '@material-ui/core'
import { FastField } from 'formik'
import CustomSectionList from './CustomSectionList'
import FormControl from 'components/inputs/FormControl'

import QuestionSelect from './QuestionSelect'

export default () => {
    // const buildColumns = useCallback((form, field, fieldValue) => {
    //     return [
    //         {
    //             Header: 'Name',
    //             accessor: 'label',
    //         },
    //         {
    //             Header: 'Category',
    //             accessor: 'category',
    //         },
    //         {
    //             Header: 'Enabled?',
    //             accessor: 'enabled',
    //             Cell: props => {
    //                 const row = props.row.original
    //                 return (
    //                     <Switch
    //                         color="primary"
    //                         disabled={!row.editable}
    //                         checked={row.enable}
    //                         onChange={(e, enable) => {
    //                             form.setFieldValue(field.name, {
    //                                 ...fieldValue,
    //                                 [row.key]: {
    //                                     ...fieldValue[row.key],
    //                                     enable,
    //                                     require: !enable ? false : row.require,
    //                                 },
    //                             })
    //                         }}
    //                     />
    //                 )
    //             },
    //         },
    //         {
    //             Header: 'Required?',
    //             accessor: 'require',
    //             Cell: props => {
    //                 const row = props.row.original
    //                 return (
    //                     <Switch
    //                         color="primary"
    //                         disabled={!row.editable || !row.enable}
    //                         checked={row.require}
    //                         onChange={(e, require) => {
    //                             form.setFieldValue(field.name, {
    //                                 ...fieldValue,
    //                                 [row.key]: {
    //                                     ...fieldValue[row.key],
    //                                     require,
    //                                 },
    //                             })
    //                         }}
    //                     />
    //                 )
    //             },
    //         },
    //     ]
    // }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="registrationConfig"
                    render={({ field, form }) => (
                        <QuestionSelect
                            optionalFields={field?.value?.optionalFields}
                            requiredFields={field?.value?.requiredFields}
                            onChange={value =>
                                form.setFieldValue(field.name, value)
                            }
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="customQuestions"
                    render={({ field, form }) => (
                        <FormControl
                            label="Custom questions"
                            hint="Add custom registration questions"
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
    )
}
