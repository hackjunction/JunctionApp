import React, { useEffect, useRef, useState } from 'react'

import { Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import SearchResults from './SearchResults'
import Filters from './Filters'
import Container from 'components/generic/Container'
import PageWrapper from 'components/layouts/PageWrapper'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
import * as RecruitmentActions from 'redux/recruitment/actions'
import * as UserSelectors from 'redux/user/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as AuthSelectors from 'redux/auth/selectors'

import ToggleFavorites from './ToggleFavorites'
import { useTranslation } from 'react-i18next'
import { useToggle } from 'hooks/customHooks'
import Button from 'components/generic/Button'
import { CSVLink } from 'react-csv'
import { flattenObject } from 'utils/dataModifiers'

// Used on flatenObject function
const skipArray = ['_id', 'userId', 'registrations']
const stringEscapeArray = [
    'firstName',
    'lastName',
    'motivation',
    'headline',
    'cityOfResidence',
    'biography',
    'cityOfTravel',
]

export default () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const idTokenData = useSelector(AuthSelectors.idTokenData)
    const favorites = useSelector(RecruitmentSelectors.favorites)
    const event = useSelector(DashboardSelectors.event)
    const eventId = event?._id
    const recEvents = useSelector(UserSelectors.userProfileRecruiterEvents)
    const csvLink = useRef(null)

    const [recruiterOrganisation, SetRecruiterOrganisation] = useState('')
    const [showFavorites, toggleFavorites] = useToggle(false)

    useEffect(() => {
        //TODO add snackbar for error display
        if (!idTokenData) {
            throw new Error(t('Invalid_token_'))
        }
        if (!(idTokenData.recruiter_events?.length > 0)) {
            throw new Error(t('Invalid_access_'))
        }
    }, [idTokenData])

    useEffect(() => {
        dispatch(RecruitmentActions.updateEvents())

        const organisation = recEvents.find(e => {
            return e.eventId === eventId
        }).organisation
        SetRecruiterOrganisation(organisation)

        dispatch(RecruitmentActions.updateActionHistory(organisation))
    }, [recEvents])

    return (
        <>
            <PageWrapper loading={false}>
                <Container center>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        mb={2}
                    >
                        <ToggleFavorites
                            count={favorites.length}
                            active={showFavorites}
                            onChange={toggleFavorites}
                        />
                    </Box>

                    {showFavorites ? (
                        <>
                            <Button
                                onClick={() => {
                                    csvLink.current.link.click()
                                }}
                                variant="contained"
                            >
                                Download as CSV
                            </Button>
                            <CSVLink
                                className=" tw-hidden"
                                data={favorites.map(fav => {
                                    return flattenObject(
                                        fav,
                                        skipArray,
                                        stringEscapeArray,
                                    )
                                })}
                                filename={`${event.name}-favorite-profiles.csv`}
                                ref={csvLink}
                            />
                            <SearchResults
                                items={favorites}
                                organisation={recruiterOrganisation}
                                eventId={eventId}
                            />
                        </>
                    ) : (
                        <>
                            <Filters />
                            <SearchResults
                                organisation={recruiterOrganisation}
                                eventId={eventId}
                            />
                        </>
                    )}
                </Container>
            </PageWrapper>
        </>
    )
}
