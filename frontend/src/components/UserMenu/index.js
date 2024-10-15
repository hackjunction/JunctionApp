import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { Box } from '@material-ui/core'
import * as AuthSelectors from 'redux/auth/selectors'
import Button from 'components/generic/Button'
import UserAvatar from 'components/UserAvatar'

import { useTranslation } from 'react-i18next'
import LanguageMenu from 'components/LanguageMenu'

export default () => {
    const { t } = useTranslation()

    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub
    const dispatch = useDispatch()

    return (
        <Box className="tw-gap-2 tw-flex tw-flex-col md:tw-flex-row tw-items-center">
            <LanguageMenu />
            {userId ? (
                <>
                    <Button
                        onClick={() => dispatch(push('/dashboard/default'))}
                        strong={true}
                        variant="contained"
                        // className={classes.menuBox}
                    >
                        {t('Dashboard_')}
                    </Button>
                    <Button
                        onClick={() => dispatch(push('/logout'))}
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
                    onClick={() => dispatch(push('/login'))}
                    strong={true}
                    variant="contained"
                >
                    {t('Sign_in_')}
                </Button>
            )}
        </Box>
    )
}
