import React from 'react';

import { Table, Switch, PageHeader } from 'antd';
import FormikField from 'components/FormComponents/FormikField';
import CustomSectionList from './CustomSectionList';

import Shared from '@hackjunction/shared';

const OrganiserEditEventRegistration = props => {
    return (
        <div>
            <PageHeader title="Required user details" subTitle="Select the user details you are interested in" />
            <FormikField
                name="userDetailsConfig"
                isFast={true}
                render={({ field }) => {
                    const fieldValue = field.value;
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
                    );
                }}
            />
            <PageHeader title="Custom registration fields" subTitle="Add custom registration questions" />
            <FormikField
                name="customQuestions"
                isFast={true}
                render={({ field, form }) => {
                    return (
                        <CustomSectionList
                            sections={field.value}
                            onChange={value => form.setFieldValue(field.name, value)}
                        />
                    );
                }}
            />
        </div>
    );
};

export default OrganiserEditEventRegistration;
