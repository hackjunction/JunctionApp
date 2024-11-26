import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { push } from 'connected-react-router'
import { Box, ListItem, ListItemText, Grid } from '@mui/material'
import * as AuthSelectors from 'reducers/auth/selectors'
import JunctionTheme from 'junctionTheme.js'
import Button from 'components/generic/Button'
import UserAvatar from 'components/UserAvatar'
import { useMyProfilePreview } from 'graphql/queries/userProfile'
import { styled } from '@mui/system'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import LanguageMenu from 'components/LanguageMenu'

export default () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub
    const dispatch = useDispatch()
    // const classes = useStyles()

    if (!userId) {
        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Button
                            onClick={() =>
                                navigate('/login', {
                                    state: { nextRoute: location.pathname },
                                })
                            }
                            strong={true}
                        >
                            {t('Sign_in_')}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <Box className="tw-gap-2 tw-flex tw-flex-col md:tw-flex-row tw-items-center">
            <LanguageMenu />
            {userId ? (
                <>
                    <Button
                        onClick={() => navigate('/dashboard/default/')}
                        strong={true}
                        variant="contained"
                        // className={classes.menuBox}
                    >
                        {t('Dashboard_')}
                    </Button>
                    <Button onClick={() => navigate('/logout')} strong={true}>
                        {t('Log_out_')}
                    </Button>
                    <UserAvatar />
                </>
            ) : (
                <Button
                    onClick={() => navigate('/login')}
                    strong={true}
                    variant="contained"
                >
                    {t('Sign_in_')}
                </Button>
            )}
        </Box>
    )
}
