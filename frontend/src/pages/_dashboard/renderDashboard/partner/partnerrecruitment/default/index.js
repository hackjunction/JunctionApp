import React, { useEffect, useRef, useState } from 'react'

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
import * as SnackbarActions from 'redux/snackbar/actions'

import ToggleFavorites from './ToggleFavorites'
import { useTranslation } from 'react-i18next'
import { useToggle } from 'hooks/customHooks'
import Button from 'components/generic/Button'
import { CSVLink } from 'react-csv'
import { flattenObject } from 'utils/dataModifiers'
import RecruitmentService from 'services/recruitment'

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
    const idToken = useSelector(AuthSelectors.getIdToken)
    const favorites = useSelector(RecruitmentSelectors.favorites)
    const event = useSelector(DashboardSelectors.event)
    const eventId = event?._id
    const recEvents = useSelector(UserSelectors.userProfileRecruiterEvents)
    const csvFavLink = useRef(null)

    const csvAllLink = useRef(null)
    const [allProfiles, setAllProfiles] = useState([])

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
    // TODO make organization and eventId fetch on one element as now it is repeated here, in the ResultCard and in the RecruitmentFavorites
    useEffect(() => {
        dispatch(RecruitmentActions.updateEvents())

        const organisation = recEvents.find(e => {
            return e.eventId === eventId
        }).organisation

        dispatch(RecruitmentActions.updateActionHistory(organisation))
    }, [recEvents])

    //Handling download of all profiles TODO improve this function and implement snackbar notifications
    const handleDownload = async () => {
        try {
            const profiles =
                await RecruitmentService.getAllRecruitmentProfilesForEvent(
                    idToken,
                    eventId,
                )

            if (Array.isArray(profiles)) {
                setAllProfiles(profiles)
                csvAllLink.current.link.click()
            }
        } catch (err) {
            console.log('Error getting all profiles', err)
            dispatch(
                SnackbarActions.error(
                    'Error downloading all profiles, refresh the page and try again, if the problem persist, contact support',
                ),
            )
        }
    }

    return (
        <>
            <PageWrapper>
                <Container center>
                    <div className="tw-flex tw-flex-col tw-mb-2 tw-gap-4">
                        <div className="tw-flex md:tw-flex-row  tw-flex-col md:tw-justify-end  tw-gap-4">
                            <Button
                                onClick={handleDownload}
                                variant="contained"
                            >
                                Download all profiles as CSV
                            </Button>
                            <CSVLink
                                className=" tw-hidden"
                                data={allProfiles.map(profile => {
                                    return flattenObject(
                                        profile,
                                        skipArray,
                                        stringEscapeArray,
                                    )
                                })}
                                filename={`${event.name}-all-profiles.csv`}
                                ref={csvAllLink}
                            />
                            <ToggleFavorites
                                count={favorites.length}
                                active={showFavorites}
                                onChange={toggleFavorites}
                            />
                        </div>
                        <div>
                            {showFavorites ? (
                                <>
                                    <Button
                                        onClick={() => {
                                            csvFavLink.current.link.click()
                                        }}
                                        variant="contained"
                                    >
                                        Download favorites as CSV
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
                                        ref={csvFavLink}
                                    />
                                    <SearchResults
                                        items={favorites}
                                        eventId={eventId}
                                    />
                                </>
                            ) : (
                                <>
                                    <Filters />
                                    <SearchResults eventId={eventId} />
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </PageWrapper>
        </>
    )
}
