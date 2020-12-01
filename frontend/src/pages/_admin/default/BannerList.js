import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { Grid, Box, Typography } from '@material-ui/core'

import Divider from 'components/generic/Divider'

import { useTranslation } from 'react-i18next'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import BannerService from 'services/banner'
import * as AuthSelectors from 'redux/auth/selectors'

export default ({ data = [] }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [banner, setBanner] = useState(data)
    useEffect(() => {
        BannerService.getFullBanner().then(pack => {
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
                    <>
                        <Box p={2}>
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
                                    dispatch(
                                        push(`admin/banner/${company.slug}`),
                                    )
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
                        <Divider variant="middle" />
                    </>
                ))}
            </Grid>
        </Box>
    )
}
