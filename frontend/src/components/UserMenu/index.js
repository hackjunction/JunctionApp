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
    dropdown: {
        transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.short,
        }),
    },
    dropdownOpen: {
        transform: 'rotate(-90deg)',
    },
    dropdownClosed: {
        transform: 'rotate(0)',
    },
    tableBottom: {
        borderBottom: 'none',
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
                    className={[
                        classes.dropdown,
                        anchorEl
                            ? classes.dropdownOpen
                            : classes.dropdownClosed,
                    ]}
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
                >
                    <Box width="220px" borderRadius="15px">
                        <TableContainer>
                            <Table padding="none">
                                <TableRow>
                                    <List onClick={handleMenuClose}>
                                        <TableCell
                                            padding="none"
                                            className={classes.tableBottom}
                                        >
                                            <ListItem button padding="none">
                                                <ListItemText
                                                    primary={t('Sign_in_')}
                                                    onClick={() =>
                                                        dispatch(push('/login'))
                                                    }
                                                />
                                            </ListItem>
                                        </TableCell>
                                        <Divider />
                                        <ListItem>
                                            <LanguageMenu />
                                        </ListItem>
                                    </List>
                                </TableRow>
                            </Table>
                        </TableContainer>
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

        if (hasOrganiserAccess) {
            items.push({
                label: 'Organiser',
                onClick: () => dispatch(push('/organise')),
            })
        }

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

        if (items.length > 0) {
            return (
                <>
                    {items.map(({ label, onClick }) => (
                        <ListItem
                            key={label}
                            button
                            onClick={onClick}
                            padding="none"
                        >
                            <ListItemText primary={label} />
                        </ListItem>
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
                className={[
                    classes.dropdown,
                    anchorEl ? classes.dropdownOpen : classes.dropdownClosed,
                ]}
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
            >
                <Box width="220px" borderRadius="15px">
                    <TableContainer>
                        <Table padding="none">
                            <TableRow>
                                <List onClick={handleMenuClose}>
                                    <TableCell
                                        padding="none"
                                        className={classes.tableBottom}
                                    >
                                        <ListItem button padding="none">
                                            <ListItemText
                                                primary={t('Dashboard_')}
                                                onClick={() =>
                                                    dispatch(push('/account'))
                                                }
                                            />
                                        </ListItem>
                                        <ListItem button padding="none">
                                            <ListItemText
                                                primary={t('Edit_profile_')}
                                                onClick={() =>
                                                    dispatch(
                                                        push(
                                                            '/account/profile',
                                                        ),
                                                    )
                                                }
                                            />
                                        </ListItem>

                                        {renderEventItems()}
                                        {renderOtherItems()}

                                        <ListItem>
                                            <LanguageMenu />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell
                                        padding="none"
                                        className={classes.tableBottom}
                                    >
                                        <ListItem
                                            button
                                            onClick={() =>
                                                dispatch(push('/logout'))
                                            }
                                        >
                                            <ListItemText
                                                primary={t('Log_out_')}
                                            />
                                        </ListItem>
                                    </TableCell>
                                </List>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Box>
            </Popover>
        </Box>
    )
}
