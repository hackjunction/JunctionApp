import React, { useState, useCallback } from 'react';

import { FilterHelpers } from '@hackjunction/shared';
import { connect } from 'react-redux';
import { sortBy, sumBy, difference } from 'lodash-es';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import TextField from 'components/inputs/TextInput';
import Table from 'components/generic/Table';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import RegistrationsService from 'services/registrations';

const CalculateSpend = ({ idToken, event, amountsByGroup, filterGroups, eligibleRegistrations, enqueueSnackbar }) => {
    const [calculations, setCalculations] = useState();
    const [maxSpend, setMaxSpend] = useState(0);
    const { slug } = event;

    const makeCalculations = useCallback(() => {
        const groupsSorted = sortBy(filterGroups, group => amountsByGroup[group.label] * -1);
        const registrationsMapped = groupsSorted.reduce(
            ({ registrations, res }, group) => {
                const filtered = FilterHelpers.applyFilters(registrations, group.filters);
                const amount = parseInt(amountsByGroup[group.label]);

                if (amount === 0) {
                    return { registrations, res };
                }

                return {
                    res: res.concat(
                        filtered.map(reg => ({
                            id: reg._id,
                            group: group.label,
                            amount,
                            createdAt: reg.createdAt
                        }))
                    ),
                    registrations: difference(registrations, filtered)
                };
            },
            {
                registrations: eligibleRegistrations,
                res: []
            }
        ).res;
        const registrationsSorted = sortBy(registrationsMapped, 'createdAt');

        const registrationsGranted = [];
        let currentSpend = 0;
        for (let item of registrationsSorted) {
            if (currentSpend + item.amount <= maxSpend) {
                currentSpend += item.amount;
                registrationsGranted.push(item);
            }
        }

        const byGroup = filterGroups.map(group => {
            const amount = amountsByGroup[group.label];
            const granted = registrationsGranted.filter(r => r.group === group.label);
            const total = registrationsSorted.filter(r => r.group === group.label);

            return {
                group: group.label,
                amount,
                registrationsGranted: granted,
                registrationsTotal: total,
                totalSpend: sumBy(granted, 'amount')
            };
        });

        const byGroupSorted = sortBy(byGroup, 'totalSpend');

        setCalculations({
            granted: registrationsGranted,
            total: registrationsSorted,
            spend: currentSpend,
            byGroup: byGroupSorted
        });
    }, [filterGroups, eligibleRegistrations, maxSpend, amountsByGroup]);

    const handleSubmit = useCallback(() => {
        const data = calculations.granted.map(item => ({
            _id: item.id,
            amount: item.amount
        }));

        RegistrationsService.bulkAssignTravelGrantsForEvent(idToken, slug, data)
            .then(() => {
                enqueueSnackbar('Success!', { variant: 'success' });
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong...', { variant: 'error' });
                console.log(err);
            });
    }, [idToken, slug, calculations, enqueueSnackbar]);

    const canSubmit = calculations && calculations.granted.length > 0;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row">
                    <Box flex="1" mr={2}>
                        <TextField
                            value={maxSpend}
                            onChange={setMaxSpend}
                            type="number"
                            label="How much more money do you wish to allocate? (EUR)"
                        />
                    </Box>
                    <Button variant="contained" color="primary" onClick={makeCalculations}>
                        Calculate
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {calculations && (
                    <React.Fragment>
                        <Box p={2}>
                            <Typography>
                                This would result in a total spend of {calculations.spend} and give travel grants to{' '}
                                {calculations.granted.length} participants
                            </Typography>
                        </Box>
                        <Table
                            dataSource={calculations.byGroup}
                            loading={false}
                            rowKey="group"
                            pagination={false}
                            rowSelection={false}
                            rowNumber={false}
                            columns={[
                                {
                                    key: 'group',
                                    label: 'Group',
                                    path: 'group'
                                },
                                {
                                    key: 'amount',
                                    label: 'Amount',
                                    path: 'amount'
                                },
                                {
                                    key: 'granted',
                                    label: 'Granted to',
                                    path: 'registrationsGranted',
                                    render: (granted, { registrationsTotal }) =>
                                        `${granted.length}/${registrationsTotal.length}`
                                },
                                {
                                    key: 'spend',
                                    label: 'Spend (EUR)',
                                    path: 'totalSpend'
                                }
                            ]}
                        />
                    </React.Fragment>
                )}
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Button disabled={!canSubmit} variant="contained" color="primary" onClick={handleSubmit}>
                        Assign travel grants
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    filterGroups: OrganiserSelectors.filterGroups(state),
    eligibleRegistrations: OrganiserSelectors.registrationsEligibleForTravelGrant(state)
});

export default withSnackbar(connect(mapState)(CalculateSpend));
