import React from 'react';

import { RegistrationStatuses } from '@hackjunction/shared';
import { Select, Tag } from 'antd';

const RegistrationStatusSelect = ({ value, onChange, placeholder = 'Select status' }) => {
    return (
        <Select placeholder={placeholder} size="large" value={value} style={{ width: '100%' }} onChange={onChange}>
            <Select.OptGroup label="Can assign">
                {RegistrationStatuses.asArray
                    .filter(status => status.allowAssign)
                    .map(status => {
                        return (
                            <Select.Option key={status.id} value={status.id}>
                                <Tag color={status.color}>{status.label}</Tag>
                            </Select.Option>
                        );
                    })}
            </Select.OptGroup>
            <Select.OptGroup label="Can't assign directly">
                {RegistrationStatuses.asArray
                    .filter(status => !status.allowAssign)
                    .map(status => {
                        return (
                            <Select.Option key={status.id} value={status.id} disabled={true}>
                                <Tag color={status.color}>{status.label}</Tag>
                            </Select.Option>
                        );
                    })}
            </Select.OptGroup>
        </Select>
    );
};

export default RegistrationStatusSelect;
