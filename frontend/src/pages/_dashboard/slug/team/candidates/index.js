import CandidateCard from 'components/cards/CandidateCard'
import { Formik } from 'formik'
import _ from 'lodash'
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
import Profile from 'components/Participant/Profile'
import Button from 'components/generic/Button'

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
    const [candidateId, setCandidateId] = useState('')
    const [candidateSelectedData, setCandidateSelectedData] = useState({})

    // const candidateList = team.candidates || []
    // if (team.candidates?.length > 0) {
    //     const userIds = team.candidates.map(candidate => candidate.userId)
    // }

    // let candidateSelectedData

    const fetchCandidateData = async CandidateUserId => {
        return await dispatch(
            DashboardActions.getCandidateProfileById(CandidateUserId),
        )
    }

    useEffect(() => {
        if (candidateId) {
            setLoadingCandidate(true)
            fetchCandidateData(candidateId)
                .then(data => setCandidateSelectedData(data))
                .catch(err => console.log(err))
                .finally(() => {
                    setLoadingCandidate(false)
                })
        }
    }, [candidateId])

    useEffect(() => {
        console.log('candidateSelectedData', candidateSelectedData)
    }, [candidateSelectedData])

    const onBack = () => {
        setSelected(false)
        setCandidateId('')
        setCandidateSelectedData({})
    }

    const onViewApplication = userId => {
        setSelected(true)
        setCandidateId(userId)
    }

    return (
        <>
            {!selected &&
                (hasTeam && team.candidates.length > 0 ? (
                    // TODO Make into component
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 1440: 3 }}
                    >
                        <Masonry>
                            {team.candidates.map(candidate => (
                                <CandidateCard
                                    candidateData={candidate}
                                    onViewApplication={() => {
                                        onViewApplication(candidate.userId)
                                    }}
                                />
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                ) : (
                    // TODO make prop to show different message when there are no candidates or teams to join
                    <div>No applications yet</div>
                ))}
            {selected &&
                !loadingCandidate &&
                !_.isEmpty(candidateSelectedData) && (
                    <>
                        <Button
                            color="outlined_button"
                            variant="jOutlined"
                            onClick={onBack}
                        >
                            Back
                        </Button>
                        <Profile user={candidateSelectedData}></Profile>
                    </>
                )}
        </>
    )
}
