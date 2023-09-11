import React, { useState, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Typography } from '@material-ui/core'

import TextInput from 'components/inputs/TextInput'
import Button from 'components/generic/Button'

import * as DashboardActions from 'redux/dashboard/actions'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    box: {
        background: 'white',
        padding: theme.spacing(3),
        borderRadius: '12px',
        boxShadow: '4px 6px 20px #F3F3F3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

export default () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const classes = useStyles()
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState('')

    const handleJoin = useCallback(() => {
        setLoading(true)
        dispatch(DashboardActions.joinTeam(event.slug, code))
            .then(() => {
                dispatch(SnackbarActions.success('Joined team ' + code))
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    dispatch(
                        SnackbarActions.error(
                            'No team found with code ' + code,
                        ),
                    )
                } else if (err.response && err.response.status === 403) {
                    dispatch(
                        SnackbarActions.error(
                            'Unable to join team: ' +
                                err?.response?.data?.message,
                        ),
                    )
                } else {
                    dispatch(
                        SnackbarActions.error(
                            'Something went wrong... please try again.',
                        ),
                    )
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [code, dispatch, event.slug])

    return (
        <div className=" tw-flex tw-gap-8 tw-pr-4 tw-items-center">
            <div className=" tw-w-56">
                <Typography variant="body1" align="left" gutterBottom>
                    {t('Team_info_0_')}
                </Typography>
            </div>
            <div className=" tw-w-64">
                <TextInput
                    value={code}
                    onChange={setCode}
                    label="Your team code here"
                />
            </div>
            <Button
                loading={loading}
                disabled={code.length === 0}
                variant="jContained"
                onClick={handleJoin}
            >
                Join team
            </Button>
        </div>
    )
}
