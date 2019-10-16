import React, { useState, useMemo } from 'react';

import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { FilterHelpers } from '@hackjunction/shared';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import PageWrapper from 'components/PageWrapper';
import FilterGroupMenu from 'components/filters/FilterGroupMenu';
import PageHeader from 'components/generic/PageHeader';
import Statistic from 'components/generic/Statistic';
import RegistrationsByStatus from 'components/plots/RegistrationsByStatus';
import RegistrationsByCountry from 'components/plots/RegistrationsByCountry';
import RegistrationsByNationality from 'components/plots/RegistrationsByNationality';
import RegistrationsByGender from 'components/plots/RegistrationsByGender';

const OrganiserEditEventStats = props => {
    const { registrations, loading } = props;
    const [filters, setFilters] = useState([]);

    const filtered = useMemo(() => {
        return FilterHelpers.applyFilters(registrations, filters);
    }, [registrations, filters]);

    return (
        <PageWrapper loading={loading}>
            <PageHeader heading="Stats" subheading="Select a group of participants and view their stats" />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FilterGroupMenu onChange={setFilters} />
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Statistic label="Participants" value={filtered.length} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <RegistrationsByStatus registrations={filtered} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <RegistrationsByCountry registrations={filtered} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <RegistrationsByNationality registrations={filtered} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <RegistrationsByGender registrations={filtered} />
                    </Paper>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrations(state),
    loading:
        OrganiserSelectors.registrationsLoading(state) ||
        OrganiserSelectors.teamsLoading(state) ||
        OrganiserSelectors.organisersLoading(state)
});

export default connect(mapState)(OrganiserEditEventStats);
