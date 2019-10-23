import React from 'react';

import { Grid } from '@material-ui/core';
import { FastField } from 'formik';
import { Table, Switch } from 'antd';
import CustomSectionList from './CustomSectionList';
import FormControl from 'components/inputs/FormControl';
import Shared from '@hackjunction/shared';

const OrganiserEditEventRegistration = props => {
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
                                <Table
                                    bordered={true}
                                    style={{ background: 'white' }}
                                    dataSource={dataSource}
                                    pagination={false}
                                    columns={[
                                        {
                                            title: 'Name',
                                            dataIndex: 'label'
                                        },
                                        {
                                            title: 'Category',
                                            dataIndex: 'category'
                                        },
                                        {
                                            title: 'Enabled',
                                            dataIndex: 'enable',
                                            align: 'center',
                                            render: (enable, record) => {
                                                return (
                                                    <Switch
                                                        disabled={!record.editable}
                                                        checked={enable}
                                                        onChange={enable => {
                                                            props.setFieldValue(field.name, {
                                                                ...fieldValue,
                                                                [record.key]: {
                                                                    ...fieldValue[record.key],
                                                                    enable,
                                                                    require: !enable ? false : record.require
                                                                }
                                                            });
                                                        }}
                                                    />
                                                );
                                            }
                                        },
                                        {
                                            title: 'Required',
                                            dataIndex: 'require',
                                            align: 'center',
                                            render: (require, record) => {
                                                return (
                                                    <Switch
                                                        disabled={!record.editable || !record.enable}
                                                        checked={require}
                                                        onChange={require => {
                                                            props.setFieldValue(field.name, {
                                                                ...fieldValue,
                                                                [record.key]: {
                                                                    ...fieldValue[record.key],
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
