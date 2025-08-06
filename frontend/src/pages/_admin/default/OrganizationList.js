import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Grid2 as Grid, Box, Typography } from '@mui/material'

import Button from 'components/generic/Button'

import { OutboundLink } from 'react-ga'

import GradientBox from 'components/generic/GradientBox'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { useTranslation } from 'react-i18next'

import OrganizationService from 'services/organization'
import * as AuthSelectors from 'reducers/auth/selectors'
import { useNavigate } from 'react-router-dom'

export default ({ data = [] }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [organization, setOrganization] = useState(data)

    useEffect(() => {
        OrganizationService.getOrganizations().then(org => {
            if (org) setOrganization(org)
        })
    }, [])
    console.log(organization)

    const handleRemove = useCallback(
        slug => {
            console.log(organization)
            OrganizationService.deleteOrganization(idToken, slug)
            setOrganization(
                organization.filter(function (obj) {
                    return obj.slug !== slug
                }),
            )
        },
        [organization, idToken],
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Your_organization_')}
            </Typography>
            <Grid container spacing={3}>
                {organization.map(org => (
                    <>
                        <Grid size={12}>
                            <GradientBox color="theme_white" p={3}>
                                <Grid container justifyContent="center">
                                    <Grid size={3}>
                                        <img
                                            alt={org.name}
                                            src={org.icon}
                                            height={'50px'}
                                            width={'200px'}
                                        />
                                    </Grid>
                                    <Grid size={3}>
                                        <Typography variant="h5">
                                            {org.name}
                                        </Typography>
                                    </Grid>
                                    <Grid size={3}>
                                        <Typography>{org.about}</Typography>
                                    </Grid>
                                    <Grid size={3}>
                                        <OutboundLink
                                            eventLabel="myLabel"
                                            to={org.link}
                                            target="_blank"
                                        >
                                            <Button
                                                color="primary"
                                                variant="contained"
                                            >
                                                Link
                                            </Button>
                                        </OutboundLink>

                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() =>
                                                navigate(
                                                    `admin/organization/${org.slug}`,
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                handleRemove(org.slug)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </GradientBox>
                        </Grid>
                    </>
                ))}
            </Grid>
        </Box>
    )
}
