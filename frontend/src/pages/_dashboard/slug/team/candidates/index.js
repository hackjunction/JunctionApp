import CandidateCard from 'components/cards/CandidateCard'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import yupSchema from '@hackjunction/shared/schemas/validation/eventSchema'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { UPDATE_EVENT } from 'graphql/mutations/eventOps'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as OrganiserActions from 'redux/organiser/actions'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import { forOwn } from 'lodash-es'
import NoTeam from 'components/Team/NoTeam'
import { set } from 'react-ga'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const { slug } = event
    useEffect(() => {
        dispatch(DashboardActions.updateTeam(slug))
    }, [])
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const team = useSelector(DashboardSelectors.team)
    const [selected, setSelected] = useState(false)
    const [loadingCandidate, setLoadingCandidate] = useState(false)
    const [candidateSelected, setCandidateSelected] = useState('')
    const [candidateSelectedData, setCandidateSelectedData] = useState({})

    // const candidateList = team.candidates || []
    // if (team.candidates?.length > 0) {
    //     const userIds = team.candidates.map(candidate => candidate.userId)
    // }

    // let candidateSelectedData

    const fetchCandidateData = async () => {
        return await dispatch(
            DashboardActions.getCandidateProfileById(candidateSelected),
        )
    }

    useEffect(() => {
        if (candidateSelected) {
            setLoadingCandidate(true)
            fetchCandidateData()
                .then(data => setCandidateSelectedData(data))
                .catch(err => console.log(err))
                .finally(() => {
                    console.log(candidateSelectedData)
                    setLoadingCandidate(false)
                })
        }
    }, [candidateSelected])

    return (
        <>
            {hasTeam && team.candidates.length > 0 ? (
                // TODO Make into component
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 1440: 3 }}
                >
                    <Masonry>
                        {team.candidates.map(candidate => (
                            <CandidateCard
                                candidateData={candidate}
                                onViewApplication={async () => {
                                    setSelected(true)
                                    setCandidateSelected(candidate.userId)
                                }}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            ) : (
                // TODO make prop to show different message when there are no candidates or teams to join
                <>
                    <div>No applications yet</div>
                </>
            )}
            {selected && !loadingCandidate && candidateSelectedData && (
                <div>{candidateSelectedData.lastName}</div>
            )}
        </>
    )
}
