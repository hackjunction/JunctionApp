import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Auth } from '@hackjunction/shared';
import { Typography, Dialog } from '@material-ui/core';
import RequiresPermission from 'hocs/RequiresPermission';

import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

import SearchBox from './SearchBox';
import RecruitersList from './RecruitersList';
import RevokeAccessDialog from './RevokeAccessDialog';
import GrantAccessDialog from './GrantAccessDialog';

const RecruitmentAdminPage = () => {
    const [grantingUser, setGrantingUser] = useState();
    const [revokingUser, setRevokingUser] = useState();

    return (
        <Dialog fullScreen open={true} transitionDuration={0}>
            <CenteredContainer>
                <PageHeader heading="Recruitment admin" subheading="Manage access to recruitment dashboard" />
                <Typography variant="h6">Add recruiters</Typography>
                <SearchBox onGrant={setGrantingUser} onRevoke={setRevokingUser} />
                <Typography variant="h6">Manage recruiters</Typography>
                <RecruitersList onRevoke={setRevokingUser} />
                <GrantAccessDialog userId={grantingUser} onClose={() => setGrantingUser()} />
                <RevokeAccessDialog userId={revokingUser} onClose={() => setRevokingUser()} />
            </CenteredContainer>
        </Dialog>
    );
};

const mapState = state => ({
    searchResults: RecruitmentSelectors.adminSearchResults(state),
    recruiters: RecruitmentSelectors.adminRecruiters(state)
});

const mapDispatch = dispatch => ({
    updateSearchResults: query => dispatch(RecruitmentActions.updateAdminSearchResults(query)),
    updateRecruiters: () => dispatch(RecruitmentActions.updateAdminRecruiters())
});

export default RequiresPermission(
    connect(
        mapState,
        mapDispatch
    )(RecruitmentAdminPage),
    [Auth.Permissions.MANAGE_RECRUITMENT]
);
