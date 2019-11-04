import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import SearchPage from './Search';
import AdminPage from './Admin';
import DetailPage from './Detail';

import * as RecruitmentActions from 'redux/recruitment/actions';
import CenteredContainer from 'components/generic/CenteredContainer';
import BasicNavBar from 'components/navbars/BasicNavBar';

const RecruitmentPage = ({ location, match, updateEvents, updateActionHistory }) => {
    useEffect(() => {
        updateEvents();
        updateActionHistory();
    }, []);

    return (
        <React.Fragment>
            <CenteredContainer>
                <BasicNavBar text="Junction Recruitment Tool" />
            </CenteredContainer>
            <Route path="/recruitment" component={SearchPage} />
            <Switch>
                <Route exact path="/recruitment/admin" component={AdminPage} />
                <Route path="/recruitment/:id" component={DetailPage} />
                <Redirect to="/recruitment" />
            </Switch>
        </React.Fragment>
    );
};

const mapDispatch = dispatch => ({
    updateEvents: () => dispatch(RecruitmentActions.updateEvents()),
    updateActionHistory: () => dispatch(RecruitmentActions.updateActionHistory())
});

export default connect(
    null,
    mapDispatch
)(RecruitmentPage);
