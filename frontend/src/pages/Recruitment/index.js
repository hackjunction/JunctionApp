import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import SearchPage from './Search';
import AdminPage from './Admin';

const RecruitmentPage = ({ location, match }) => {
    return (
        <Switch>
            <Route exact path="/recruitment" component={SearchPage} />
            <Route exact path="/recruitment/admin" component={AdminPage} />
            <Redirect to="/recruitment" />
        </Switch>
    );
};

export default RecruitmentPage;
