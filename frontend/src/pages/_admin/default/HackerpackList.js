import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Box, Typography } from '@mui/material'
import CompanySection from 'components/hackerpack/CompanySection'
import Divider from 'components/generic/Divider'

import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import HackerpackService from 'services/hackerpack'
import * as AuthSelectors from 'reducers/auth/selectors'

export default ({ data = [] }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [hackerpack, setHackerpack] = useState(data)

    useEffect(() => {
        HackerpackService.getFullHackerpack().then(pack => {
            if (pack) setHackerpack(pack)
        })
    }, [])

    const handleRemove = useCallback(
        slug => {
            console.log(hackerpack)
            HackerpackService.deleteHackerpack(idToken, slug)
            setHackerpack(
                hackerpack.filter(function (obj) {
                    return obj.slug !== slug
                }),
            )
        },
        [hackerpack, idToken],
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Your_hackerpack_')}
            </Typography>
            <Grid container spacing={3}>
                {hackerpack.map(company => (
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
                                        push(
                                            `admin/hackerpack/${company.slug}`,
                                        ),
                                    )
                                }
                            >
                                <EditIcon />
                            </IconButton>
                            <CompanySection
                                name={company.name}
                                description={company.description}
                                icon={company.icon}
                                link={company.link}
                            />
                        </Box>
                        <Divider variant="middle" />
                    </>
                ))}
            </Grid>
        </Box>
    )
}
