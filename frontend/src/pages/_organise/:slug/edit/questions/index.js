import React, { useCallback } from 'react'

import { Grid, Switch } from '@material-ui/core'
import { FastField } from 'formik'
import CustomSectionList from './CustomSectionList'
import FormControl from 'components/inputs/FormControl'
import Shared from '@hackjunction/shared'

import { Table } from 'components/generic/_Table'

export default () => {
    const buildColumns = useCallback((form, field, fieldValue) => {
        return [
            {
                Header: 'Name',
                accessor: 'label',
            },
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'Enabled?',
                accessor: 'enabled',
                Cell: props => {
                    const row = props.row.original
                    return (
                        <Switch
                            color="primary"
                            disabled={!row.editable}
                            checked={row.enable}
                            onChange={(e, enable) => {
                                form.setFieldValue(field.name, {
                                    ...fieldValue,
                                    [row.key]: {
                                        ...fieldValue[row.key],
                                        enable,
                                        require: !enable ? false : row.require,
                                    },
                                })
                            }}
                        />
                    )
                },
            },
            {
                Header: 'Required?',
                accessor: 'require',
                Cell: props => {
                    const row = props.row.original
                    return (
                        <Switch
                            color="primary"
                            disabled={!row.editable || !row.enable}
                            checked={row.require}
                            onChange={(e, require) => {
                                form.setFieldValue(field.name, {
                                    ...fieldValue,
                                    [row.key]: {
                                        ...fieldValue[row.key],
                                        require,
                                    },
                                })
                            }}
                        />
                    )
                },
            },
        ]
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="userDetailsConfig"
                    render={({ field, form }) => {
                        const fieldValue = field.value || {}
                        const fieldKeys = Object.keys(fieldValue)
                        const dataSource = fieldKeys.map(field => ({
                            key: field,
                            label: Shared.RegistrationFields.getLabel(field),
                            category: Shared.RegistrationFields.getCategory(
                                field
                            ),
                            enable: fieldValue[field].enable,
                            require: fieldValue[field].require,
                            editable: fieldValue[field].editable,
                        }))

                        const columns = buildColumns(form, field, fieldValue)

                        return (
                            <FormControl
                                label="Registration questions"
                                hint="Choose the questions you want to ask in the registration form for this event"
                            >
                                <Table
                                    columns={columns}
                                    data={dataSource}
                                    enablePagination={false}
                                    enableExport={false}
                                    enableSelection={false}
                                />
                            </FormControl>
                        )
                    }}
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
