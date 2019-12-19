import React from 'react';

import { Grid, Switch } from '@material-ui/core';
import { FastField } from 'formik';
import CustomSectionList from './CustomSectionList';
import FormControl from 'components/inputs/FormControl';
import MaterialTable from 'components/generic/MaterialTable';
import Shared from '@hackjunction/shared';

const OrganiserEditEventRegistration = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FastField
                    name="userDetailsConfig"
                    render={({ field, form }) => {
                        const fieldValue = field.value || {};
                        const fieldKeys = Object.keys(fieldValue);
                        const dataSource = fieldKeys.map(field => ({
                            key: field,
                            label: Shared.RegistrationFields.getLabel(field),
                            category: Shared.RegistrationFields.getCategory(field),
                            enable: fieldValue[field].enable,
                            require: fieldValue[field].require,
                            editable: fieldValue[field].editable
                        }));

                        return (
                            <FormControl
                                label="Registration questions"
                                hint="Choose the questions you want to ask in the registration form for this event"
                            >
                                <MaterialTable
                                    title="Questions"
                                    data={dataSource}
                                    options={{
                                        exportButton: false,
                                        selection: false,
                                        showSelectAllCheckbox: false,
                                        pageSizeOptions: [5, 25, 50],
                                        debounceInterval: 500,
                                        search: false,
                                        paging: false
                                    }}
                                    columns={[
                                        {
                                            title: 'Name',
                                            field: 'label'
                                        },
                                        {
                                            title: 'Category',
                                            field: 'category'
                                        },
                                        {
                                            title: 'Enabled',
                                            field: 'enabled',
                                            render: row => {
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
                                                                    require: !enable ? false : row.require
                                                                }
                                                            });
                                                        }}
                                                    />
                                                );
                                            }
                                        },
                                        {
                                            title: 'Required',
                                            field: 'require',
                                            render: row => {
                                                return (
                                                    <Switch
                                                        color="primary"
                                                        disabled={!row.editable || !row.enable}
                                                        checked={require}
                                                        onChange={(e, require) => {
                                                            form.setFieldValue(field.name, {
                                                                ...fieldValue,
                                                                [row.key]: {
                                                                    ...fieldValue[row.key],
                                                                    require
                                                                }
                                                            });
                                                        }}
                                                    />
                                                );
                                            }
                                        }
                                    ]}
                                />
                            </FormControl>
                        );
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FastField
                    name="customQuestions"
                    render={({ field, form }) => (
                        <FormControl label="Custom questions" hint="Add custom registration questions">
                            <CustomSectionList
                                sections={field.value}
                                onChange={value => form.setFieldValue(field.name, value)}
                            />
                        </FormControl>
                    )}
                />
            </Grid>
        </Grid>
    );
};

export default OrganiserEditEventRegistration;
