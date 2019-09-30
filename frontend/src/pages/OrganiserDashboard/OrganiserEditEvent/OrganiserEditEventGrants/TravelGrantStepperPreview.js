import React, { useMemo } from 'react';

import { sortBy, find } from 'lodash-es';
import { FilterHelpers } from '@hackjunction/shared';

import Table from 'components/generic/Table';

const TravelGrantStepperPreview = ({ registrations, groupConfig }) => {
    const sorted = sortBy(registrations, 'createdAt');

    const registrationsByGroup = useMemo(() => {
        return groupConfig.map(({ group, amount }) => {
            const matching = FilterHelpers.applyFilters(registrations, group.filters).map(r => r._id);

            return {
                group,
                amount,
                matching
            };
        });
    }, [registrations, groupConfig]);

    const mapped = useMemo(() => {
        return sorted.map(reg => {
            const group = find(registrationsByGroup, ({ matching }) => {
                return matching.indexOf(reg._id);
            });

            if (group) {
                return {
                    ...reg,
                    amount: group.amount,
                    group: group.group
                };
            } else {
                return {
                    ...reg,
                    amount: 0,
                    group: 'No match'
                };
            }
        });
    }, [sorted, registrationsByGroup]);

    return (
        <Table
            dataSource={mapped}
            columns={[
                {
                    key: 'name',
                    label: 'Name',
                    path: 'answers',
                    render: answers => `${answers.firstName} ${answers.lastName}`
                },
                {
                    key: 'travelsFrom',
                    label: 'Travels from',
                    path: 'answers.countryOfTravel'
                },
                {
                    key: 'createdAt',
                    label: 'Registered',
                    path: 'createdAt'
                },
                {
                    key: 'group',
                    label: 'Group',
                    path: 'group',
                    render: group => group.label
                },
                {
                    key: 'amount',
                    label: 'Amount',
                    path: 'amount'
                }
            ]}
            rowKey="_id"
            loading={false}
            pagination={true}
            rowNumber={false}
            rowSelection={false}
            title={'Preview'}
        />
    );
};

export default TravelGrantStepperPreview;
