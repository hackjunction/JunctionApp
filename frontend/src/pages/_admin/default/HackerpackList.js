import React from 'react'

import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { Grid, Box, Typography } from '@material-ui/core'
import CompanySection from 'components/hackerpack/CompanySection'
import Divider from 'components/generic/Divider'

import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'

export default ({ hackerpack = [] }) => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Your_hackerpack_')}
            </Typography>
            <Grid container spacing={3}>
                {hackerpack.map(company => (
                    <React.Fragment>
                        <Box p={2}>
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
