import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { Grid, Box, Typography } from '@material-ui/core'
import Divider from 'components/generic/Divider'

import { useTranslation } from 'react-i18next'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import OrganizationService from 'services/organization'
import * as AuthSelectors from 'redux/auth/selectors'

export default ({ data = [] }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [organization, setOrganization] = useState(data)

    useEffect(() => {
        OrganizationService.getOrganizations().then(org => {
            if (org) setOrganization(org)
        })
    }, [])

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
                        <Box p={2}>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleRemove(org.slug)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                onClick={() =>
                                    dispatch(
                                        push(`admin/organization/${org.slug}`),
                                    )
                                }
                            >
                                <EditIcon />
                            </IconButton>
                            <div>
                                name={org.name}
                                description={org.description}
                                icon={org.icon}
                                link={org.link}
                            </div>
                        </Box>
                        <Divider variant="middle" />
                    </>
                ))}
            </Grid>
        </Box>
    )
}
