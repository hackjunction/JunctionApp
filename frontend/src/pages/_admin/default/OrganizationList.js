import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { Grid, Box, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import Button from 'components/generic/Button'

import { OutboundLink } from 'react-ga'

import GradientBox from 'components/generic/GradientBox'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Divider from 'components/generic/Divider'

import { useTranslation } from 'react-i18next'

import OrganizationService from 'services/organization'
import * as AuthSelectors from 'redux/auth/selectors'

const useStyles = makeStyles(theme => ({
    outboundLink: {
        '& a': {
            textDecoration: 'none !important',
        },
    },
    companyLogo: {
        width: '200px',
        height: '50px;',
    },
}))

export default ({ data = [] }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
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
                })
            )
        },
        [organization, idToken]
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('Your_organization_')}
            </Typography>
            <Grid container spacing={3}>
                {organization.map(org => (
                    <>
                        <Grid item xs={12} md={12} xl={12}>
                            <GradientBox color="theme_white" p={3}>
                                <Grid container justify="center">
                                    <Grid item xs={3}>
                                        <img
                                            alt={org.name}
                                            src={org.icon}
                                            className={classes.companyLogo}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h5">
                                            {org.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>{org.about}</Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        className={classes.outboundLink}
                                    >
                                        <OutboundLink
                                            eventLabel="myLabel"
                                            to={org.link}
                                            target="_blank"
                                        >
                                            <Button
                                                color="theme_turquoise"
                                                variant="contained"
                                            >
                                                Link
                                            </Button>
                                        </OutboundLink>

                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() =>
                                                dispatch(
                                                    push(
                                                        `admin/organization/${org.slug}`
                                                    )
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

                        <Divider variant="middle" />
                    </>
                ))}
            </Grid>
        </Box>
    )
}
