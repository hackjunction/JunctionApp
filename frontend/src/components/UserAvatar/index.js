import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { useRouteMatch, useLocation } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'
import {
    Popover,
    Avatar,
    Box,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    IconButton,
} from '@material-ui/core'
import * as AuthSelectors from 'redux/auth/selectors'
import MenuIcon from '@material-ui/icons/Menu'
import JunctionTheme from 'junctionTheme.js'
import LanguageMenu from 'components/LanguageMenu'
import { useMyProfilePreview } from 'graphql/queries/userProfile'

import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    menuDot: {
        width: '8px',
        height: '8px',
        margin: '2px',
        borderRadius: '2px',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    avatar: {
        marginLeft: '16px',
    },
    hamburger: {
        transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.short,
        }),
    },
    hamburgerOpen: {
        transform: 'rotate(-90deg)',
    },
    hamburgerClosed: {
        transform: 'rotate(0)',
    },
    tableBottom: {
        borderBottom: 'none',
    },
    popover: {
        borderRadius: '15px',
    },
    menuBox: {
        width: '220px',
        borderRadius: '15px',
    },
}))

export default () => {
    const { t } = useTranslation()
    const match = useRouteMatch()
    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub
    const [profile] = useMyProfilePreview()
    const dispatch = useDispatch()
    const hasSuperAdmin = useSelector(AuthSelectors.hasSuperAdmin)
    const hasRecruiterAccess = useSelector(AuthSelectors.hasRecruiterAccess)
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const color = JunctionTheme.palette

    const handleClick = () => {
        if (match.url === '/home') {
            dispatch(push(`dashboard/default/profile`))
        } else {
            dispatch(push(`${match.url}/profile`))
        }
    }


    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <div className='tw-rounded-full tw-border-8 tw-border-white'>
                <IconButton>
                    <Avatar
                        className='tw-rounded-full tw-border-8 tw-border-white '
                        src={profile?.avatar}
                        alt="Avatar"
                        style={{
                            width: '50px',
                            height: '50px',
                            border: `2px solid ${color['primary'].main}`,
                            borderRadius: '50%',
                        }}
                        onClick={handleClick}
                    />
                </IconButton>
            </div>
        </Box>
    )
}
