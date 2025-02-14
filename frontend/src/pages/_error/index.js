import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button from 'components/generic/Button'
import FixedLayout from 'components/layouts/FixedLayout'
import * as AuthActions from 'reducers/auth/actions'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(AuthActions.clearSession())
    }, [dispatch])

    const error = location?.state?.error

    return (
        <FixedLayout
            background={require('assets/images/default_cover_image.png')}
            backgroundOpacity={0.2}
        >
            <Box className="w-full max-w-xl mx-auto flex flex-col items-center p-6 bg-black text-white">
                <img
                    className="w-52 h-52"
                    src={require('../../assets/logos/emblem_white.png')}
                    alt="logo"
                />
                <Typography variant="h6" className="uppercase text-center">
                    {t('Something_wrong_')}
                </Typography>
                {error && (
                    <Typography
                        variant="body1"
                        className="text-red-500 font-bold text-center mt-3 mb-3 p-2"
                    >
                        {error}
                    </Typography>
                )}
                <Typography variant="subtitle2" className="text-center">
                    {t('Problem_persists_')}
                </Typography>
                <Box mt={2}>
                    <Button color="primary">
                        <Link to="/" className="text-white">
                            {t('Back_to_home_page_')}
                        </Link>
                    </Button>
                </Box>
            </Box>
        </FixedLayout>
    )
}

export default ErrorPage
