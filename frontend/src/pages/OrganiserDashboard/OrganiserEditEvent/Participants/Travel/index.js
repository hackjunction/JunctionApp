import React, { useState, useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import Table from 'components/generic/Table';
import TextInput from 'components/inputs/TextInput';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import CalculateSpend from './CalculateSpend';

const TravelGrantPage = ({ registrations, filterGroups, filterGroupsLoading }) => {
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
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="body">
                    Here you can automatically grant travel grants based on your filter groups. Set the amount you want
                    to grant for each group (or 0 to skip that group), and the tool will go through confirmed
                    participants in order of registration time, and assign them their respective travel grant amounts as
                    long as the budget is not exceeded.
                    <br />
                    <br />
                    If a participant belongs to more than one of your filter groups, they will be granted the travel
                    grant with the highest amount. If you want a group to be guaranteed to receive a travel grant,
                    regardless of how late they've registered, you can set all other groups' amounts to 0 and your
                    budget high enough to fit everyone in the group.
                    <br />
                    <br />
                    You can also assign travel grant amounts individually, by editing a given participant on the
                    Participants -tab.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Table
                    title="Set travel grant sizes"
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
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="left">
                    Set budget and preview
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CalculateSpend amountsByGroup={groups} onSubmit={console.log} />
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrationsConfirmed(state),
    filterGroups: OrganiserSelectors.filterGroups(state),
    filterGroupsLoading: OrganiserSelectors.filterGroupsLoading(state)
});

export default connect(mapState)(TravelGrantPage);
