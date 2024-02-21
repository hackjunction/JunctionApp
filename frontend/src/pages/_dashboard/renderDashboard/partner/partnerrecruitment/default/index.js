

import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}))

export default () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const dispatch = useDispatch()
    const idTokenData = useSelector(AuthSelectors.idTokenData)
    const favorites = useSelector(RecruitmentSelectors.favorites)
    const event = useSelector(DashboardSelectors.event)._id
    const recEvents = useSelector(UserSelectors.userProfileRecruiterEvents)

    const [recruiterOrganisation, SetRecruiterOrganisation] = useState("")
    const [showFavorites, toggleFavorites] = useToggle(false)

    useEffect(() => {
        console.log('accessing recruitment', idTokenData)
        if (!idTokenData) {
            throw new Error(t('Invalid_token_'))
        }
        if (!(idTokenData.recruiter_events?.length > 0)) {
            throw new Error(t('Invalid_access_'))
        }
    }, [idTokenData, t])

    useEffect(() => {
        //dispatch(RecruitmentActions.updateEvents())

        const organisation = recEvents.find(e => {
            return e.eventId === event
        }).organisation
        SetRecruiterOrganisation(organisation)

        dispatch(RecruitmentActions.updateActionHistory(organisation))
    }, [dispatch])



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
                    </Box >

                    {showFavorites ? (
                        <SearchResults items={favorites} organisation={recruiterOrganisation} />
                    ) : (
                        <>
                            <Filters />
                            <SearchResults organisation={recruiterOrganisation} />
                        </>
                    )}
                </Container>
                {/* <SearchResults /> */}
            </PageWrapper>
        </>
    )
}


