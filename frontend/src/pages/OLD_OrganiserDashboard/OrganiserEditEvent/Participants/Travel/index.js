import React, { useState, useEffect, useCallback } from 'react'

import { sumBy } from 'lodash-es'
import { connect } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import { FilterHelpers } from '@hackjunction/shared'
import { withSnackbar } from 'notistack'

import Table from 'components/generic/Table'
import TextInput from 'components/inputs/TextInput'
import Statistic from 'components/generic/Statistic'

import RegistrationsService from 'services/registrations'

import * as AuthSelectors from 'redux/auth/selectors'
import * as OrganiserSelectors from 'redux/organiser/selectors'

import CalculateSpend from './CalculateSpend'

const TravelGrantPage = ({
    enqueueSnackbar,
    event,
    idToken,
    registrations,
    registrationsWithTravelGrant,
    filterGroups,
    filterGroupsLoading,
    travelGrantSpend,
    travelGrantCount,
    travelGrantRejectedCount,
}) => {
    const [groups, setGroups] = useState({})

    useEffect(() => {
        if (filterGroups) {
            setGroups(
                filterGroups.reduce((res, group) => {
                    res[group.label] = 0
                    return res
                }, {})
            )
        }
    }, [filterGroups])

    const handleAmountChange = useCallback(
        (group, amount) => {
            setGroups({
                ...groups,
                [group]: amount,
            })
        },
        [groups]
    )

    const filterGroupsMapped = filterGroups.map(group => {
        const items = FilterHelpers.applyFilters(
            registrationsWithTravelGrant,
            group.filters
        )
        return {
            ...group,
            spend: sumBy(items, r => r.travelGrant || 0),
        }
    })

    const handleBulkReject = useCallback(() => {
        return RegistrationsService.bulkRejectTravelGrantsForEvent(
            idToken,
            event.slug
        )
            .then(() => {
                enqueueSnackbar('Success!', { variant: 'success' })
                return
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong', { variant: 'error' })
                return
            })
    }, [idToken, event.slug, enqueueSnackbar])

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Statistic
                    label="Number of grants pending"
                    value={registrations.length}
                    action={handleBulkReject}
                    actionText="Reject all"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Statistic
                    label="Number of grants accepted"
                    value={travelGrantCount}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Statistic
                    label="Number of grants rejected"
                    value={travelGrantRejectedCount}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <Statistic
                    label="Current spend"
                    value={travelGrantSpend}
                    suffix="€"
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">
                    Here you can automatically grant travel grants based on your
                    filter groups. Set the amount you want to grant for each
                    group (or 0 to skip that group), and the tool will go
                    through confirmed participants in order of registration
                    time, and assign them their respective travel grant amounts
                    as long as the budget is not exceeded.
                    <br />
                    <br />
                    If a participant belongs to more than one of your filter
                    groups, they will be granted the travel grant with the
                    highest amount. If you want a group to be guaranteed to
                    receive a travel grant, regardless of how late they've
                    registered, you can set all other groups' amounts to 0 and
                    your budget high enough to fit everyone in the group.
                    <br />
                    <br />
                    You can also assign travel grant amounts individually, by
                    editing a given participant on the Participants -tab.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Table
                    title="Set travel grant sizes"
                    rowSelection={false}
                    rowNumber={false}
                    pagination={false}
                    dataSource={filterGroupsMapped}
                    loading={filterGroupsLoading}
                    columns={[
                        {
                            key: 'group',
                            label: 'Group',
                            path: 'label',
                        },
                        {
                            key: 'spend',
                            label: 'Current spend',
                            path: 'spend',
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
                                    onChange={value =>
                                        handleAmountChange(label, value)
                                    }
                                />
                            ),
                        },
                    ]}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" align="left">
                    Set budget and preview
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <CalculateSpend
                    amountsByGroup={groups}
                    onSubmit={console.log}
                />
            </Grid>
        </Grid>
    )
}

const mapState = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrationsEligibleForTravelGrant(
        state
    ),
    registrationsWithTravelGrant: OrganiserSelectors.registrationsWithTravelGrant(
        state
    ),
    filterGroups: OrganiserSelectors.filterGroups(state),
    filterGroupsLoading: OrganiserSelectors.filterGroupsLoading(state),
    travelGrantSpend: OrganiserSelectors.travelGrantSpend(state),
    travelGrantCount: OrganiserSelectors.travelGrantCount(state),
    travelGrantRejectedCount: OrganiserSelectors.travelGrantRejectedCount(
        state
    ),
})

export default withSnackbar(connect(mapState)(TravelGrantPage))
