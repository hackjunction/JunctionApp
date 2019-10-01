import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { Typography, Box, Grid } from '@material-ui/core';
import { sumBy, filter } from 'lodash-es';
import Stepper from 'components/generic/Stepper';
import Statistic from 'components/generic/Statistic';
import Table from 'components/generic/Table';
import TextInput from 'components/inputs/TextInput';

import * as OrganiserSelectors from 'redux/organiser/selectors';

const TravelGrantStepper = ({ registrations, filterGroups, filterGroupsLoading }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [groups, setGroups] = useState({});

    useEffect(() => {
        if (filterGroups) {
            setGroups(
                filterGroups.reduce((res, group) => {
                    res[group.label] = 0;
                    return res;
                }, {})
            );
        }
    }, [filterGroups]);

    const handleAmountChange = useCallback(
        (group, amount) => {
            setGroups({
                ...groups,
                [group]: amount
            });
        },
        [groups]
    );

    return (
        <Box>
            <Box mt={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Statistic label="Confirmed participants" value={registrations.length} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Statistic
                            label="Travel grants admitted"
                            value={filter(registrations, r => !!r.travelGrant).length}
                            suffix={`/${registrations.length}`}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Statistic
                            label="Current spend"
                            value={sumBy(registrations, 'travelGrant') || 0}
                            suffix="EUR"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2}>
                <Typography>
                    This is a tool for automatically assigning travel grants to participants. Choose which participants
                    should be eligible for how much, and the tool will automatically assign travel grants to
                    participants in the order they registered.
                </Typography>
            </Box>
            <Stepper
                activeStep={activeStep}
                onStepChange={setActiveStep}
                onDone={() => window.alert('HELLO')}
                steps={[
                    {
                        key: 'set-groups',
                        label: 'Configure the size of travel grant per group',
                        render: () => (
                            <Table
                                title="Filter groups"
                                rowSelection={false}
                                rowNumber={false}
                                pagination={false}
                                dataSource={filterGroups}
                                loading={filterGroupsLoading}
                                columns={[
                                    {
                                        key: 'group',
                                        label: 'Group',
                                        path: 'label'
                                    },
                                    {
                                        key: 'amount',
                                        label: 'Amount',
                                        path: 'label',
                                        render: label => (
                                            <TextInput
                                                label="Enter amount (EUR)"
                                                type="number"
                                                value={groups[label]}
                                                onChange={value => handleAmountChange(label, value)}
                                            />
                                        )
                                    }
                                ]}
                            />
                        )
                    },
                    {
                        key: 'preview-spend',
                        label: 'Preview spend',
                        render: () => <h1>Step 2</h1>
                    },
                    {
                        key: 'assign-grants',
                        label: 'Assign grants',
                        render: () => <h1>Step 3</h1>
                    }
                ]}
            />
        </Box>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrationsConfirmed(state),
    filterGroups: OrganiserSelectors.filterGroups(state),
    filterGroupsLoading: OrganiserSelectors.filterGroupsLoading(state)
});

export default connect(mapState)(TravelGrantStepper);
