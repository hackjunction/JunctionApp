import React, { useEffect, useState } from 'react'

import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import ErrorDisplay from './ErrorDisplay'
import BlockExitIfDirty from 'components/inputs/BlockExitIfDirty'
import Button from 'components/generic/Button'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    wrapper: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: '#000000',
        padding: theme.spacing(2),
        zIndex: 2000,
    },
    right: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    nextButton: {
        '&.Mui-disabled': {
            background: theme.palette.primary.main,
            opacity: 0.6,
        },
    },
    prevButton: {
        color: 'white',
    },
    buttonLabel: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    buttonIcon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}))

const RegistrationBottomBar = ({
    prevLabel,
    onPrev,
    nextLabel,
    onNext,
    errors,
    dirty,
}) => {
    const classes = useStyles()
    const [enabled, setEnabled] = useState(false)
    const { t, i18n } = useTranslation()
    useEffect(() => {
        setTimeout(function() {
            setEnabled(true)
        }, 1000)
    }, [])
    return (
        <Box className={classes.wrapper}>
            {prevLabel && onPrev && (
                <Button className={classes.prevButton} onClick={onPrev}>
                    <ArrowBackIcon className={classes.buttonIcon} />{' '}
                    {t('Back_')}
                    <span className={classes.buttonLabel}>: {prevLabel}</span>
                </Button>
            )}
            <Box className={classes.right}>
                <ErrorDisplay errors={errors} />
                <Button
                    className={classes.nextButton}
                    disabled={Object.keys(errors).length > 0 || !enabled}
                    color="primary"
                    variant="contained"
                    onClick={onNext}
                >
                    {t('Next_')}
                    <span className={classes.buttonLabel}>
                        : {nextLabel}
                    </span>{' '}
                    <ArrowForwardIcon className={classes.buttonIcon} />
                </Button>
            </Box>
            <BlockExitIfDirty dirty={dirty} />
        </Box>
    )
}

export default RegistrationBottomBar
