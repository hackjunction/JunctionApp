import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'
import { Grid, Box, Typography } from '@material-ui/core'
import CompanySection from 'components/hackerpack/CompanySection'
import Divider from 'components/generic/Divider'

import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import HackerpackService from 'services/hackerpack'
import * as AuthSelectors from 'redux/auth/selectors'

export default ({ data = [] }) => {
    const { t, i18n } = useTranslation()
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
                hackerpack.filter(function(obj) {
                    return obj.slug !== slug
                })
            )
        },
        [hackerpack, idToken]
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Your_hackerpack_')}
            </Typography>
            <Grid container spacing={3}>
                {hackerpack.map(company => (
                    <React.Fragment>
                        <Box p={2}>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleRemove(company.slug)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <CompanySection
                                name={company.name}
                                description={company.description}
                                icon={company.icon}
                                link={company.link}
                            />
                        </Box>
                        <Divider variant="middle" />
                    </React.Fragment>
                ))}
            </Grid>
        </Box>
    )
}
