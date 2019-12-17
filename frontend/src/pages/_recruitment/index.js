import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageWrapper from 'components/layouts/PageWrapper';
import * as RecruitmentActions from 'redux/recruitment/actions';
import CenteredContainer from 'components/generic/CenteredContainer';
import BasicNavBar from 'components/navbars/BasicNavBar';

import SearchPage from './default';
import AdminPage from './admin';
import DetailPage from './:id';

const RecruitmentPage = ({ location, match, updateEvents, updateActionHistory }) => {
    useEffect(() => {
        updateEvents();
        updateActionHistory();
    }, []);

    return (
        <PageWrapper wrapContent={false} showErrorMessage>
            <CenteredContainer>
                <BasicNavBar text="Junction Recruitment Tool" />
            </CenteredContainer>
            <Route path="/recruitment" component={SearchPage} />
            <Switch>
                <Route exact path="/recruitment/admin" component={AdminPage} />
                <Route path="/recruitment/:id" component={DetailPage} />
                <Redirect to="/recruitment" />
            </Switch>
        </PageWrapper>
    );
};

const mapDispatch = dispatch => ({
    updateEvents: () => dispatch(RecruitmentActions.updateEvents()),
    updateActionHistory: () => dispatch(RecruitmentActions.updateActionHistory())
});

export default connect(null, mapDispatch)(RecruitmentPage);
