import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import junctionStyle from 'utils/styles'
import {
    AppBar,
    Card,
    CardActions,
    CardContent,
    Chip,
    Grid,
    Tab,
    Tabs,
    Typography,
} from '@mui/material'
import { Yes, No, NotAvailable } from 'components/generic/Tag/Variants'

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionActions from '@mui/material/AccordionActions'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'

import { Formik } from 'formik'
import * as OrganiserSelectors from 'reducers/organiser/selectors'
import * as OrganiserActions from 'reducers/organiser/actions'
import * as SnackbarActions from 'reducers/snackbar/actions'
import { useResolvedPath, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import { forOwn } from 'lodash-es'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'
import ConfigurePage from '../default/configure'
import TeamCandidatesPage from './teamCandidates'
import YourTeamPage from './yourTeam'

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Container from 'components/generic/Container'
import Button from 'components/generic/Button'
import Tag from 'components/generic/Tag'
import { Skeleton, TabPanel } from '@mui/lab'
import TeamCard from 'components/cards/TeamCard'
import JoinTeamPage from './joinTeam'
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout'
import BottomBar from 'components/inputs/BottomBar'
import PageHeader from 'components/generic/PageHeader'

export default () => {
    const url = useResolvedPath('').pathname
    const location = useLocation()
    const dispatch = useDispatch()
    const event = useSelector(OrganiserSelectors.event)

    const loading = useSelector(OrganiserSelectors.eventLoading)
    const { slug, _id } = event
    const [saveChanges, saveResult] = useMutation(UPDATE_EVENT, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to save changes', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: false, // this could be the problem why errors messages persist? => solution: set to false
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to save changes'))
            }
        },
        onCompleted: () => {
            dispatch(OrganiserActions.updateEvent(slug)).then(() =>
                dispatch(
                    SnackbarActions.success(
                        'Your changes were saved successfully',
                    ),
                ),
            )
        },
    })

    function onSubmit(values, actions) {
        const changed = {}
        forOwn(values, (value, field) => {
            if (event[field] !== value) {
                changed[field] = value
            }
        })
        saveChanges({
            variables: { _id, input: changed },
        })
        actions.setSubmitting(false)
    }

    // const [events, loading] = useMyEvents()
    const classes = junctionStyle()
    return (
        <PageWrapper
            // loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <Container>
                    <PageHeader heading="Team management" />
                    <Formik
                        initialValues={
                            saveResult.data
                                ? saveResult.data.updateEvent
                                : event
                        }
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validationSchema={yupSchema}
                    >
                        {formikProps => (
                            <MaterialTabsLayout
                                transparent
                                tabs={[
                                    {
                                        label: 'Join a team',
                                        key: 'joinTeam',
                                        path: '',
                                        component: JoinTeamPage,
                                    },
                                    {
                                        label: 'Your team',
                                        key: 'teamProfile',
                                        path: '/profile',
                                        component: YourTeamPage,
                                    },
                                    {
                                        label: 'Team candidates',
                                        key: 'candidates',
                                        path: '/candidates',
                                        component: TeamCandidatesPage,
                                    },
                                ]}
                                baseRoute={match.url}
                                location={location}
                            />
                        )}
                    </Formik>
                </Container>
            )}
        />
    )
}
