import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'

import SearchResults from './SearchResults'
import Filters from './Filters'
import CenteredContainer from 'components/generic/CenteredContainer'

import * as RecruitmentSelectors from 'redux/recruitment/selectors'
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
    const { t, i18n } = useTranslation()
    const classes = useStyles()
    const idTokenData = useSelector(AuthSelectors.idTokenData)
    const favorites = useSelector(RecruitmentSelectors.favorites)

    const [showFavorites, toggleFavorites] = useToggle(false)

    useEffect(() => {
        if (!idTokenData) {
            throw new Error(t('Invalid_token_'))
        }
        if (!idTokenData.recruiter_events) {
            throw new Error(t('Invalid_access_'))
        }
        if (!idTokenData.recruiter_organisation) {
            throw new Error(t('Invalid_organisation_'))
        }
    }, [idTokenData, t])

    return (
        <div className={classes.root}>
            <CenteredContainer>
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
                    <SearchResults items={favorites} />
                ) : (
                    <React.Fragment>
                        <Filters />
                        <SearchResults />
                    </React.Fragment>
                )}
            </CenteredContainer>
        </div>
    )
}
