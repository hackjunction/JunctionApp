import React from 'react'
import { useSelector } from 'react-redux'
import * as AuthSelectors from 'reducers/auth/selectors'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from 'components/generic/Button'
import UserAvatar from 'components/UserAvatar'
import LanguageMenu from 'components/LanguageMenu'

import { useTranslation } from 'react-i18next'

export default () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub

    return (
        <Box className="tw-gap-2 tw-flex tw-flex-col sm:tw-flex-row tw-items-center">
            <LanguageMenu />
            {userId ? (
                <>
                    <Button
                        onClick={() => navigate('/dashboard/default/')}
                        strong={true}
                        variant="contained"
                    >
                        {t('Dashboard_')}
                    </Button>
                    <Button
                        onClick={() => navigate('/logout')}
                        strong={true}
                        variant="outlined"
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
