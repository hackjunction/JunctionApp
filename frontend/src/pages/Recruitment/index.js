import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import SearchPage from './Search';
import AdminPage from './Admin';

import * as RecruitmentActions from 'redux/recruitment/actions';

const RecruitmentPage = ({ location, match, updateEvents }) => {
    useEffect(() => {
        updateEvents();
    }, []);

    return (
        <Switch>
            <Route exact path="/recruitment" component={SearchPage} />
            <Route exact path="/recruitment/admin" component={AdminPage} />
            <Redirect to="/recruitment" />
        </Switch>
    );
};

const mapDispatch = dispatch => ({
    updateEvents: () => dispatch(RecruitmentActions.updateEvents())
});

export default connect(
    null,
    mapDispatch
)(RecruitmentPage);
