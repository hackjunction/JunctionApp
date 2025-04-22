import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'
import * as AuthSelectors from 'reducers/auth/selectors'
import JunctionTheme from 'junctionTheme.js'
import Button from 'components/generic/Button'
import UserAvatar from 'components/UserAvatar'
import { useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import LanguageMenu from 'components/LanguageMenu'

export default () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub
    // const classes = useStyles()

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
                    <Button
                        onClick={() => navigate('/logout')}
                        strong={true}
                        variant="outlined"
                        className={'tw-bg-white tw-text-black'}
                        // className={classes.menuBox}
                    >
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
