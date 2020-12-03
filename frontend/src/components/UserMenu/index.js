import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import {
    Popover,
    IconButton,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Divider,
    TableContainer,
    Table,
    TableCell,
    TableRow,
    Grid,
} from '@material-ui/core'
import * as AuthSelectors from 'redux/auth/selectors'
import MenuIcon from '@material-ui/icons/Menu'
import Button from 'components/generic/Button'
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

    const idTokenPayload = useSelector(AuthSelectors.getIdTokenPayload)
    const userId = idTokenPayload?.sub
    const [profile] = useMyProfilePreview()
    const dispatch = useDispatch()
    const hasSuperAdmin = useSelector(AuthSelectors.hasSuperAdmin)
    const hasOrganiserAccess = useSelector(AuthSelectors.hasOrganiserAccess)
    const hasRecruiterAccess = useSelector(AuthSelectors.hasRecruiterAccess)
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenuOpen = e => {
        setAnchorEl(e.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    if (!userId) {
        return (
            <Box display="flex" flexDirection="row" alignItems="center">
                <MenuIcon
                    fontSize="large"
                    onClick={handleMenuOpen}
                    className={`${classes.hamburger} ${
                        anchorEl
                            ? classes.hamburgerOpen
                            : classes.hamburgerClosed
                    }`}
                />

                <Popover
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    classes={{
                        paper: classes.menuBox,
                    }}
                >
                    <Box className={classes.menuBox}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <ListItem button>
                                    <ListItemText
                                        primary={t('Sign_in_')}
                                        onClick={() => dispatch(push('/login'))}
                                    />
                                </ListItem>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={6}>
                                <LanguageMenu />
                            </Grid>
                        </Grid>
                    </Box>
                </Popover>
            </Box>
        )
    }

    const renderEventItems = () => {
        //const items = [];
        // TODO: Add links to event dashboard here for ongoing events
        return null
    }

    const renderOtherItems = () => {
        const items = []

        // if (hasOrganiserAccess) {
        items.push({
            label: 'Create Event',
            onClick: () => dispatch(push('/organise')),
        })
        // }

        if (hasRecruiterAccess) {
            items.push({
                label: 'Recruitment',
                onClick: () => dispatch(push('/recruitment')),
            })
        }

        if (hasSuperAdmin) {
            items.push({
                label: 'Admin',
                onClick: () => dispatch(push('/admin')),
            })
        }
        // Grid Item isn't neccessary here, but put it in for consistency
        if (items.length > 0) {
            return (
                <>
                    {items.map(({ label, onClick }) => (
                        <Grid key={label} item xs={12}>
                            <ListItem button onClick={onClick}>
                                <ListItemText primary={label} />
                            </ListItem>
                        </Grid>
                    ))}
                </>
            )
        }

        return null
    }

    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <MenuIcon
                fontSize="large"
                onClick={handleMenuOpen}
                className={`${classes.hamburger} ${
                    anchorEl ? classes.hamburgerOpen : classes.hamburgerClosed
                }`}
            />

            <Popover
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                classes={{
                    paper: classes.menuBox,
                }}
            >
                <Box className={classes.menuBox}>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <ListItem button>
                                <ListItemText
                                    primary={t('Dashboard_')}
                                    onClick={() => dispatch(push('/account'))}
                                />
                            </ListItem>
                        </Grid>
                        <Grid item xs={6}>
                            <ListItem
                                button
                                onClick={() => dispatch(push('/logout'))}
                            >
                                <ListItemText primary={t('Log_out_')} />
                            </ListItem>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItem button>
                                <ListItemText
                                    primary={t('Edit_profile_')}
                                    onClick={() =>
                                        dispatch(push('/account/profile'))
                                    }
                                />
                            </ListItem>
                        </Grid>
                        {renderEventItems()}
                        {renderOtherItems()}

                        <Grid item xs={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <Grid item xs={6}>
                            <LanguageMenu />
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
            <Avatar
                className={classes.avatar}
                src={profile?.avatar}
                alt="Avatar"
                style={{ width: '33px', height: '33px' }}
            />
        </Box>
    )
}
