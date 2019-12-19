import React from 'react';

import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import PageWrapper from 'components/layouts/PageWrapper';
import TeamsTable from 'components/tables/TeamsTable';

const TeamsPage = ({ loading, teams }) => {
    return (
        <PageWrapper>
            <TeamsTable loading={loading} teams={teams} />
        </PageWrapper>
    );
};

const mapState = state => ({
    teams: OrganiserSelectors.teams(state),
    loading: OrganiserSelectors.registrationsLoading(state) || OrganiserSelectors.teamsLoading(state)
});

export default connect(mapState)(TeamsPage);
