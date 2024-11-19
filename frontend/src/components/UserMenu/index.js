import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Box, ListItem, ListItemText, Grid } from '@mui/material'
import * as AuthSelectors from 'reducers/auth/selectors'
import JunctionTheme from 'junctionTheme.js'
import Button from 'components/generic/Button'
import UserAvatar from 'components/UserAvatar'
import { useMyProfilePreview } from 'graphql/queries/userProfile'
import { styled } from '@mui/system'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

// const useStyles = styled(theme => ({
//     avatar: {
//         marginLeft: '16px',
//     },
//     menuBox: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '5px',
//         margin: '30px',
//         backgroundColor: 'white',
//         border: 'solid',
//         borderColor: theme.palette.primary.main,
//         '&:hover': {
//             backgroundColor: theme.palette.primary.light,
//         },
//     },
//     menuItem: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// }))

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
        <Box display="flex" flexDirection="row" alignItems="center">
            <Grid container spacing={2} wrap="nowrap">
                <Grid item xs={4}>
                    <Button
                        onClick={() => navigate('/dashboard/default/')}
                        strong={true}
                    >
                        {t('Dashboard_')}
                    </Button>
                </Grid>
                <Grid item xs={5}>
                    <Button onClick={() => navigate('/logout')} strong={true}>
                        {t('Log_out_')}
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <UserAvatar />
                </Grid>
            </Grid>
        </Box>
    )
}
