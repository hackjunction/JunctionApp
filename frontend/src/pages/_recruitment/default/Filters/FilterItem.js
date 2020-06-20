import React, { useCallback } from 'react'

import { Box, Typography, ButtonBase, Popover } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { useTranslation } from 'react-i18next'
import Button from 'components/generic/Button'

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: '1rem',
        marginBottom: '1rem',
    },
    toggleButton: ({ active }) => ({
        background: '#ffffff',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: active ? '2px solid #000000' : '2px solid #DBDBDB',
        borderRadius: '4px',
        height: '28px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    buttonLabel: ({ active }) => ({
        fontSize: '14px',
        marginLeft: '1rem',
        color: active ? '#000000' : theme.palette.text.secondary,
    }),
    buttonIcon: {
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        fontSize: '22px',
    },
}))
const FilterItem = ({
    label,
    active,
    children,
    onClose = () => {},
    onSubmit = () => {},
}) => {
    const classes = useStyles({ active })
    const [anchorEl, setAnchorEl] = React.useState(null)
    const { t } = useTranslation()

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = useCallback(() => {
        setAnchorEl(null)
        onClose()
    }, [onClose])

    const handleSubmit = useCallback(() => {
        setAnchorEl(null)
        onSubmit()
    }, [onSubmit])

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    return (
        <div className={classes.root}>
            <ButtonBase
                className={classes.toggleButton}
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
            >
                <Typography variant="body1" className={classes.buttonLabel}>
                    {label}
                </Typography>
                <KeyboardArrowDownIcon className={classes.buttonIcon} />
            </ButtonBase>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box p={1}>{children}</Box>
                <Box
                    p={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    <Button
                        color="theme_white"
                        variant="contained"
                        onClick={handleClose}
                    >
                        {t('Cancel_')}
                    </Button>
                    <Box p={1}></Box>
                    <Button
                        color="theme_orange"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        {t('Save_filters_')}
                    </Button>
                </Box>
            </Popover>
        </div>
    )
}

export default FilterItem
