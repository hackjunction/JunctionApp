import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'

import PageWrapper from 'components/layouts/PageWrapper'
import GradientBox from 'components/generic/GradientBox'

import Instructions from './Instructions'
import FirstProject from './FirstProject'
import CompareProjects from './CompareProjects'
import Complete from './Complete'
import Disabled from './Disabled'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'

export default () => {
    const dispatch = useDispatch()
    const team = useSelector(DashboardSelectors.team)
    const event = useSelector(DashboardSelectors.event)
    const annotator = useSelector(DashboardSelectors.annotator)
    const annotatorError = useSelector(DashboardSelectors.annotatorError)
    const annotatorLoading = useSelector(DashboardSelectors.annotatorLoading)

    useEffect(() => {
        dispatch(DashboardActions.updateAnnotator(event.slug))
    }, [event.slug, dispatch])

    const renderContent = () => {
        if (!team) {
            return (
                <GradientBox p={3} color="theme_orange">
                    <Typography variant="button">Team status</Typography>
                    <Typography variant="h4">Not in a team</Typography>
                    <Typography variant="body1">
                        You need to be in a team to participate in reviewing
                    </Typography>
                </GradientBox>
            )
        }

        if (!annotator) {
            return <Instructions />
        }

        if (!annotator.active) {
            return <Disabled />
        }

        if (!annotator.prev && annotator.next) {
            return <FirstProject projectId={annotator.next} />
        }

        if (annotator.prev && annotator.next) {
            return (
                <CompareProjects
                    annotator={annotator}
                    prevId={annotator.prev}
                    nextId={annotator.next}
                    isFirstChoice={annotator.ignore.length === 1}
                />
            )
        }

        return <Complete />
    }
    console.log("annotator",annotator,annotatorError)
    return (
        <PageWrapper loading={annotatorLoading} error={annotatorError}>
            {renderContent()}
        </PageWrapper>
    )
}
