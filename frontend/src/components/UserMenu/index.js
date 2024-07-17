import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import {
    Box,
    ListItem,
    ListItemText,
    Grid,
    Menu,
    MenuItem,
} from '@material-ui/core'
import * as AuthSelectors from 'redux/auth/selectors'
import JunctionTheme from 'junctionTheme.js'
import Button from 'components/generic/Button'
import UserAvatar from 'components/UserAvatar'
import { useMyProfilePreview } from 'graphql/queries/userProfile'

import { useTranslation } from 'react-i18next'
import LanguageMenu from 'components/LanguageMenu'

const useStyles = makeStyles(theme => ({
    // avatar: {
    //     marginLeft: '16px',
    // },
    // menuBox: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     padding: '5px',
    //     margin: '30px',
    //     backgroundColor: 'white',
    //     border: 'solid',
    //     borderColor: theme.palette.primary.main,
    //     '&:hover': {
    //         backgroundColor: theme.palette.primary.light,
    //     },
    // },
    // menuItem: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
}))

export default () => {
    const { t } = useTranslation()

    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub
    const dispatch = useDispatch()
    // const classes = useStyles()
    // detect if screen size is small
    // const [isSmallScreen, setIsSmallScreen] = useState(false)
    // const handleResize = () => {
    //     if (window.innerWidth < 768) {
    if (window.innerWidth < 768) {
        const [anchorEl, setAnchorEl] = useState(null)
        console.log('small screen')
    }

    return (
        <Box className="tw-gap-2 tw-flex tw-flex-col md:tw-flex-row tw-items-center">
            <LanguageMenu />
            {userId ? (
                <>
                    <Button
                        onClick={() => dispatch(push('/dashboard/default'))}
                        strong={true}
                        variant="contained"
                        // className={classes.menuBox}
                    >
                        {t('Dashboard_')}
                    </Button>
                    <Button
                        onClick={() => dispatch(push('/logout'))}
                        strong={true}
                        variant="outlined"
                        className={'tw-bg-white tw-text-black'}
                        // className={classes.menuBox}
                    >
                        {t('Log_out_')}
                    </Button>
                    <UserAvatar />
                </>
            ) : (
                <Button
                    onClick={() => dispatch(push('/login'))}
                    strong={true}
                    variant="contained"
                >
                    {t('Sign_in_')}
                </Button>
            )}
        </Box>
    )
}
