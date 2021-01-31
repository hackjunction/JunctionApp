import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import PageWrapper from 'components/layouts/PageWrapper'
import * as RecruitmentActions from 'redux/recruitment/actions'
import Container from 'components/generic/Container'
/*import BasicNavBar from 'components/navbars/BasicNavBar'*/
import GlobalNavBar from 'components/navbars/GlobalNavBar'

import SearchPage from './default'
import AdminPage from './admin'
import DetailPage from './id'
import config from 'constants/config'

export default () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(RecruitmentActions.updateEvents())
        dispatch(RecruitmentActions.updateActionHistory())
    }, [dispatch])

    return (
        <PageWrapper wrapContent={false} showErrorMessage>
            <GlobalNavBar />
            <Route path="/recruitment" component={SearchPage} />
            <Switch>
                <Route exact path="/recruitment/admin" component={AdminPage} />
                <Route path="/recruitment/:id" component={DetailPage} />
                <Redirect to="/recruitment" />
            </Switch>
        </PageWrapper>
    )
}
