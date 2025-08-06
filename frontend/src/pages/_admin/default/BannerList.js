import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Grid2 as Grid, Box, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import BannerService from 'services/banner'
import * as AuthSelectors from 'reducers/auth/selectors'
import { useNavigate } from 'react-router-dom'

export default ({ data = [] }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [banner, setBanner] = useState(data)
    useEffect(() => {
        BannerService.getAllBanners().then(pack => {
            if (pack) setBanner(pack)
        })
    }, [])

    const handleRemove = useCallback(
        slug => {
            BannerService.deleteBanner(idToken, slug)
            setBanner(
                banner.filter(function (obj) {
                    return obj.slug !== slug
                }),
            )
        },
        [banner, idToken],
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Your_hackerpack_')}
            </Typography>
            <Grid container spacing={3}>
                {banner.map(company => (
                    <Box p={2} key={company.slug}>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemove(company.slug)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={() =>
                                navigate(`admin/banner/${company.slug}`)
                            }
                        >
                            <EditIcon />
                        </IconButton>
                        <span>{company.name}</span>
                        <span>{company.icon}</span>
                        {company.buttons.map(i => (
                            <>
                                <span>{i.text}</span> <span>{i.push}</span>
                            </>
                        ))}
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}
