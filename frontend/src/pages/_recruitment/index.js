import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import PageWrapper from 'components/layouts/PageWrapper'
import * as RecruitmentActions from 'redux/recruitment/actions'
import CenteredContainer from 'components/generic/CenteredContainer'
import BasicNavBar from 'components/navbars/BasicNavBar'

import SearchPage from './default'
import AdminPage from './admin'
import DetailPage from './:id'
import config from 'constants/config'

export default () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(RecruitmentActions.updateEvents())
        dispatch(RecruitmentActions.updateActionHistory())
    }, [dispatch])

    return (
        <PageWrapper wrapContent={false} showErrorMessage>
            <CenteredContainer>
                <BasicNavBar
                    text={config.PLATFORM_OWNER_NAME + ' Recruitment Tool'}
                />
            </CenteredContainer>
            <Route path="/recruitment" component={SearchPage} />
            <Switch>
                <Route exact path="/recruitment/admin" component={AdminPage} />
                <Route path="/recruitment/:id" component={DetailPage} />
                <Redirect to="/recruitment" />
            </Switch>
        </PageWrapper>
    )
}
