import React from 'react'

import { Helmet } from 'react-helmet'

import { useResolvedPath } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useActiveEvents, usePastEvents } from 'graphql/queries/events'

import config from 'constants/config'
import { useTranslation } from 'react-i18next'

import { Box, Grid, Typography } from '@mui/material'

import BannerCarousel from 'components/generic/BannerCarousel'
import Button from 'components/generic/Button'
import Container from 'components/generic/Container'
import Divider from 'components/generic/Divider'
import ExternalLink from 'components/generic/ExternalLink'
import Footer from 'components/layouts/Footer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Image from 'components/generic/Image'
import PageWrapper from 'components/layouts/PageWrapper'

import EventsGrid from './EventsGrid'
import IndexPage from './IndexPage'
import * as AuthSelectors from '../../reducers/auth/selectors'

export default () => {
    //TODO these shouldn't be queried. Events and organizations should be in the state
    const [activeEvents] = useActiveEvents({ limit: 3 })
    const [pastEvents] = usePastEvents({ limit: 3 })
    const userIsAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const url = useResolvedPath('').pathname
    const dispatch = useDispatch()
    const { t } = useTranslation()
    console.log('activeEvents', activeEvents)

    return (
        <>
            {
                userIsAuthenticated ? (
                    <Redirect to="/dashboard/default" />
                ) : (
                    <Redirect to="/home" />
                )
                // <Route
                //     exact={true}
                //     path={`${match.path}/home`}
                //     component={IndexPage}
                // />
            }
        </>
    )
}
