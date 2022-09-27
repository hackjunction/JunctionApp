import {
    Box,
    Card,
    CardActions,
    CardContent,
    Grid,
    Link,
    Paper,
} from '@material-ui/core'
import TextInput from 'components/inputs/TextInput'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Formik, FastField } from 'formik'

import { useDispatch, useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import { useTranslation } from 'react-i18next'
import * as AuthSelectors from 'redux/auth/selectors'
import VotingTokenService from 'services/votingToken'
import * as SnackbarActions from 'redux/snackbar/actions'
import Button from 'components/generic/Button'
import { Table } from 'components/generic/_Table'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const organiserProfiles = useSelector(OrganiserSelectors.organisersMap)
    const projects = useSelector(OrganiserSelectors.projectsMap)

    const [initialData, setInitialData] = useState({})
    const [tokens, setTokens] = useState([])
    const idToken = useSelector(AuthSelectors.getIdToken)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        if (idToken && event?.slug) {
            refreshTokens()
        }
    }, [idToken, event?.slug])

    const refreshTokens = useCallback(() => {
        if (idToken && event?.slug) {
            VotingTokenService.getVotingTokens(idToken, event.slug).then(
                tokens => {
                    setTokens(tokens)
                },
            )
        }
    }, [idToken, event?.slug])

    const handleSubmit = useCallback(
        (values, formikBag) => {
            formikBag.setSubmitting(true)
            VotingTokenService.createVotingToken(
                idToken,
                event.slug,
                values.name,
            )
                .then(() => {
                    dispatch(SnackbarActions.success('Token created!'))
                    refreshTokens()
                })
                .catch(err => {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... Please try again',
                        ),
                    )
                })
                .finally(() => {
                    formikBag.setSubmitting(false)
                })
        },
        [dispatch, idToken, event?.slug],
    )

    const onRevokeClicked = useCallback(tokenId => {
        VotingTokenService.revokeVotingToken(idToken, event.slug, tokenId)
            .then(() => {
                dispatch(SnackbarActions.success('Token revoked!'))
                refreshTokens()
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... Please try again',
                    ),
                )
            })
    }, [])

    const onCopyLinkClicked = useCallback(tokenId => {
        navigator.clipboard.writeText(generateTokenLink(tokenId))
        dispatch(SnackbarActions.success('Link copied to clipboard!'))
    }, [])

    const generateTokenLink = tokenId => {
        return `${window.origin}/events/${event?.slug}/finalist-voting/?votingToken=${tokenId}`
    }

    const getOrganiserName = userId => {
        if (!organiserProfiles?.[userId]) return userId

        return `${organiserProfiles[userId].firstName} ${organiserProfiles[userId].lastName}`
    }

    const columns = useMemo(() => {
        return [
            {
                Header: '#',
                accessor: (row, index) => {
                    return index + 1
                },
                id: 'index',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Voted on',
                accessor: 'project',
            },
            {
                Header: 'Created by',
                accessor: 'createdBy',
            },
            {
                Header: 'Created at',
                accessor: 'createdAt',
            },
            {
                Header: 'Actions',
                accessor: 'actions',
            },
        ]
    }, [])

    const tokensTableData = tokens.map(token => ({
        id: token._id,
        name: token.name,
        status: token.isRevoked ? 'Revoked' : 'Active',
        createdBy: getOrganiserName(token.createdBy),
        createdAt: new Date(token.createdAt).toLocaleString(),
        project: projects?.[token.project]?.name || 'Not voted',
        actions: (
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    disabled={token.isRevoked}
                    onClick={() => onCopyLinkClicked(token._id)}
                >
                    Copy link
                </Button>
                <Button
                    color="warning"
                    disabled={token.isRevoked}
                    onClick={() => onRevokeClicked(token._id)}
                >
                    Revoke token
                </Button>
            </Box>
        ),
    }))

    return (
        <Box>
            <p>
                Create voting tokens for each partner or judge. They will be
                able to vote with the generated link in the finalist voting,
                without needing to register.
            </p>
            <p>
                Each token (link) can be used to vote on a single project during
                the finalist voting time window.
            </p>
            <h3>Create a token</h3>
            <Paper>
                <Box p={2}>
                    <Formik
                        enableReinitialize
                        initialValues={initialData}
                        onSubmit={handleSubmit}
                    >
                        {formikProps => (
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <FastField
                                        name="name"
                                        render={({ field, form }) => (
                                            <TextInput
                                                label={t('Name_')}
                                                value={field.value}
                                                onChange={value =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        value,
                                                    )
                                                }
                                                placeholder="Token for Jury Jane from Siemens"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        color="theme_turquoise"
                                        variant="contained"
                                        type="submit"
                                        disabled={formikProps.isSubmitting}
                                        style={{ width: '100%' }}
                                        onClick={formikProps.handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </Formik>
                </Box>
            </Paper>
            <h3>Existing tokens</h3>
            <Table
                columns={columns}
                data={tokensTableData}
                enableExport={false}
                enableSelection={false}
            />
        </Box>
    )
}
