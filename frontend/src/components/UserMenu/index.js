import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import { Box, ListItem, ListItemText, Grid } from '@material-ui/core'
import * as AuthSelectors from 'redux/auth/selectors'
import JunctionTheme from 'junctionTheme.js'
import Button from 'components/generic/Button'
import UserAvatar from 'components/UserAvatar'
import { useMyProfilePreview } from 'graphql/queries/userProfile'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    avatar: {
        marginLeft: '16px',
    },
    menuBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        margin: '30px',
        backgroundColor: 'white',
        border: 'solid',
        borderColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}))

export default () => {
    const { t } = useTranslation()

    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub
    const dispatch = useDispatch()
    const classes = useStyles()

    if (!userId) {
        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => dispatch(push('/login'))}
                            strong={true}
                            className={classes.menuBox}
                        >
                            {t('Sign_in_')}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Grid container spacing={2} wrap="nowrap">
                <Grid item xs={4}>
                    <Button
                        onClick={() => dispatch(push('/dashboard/default'))}
                        strong={true}
                        className={classes.menuBox}
                    >
                        {t('Dashboard_')}
                    </Button>
                </Grid>
                <Grid item xs={5}>
                    <Button
                        onClick={() => dispatch(push('/logout'))}
                        strong={true}
                        className={classes.menuBox}
                    >
                        {t('Log_out_')}
                    </Button>
                </Grid>
                <Grid item xs={3} className={classes.menuItem}>
                    <UserAvatar />
                </Grid>
            </Grid>
        </Box>
    )
}
